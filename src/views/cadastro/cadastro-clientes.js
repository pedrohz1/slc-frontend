import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import '../../custom.css';

import axios from 'axios';
import { BASE_URL } from '../../config/axios';

function CadastroClientes() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/clientes`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [numCnh, setNumCnh] = useState('');
    const [categoriaCnh, setCategoriaCnh] = useState('');
    const [validadeCnh, setValidadeCnh] = useState('');

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
        } else {
            setId(dados.id);
            setNome(dados.nome);
            setEmail(dados.email);
            setCpf(dados.cpf);
            setTelefone(dados.telefone);
            setNumCnh(dados.numCnh);
            setCategoriaCnh(dados.categoriaCnh);
            setValidadeCnh(dados.validadeCnh);
        }
    }

    async function salvar() {
        let data = {
            id,
            email,
            nome,
            cpf,
            telefone,
            numCnh,
            categoriaCnh,
            validadeCnh
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Cliente ${nome} cadastrado(a) com sucesso!`);
                    navigate(`/listagem-clientes`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await axios
                .put(`${baseURL}/${idParam}`, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Cliente ${nome} alterado(a) com sucesso!`);
                    navigate(`/listagem-clientes`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {
        await axios.get(`${baseURL}/${idParam ? idParam : ""}`).then((response) => {
            setDados(response.data);
        });
        setId(dados.id);
        setNome(dados.nome);
        setEmail(dados.email);
        setCpf(dados.cpf);
        setTelefone(dados.telefone);
        setNumCnh(dados.numeroCnh);
        setCategoriaCnh(dados.categoriaCnh);
        setValidadeCnh(dados.validadeCnh);
    }

    useEffect(() => {
        buscar(); // eslint-disable-next-line
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastrar Clientes'>
                <div className='row p-2 rounded-4'>
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
                            <FormGroup label='Email: *' htmlFor='inputEmail'>
                                <input
                                    type='email'
                                    id='inputEmail'
                                    value={email}
                                    className='form-control m-2 rounded-pill'
                                    name='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='CPF: *' htmlFor='inputCpf'>
                                <input
                                    type='text'
                                    id='inputCpf'
                                    value={cpf}
                                    className='form-control m-2 rounded-pill'
                                    name='cpf'
                                    onChange={(e) => setCpf(e.target.value)}
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
                            <FormGroup label='Número da CNH: *' htmlFor='inputNumCnh'>
                                <input
                                    type='number'
                                    id='inputNumCnh'
                                    value={numCnh}
                                    className='form-control m-2 rounded-pill'
                                    name='numCnh'
                                    onChange={(e) => setNumCnh(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Categoria da CNH: *' htmlFor='inputCategoriaCnh'>
                                <select
                                    id='inputCategoriaCnh'
                                    value={categoriaCnh}
                                    className='form-select m-2 rounded-pill'
                                    name='categoriaCnh'
                                    onChange={(e) => setCategoriaCnh(e.target.value)}
                                >
                                    <option value=''>Selecione...</option>
                                    <option key={'A'} value={'A'}>
                                        {'A'}
                                    </option>
                                    <option key={'B'} value={'B'}>
                                        {'B'}
                                    </option>
                                    <option key={'C'} value={'C'}>
                                        {'C'}
                                    </option>
                                </select>
                            </FormGroup>
                            <FormGroup label='Validade da CNH: *' htmlFor='inputValidadeCnh'>
                                <input
                                    type='date'
                                    id='inputValidadeCnh'
                                    value={validadeCnh}
                                    className='form-control m-2 rounded-pill'
                                    name='numCnh'
                                    onChange={(e) => setValidadeCnh(e.target.value)}
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

export default CadastroClientes;