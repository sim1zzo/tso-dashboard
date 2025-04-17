// src/components/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div>
      <h2>Accesso non autorizzato</h2>
      <p>Non hai i permessi necessari per accedere a questa pagina.</p>
      <Link to='/'>Torna alla home</Link>
    </div>
  );
};

export default Unauthorized;
