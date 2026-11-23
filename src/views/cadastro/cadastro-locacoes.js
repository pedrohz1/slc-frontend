import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import { getLocacaoById, createLocacao, updateLocacao } from '../../shared/api/locacoes.api';
import { getCarros } from '../../shared/api/carros.api';
import { getClientes } from '../../shared/api/clientes.api';

import '../../custom.css';

function CadastroLocacoes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [carro, setCarro] = useState('');
  const [usuario, setUsuario] = useState('');
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [localRetirada, setLocalRetirada] = useState('');
  const [localDevolucao, setLocalDevolucao] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [status, setStatus] = useState('em andamento');

  const [dados, setDados] = useState(null);
  const [carros, setCarros] = useState([]);
  const [clientes, setClientes] = useState([]);

  function preencher(locacao) {
    setCarro(locacao?.carro ?? '');
    setUsuario(locacao?.usuario ?? '');
    setDataRetirada(locacao?.dataRetirada ?? '');
    setDataDevolucao(locacao?.dataDevolucao ?? '');
    setLocalRetirada(locacao?.localRetirada ?? '');
    setLocalDevolucao(locacao?.localDevolucao ?? '');
    setValorDiaria(locacao?.valorDiaria ?? '');
    setStatus(locacao?.status ?? 'em andamento');
  }

  function inicializar() {
    preencher(dados);
  }

  async function salvar() {
    const data = {
      ...dados,
      carro: Number(carro),
      usuario: Number(usuario),
      dataRetirada,
      dataDevolucao,
      localRetirada,
      localDevolucao,
      valorDiaria: Number(valorDiaria),
      status,
    };

    if (idParam == null) {
      await createLocacao(data)
        .then(function () {
          mensagemSucesso(`Locação cadastrada com sucesso!`);
          navigate(`/listagem-locacoes`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data);
        });
    } else {
      await updateLocacao(idParam, data)
        .then(function () {
          mensagemSucesso(`Locação alterada com sucesso!`);
          navigate(`/listagem-locacoes`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data);
        });
    }
  }

  useEffect(() => {
    getCarros().then(setCarros).catch(() => mensagemErro('Erro ao carregar carros'));
    getClientes().then(setClientes).catch(() => mensagemErro('Erro ao carregar usuários'));
  }, []);

  useEffect(() => {
    if (!idParam) return;

    getLocacaoById(idParam)
      .then((locacao) => {
        setDados(locacao);
        preencher(locacao);
      })
      .catch(() => mensagemErro('Erro ao carregar a locação'));
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastro de Locação'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Carro: *' htmlFor='selectCarro'>
                <select
                  id='selectCarro'
                  value={carro}
                  className='form-select'
                  name='carro'
                  onChange={(e) => setCarro(e.target.value)}
                >
                  <option value=''>Selecione um carro</option>
                  {carros.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.placa}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Usuário: *' htmlFor='selectUsuario'>
                <select
                  id='selectUsuario'
                  value={usuario}
                  className='form-select'
                  name='usuario'
                  onChange={(e) => setUsuario(e.target.value)}
                >
                  <option value=''>Selecione um usuário</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Data de retirada: *' htmlFor='inputDataRetirada'>
                    <input
                      type='date'
                      id='inputDataRetirada'
                      value={dataRetirada}
                      className='form-control'
                      name='dataRetirada'
                      onChange={(e) => setDataRetirada(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Data de devolução: *' htmlFor='inputDataDevolucao'>
                    <input
                      type='date'
                      id='inputDataDevolucao'
                      value={dataDevolucao}
                      className='form-control'
                      name='dataDevolucao'
                      onChange={(e) => setDataDevolucao(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Local de retirada: *' htmlFor='inputLocalRetirada'>
                    <input
                      type='text'
                      id='inputLocalRetirada'
                      value={localRetirada}
                      className='form-control'
                      name='localRetirada'
                      onChange={(e) => setLocalRetirada(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Local de devolução: *' htmlFor='inputLocalDevolucao'>
                    <input
                      type='text'
                      id='inputLocalDevolucao'
                      value={localDevolucao}
                      className='form-control'
                      name='localDevolucao'
                      onChange={(e) => setLocalDevolucao(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Valor da diária: *' htmlFor='inputValorDiaria'>
                    <input
                      type='number'
                      id='inputValorDiaria'
                      value={valorDiaria}
                      className='form-control'
                      name='valorDiaria'
                      onChange={(e) => setValorDiaria(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Status: *' htmlFor='selectStatus'>
                    <select
                      id='selectStatus'
                      value={status}
                      className='form-select'
                      name='status'
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value='em andamento'>Em andamento</option>
                      <option value='concluída'>Concluída</option>
                    </select>
                  </FormGroup>
                </div>
              </div>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroLocacoes;
