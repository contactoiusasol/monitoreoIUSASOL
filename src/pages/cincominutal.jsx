import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography, Card, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { fetchProfiles } from 'src/lib/cincominutal';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const CincoMinutal = () => {
  const [idCode, setIdCode] = useState('');
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    setLoading(true);
    setError(null);
    setProfiles([]);
    setPage(1);
    try {
      const data = await fetchProfiles({ id: idCode, beginDate: date1, endDate: date2 });
      setProfiles(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar perfiles');
    } finally {
      setLoading(false);
    }
  };

  // validation: id and both dates filled, and date1 <= date2
  const isValid = useMemo(() => {
    if (!idCode || !date1 || !date2) return false;
    return date1 <= date2;
  }, [idCode, date1, date2]);

  // pagination calculations
  const totalPages = Math.max(1, Math.ceil(profiles.length / pageSize));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return profiles.slice(start, start + pageSize);
  }, [profiles, page, pageSize]);

  const handleExportCsv = () => {
    if (!profiles || profiles.length === 0) return;
    const headers = ['Fecha', 'Charge', 'Genera', 'Differ', 'Channels'];
    const rows = profiles.map((p) => {
      const channels = p.channels ? `1: ${p.channels[0] || ''} / ${p.channels[1] || ''} / ${p.channels[2] || ''} / ${p.channels[3] || ''}` : '';
      return [p.time || '', p.values?.charge ?? '', p.values?.genera ?? '', p.values?.differ ?? '', channels];
    });
    const csvRows = [headers.join(',')].concat(rows.map((r) => r.map((c) => {
      const s = String(c ?? '');
      if (s.includes(',') || s.includes('\n') || s.includes('"')) return `"${s.replace(/"/g, '""')}"`;
      return s;
    }).join(',')));

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `profiles_${idCode || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>5-Minutales | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>5-Minutales</Typography>

            <Card sx={{ p: 3, boxShadow: 3 }}>
              <form onSubmit={handleSubmit} id="myForm">
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle2" gutterBottom>Selecciona los días a consultar:</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Primer Fecha"
                          type="date"
                          value={date1}
                          onChange={(e) => setDate1(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Segunda Fecha"
                          type="date"
                          value={date2}
                          onChange={(e) => setDate2(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" gutterBottom>Ingresa el Id Code del Medidor:</Typography>
                    <TextField
                      label="ID CODE"
                      value={idCode}
                      onChange={(e) => setIdCode(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} disabled={!isValid || loading}>
                      {loading ? <CircularProgress size={20} /> : 'Buscar'}
                    </Button>
                    <Button sx={{ ml: 2 }} variant="outlined" color="secondary" onClick={handleExportCsv} disabled={profiles.length === 0}>
                      Exportar CSV
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              {!isValid && (
                <Typography color="warning.main" sx={{ mt: 1 }}>
                  Por favor completa el ID y ambas fechas. Asegúrate que la primera fecha sea anterior o igual a la segunda.
                </Typography>
              )}

              <Box sx={{ mt: 3 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Fecha</th>
                      <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Charge</th>
                      <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Genera</th>
                      <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Differ</th>
                      <th style={{ padding: 8, fontWeight: 700, borderBottom: '1px solid #e0e0e0' }}>Channels</th>
                    </tr>
                  </thead>
                  <tbody id="tabla-datos">
                    {profiles.length === 0 && (
                      <tr>
                        <td colSpan={5} style={{ padding: 16, textAlign: 'center' }}>{loading ? 'Cargando...' : 'Sin datos'}</td>
                      </tr>
                    )}
                    {paginated.map((p, i) => (
                      <tr key={i}>
                        <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{p.time}</td>
                        <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{p.values?.charge ?? ''}</td>
                        <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{p.values?.genera ?? ''}</td>
                        <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{p.values?.differ ?? ''}</td>
                        <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{p.channels ? `1: ${p.channels[0]} / ${p.channels[1]} / ${p.channels[2]} / ${p.channels[3]}` : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
              {profiles.length > 0 && (
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel id="page-size-label">Por página</InputLabel>
                    <Select
                      labelId="page-size-label"
                      value={pageSize}
                      label="Por página"
                      onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={500}>500</MenuItem>
                    </Select>
                  </FormControl>

                  <Pagination count={totalPages} page={page} onChange={(_, val) => setPage(val)} color="primary" />
                </Stack>
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default CincoMinutal;
