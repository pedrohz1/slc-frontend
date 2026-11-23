import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CardLocacao({ car, client, image, status, date }) {
    return (
        <Card sx={{ display: 'flex', bgcolor: '#f2f2f7', borderRadius: '10px', margin: '10px' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>

                    <Typography component="div" variant="h5">
                        {car.modelo + " - " + car.ano}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Alugado por {client}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Status: {status}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Retirado em: {date.retirada}
                    </Typography>
                     <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                    >
                        Devolvido em: {date.devolucao}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
}
