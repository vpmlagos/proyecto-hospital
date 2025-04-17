from flask import Blueprint, request, jsonify, make_response
from functools import wraps
from app.models import db, User, ServiceType, Service
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt

auth = Blueprint('auth', __name__)


def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get('role') != required_role:
                return jsonify({'msg': 'Acceso denegado: se requiere rol {}'.format(required_role)}), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper
    

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'msg': 'Username already exists'}), 400

    user = User(username=data['username'], role=data.get('role', 'user'))  # Añade rol
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully'}), 201

@auth.route('/login', methods=['POST', 'OPTIONS'])
def login():
    print(request.method)
    if request.method == 'OPTIONS':
        return '', 200  # respuesta rápida al preflight

    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        token = create_access_token(identity=user.id, additional_claims={'role': user.role})
        return jsonify(access_token=token, role=user.role), 200
    return jsonify({'msg': 'Invalid credentials'}), 401

@auth.route('/login', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response
# --- ENDPOINTS PARA SERVICIOS CLÍNICOS ---

@auth.route('/service_types', methods=['GET'])
def get_service_types():
    service_types = ServiceType.query.all()
    result = []
    for st in service_types:
        result.append({
            'id': st.id,
            'name': st.name,
            'code': st.code,
            'created_at': st.created_at.isoformat(),
            'modified_at': st.modified_at.isoformat(),
            'services': [
                {
                    'id': s.id,
                    'name': s.name,
                    'description': s.description,
                    'created_at': s.created_at.isoformat(),
                    'modified_at': s.modified_at.isoformat()
                } for s in st.services
            ]
        })
    return jsonify(result), 200

@auth.route('/service-types/<int:id>', methods=['GET'])
@jwt_required()
def get_service_type_by_id(id):
    st = ServiceType.query.get_or_404(id)
    result = {
        'id': st.id,
        'name': st.name,
        'code': st.code,
        'created_at': st.created_at.isoformat(),
        'modified_at': st.modified_at.isoformat(),
        'services': [
            {
                'id': s.id,
                'name': s.name,
                'description': s.description,
                'created_at': s.created_at.isoformat(),
                'modified_at': s.modified_at.isoformat()
            } for s in st.services
        ]
    }
    return jsonify(result), 200

@auth.route('/service-types', methods=['POST'])
@jwt_required()
@role_required('admin')
def create_service_type():
    data = request.get_json()
    
    if not data.get('name') or not data.get('code'):
        return jsonify({'msg': 'Faltan campos requeridos: name y code'}), 400

    service_type = ServiceType(
        name=data['name'],
        code=data['code']
    )
    db.session.add(service_type)
    db.session.flush()  # Obtener ID antes del commit

    if 'services' in data:
        for s in data['services']:
            service = Service(
                name=s['name'],
                description=s.get('description', ''),
                service_type_id=service_type.id
            )
            db.session.add(service)

    db.session.commit()
    return jsonify({'msg': 'Service type creado correctamente', 'id': service_type.id}), 201