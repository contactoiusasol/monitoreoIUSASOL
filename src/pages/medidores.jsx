import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import fetchMeters from 'src/lib/idmedidores';

const Medidores = () => {
  const [meters, setMeters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchMeters()
      .then((m) => {
        if (mounted) setMeters(m);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError('Error cargando medidores');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // live filtered results as user types
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return meters;
    return meters.filter((m) => {
      const serial = (m.serial || '').toString().toLowerCase();
      const idcode = (m.idcode || '').toString().toLowerCase();
      return serial.includes(q) || idcode.includes(q);
    });
  }, [meters, query]);

  return (
    <>
      <Helmet>
        <title>Medidores | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Medidores
              </Typography>
            </Stack>

            <Card sx={{ p: 4, boxShadow: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <TextField
                  label="Buscar (serial o idcode)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {filtered.length} coincidencia(s)
                </Typography>
              </Stack>

              {loading ? (
                <Typography>Cargando...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <Box sx={{ overflowX: 'auto', mt: 2 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f5f5f5' }}>
                      <tr>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Serial</th>
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Idcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={2} style={{ padding: 16, textAlign: 'center' }}>
                            Sin coincidencias.
                          </td>
                        </tr>
                      ) : (
                        filtered.map((m, i) => (
                          <tr key={i}>
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

export default Medidores;
