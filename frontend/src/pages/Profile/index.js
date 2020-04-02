import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiLoader } from 'react-icons/fi';
import { AuthContext } from '../../App';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { dispatch } = React.useContext(AuthContext);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const token = localStorage.getItem('@Hero-token');

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get('/profile', {
          headers: {
            'Authorization': ongId,
            'x-access-token': token
          }
        });
  
        setIncidents(response.data.incidents);
        setLoading(false);
      } catch(e) {
        history.push('/');
      }
    }
    
    loadProfile();
  }, [ongId, token, history]);


  
  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers: {
          'Authorization': ongId,
          'x-access-token': token
        }
      });

    setIncidents(incidents.filter(incident => incident.id !== id))
    } catch(e) {
      alert(`Erro ao deletar o caso`);
    }
  } 

  function handleLogOut() {
    dispatch({
      type: 'LOGOUT'
    });

    history.push('/');
  }

  function Content() {
    
    if (loading) return (
      <div id="loader">
        <FiLoader size={48} color="#c0c0c4"/>
      </div>
    )

    if (incidents.length === 0) return (
      <h2>Nenhum caso cadastrado. <Link to="incidents/new">Crie um</Link> para começar!</h2>
    )

    return (
      <ul>
        {
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇAO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} />
              </button>
            </li>
          ))
        }
      </ul>

    )
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Logo Be the Hero"/>
        <span>{`Bem vinda, ${ongName}`}</span>

        <Link className="button" to="/incidents/new" >Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogOut}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <Content />
      
    </div>
  );
}
