import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import { getCategoriaById, createCategoria, updateCategoria } from '../../shared/api/categorias.api';

import '../../custom.css';

function CadastroCategorias() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setValorDiaria(dados.valorDiaria ?? '');
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      valorDiaria: Number(valorDiaria),
    };
    if (idParam == null) {
      await createCategoria(data)
        .then(function () {
          mensagemSucesso(`Marca ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-marcas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await updateCategoria(idParam, data)
        .then(function () {
          mensagemSucesso(`Marca ${nome} alterada com sucesso!`);
          navigate(`/listagem-marcas`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam) {
      await getCategoriaById(idParam).then((dado) => {
        setDados(dado);
      });
    }
    setId(dados.id);
    setNome(dados.nome)
    setValorDiaria(dados.valorDiaria ?? '');
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Categoria'>
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
              <FormGroup label='Valor da diária: *' htmlFor='inputValorDiaria'>
                <input
                  type='number'
                  id='inputValorDiaria'
                  value={valorDiaria}
                  min='0'
                  step='0.01'
                  className='form-control m-2 rounded-pill'
                  name='valorDiaria'
                  onChange={(e) => setValorDiaria(e.target.value)}
                />
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

export default CadastroCategorias;