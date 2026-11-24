import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import { getMultaById, createMulta, updateMulta } from '../../shared/api/multas.api';
import { getLocacoes } from '../../shared/api/locacoes.api';
import { getClientes } from '../../shared/api/clientes.api';
import { formatarMoeda, lerMoeda } from '../../shared/utils/moeda';

import '../../custom.css';

const TIPOS_MULTA = [
  { valor: 'Infração de trânsito', label: 'Infração' },
  { valor: 'Atraso', label: 'Atraso na locação' },
];

function extrairId(relacao) {
  const id = typeof relacao === 'object' ? relacao?.id : relacao;
  return id ?? '';
}

function CadastroMultas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const [tipoMulta, setTipoMulta] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [locacao, setLocacao] = useState('');
  const [cliente, setCliente] = useState('');

  const [dados, setDados] = useState(null);
  const [locacoes, setLocacoes] = useState([]);
  const [clientes, setClientes] = useState([]);

  function preencher(multa) {
    setTipoMulta(multa?.tipoMulta ?? '');
    setValor(multa?.valor ?? '');
    setDescricao(multa?.descricao ?? '');
    setLocacao(extrairId(multa?.locacao));
    setCliente(extrairId(multa?.cliente));
  }

  function inicializar() {
    preencher(dados);
  }

  function nomeCliente(id) {
    return clientes.find((c) => c.id === Number(id))?.nome ?? `Cliente ${id}`;
  }

  function selecionarLocacao(idLocacao) {
    setLocacao(idLocacao);

    const selecionada = locacoes.find((l) => l.id === Number(idLocacao));
    if (selecionada?.usuario) {
      setCliente(extrairId(selecionada.usuario));
    }
  }

  async function salvar() {
    const data = {
      ...dados,
      tipoMulta,
      valor: Number(valor),
      descricao,
      locacao: Number(locacao),
      cliente: Number(cliente),
    };

    if (idParam == null) {
      await createMulta(data)
        .then(function () {
          mensagemSucesso(`Multa cadastrada com sucesso!`);
          navigate(`/listagem-multas`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data);
        });
    } else {
      await updateMulta(idParam, data)
        .then(function () {
          mensagemSucesso(`Multa alterada com sucesso!`);
          navigate(`/listagem-multas`);
        })
        .catch(function (error) {
          mensagemErro(error.response?.data);
        });
    }
  }

  useEffect(() => {
    getLocacoes().then(setLocacoes).catch(() => mensagemErro('Erro ao carregar locações'));
    getClientes().then(setClientes).catch(() => mensagemErro('Erro ao carregar clientes'));
  }, []);

  useEffect(() => {
    if (!idParam) return;

    getMultaById(idParam)
      .then((multa) => {
        setDados(multa);
        preencher(multa);
      })
      .catch(() => mensagemErro('Erro ao carregar a multa'));
  }, [idParam]);

  return (
    <div className='container'>
      <Card title='Cadastro de Multa'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Tipo de multa: *' htmlFor='selectTipoMulta'>
                    <select
                      id='selectTipoMulta'
                      value={tipoMulta}
                      className='form-select m-2 rounded-pill'
                      name='tipoMulta'
                      onChange={(e) => setTipoMulta(e.target.value)}
                    >
                      <option value=''>Selecione o tipo</option>
                      {TIPOS_MULTA.map((t) => (
                        <option key={t.valor} value={t.valor}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Valor: *' htmlFor='inputValor'>
                    <input
                      type='text'
                      inputMode='numeric'
                      placeholder='R$ 0,00'
                      id='inputValor'
                      value={formatarMoeda(valor)}
                      className='form-control rounded-pill m-2'
                      name='valor'
                      onChange={(e) => setValor(lerMoeda(e.target.value))}
                    />
                  </FormGroup>
                </div>
              </div>
              <FormGroup label='Descrição: *' htmlFor='inputDescricao'>
                <textarea
                  id='inputDescricao'
                  rows={3}
                  value={descricao}
                  className='form-control rounded-3 m-2'
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Locação: *' htmlFor='selectLocacao'>
                    <select
                      id='selectLocacao'
                      value={locacao}
                      className='form-select m-2 rounded-pill'
                      name='locacao'
                      onChange={(e) => selecionarLocacao(e.target.value)}
                    >
                      <option value=''>Selecione uma locação</option>
                      {locacoes.map((l) => (
                        <option key={l.id} value={l.id}>
                          #{l.id} - {(l.usuario.nome)} ({l.dataRetirada} a {l.dataDevolucao})
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                    <select
                      id='selectCliente'
                      value={cliente}
                      className='form-select m-2 rounded-pill'
                      name='cliente'
                      onChange={(e) => setCliente(e.target.value)}
                    >
                      <option value=''>Selecione um cliente</option>
                      {clientes.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nome}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                </div>
              </div>
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

export default CadastroMultas;
