import React from 'react';
import Menu from '../layouts/Menu.jsx';
import MenuLogin from '../layouts/MenuLogin.jsx';
import CarouselPrincipal from '../layouts/CarouselPrincipal.jsx';

const Home = () => {
  return (
    <div >
    <MenuLogin></MenuLogin>
     <Menu></Menu>
    <CarouselPrincipal></CarouselPrincipal>
    <h1>ESTA ES LA PÁGINA DEL CLIENTE</h1>
    </div>
  );
};



export default Home;