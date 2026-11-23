import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroCarros() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL}/carros`;

    const [id, setId] = useState('');
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');
    const [status, setStatus] = useState('');
    const [kmRodados, setKmRodados] = useState('');
    const [caracteristicas, setCaracteristicas] = useState([]);

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
        } else {
            setId(dados.id);
            setPlaca(dados.placa);
            setModelo(dados.modelo);
            setAno(dados.ano);
            setCor(dados.cor);
            setKmRodados(dados.kmRodados);
            setStatus(dados.status);
            setCaracteristicas(dados.caracteristicas);
        }
    }

    async function salvar() {
        let data = {
            id,
            modelo,
            cor,
            status,
            kmRodados,
            placa,
            ano,
            caracteristicas
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(function (response) {
                    mensagemSucesso(`Carro com a placa ${placa} cadastrada com sucesso!`);
                    navigate(`/listagem-carros`);
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
                    mensagemSucesso(`Carro com a placa ${placa} alterado com sucesso!`);
                    navigate(`/listagem-carros`);
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
        setPlaca(dados.placa);
        setModelo(dados.modelo);
        setAno(dados.ano);
        setCor(dados.cor);
        setKmRodados(dados.kmRodados);
        setStatus(dados.status);
        setCaracteristicas(dados.caracteristicas);
    }

    useEffect(() => {
        buscar(); // eslint-disable-next-line
    }, [id]);

    if (!dados) return null;

    return (
        <div className='container'>
            <Card title='Cadastro de Carros'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className='bs-component'>
                            <FormGroup label='Placa: *' htmlFor='inputPlaca'>
                                <input
                                    type='text'
                                    id='inputPlaca'
                                    value={placa}
                                    className='form-control'
                                    name='placa'
                                    onChange={(e) => setPlaca(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Modelo: *' htmlFor='inputModelo'>
                                <input
                                    type='text'
                                    id='inputModelo'
                                    value={modelo}
                                    className='form-control'
                                    name='modelo'
                                    onChange={(e) => setModelo(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Ano: *' htmlFor='inputAno'>
                                <input
                                    type='number'
                                    id='inputAno'
                                    value={ano}
                                    className='form-control'
                                    name='ano'
                                    onChange={(e) => setAno(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Cor: *' htmlFor='inputCor'>
                                <input
                                    type='text'
                                    id='inputCor'
                                    value={cor}
                                    className='form-control'
                                    name='cor'
                                    onChange={(e) => setCor(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Km Rodados: *' htmlFor='inputKmRodados'>
                                <input
                                    type='number'
                                    id='inputKmRodados'
                                    value={kmRodados}
                                    className='form-control'
                                    name='kmRodados'
                                    onChange={(e) => setKmRodados(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label='Status: *' htmlFor='inputStatus'>
                                <select
                                    id='inputStatus'
                                    value={status}
                                    className='form-control'
                                    name='status'
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value=''>Selecione...</option>
                                    <option value='disponível'>Disponível</option>
                                    <option value='não disponível'>Não disponível</option>
                                </select>
                            </FormGroup>
                            <FormGroup label='Características: *' htmlFor='inputCaracteristicas'>
                                <input
                                    type='text'
                                    id='inputCaracteristicas'
                                    value={caracteristicas}
                                    className='form-control'
                                    name='caracteristicas'
                                    onChange={(e) => setCaracteristicas(e.target.value)}
                                />
                            </FormGroup>
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

export default CadastroCarros;