import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const DoctorsComponent = () => {
  return (

    <Container>
        <h2 className='doctors-component-h2'>Conoce nuestros servicios</h2>
        <h3 className='doctors-component-h3'>Contamos con una amplia variedad para las distintas etapas de tu vida</h3>
        <Card>

        <Card.Body>This is some text within a card body.</Card.Body>
    </Card>
    </Container>
  )
};



export default DoctorsComponent;
