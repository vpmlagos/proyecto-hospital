import React from 'react';
import Menu from '../layouts/Menu.jsx';
import MenuLogin from '../layouts/MenuLogin.jsx';
import MenuInfo from '../layouts/MenuInfo.jsx';
import CarouselPrincipal from '../layouts/CarouselPrincipal.jsx';
import DoctorsComponent from '../components/DoctorsComponent.jsx';

const Home = () => {
  return (
    <div >
    <MenuLogin></MenuLogin>
     <Menu></Menu>
    <MenuInfo></MenuInfo>
    <CarouselPrincipal></CarouselPrincipal>
    <DoctorsComponent></DoctorsComponent>
    </div>
  );
};



export default Home;