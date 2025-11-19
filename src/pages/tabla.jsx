import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card, Button } from '@mui/material';

// Importa el script JS para la tabla (debería adaptarse a React, pero aquí se simula la inclusión)
// import '../lib/tabla21m.js';

const Tabla = () => {
  useEffect(() => {
    // Aquí podrías cargar el script tabla21m.js si fuera necesario
    // Por ejemplo, usando un <script> dinámico o adaptando la lógica a React
  }, []);

  return (
    <>
      <Helmet>
        <title>Reporte 21 Megas | Carpatin Free</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                Reporte de Generación - 21 Megas
              </Typography>
            </Stack>
            <Card sx={{ p: 4, boxShadow: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Selecciona la fecha:
                </Typography>
                <input type="date" id="datepicker" style={{ fontSize: '1rem', padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc' }} />
                <Button id="btnEnviar" variant="contained" color="primary" sx={{ fontWeight: 600 }}>
                  Consultar
                </Button>
                <Button id="btnDescargar" variant="outlined" color="secondary" sx={{ fontWeight: 600 }}>
                  Descargar Excel
                </Button>
              </Stack>
              <Box sx={{ overflowX: 'auto', mt: 2 }}>
                <table id="tabla-datos" style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'inherit' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th style={{ padding: '8px', fontWeight: 700, borderBottom: '2px solid #e0e0e0' }}>Hora</th>
                      {[...Array(21)].map((_, i) => (
                        <th key={i} style={{ padding: '8px', fontWeight: 700, borderBottom: '2px solid #e0e0e0' }}>Mega {i + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Los datos se llenan por tabla21m.js */}
                  </tbody>
                </table>
              </Box>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Tabla;
