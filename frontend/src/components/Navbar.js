import React from 'react';
import './Navbar.css';

const Navbar = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="navbar">
            <h1>Gimnasio App</h1>
            <ul>
                <li><button onClick={() => scrollToSection('clientes')}>Clientes</button></li>
                <li><button onClick={() => scrollToSection('ingresos')}>Ingresos</button></li>
                <li><button onClick={() => scrollToSection('egresos')}>Egresos</button></li>
                <li><button onClick={() => scrollToSection('informes')}>Informes</button></li>
            </ul>
        </nav>
    );
};

export default Navbar;