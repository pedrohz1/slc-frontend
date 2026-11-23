import CadastroMarcas from '../../views/cadstro/cadastro-marcas';
import CadastroModelos from '../../views/cadstro/cadastro-modelos';
import CadastroCategorias from '../../views/cadstro/cadastro-categorias';
import CadastroCaracteristicas from '../../views/cadstro/cadastro-caracteristicas';
import CadastroCarros from '../../views/cadstro/cadastro-carros';
import ListagemMarcas from '../../views/listagem/listagem-marcas';
import ListagemModelos from '../../views/listagem/listagem-modelos';
import ListagemCategorias from '../../views/listagem/listagem-categorias';
import ListagemCarros from '../../views/listagem/listagem-carros';
import ListagemCaracteristicas from '../../views/listagem/listagem-caracteristicas';
import ListagemLocacoes from '../../views/listagem/listagem-locacoes';
import ListagemClientes from '../../views/listagem/listagem-clientes';
import Login from '../../views/login';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/cadastro-marcas/:idParam?' element={<CadastroMarcas />} />
                <Route path='/cadastro-modelos/:idParam?' element={<CadastroModelos />} />
                <Route path='/cadastro-categorias/:idParam?' element={<CadastroCategorias />} />
                <Route path='/cadastro-caracteristicas/:idParam?' element={<CadastroCaracteristicas />} />
                <Route path='/cadastro-carros/:idParam?' element={<CadastroCarros />} />
                <Route path='/listagem-marcas' element={<ListagemMarcas />} />
                <Route path='/listagem-modelos' element={<ListagemModelos />} />
                <Route path='/listagem-categorias' element={<ListagemCategorias />} />
                <Route path='/listagem-carros' element={<ListagemCarros />} />
                <Route path='/listagem-caracteristicas' element={<ListagemCaracteristicas />} />
                <Route path='/listagem-locacoes' element={<ListagemLocacoes />} />
                <Route path='/listagem-clientes' element={<ListagemClientes />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}   

export default Rotas;