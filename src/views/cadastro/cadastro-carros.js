import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Chip from '../../components/chip';

import Loading from '../../components/loading';

import { mensagemSucesso, mensagemErro } from '../../components/toastr';

import { getCarroById, createCarro, updateCarro } from '../../shared/api/carros.api';

import '../../custom.css';
import CarFormGroup from '../../components/car-form-group';
import { getCaracteristicas } from '../../shared/api/caracteristicas.api';
import { getModelos } from '../../shared/api/modelos.api';

function CadastroCarros() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [placa, setPlaca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [cor, setCor] = useState('');
    const [status, setStatus] = useState('');
    const [kmRodados, setKmRodados] = useState('');
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [url, setUrl] = useState('');

    const [opcoesCaracteristicas, setOpcoesCaracteristicas] = useState([]);
    const [opcoesModelos, setOpcoesModelos] = useState([]);

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId('');
        } else {
            setId(dados.id);
            setPlaca(dados.placa);
            setModelo(idDoModelo(dados.modelo));
            setAno(dados.ano);
            setCor(dados.cor);
            setKmRodados(dados.kmRodados);
            setStatus(dados.status);
            setCaracteristicas(dados.caracteristicas);
            setUrl(dados.url);
        }
    }

    function idDoModelo(valor) {
        if (valor && typeof valor === 'object') return valor.id;
        return valor ?? '';
    }

    async function salvar() {
        let data = {
            id,
            modelo: Number(modelo),
            cor,
            status,
            kmRodados,
            placa,
            ano,
            caracteristicas,
            url
        };
        if (idParam == null) {
            await createCarro(data)
                .then(function () {
                    mensagemSucesso(`Carro com a placa ${placa} cadastrada com sucesso!`);
                    navigate(`/listagem-carros`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await updateCarro(idParam, data)
                .then(function () {
                    mensagemSucesso(`Carro com a placa ${placa} alterado com sucesso!`);
                    navigate(`/listagem-carros`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {

        const listaCaracteristicas = await getCaracteristicas();
        setOpcoesCaracteristicas(
            listaCaracteristicas.map((c) => ({
                value: c.id,
                label: c.nome,
            }))
        );

        const listaModelos = await getModelos();
        setOpcoesModelos(
            listaModelos.map((m) => ({
                value: m.id,
                label: m.nome,
            }))
        );

        if (idParam) {
            await getCarroById(idParam).then((dado) => {
                setDados(dado);
            });
        }
        setId(dados.id);
        setPlaca(dados.placa);
        setModelo(idDoModelo(dados.modelo));
        setAno(dados.ano);
        setCor(dados.cor);
        setKmRodados(dados.kmRodados);
        setStatus(dados.status);
        setCaracteristicas(dados.caracteristicas);
        setUrl(dados.url);
    }

    useEffect(() => {
        buscar(); // eslint-disable-next-line
    }, [id]);

    if (!dados) return ( <Loading /> );
    if (!modelo) return ( <Loading /> );

    return (
        <div className='container'>
            <h1>Cadastrar Carro</h1>
            <Card className='d-flex align-items-center shadow' sx={{ display: 'flex', bgcolor: '#f2f2f7', margin: '10px' }}>
                <CardMedia
                    component="img"
                    image={`${url}`}
                    className="object-fit-contain w-50"
                />
                <Box className='w-100 bg-secondary' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='bs-component'>
                            <CarFormGroup label='Placa: *' htmlFor='inputPlaca'>
                                <input
                                    type='text'
                                    id='inputPlaca'
                                    value={placa}
                                    className='form-control rounded-4 m-1'
                                    name='placa'
                                    onChange={(e) => setPlaca(e.target.value)}
                                />
                            </CarFormGroup>
                            <CarFormGroup label='Modelo: *' htmlFor='inputModelo'>
                                <select
                                    id='inputModelo'
                                    value={modelo}
                                    className='form-select rounded-4 m-1'
                                    name='modelo'
                                    onChange={(e) => setModelo(e.target.value)}
                                >
                                    <option value=''>Selecione...</option>
                                    {opcoesModelos.map((opcao) => (
                                        <option key={opcao.value} value={opcao.value}>
                                            {opcao.label}
                                        </option>
                                    ))}
                                </select>
                            </CarFormGroup>
                            <CarFormGroup label='Ano: *' htmlFor='inputAno'>
                                <input
                                    type='number'
                                    id='inputAno'
                                    value={ano}
                                    className='form-control rounded-4 m-1'
                                    name='ano'
                                    onChange={(e) => setAno(e.target.value)}
                                />
                            </CarFormGroup>
                            <CarFormGroup label='Cor: *' htmlFor='inputCor'>
                                <input
                                    type='text'
                                    id='inputCor'
                                    value={cor}
                                    className='form-control rounded-4 m-1'
                                    name='cor'
                                    onChange={(e) => setCor(e.target.value)}
                                />
                            </CarFormGroup>
                            <CarFormGroup label='Km Rodados: *' htmlFor='inputKmRodados'>
                                <input
                                    type='number'
                                    id='inputKmRodados'
                                    value={kmRodados}
                                    className='form-control rounded-4 m-1'
                                    name='kmRodados'
                                    onChange={(e) => setKmRodados(e.target.value)}
                                />
                            </CarFormGroup>
                            <CarFormGroup label='Status: *' htmlFor='inputStatus'>
                                <select
                                    id='inputStatus'
                                    value={status}
                                    className='form-select rounded-4 m-1'
                                    name='status'
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value=''>Selecione...</option>
                                    <option value='disponível'>Disponível</option>
                                    <option value='não disponível'>Não disponível</option>
                                </select>
                            </CarFormGroup>
                            <Chip
                                name="Características"
                                options={opcoesCaracteristicas}
                                value={caracteristicas}
                                onChange={setCaracteristicas}
                            />
                            <CarFormGroup label='URL da foto: *' htmlFor='inputUrl'>
                                <input
                                    type='text'
                                    id='inputUrl'
                                    value={url}
                                    className='form-control rounded-4 m-1'
                                    name='url'
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </CarFormGroup>
                            <Stack className='mt-4' spacing={1} padding={1} direction='row'>
                                <button
                                    onClick={salvar}
                                    type='button'
                                    className='btn btn-success rounded-pill'
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={inicializar}
                                    type='button'
                                    className='btn btn-danger rounded-pill  '
                                >
                                    Cancelar
                                </button>
                            </Stack>
                        </div>
                    </CardContent>
                </Box>
            </Card>
        </div>
    );
}

export default CadastroCarros;