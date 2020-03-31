import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';


import logo from '../../assets/logo.svg';

import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const token = localStorage.getItem('@Hero-token');

  useEffect(() => {
    async function verifyAuthentication() {
      const response = await api.get('token', {
        headers: {
          'Authorization': ongId,
          'x-access-token': token
        }

      })
      if (response.data.auth === false) history.push('/');
    }

    verifyAuthentication();
  }, [ongId, token, history])

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title, 
      description,
      value
    }

    try{
      await api.post('incidents', data, {
        headers: {
          'Authorization': ongId,
          'x-access-token': token
        }
      });

      history.push('/profile');

    } catch(e) {
      alert('Erro ao criar o novo caso. Tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo Be the Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size="18" color="#E02041"/>
            Voltar para home
          </Link>
        </section>

        <form>
          <input 
            placeholder="Título do caso" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <input 
            placeholder="Valor em reais" 
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          
          <button className="button" type="submit" onClick={handleNewIncident}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}