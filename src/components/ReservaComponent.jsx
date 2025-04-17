import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import MenuLogin from "../layouts/MenuLogin";
import Menu from "../layouts/Menu";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ReservaComponent = () => {
  const navigate = useNavigate(); // ✅ Inicializar navigate

  const ciudades = ["Santiago", "Valparaíso", "Concepción"];
  const especialidades = {
    "Cardiología": ["Dr. Juan Pérez"],
    "Pediatría": ["Dra. Ana Gómez"],
  };

  const horariosPorDoctor = {
    "Dr. Juan Pérez": ["09:00", "10:00", "11:00"],
    "Dra. Ana Gómez": ["14:00", "15:30", "17:00"],
  };

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("reservaForm");
    return saved ? JSON.parse(saved) : {
      nombre: "",
      apellido: "",
      rut: "",
      telefono: "",
      ciudad: "",
      especialidad: "",
      doctor: "",
      dia: "",
      horario: ""
    };
  });

  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem("reservaForm", JSON.stringify(formData));
  }, [formData]);

  const formatRut = (rut) => {
    return rut
      .replace(/^0+/, "")
      .replace(/[^\dkK]/g, "")
      .replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, "$1.$2.$3-$4");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log("Formulario enviado:", formData);
      localStorage.removeItem("reservaForm");
      setFormData({
        nombre: "",
        apellido: "",
        rut: "",
        telefono: "",
        ciudad: "",
        especialidad: "",
        doctor: "",
        dia: "",
        horario: ""
      });
      setShowToast(true);
      setValidated(false);

      // ✅ Redirigir a raíz después de mostrar el toast
      setTimeout(() => {
        navigate("/");
      }, 1000); // Esperar 1 segundo
    }

    setValidated(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "rut") {
      formattedValue = formatRut(value);
    }

    if (name === "especialidad") {
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
        doctor: "",
        horario: "",
        dia: ""
      }));
    } else if (name === "doctor") {
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
        horario: "",
        dia: ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue
      }));
    }
  };

  return (
    <>
      <MenuLogin />
      <Menu />
      <Container>
        <h1>Reserva</h1>
        <h2 className="doctors-component-h2">Estás a un paso de una mejor salud</h2>
        <h3 className="doctors-component-h3">Contamos con los especialistas que tu familia necesita</h3>

        <Card className="p-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="nombre">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="apellido">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="rut">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  placeholder="Ej: 12.345.678-9"
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: +56912345678"
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="ciudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Select
                  required
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una ciudad</option>
                  {ciudades.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="especialidad">
                <Form.Label>Especialidad</Form.Label>
                <Form.Select
                  required
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una especialidad</option>
                  {Object.keys(especialidades).map((esp) => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="doctor">
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  required
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  disabled={!formData.especialidad}
                >
                  <option value="">Selecciona un doctor</option>
                  {formData.especialidad &&
                    especialidades[formData.especialidad].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Row>

            {formData.doctor && (
              <>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="dia">
                    <Form.Label>Día</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      name="dia"
                      value={formData.dia}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6" controlId="horario">
                    <Form.Label>Horario</Form.Label>
                    <Form.Select
                      required
                      name="horario"
                      value={formData.horario}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona un horario</option>
                      {horariosPorDoctor[formData.doctor]?.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Acepto los términos y condiciones"
                feedback="Debes aceptar antes de continuar."
                feedbackType="invalid"
              />
            </Form.Group>

            <Button type="submit">Enviar</Button>
          </Form>
        </Card>
      </Container>

      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Reserva Exitosa</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Tu reserva ha sido enviada correctamente.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ReservaComponent;
