import { Helmet } from 'react-helmet-async';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { getDataForAllMegas, token as DEFAULT_TOKEN } from 'src/lib/grafica21megas';

Chart.register(...registerables);

const GraficasPage = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allData = await getDataForAllMegas(DEFAULT_TOKEN);
        if (!mounted) return;

        if (!allData || allData.length === 0) {
          setError('No data returned from API');
          setLoading(false);
          return;
        }

        const labels = allData[0].map((p) => p.time);
        const datasets = allData.map((data, idx) => ({
          label: `Mega${idx + 1}`,
          data: data.map((p) => parseFloat(p.channels[0]) || 0),
          borderColor: idx === 20 ? 'black' : `hsl(${idx * 18}, 100%, 45%)`,
          fill: false,
          tension: 0.1
        }));

        const ctx = canvasRef.current.getContext('2d');

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: 'line',
          data: { labels, datasets },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' }
            },
            scales: {
              x: { title: { display: true, text: 'Horas' } },
              y: { title: { display: true, text: 'kWh' } }
            }
          }
        });
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Graficas | IUSASOL</title>
      </Helmet>
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 2 }}>Gráficas 21 Megas</Typography>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box sx={{ color: 'error.main', mt: 2 }}>{error}</Box>
          )}

          <Box>
            <canvas id="myChart" ref={canvasRef} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default GraficasPage;
