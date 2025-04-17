# scripts/seed_services.py

from app import create_app
from app.models import db
from app.models.service_models import ServiceType, Service
from datetime import datetime

app = create_app()

with app.app_context():
    now = datetime.utcnow()

    service_type = ServiceType(
        id=1,
        name="Servicios clínicos",
        code="clinical_service",
        created_at=now,
        modified_at=now
    )

    services = [
        Service(
            id=1,
            name="Urgencia gineco-obstétrica",
            description="Para atenciones de emergencia en el ámbito gineco-obstétrico.",
            created_at=now,
            modified_at=now,
            service_type=service_type
        ),
        Service(
            id=2,
            name="Cirugía robótica",
            description="Procedimientos mínimamente invasivos con la ayuda de un robot de última generación.",
            created_at=now,
            modified_at=now,
            service_type=service_type
        )
    ]

    db.session.add(service_type)
    db.session.add_all(services)
    db.session.commit()

    print("Datos de servicios cargados correctamente.")
