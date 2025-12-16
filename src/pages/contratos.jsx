import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card } from '@mui/material';
import fetchContractsWithDetails from 'src/lib/contratos';

const Contratos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchContractsWithDetails()
      .then((r) => { if (mounted) setItems(r); })
      .catch((err) => { console.error(err); if (mounted) setError('Error al cargar contratos'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contratos | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>Contratos</Typography>

            <Card sx={{ p: 4, boxShadow: 3 }}>
              {error && <Typography color="error">{error}</Typography>}
              {loading ? (
                <Typography>Cargando...</Typography>
              ) : (
                <Box sx={{ overflowX: 'auto', mt: 2 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f5f5f5' }}>
                      <tr>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Nickisol</th>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Idcode</th>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Detalles de Medidores</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={3} style={{ padding: 16, textAlign: 'center' }}>Sin datos</td>
                        </tr>
                      ) : (
                        items.map((it, i) => (
                          <tr key={i}>
                            <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{it.nickisol}</td>
                            <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{it.idcode}</td>
                            <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>
                              {it._error ? (
                                <span>Error: {it._error}</span>
                              ) : it.meters && it.meters.length > 0 ? (
                                it.meters.map((m, mi) => (
                                  <div key={mi} style={{ marginBottom: 6 }}>
                                    <div><strong>Medidor registrado:</strong></div>
                                    <div>Serial: {m.serial}</div>
                                    <div>ID del Medidor: {m.idcode}</div>
                                  </div>
                                ))
                              ) : (
                                <span>No se encontraron detalles de medidores</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </Box>
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Contratos;
