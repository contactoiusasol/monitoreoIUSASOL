import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card } from '@mui/material';
import fetchPorteoMeters from 'src/lib/porteo';

const Porteo = () => {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPorteoMeters()
      .then((m) => { if (mounted) setMeters(m); })
      .catch((err) => { console.error(err); if (mounted) setError('Error al cargar datos'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Porteo | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>Porteo</Typography>

            <Card sx={{ p: 4, boxShadow: 3 }}>
              {error && <Typography color="error">{error}</Typography>}
              {loading ? (
                <Typography>Cargando...</Typography>
              ) : (
                <Box sx={{ overflowX: 'auto', mt: 2 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f5f5f5' }}>
                      <tr>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Nickname</th>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Serial</th>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Idcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {meters.length === 0 ? (
                        <tr>
                          <td colSpan={3} style={{ padding: 16, textAlign: 'center' }}>Sin datos</td>
                        </tr>
                      ) : (
                        meters.map((m, i) => (
                          <tr key={i}>
                            <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{m.nickname}</td>
                            <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{m.serial}</td>
                            <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{m.idcode}</td>
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

export default Porteo;
