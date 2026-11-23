import React from 'react';
import 'bootswatch/dist/lux/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput ] = useState("");

  const searchSubmit = (e) => {
    e.preventDefault();

    if(!searchInput) {
      return;
    }

    return navigate(`/search/${searchInput}`);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">SLCars</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Carros</a>
              <div className="dropdown-menu rounded">
                <a className="dropdown-item" href="/listagem-carros">Carros</a>
                <a className="dropdown-item" href="/listagem-modelos">Modelos</a>
                <a className="dropdown-item" href="/listagem-marcas">Marcas</a>
                <a className="dropdown-item" href="/listagem-categorias">Categorias</a>
                <a className="dropdown-item" href="/listagem-caracteristicas">Características</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Clientes</a>
              <div className="dropdown-menu rounded">
                <a className="dropdown-item" href="/listagem-clientes">Clientes</a>
                <a className="dropdown-item" href="/listagem-locacoes">Locações</a>
                <a className="dropdown-item" href="/listagem-multas">Multas</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sistema</a>
              <div className="dropdown-menu rounded">
                <a className="dropdown-item" href="/listagem-locais">Locais</a>
                <a className="dropdown-item" href="/dashboard">Dashboard</a>
              </div>
            </li>
          </ul>
          <form className="d-flex" onSubmit={searchSubmit}>
            <div className="position-relative me-sm-2">
              <input
                className="form-control rounded-pill pe-5"
                style={{ width: "600px" }}
                type="search"
                placeholder="Pesquise carros, clientes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-secondary"
                aria-label="Pesquisar"
              >
                <SearchIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;