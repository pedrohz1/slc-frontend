import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Card from "../components/card";
import { mensagemErro } from "../components/toastr";

import { getCarros } from "../shared/api/carros.api";
import { getModelos } from "../shared/api/modelos.api";
import { getMarcas } from "../shared/api/marcas.api";
import { getCategorias } from "../shared/api/categorias.api";
import { getCaracteristicas } from "../shared/api/caracteristicas.api";
import { getClientes } from "../shared/api/clientes.api";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function SearchResults() {
    const { idParam } = useParams();
    const navigate = useNavigate();

    const [ carros, setCarros ] = useState([]);
    const [ modelos, setModelos ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ categorias, setCategorias ] = useState([]);
    const [ caracteristicas, setCaracteristicas ] = useState([]);
    const [ clients, setClients] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        async function carregarDados() {
            setIsLoading(true);

            try {
                const [
                    listaCarros,
                    listaModelos,
                    listaMarcas,
                    listaCategorias,
                    listaCaracteristicas,
                    listaClientes,
                ] = await Promise.all([
                    getCarros(),
                    getModelos(),
                    getMarcas(),
                    getCategorias(),
                    getCaracteristicas(),
                    getClientes(),
                ]);

                setCarros(listaCarros);
                setModelos(listaModelos);
                setMarcas(listaMarcas);
                setCategorias(listaCategorias);
                setCaracteristicas(listaCaracteristicas);
                setClients(listaClientes);
            } catch {
                mensagemErro("Erro ao carregar os dados da pesquisa");
            } finally {
                setIsLoading(false);
            }
        }

        carregarDados();
    }, []);

    function filtrar(lista) {
        const termo = String(idParam ?? "").trim().toLowerCase();

        if (!termo) return lista;

        return lista.filter((item) =>
            Object.values(item).some((valor) =>
                String(valor ?? "").toLowerCase().includes(termo)
            )
        );
    }

    function nomePorId(lista, id) {
        return lista.find((item) => item.id === id)?.nome ?? id;
    }

    const grupos = [
        {
            titulo: "Carros",
            itens: filtrar(carros),
            rota: "/cadastro-carros",
            colunas: [
                { label: "Placa", valor: (c) => c.placa },
                { label: "Modelo", valor: (c) => nomePorId(modelos, c.modelo.nome) },
                { label: "Cor", valor: (c) => c.cor },
                { label: "Ano", valor: (c) => c.ano },
                { label: "Km", valor: (c) => c.kmRodados },
                { label: "Status", valor: (c) => c.status },
            ],
        },
        {
            titulo: "Modelos",
            itens: filtrar(modelos),
            rota: "/cadastro-modelos",
            colunas: [
                { label: "Nome", valor: (m) => m.nome },
                { label: "Marca", valor: (m) => nomePorId(marcas, m.marca.nome) },
            ],
        },
        {
            titulo: "Marcas",
            itens: filtrar(marcas),
            rota: "/cadastro-marcas",
            colunas: [{ label: "Nome", valor: (m) => m.nome }],
        },
        {
            titulo: "Categorias",
            itens: filtrar(categorias),
            rota: "/cadastro-categorias",
            colunas: [{ label: "Nome", valor: (c) => c.nome }],
        },
        {
            titulo: "Características",
            itens: filtrar(caracteristicas),
            rota: "/cadastro-caracteristicas",
            colunas: [{ label: "Nome", valor: (c) => c.nome }],
        },
        {
            titulo: "Clientes",
            itens: filtrar(clients),
            rota: "/cadastro-clientes",
            colunas: [
                { label: "Nome", valor: (c) => c.nome },
                { label: "Email", valor: (c) => c.email },
                { label: "CPF", valor: (c) => c.cpf },
                { label: "Telefone", valor: (c) => c.telefone },
            ],
        },
    ];

    const total = grupos.reduce((soma, grupo) => soma + grupo.itens.length, 0);

    return (
        <div className="container">
            <Card title={`Resultados para "${idParam}"`}>
                {isLoading && <p className="text-muted mb-0">Carregando...</p>}

                {!isLoading && total === 0 && (
                    <p className="text-muted mb-0">Nenhum resultado encontrado.</p>
                )}

                {!isLoading && grupos.filter((grupo) => grupo.itens.length > 0).map((grupo) => (
                    <div key={grupo.titulo} className="mb-4">
                        <h5 className="mb-2">
                            {grupo.titulo} <span className="badge bg-primary">{grupo.itens.length}</span>
                        </h5>
                        <div className="table-responsive">
                            <table className="table table-sm table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        {grupo.colunas.map((coluna) => (
                                            <th key={coluna.label} scope="col">{coluna.label}</th>
                                        ))}
                                        <th scope="col" className="text-end">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grupo.itens.map((item) => (
                                        <tr key={item.id}>
                                            {grupo.colunas.map((coluna) => (
                                                <td key={coluna.label}>{coluna.valor(item)}</td>
                                            ))}
                                            <td className="text-end">
                                                <IconButton
                                                    aria-label='edit'
                                                    onClick={() => navigate(`${grupo.rota}/${item.id}`)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default SearchResults;
