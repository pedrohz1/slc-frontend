import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { PenIcon } from 'lucide-react';

export default function CardLocacao({ car, client, image, status, date, link }) {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#f2f2f7',
                borderRadius: '10px',
                margin: '10px',
                paddingRight: 2
            }}
        >
            <CardMedia
                component="img"
                sx={{ width: 151, objectFit: 'contain' }}
                image={image}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <h3>
                        {`${car.modelo} - ${car.placa} - ${car.ano}`}
                    </h3>
                    <Box sx={{ color: 'text.secondary' }}>
                        Alugado por {client}
                    </Box>
                    <Box sx={{ color: 'text.secondary' }}>
                        Status: {status}
                    </Box>
                    <Box sx={{ color: 'text.secondary' }}>
                        Retirado em: {date.retirada}
                    </Box>
                    <Box sx={{ color: 'text.secondary' }}>
                        Devolvido em: {date.devolucao}
                    </Box>
                </CardContent>
            </Box>

            <IconButton
                onClick={link}
                aria-label="Editar locação"
                sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.08)',
                        color: 'primary.main',
                        transform: 'scale(1.1)',
                    }
                }}
            >
                <PenIcon size={20} />
            </IconButton>
        </Card>
    );
}
