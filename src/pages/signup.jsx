import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from 'src/contexts/auth-context';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    const result = await signup(email, password);

    if (result.success) {
      setSuccessMessage(
        'Registro exitoso. Verifica tu email para confirmar tu cuenta.'
      );
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setLocalError(result.error || 'Error al registrarse');
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrarse | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={3}
            sx={{
              borderRadius: 2,
            }}
          >
            <CardContent
              sx={{
                p: 4,
              }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Crear Cuenta
                </Typography>
                <Typography
                  color="textSecondary"
                  sx={{ mt: 1 }}
                >
                  Regístrate para acceder al dashboard
                </Typography>
              </Box>

              {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {successMessage}
                </Alert>
              )}

              {localError || authError ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {localError || authError}
                </Alert>
              ) : null}

              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!!errors.email}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <FormHelperText error>{errors.email}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label="Contraseña"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={!!errors.password}
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <FormHelperText error>{errors.password}</FormHelperText>
                    )}
                  </FormControl>

                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      label="Confirmar Contraseña"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={!!errors.confirmPassword}
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <FormHelperText error>
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ py: 1.5 }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Registrarse'
                    )}
                  </Button>
                </Stack>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                  ¿Ya tienes cuenta?{' '}
                  <Typography
                    component="span"
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Inicia sesión aquí
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default SignupPage;
