import axios from 'axios';
import { TOKEN as token } from '../config/token';

export const megaIds = [
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURoPlIMgd9PF_hdg9svnATlk",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURpXm2c-VQBeK_s05Wb4IqGL",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURr9lsFj1WUCyxscRAMrzD9T",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURrgUNTYRX9XOSJXKUVKmVM9",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURr95Wg81Un44wKngWWnLb3Q",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURq-Bby7KqfdJ1nMZc3cbaI4",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURor5FX_1QZk-EQYiSzeHFif",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURq7bpgzxPAnMXXTKGX9e3ON",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURoNJXkC2IuQCeKr5Wvm8PH_",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURpfCDdXqBWi_kTt-HlLH517",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURqCNz8NP9-wQiPRi-l2LyKw",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURqB55FNn8_wITSmcmyUhE1p",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURqZV8klUt1yARO0rKz7AFu0",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURocRDqTjJCnBYVDbrBDqJdf",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURrjntPx7ZCPgdM4QI3n4RCw",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURo8j4evZ58OKsj-Lktb28e0",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURrNZfknBsxoibC-9dZ6o3gE",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURoZA6xFeZZh72NyKtGvj_oa",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURoMjZLEgvi7noC0H19YfLVL",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURrvepQJPEBaKXzNScqK_J_R",
    "1yhkHn92S_uK8n65m9mfVLpgeX7vuCn-3NzLrz1cURqcb6WDHglD-W7OyNJZ6xfQ"
];

export const urlBase = 'https://api.iusasol.mx/v2.1/api/Reports/Farm/Meter/Profiles';

export const getDataForAllMegas = async (tokenParam) => {
  const usedToken = tokenParam || token;
  try {
    const fechaSeleccionada = new Date().toISOString().split('T')[0];
    const headers = {
      'Authorization': `Bearer ${usedToken}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    };

    const promises = megaIds.map((id) =>
      axios.get(urlBase, { params: { id, date: fechaSeleccionada, periodicity: 0 }, headers })
    );

    const responses = await Promise.all(promises);

    // Map to profiles arrays
    return responses.map((r) => r.data.profiles);
  } catch (error) {
    console.error('Error fetching megas data:', error.response ? error.response.data : error.message);
    throw error;
  }
};//hacemos cualquier cambio para probar el commit