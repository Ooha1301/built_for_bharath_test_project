const axios = require('axios');

exports.fetchFromGovAPI = async (district) => {
  try {
    const resourceId = process.env.DATA_GOV_RESOURCE_ID;
    const apiKey = process.env.DATA_GOV_API_KEY;
    const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&filters[district_name]=${encodeURIComponent(district)}`;
    const resp = await axios.get(url, { timeout: 10000 });
    return resp.data;
  } catch (err) {
    console.error('fetchFromGovAPI err', err.message);
    return null;
  }
};
