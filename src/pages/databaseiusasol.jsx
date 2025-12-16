import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card, Button, CircularProgress } from '@mui/material';

const CSV_PATH = '/MedidoresMonitoreo.csv';

function parseCSV(csv) {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = lines[0].split(',').map((h) => h.trim());

  // Simple CSV parser that handles quoted fields
  const rows = lines.slice(1).map((line) => {
    const fields = [];
    let i = 0;
    let cur = '';
    let inQuotes = false;
    while (i < line.length) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i += 2;
          continue;
        }
        inQuotes = !inQuotes;
        i++;
        continue;
      }
      if (ch === ',' && !inQuotes) {
        fields.push(cur);
        cur = '';
        i++;
        continue;
      }
      cur += ch;
      i++;
    }
    fields.push(cur);
    return fields;
  });

  return { headers, rows };
}

const DatabaseIUSASOL = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [csvText, setCsvText] = useState('');

  const handleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(CSV_PATH);
      if (!res.ok) throw new Error('No se pudo cargar el CSV');
      const text = await res.text();
      setCsvText(text);
      const { headers: h, rows: r } = parseCSV(text);
      setHeaders(h);
      setRows(r);
    } catch (err) {
      console.error(err);
      setError('Error al cargar el CSV');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MedidoresMonitoreo.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>BD - Medidores | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Base de Datos - Medidores
              </Typography>
            </Stack>

            <Card sx={{ p: 4, boxShadow: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Button variant="contained" color="primary" onClick={handleLoad} disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : 'Consultar'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleDownload} disabled={!csvText}>
                  Descargar CSV
                </Button>
              </Stack>

              {error && <Typography color="error">{error}</Typography>}

              <Box sx={{ overflowX: 'auto', mt: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      {headers.length === 0 ? (
                        <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Sin datos</th>
                      ) : (
                        headers.map((h, i) => (
                          <th key={i} style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>{h}</th>
                        ))
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={Math.max(1, headers.length)} style={{ padding: 16, textAlign: 'center' }}>
                          Sin datos. Presiona "Consultar" para cargar.
                        </td>
                      </tr>
                    )}
                    {rows.map((r, idx) => (
                      <tr key={idx}>
                        {r.map((c, ci) => (
                          <td key={ci} style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{c}</td>
                        ))}
                      </tr>
                    ))}
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

export default DatabaseIUSASOL;
