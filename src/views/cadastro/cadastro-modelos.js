import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import { getModeloById, createModelo, updateModelo } from '../../shared/api/modelos.api';
import { getMarcas } from '../../shared/api/marcas.api';
import { getCategorias } from '../../shared/api/categorias.api';

import '../../custom.css';

function idDe(valor) {
  if (valor && typeof valor === 'object') return valor.id;
  return valor ?? '';
}

function CadastroModelos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');

  const [listaMarcas, setListaMarcas] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);

  const [dados, setDados] = useState([]);

  function preencher(dado) {
    setId(dado.id);
    setNome(dado.nome);
    setMarca(idDe(dado.marca));
    setCategoria(idDe(dado.categorias?.[0]));
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setMarca('');
      setCategoria('');
    } else {
      preencher(dados);
    }
  }

  async function salvar() {
    const marcaSelecionada = listaMarcas.find((m) => String(m.id) === String(marca));
    const categoriaSelecionada = listaCategorias.find(
      (c) => String(c.id) === String(categoria)
    );

    let data = {
      id,
      nome,
      marca: marcaSelecionada,
      categorias: categoriaSelecionada ? [categoriaSelecionada] : [],
    };
    if (idParam == null) {
      await createModelo(data)
        .then(function () {
          mensagemSucesso(`Modelo ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-modelos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await updateModelo(idParam, data)
        .then(function () {
          mensagemSucesso(`Modelo ${nome} alterado com sucesso!`);
          navigate(`/listagem-modelos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    setListaMarcas(await getMarcas());
    setListaCategorias(await getCategorias());

    if (idParam) {
      const dado = await getModeloById(idParam);
      setDados(dado);
      preencher(dado);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastrar Modelo'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control m-2 rounded-pill'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Marca: *' htmlFor='inputMarca'>
                <select
                  id='inputMarca'
                  value={marca}
                  className='form-select m-2 rounded-pill'
                  name='marca'
                  onChange={(e) => setMarca(e.target.value)}
                >
                  <option value=''>Selecione...</option>
                  {listaMarcas.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Categoria: *' htmlFor='inputCategoria'>
                <select
                  id='inputCategoria'
                  value={categoria}
                  className='form-select m-2 rounded-pill'
                  name='categoria'
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value=''>Selecione...</option>
                  {listaCategorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row-reverse'>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger rounded-pill m-2'
                >
                  Cancelar
                </button>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success rounded-pill m-2'
                >
                  Salvar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroModelos;
