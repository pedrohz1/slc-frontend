import CadastroMarcas from '../../views/cadastro/cadastro-marcas';
import CadastroModelos from '../../views/cadastro/cadastro-modelos';
import CadastroCategorias from '../../views/cadastro/cadastro-categorias';
import CadastroCaracteristicas from '../../views/cadastro/cadastro-caracteristicas';
import CadastroCarros from '../../views/cadastro/cadastro-carros';
import CadastroClientes from '../../views/cadastro/cadastro-clientes';
import CadastroLocacoes from '../../views/cadastro/cadastro-locacoes';
import CadastroMultas from '../../views/cadastro/cadastro-multas';
import CadastroLocais from '../../views/cadastro/cadastro-locais';
import ListagemMarcas from '../../views/listagem/listagem-marcas';
import ListagemModelos from '../../views/listagem/listagem-modelos';
import ListagemCategorias from '../../views/listagem/listagem-categorias';
import ListagemCarros from '../../views/listagem/listagem-carros';
import ListagemCaracteristicas from '../../views/listagem/listagem-caracteristicas';
import ListagemLocacoes from '../../views/listagem/listagem-locacoes';
import ListagemClientes from '../../views/listagem/listagem-clientes';
import ListagemMultas from '../../views/listagem/listagem-multas';
import ListagemLocais from '../../views/listagem/listagem-locais';
import Login from '../../views/login';
import Homepage from '../../views/homepage';
import Layout from '../../components/layout';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />

                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />

                    <Route path='/cadastro-marcas/:idParam?' element={<CadastroMarcas />} />
                    <Route path='/cadastro-modelos/:idParam?' element={<CadastroModelos />} />
                    <Route path='/cadastro-categorias/:idParam?' element={<CadastroCategorias />} />
                    <Route path='/cadastro-caracteristicas/:idParam?' element={<CadastroCaracteristicas />} />
                    <Route path='/cadastro-carros/:idParam?' element={<CadastroCarros />} />
                    <Route path='/cadastro-clientes/:idParam?' element={<CadastroClientes />} />
                    <Route path='/cadastro-locacoes/:idParam?' element={<CadastroLocacoes />} />
                    <Route path='/cadastro-locais/:idParam?' element={<CadastroLocais />} />
                    <Route path='/cadastro-multas/:idParam?' element={<CadastroMultas />} />
                    <Route path='/listagem-marcas' element={<ListagemMarcas />} />
                    <Route path='/listagem-modelos' element={<ListagemModelos />} />
                    <Route path='/listagem-categorias' element={<ListagemCategorias />} />
                    <Route path='/listagem-carros' element={<ListagemCarros />} />
                    <Route path='/listagem-caracteristicas' element={<ListagemCaracteristicas />} />
                    <Route path='/listagem-locacoes' element={<ListagemLocacoes />} />
                    <Route path='/listagem-clientes' element={<ListagemClientes />} />
                    <Route path='/listagem-multas' element={<ListagemMultas />} />
                    <Route path='/listagem-locais' element={<ListagemLocais />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}   

export default Rotas;