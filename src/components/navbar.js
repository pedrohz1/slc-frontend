import React, { useState } from 'react';
import 'bootswatch/dist/lux/bootstrap.css';

import {
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import NavbarItem from './navbarItem';

function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          SLC
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                endIcon={<ArrowDropDownIcon />}
                aria-controls={open ? 'carros-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpen}
                sx={{
                  color: 'white',
                  '& .MuiButton-endIcon': {
                    transition: 'transform 0.2s ease-in-out',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                  },
                }}
              >
                Carros
              </Button>

              <Menu
                id="carros-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    sx: {
                      backgroundColor: '#1e1e1e',
                      color: '#ffffff',
                      borderRadius: '12px'
                    },
                  },
                }}
              >
                <MenuItem
                  component="a"
                  href="/listagem-usuarios"
                  onClick={handleClose}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Usuários
                </MenuItem>

                <MenuItem
                  component="a"
                  href="/listagem-modelos"
                  onClick={handleClose}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Modelos
                </MenuItem>

                <MenuItem
                  component="a"
                  href="/listagem-marcas"
                  onClick={handleClose}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Marcas
                </MenuItem>

                <MenuItem
                  component="a"
                  href="/listagem-categorias"
                  onClick={handleClose}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Categorias
                </MenuItem>

                <MenuItem
                  component="a"
                  href="/listagem-caracteristicas"
                  onClick={handleClose}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  Características
                </MenuItem>
              </Menu>
            </Box>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;