import React from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import Loading from '../../components/loading';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';
import SearchBar from '../../components/search-bar';
import CardLocacao from '../../components/card-locacao';

import { getLocacoes, deleteLocacao } from '../../shared/api/locacoes.api';
import { getCarros } from '../../shared/api/carros.api';
import { getClientes } from '../../shared/api/clientes.api';
import { getModelos } from '../../shared/api/modelos.api';

import '../../custom.css';

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
    await deleteLocacao(id)
      .then(function () {
        mensagemSucesso(`Locação excluída com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a locação`);
      });
  }

  React.useEffect(() => {
    async function carregarDados() {
      try {
        const [listaLocacoes, listaCarros, listaClientes, listaModelos] = await Promise.all([
          getLocacoes(),
          getCarros(),
          getClientes(),
          getModelos(),
        ]);

        const dadosCorrigidos = (listaLocacoes || []).map((locacao) => {
          const carroId = typeof locacao.carro === 'object' ? locacao.carro?.id : locacao.carro;
          const carroEncontrado = (listaCarros || []).find((c) => c.id === carroId) || locacao.carro;

          const modeloId = typeof carroEncontrado?.modelo === 'object' ? carroEncontrado.modelo?.id : carroEncontrado?.modelo;
          const modeloEncontrado = (listaModelos || []).find((m) => m.id === modeloId);

          const usuarioId = typeof locacao.usuario === 'object' ? locacao.usuario?.id : locacao.usuario;
          const clienteEncontrado = (listaClientes || []).find((u) => u.id === usuarioId) || locacao.usuario;

          return {
            ...locacao,
            carro: carroEncontrado
              ? {
                ...carroEncontrado,
                modelo: modeloEncontrado?.nome || carroEncontrado.modelo,
              }
              : locacao.carro,
            usuario: clienteEncontrado,
          };
        });

        setDados(dadosCorrigidos);
      } catch (error) {
        mensagemErro('Erro ao carregar dados');
      }
    }

    carregarDados();
  }, []);

  if (!dados) return (<Loading />);

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
          client={dado.usuario.nome}
          image={
            dado.carro?.url
          }
          date={{ retirada: dado.dataRetirada, devolucao: dado.dataDevolucao }}
          status={dado.status}
          link={() => editar(dado.id)}
          onDelete={() => excluir(dado.id)}
        />
      ))}
      <button
        type='button'
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow p-0 d-flex align-items-center justify-content-center"
        style={{ width: '75px', height: '75px', aspectRatio: '1 / 1' }}
        onClick={() => cadastrar()}
      >
        <AddIcon style={{ fontSize: '36px' }} />
      </button>
    </div>
  );
}

export default ListagemLocacoes;
