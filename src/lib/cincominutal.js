import axios from 'axios';
import { TOKEN } from 'src/config/token';

// Endpoint
// const urlPerfiles = 'https://api.iusasol.mx/v2.1/api/Reports/ISOL/Meter/Profiles';
const urlPerfiles = 'https://api.iusasol.mx/v2.1/api/Reports/ISOL/Profiles/Detailed';

const comp_any = "IUSASOL SUMINISTRADORA ENERGIA";
const MeasuringValue = '2';
const MeasuringType = 'e';

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': 'https://api.iusasol.mx',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache'
};

// Fetch profiles for given id and date range
export async function fetchProfiles({ id, beginDate, endDate }) {
  const params = { id, beginDate, endDate, tym: MeasuringValue, tye: MeasuringType, company: comp_any };
  const res = await axios.get(urlPerfiles, { params, headers });
  return res.data && res.data.profiles ? res.data.profiles : [];
}

export default fetchProfiles;