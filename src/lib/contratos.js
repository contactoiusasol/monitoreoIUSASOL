import axios from 'axios';
import { TOKEN } from 'src/config/token';

const urlBase = 'https://api.iusasol.mx/v2.1/api/Reports/ISOL/Contracts';
const urlDetailsBase = 'https://api.iusasol.mx/v2.1/api/Reports/ISOL/Contract';

const comp_any = 'IUSASOL SUMINISTRADORA ENERGIA';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': 'https://api.iusasol.mx',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache'
};

const params = { company: comp_any };

export default async function fetchContractsWithDetails() {
  try {
    const res = await axios.get(urlBase, { params, headers });
    const contracts = res.data && res.data.contracts ? res.data.contracts : [];

    // Fetch details for each contract in parallel (settled to avoid failure short-circuit)
    const detailPromises = contracts.map((c) => axios.get(`${urlDetailsBase}?id=${c.idcode}`, { headers }));
    const settled = await Promise.allSettled(detailPromises);

    const results = contracts.map((c, idx) => {
      const detail = settled[idx];
      if (detail.status === 'fulfilled' && detail.value && detail.value.data) {
        const data = detail.value.data;
        return {
          nickisol: c.nickisol,
          idcode: c.idcode,
          meters: data.meters || []
        };
      }
      return {
        nickisol: c.nickisol,
        idcode: c.idcode,
        meters: [],
        _error: detail.reason ? String(detail.reason) : undefined
      };
    });

    return results;
  } catch (err) {
    console.error('Error fetching contracts', err);
    throw err;
  }
}
