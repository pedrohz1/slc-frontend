import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';
import { getLocalById, createLocal, updateLocal } from '../../shared/api/locais.api';

const ESTADOS = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins'
];

function CadastroLocais() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [dados, setDados] = useState([]);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [logradouro, setLogradouro    ] = useState('');
    const [num, setNum] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [telefone, setTelefone] = useState('');

    function inicializar() {
        if (idParam == null) {
            setId('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setCidade(dados.cidade);
            setEstado(dados.estado);
            setLogradouro(dados.logradouro);
            setNum(dados.num);
            setBairro(dados.bairro);
            setCep(dados.cep);
            setTelefone(dados.telefone);
        }
    }

    async function salvar() {
        let data = {
            id,
            nome,
            cidade,
            estado,
            logradouro,
            num,
            bairro,
            cep,
            telefone
        };
        if (idParam == null) {
            await createLocal(data)
                .then(function () {
                    mensagemSucesso(`Local ${nome} cadastrado com sucesso!`);
                    navigate(`/listagem-locais`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await updateLocal(idParam, data)
                .then(function () {
                    mensagemSucesso(`Local ${nome} alterado com sucesso!`);
                    navigate(`/listagem-locais`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {
        if (idParam) {
            await getLocalById(idParam).then((dado) => {
                setDados(dado);
            });
        }
        setId(dados.id);
            setNome(dados.nome);
            setCidade(dados.cidade);
            setEstado(dados.estado);
            setLogradouro(dados.logradouro);
            setNum(dados.num);
            setBairro(dados.bairro);
            setCep(dados.cep);
            setTelefone(dados.telefone);
    }

    useEffect(() => {
        buscar(); // eslint-disable-next-line
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastrar Local'>
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
                            <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                                <input
                                    type='text'
                                    id='inputCidade'
                                    value={cidade}
                                    className='form-control m-2 rounded-pill'
                                    name='cidade'
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Estado: *' htmlFor='selectEstado'>
                                <select
                                    id='selectEstado'
                                    value={estado}
                                    className='form-select m-2 rounded-pill'
                                    name='tipoEstado'
                                    onChange={(e) => setEstado(e.target.value)}
                                >
                                    <option value=''>Selecione o estado</option>
                                    {ESTADOS.map((estado) => (
                                        <option key={estado} value={estado}>
                                            {estado}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                            <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                                <input
                                    type='text'
                                    id='inputLogradouro'
                                    value={logradouro}
                                    className='form-control m-2 rounded-pill'
                                    name='logradouro'
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Número: *' htmlFor='inputNumero'>
                                <input
                                    type='number'
                                    id='inputNumero'
                                    value={num}
                                    className='form-control m-2 rounded-pill'
                                    name='numero'
                                    onChange={(e) => setNum(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                                <input
                                    type='text'
                                    id='inputBairro'
                                    value={bairro}
                                    className='form-control m-2 rounded-pill'
                                    name='bairro'
                                    onChange={(e) => setBairro(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='CEP: *' htmlFor='inputCep'>
                                <input
                                    type='text'
                                    id='inputCep'
                                    value={cep}
                                    className='form-control m-2 rounded-pill'
                                    name='cep'
                                    onChange={(e) => setCep(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                                <input
                                    type='text'
                                    id='inputTelefone'
                                    value={telefone}
                                    className='form-control m-2 rounded-pill'
                                    name='telefone'
                                    onChange={(e) => setTelefone(e.target.value)}
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

export default CadastroLocais;