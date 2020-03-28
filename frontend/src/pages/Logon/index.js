import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try{
      const response = await api.post('/sessions', { id });

      if(response.data.auth) {

        alert(`Bem-vinda ${response.data.ong.name}`);
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.ong.name);
        localStorage.setItem('@Hero-token', response.data.token);

  
        history.push('/profile');
      } else {
        alert('Erro no logon (auth)');
      }
    } catch {
      alert(`Erro no logon`);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Logo Be the Hero"/>

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input 
            placeholder="Sua ID" 
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" onClick={handleLogon}>Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={18} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
