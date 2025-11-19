import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Link, Stack, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Logo } from 'src/components/logo';
import { useAuth } from 'src/contexts/auth-context';

const TOP_NAV_HEIGHT = 64;

export const TopNav = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate('/login');
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: 'neutral.900',
        color: 'common.white',
        position: 'fixed',
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 3
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={3}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24
            }}
          >
            <Logo />
          </Box>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Box
            sx={{
              color: 'inherit',
              fontSize: '0.875rem'
            }}
          >
            {user?.email}
          </Box>
          <Avatar
            onClick={handleAvatarClick}
            src="/assets/avatars/usuario.jpg"
            variant="rounded"
            sx={{
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem disabled>
              {user?.email}
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
              Configuración
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Cerrar Sesión
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};
