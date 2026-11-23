import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootswatch/dist/lux/bootstrap.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function submit(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='container-fluid p-0'>
      <div className='row g-0 min-vh-100'>
        <div className='col-12 col-lg-6 d-flex align-items-center justify-content-center p-4 p-sm-5'>
          <div className='w-100' style={{ maxWidth: '400px' }}>
            <div className='mb-4'>
              <h1 className='h2 mb-1'>Bem vindo de volta!</h1>
              <p className='text-muted small mb-0'>Coloque suas credenciais!</p>
            </div>

            <form onSubmit={submit}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email:
                </label>
                <input
                  id='email'
                  type='email'
                  className='form-control'
                  placeholder='seuEmail@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label htmlFor='senha' className='form-label'>
                  Senha:
                </label>
                <input
                  id='senha'
                  type='password'
                  className='form-control'
                  placeholder='123'
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <button type='submit' className='btn btn-primary w-100'>
                Entrar
              </button>
            </form>
          </div>
        </div>

        <div className='col-lg-6 d-none d-lg-block p-0'>
          <img
            src='https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
            alt='Login'
            className='w-100 vh-100'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
