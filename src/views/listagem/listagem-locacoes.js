import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import '../../custom.css';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';
import SearchBar from '../../components/search-bar';
import CardLocacao from '../../components/card-locacao';
import AddIcon from '@mui/icons-material/Add';

import { getLocacoes } from '../../api/locacoes.api';
import { getCarros } from '../../api/carros.api';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

const baseURL = `${BASE_URL}/locacoes`;

function ListagemLocacoes() {
  const navigate = useNavigate();

  const [dados, setDados] = React.useState([]);
  const [pesquisa, setPesquisa] = React.useState('');

  const cadastrar = () => {
    navigate(`/cadastro-locacoes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-locacoes/${id}`);
  };

  const filtrarDados = () => {
    const consulta = String(pesquisa).trim().toLowerCase();
    if (!consulta) return dados;

    return dados.filter((e) => {
      const valores = [
        ...Object.values(e),
        ...(typeof e.carro === 'object' && e.carro ? Object.values(e.carro) : []),
        ...(typeof e.usuario === 'object' && e.usuario ? Object.values(e.usuario) : []),
      ];

      return valores.some((texto) =>
        String(texto ?? '').toLowerCase().includes(consulta)
      );
    });
  };

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Locação excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a locação`);
      });
  }

  React.useEffect(() => {
    async function carregarDados() {
      try {
        const listaLocacoes = (await getLocacoes()) || [];
        const listaCarros = (await getCarros()) || [];

        const dadosCorrigidos = listaLocacoes.map((locacao) => ({
          ...locacao,
          carro: listaCarros.find((c) => c.id === locacao.carro) || locacao.carro,
        }));

        setDados(dadosCorrigidos);
      } catch (error) {
        mensagemErro('Erro ao carregar dados');
      }
    }

    carregarDados();
  }, []);

  return (
    <div className='container'>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 2 }}
      >
        <SearchBar label={'Pesquisar locações'} onSearch={setPesquisa} />
      </Stack>

      {filtrarDados().map((dado) => (
        <CardLocacao
          key={dado.id}
          car={dado.carro}
          client={dado.usuario}
          image={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTED2szINWNChABYAH7j6QFIIl6m5rY4cFS-KqAYlL3JA&s=10'
          }
          date={{ retirada: dado.dataRetirada, devolucao: dado.dataDevolucao }}
          status={dado.status}
          onEdit={() => editar(dado.id)}
          onDelete={() => excluir(dado.id)}
        />
      ))}
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

export default ListagemLocacoes;
