import { useEffect, useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card, Button, CircularProgress } from '@mui/material';
import { getDataForAllMegas } from 'src/lib/grafica21megas';

const NUM_MEGAS = 21;

const formatCell = (value) => {
  if (value === undefined || value === null) return 'NA';
  if (Array.isArray(value)) return value[0];
  return value;
};

const Tabla = () => {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allData, setAllData] = useState([]);

  const handleLoad = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getDataForAllMegas();
      setAllData(results);
    } catch (err) {
      console.error(err);
      setError('Error al obtener datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // no-op on mount
  }, []);

  const maxRows = useMemo(() => {
    if (!allData || allData.length === 0) return 0;
    return Math.max(...allData.map((d) => (d ? d.length : 0)));
  }, [allData]);

  const tableRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < maxRows; i++) {
      let timeValue = 'NA';
      for (const data of allData) {
        if (data && data[i] && data[i].time) {
          timeValue = data[i].time;
          break;
        }
      }
      const row = [timeValue];
      for (let m = 0; m < NUM_MEGAS; m++) {
        const data = allData[m];
        if (data && data[i] && data[i].channels !== undefined) {
          const ch = data[i].channels;
          row.push(formatCell(Array.isArray(ch) ? ch[0] : ch));
        } else {
          row.push('NA');
        }
      }
      rows.push(row);
    }
    return rows;
  }, [allData, maxRows]);

  const handleDownloadCsv = () => {
    const headers = ['Hora', ...Array.from({ length: NUM_MEGAS }, (_, i) => `Mega ${i + 1}`)];
    const csvRows = [headers.join(',')];
    tableRows.forEach((r) => {
      const escaped = r.map((c) => {
        if (c === null || c === undefined) return '';
        const s = String(c);
        if (s.includes(',') || s.includes('\n') || s.includes('"')) {
          return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
      });
      csvRows.push(escaped.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte_21megas_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Reporte 21 Megas | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Reporte de Generación - 21 Megas
              </Typography>
            </Stack>

            <Card sx={{ p: 4, boxShadow: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Fecha:
                </Typography>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ fontSize: '1rem', padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc' }}
                />
                <Button variant="contained" color="primary" onClick={handleLoad} disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : 'Consultar'}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleDownloadCsv} disabled={tableRows.length === 0}>
                  Descargar CSV
                </Button>
              </Stack>

              {error && <Typography color="error">{error}</Typography>}

              <Box sx={{ overflowX: 'auto', mt: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Hora</th>
                      {Array.from({ length: NUM_MEGAS }, (_, i) => (
                        <th key={i} style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>
                          Mega {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.length === 0 && (
                      <tr>
                        <td colSpan={NUM_MEGAS + 1} style={{ padding: 16, textAlign: 'center' }}>
                          Sin datos. Presiona "Consultar" para cargar.
                        </td>
                      </tr>
                    )}
                    {tableRows.map((r, idx) => (
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

export default Tabla;
