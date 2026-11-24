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

import { getClientes, deleteCliente } from '../../shared/api/clientes.api';

import '../../custom.css';

function ListagemClientes() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-clientes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-clientes/${id}`);
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
    await deleteCliente(id)
      .then(function () {
        mensagemSucesso(`Usuário excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o modelo`);
      });
  }

  React.useEffect(() => {
    getClientes().then((lista) => {
      setDados(lista);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Clientes '>
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
                <SearchBar label={"Pesquisar clientes"} onSearch={setPesquisa} />
              </Stack>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Telefone</th>
                    <th scope='col'>Número da CNH</th>
                    <th scope='col'>Categoria da CNH</th>
                    <th scope='col'>Validade da CNH</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarDados().map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.email}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.telefone}</td>
                      <td>{dado.numeroCnh}</td>
                      <td>{dado.categoriaCnh}</td>
                      <td>{dado.validadeCnh}</td>
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

export default ListagemClientes;