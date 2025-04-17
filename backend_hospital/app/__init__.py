from flask import Flask
from app.config import Config
from app.models import db, bcrypt
from app.routes import auth
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    # Configuración detallada de CORS
    CORS(app, 
         origins=["http://localhost:3000"],  # Especifica que solo localhost:5173 puede acceder
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Métodos permitidos
         allow_headers=["Content-Type", "Authorization"],  # Cabeceras permitidas
         supports_credentials=True)  # Permite el manejo de credenciales

    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    JWTManager(app)

    app.register_blueprint(auth, url_prefix='/api')
    print("\n📋 Rutas registradas:")
    for rule in app.url_map.iter_rules():
        print(rule)


    with app.app_context():
        db.create_all()
    
    return app
