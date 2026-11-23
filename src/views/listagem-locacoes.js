import React from 'react';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import SearchBar from '../components/search-bar';
import CardLocacao from '../components/card-locacao';

const baseURL = `${BASE_URL}/locacoes`;
const carsURL = `${BASE_URL}/carros`;

function ListagemLocacoes() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-locacoes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-locacoes/${id}`);
  };

  const [dados, setDados] = React.useState([]);
  const [pesquisa, setPesquisa] = React.useState('');

  const [carros, setCarros] = React.useState([]);

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
        const resLocacoes = await axios.get(baseURL);
        const resCarros = await axios.get(carsURL);

        const listaLocacoes = resLocacoes.data || [];
        const listaCarros = resCarros.data || [];

        setCarros(listaCarros);

        const dadosCorrigidos = listaLocacoes.map((locacao) => ({
          ...locacao,
          carro: listaCarros.find((c) => c.id === locacao.carro),
        }));

        setDados(dadosCorrigidos);
      } catch (error) {
        mensagemErro('Erro ao carregar dados');
      }
    }

    carregarDados();
  }, []);


  if (!dados) return null;
  if (!carros) return null;

  return (
    <div className='container'>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        spacing={80}
        sx={{ mb: 2 }}
      >
        <SearchBar label={"Pesquisar locações"} onSearch={setPesquisa} />
      </Stack>
      {filtrarDados().map((dado) => (
        <CardLocacao car={dado.carro} client={dado.usuario} image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGdTCBZ8Vj6fLHLkS3jZ1LwRqKAHX6UcgO4Yms2aKSjA&s=10"} date={{retirada: dado.dataRetirada, devolucao: dado.dataDevolucao}} status={"Em andamento"}></CardLocacao>
      ))}
    </div>
  );
}

export default ListagemLocacoes;