import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function CardLocacao({ car, client, image, status, date }) {
    return (
        <Card sx={{ display: 'flex', bgcolor: '#f2f2f7', borderRadius: '10px', margin: '10px' }}>
            <CardMedia
                component="img"
                sx={{ width: 151, objectFit: 'contain' }}
                image={image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <h3 component="div" variant="h5">
                        {car.modelo + " - " + car.ano}
                    </h3>
                    <div
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Alugado por {client}
                    </div>
                    <div
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Status: {status}
                    </div>
                    <div
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Retirado em: {date.retirada}
                    </div>
                    <div
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Devolvido em: {date.devolucao}
                    </div>
                </CardContent>
            </Box>
        </Card>
    );
}
