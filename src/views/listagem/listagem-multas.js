import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import Card from '../../components/card';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';
import SearchBar from '../../components/search-bar';

import { getMultas, deleteMulta } from '../../shared/api/multas.api';

import '../../custom.css';

function ListagemMultas() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-multas`);
  };

  const editar = (id) => {
    navigate(`/cadastro-multas/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [pesquisa, setPesquisa] = React.useState('');

  const filtrarDados = () => {
    const consulta = String(pesquisa).trim().toLowerCase();

    if (!consulta) return dados;

    return dados.filter((e) =>
      Object.values(e).some((texto) =>
        String(texto ?? '').toLowerCase().includes(consulta)
      )
    )
  }

  async function excluir(id) {
    await deleteMulta(id)
      .then(function () {
        mensagemSucesso(`Multa excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a multa`);
      });
  }

  React.useEffect(() => {
    getMultas().then((lista) => {
      setDados(lista);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Multas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={80}
                sx={{ mb: 2 }}
              >
                <SearchBar label={"Pesquisar multas"} onSearch={setPesquisa} />
              </Stack>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Descrição</th>
                    <th scope='col'>Locação</th>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarDados().map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.tipoMulta}</td>
                      <td>R${dado.valor}</td>
                      <td>{dado.descricao}</td>
                      <td>{dado.locacao}</td>
                      <td>{dado.cliente}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
      <button
        type='button'
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow p-0 d-flex align-items-center justify-content-center"
        style={{ width: '75px', height: '75px', aspectRatio: '1 / 1', }}
        onClick={() => cadastrar()}
      >
        <AddIcon style={{ fontSize: '36px' }} />
      </button>
    </div>
  );
}

export default ListagemMultas;