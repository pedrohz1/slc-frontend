import CarRentalIcon from '@mui/icons-material/CarRental';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import '../custom.css';
import { useNavigate } from 'react-router-dom';

const BANNER_URL =
  'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=1600&auto=format&fit=crop';

const ACOES = [
  { titulo: 'Nova locação', descricao: 'Alugar um carro', icone: CarRentalIcon, cor: 'primary', rota: '/cadastro-locacoes' },
  { titulo: 'Novo cliente', descricao: 'Cadastrar cliente', icone: PersonAddIcon, cor: 'info', rota: '/cadastro-clientes' },
  { titulo: 'Registrar multa', descricao: 'Infração ou atraso', icone: ReportProblemIcon, cor: 'danger', rota: '/cadastro-multas' },
  { titulo: 'Finalizar locação', descricao: 'Alterar status de devolução', icone: EventAvailableIcon, cor: 'success', rota: '/listagem-locacoes' },
  { titulo: 'Ver ganhos', descricao: 'Resumo financeiro', icone: AttachMoneyIcon, cor: 'warning', rota: '/dashboard' },
];

function Homepage() {
  const navigate = useNavigate();  

  return (
    <div className='container pb-5'>
      <div
        className='position-relative overflow-hidden rounded-3 shadow mb-5'
        style={{ height: '320px' }}
      >
        <img
          src={BANNER_URL}
          alt='Banner'
          className='w-100 h-100'
          style={{ objectFit: 'cover' }}
        />
        <div
          className='position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4 p-md-5'
          style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.05))' }}
        >
          <h1 className='display-5 text-white mb-2'>SLCars</h1>
          <p className='lead text-white-50 mb-0'>O que você quer fazer hoje?</p>
        </div>
      </div>

      <h2 className='h5 text-muted mb-3'>Ações rápidas</h2>

      <div className='row g-3'>
        {ACOES.map(({ titulo, descricao, icone: Icone, cor, rota }) => (
          <div key={titulo} className='col-12 col-sm-6 col-lg'>
            <button
              type='button'
              className={`btn btn-${cor} w-100 h-100 py-4 d-flex flex-column align-items-center justify-content-center gap-2 rounded-3 shadow-sm`}
              onClick={() => navigate(`${rota}`)}
            >
              <Icone style={{ fontSize: 40 }} />
              <span className='fw-bold'>{titulo}</span>
              <small className='opacity-75'>{descricao}</small>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
