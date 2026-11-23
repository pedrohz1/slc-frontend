import { api } from '../../config/axios';

const routes = ['carros', 'modelos', 'clientes', 'marcas'];

export async function searchFromAnyEntity(consulta) {
    let result = {
        carros: [],
        modelos: [],
        clientes: [],
        marcas: []
    };

    routes.map(async (route) => {
        const response = await api.get(`/${route}`);
        result[route] = response.data.filter((e) =>
            Object.values(e).some((texto) =>
                String(texto ?? '').toLowerCase().includes(consulta)
            )
        )
    })

    return result;
}