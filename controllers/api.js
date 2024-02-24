const axios = require("axios");

const getInfo = async (req, res) => {
  try {
    const id = req.body.id;
    const apiKeyName = process.env.API_KEY;
    const apiKeyValue = process.env.KEY_VALUE;
    const apiUrl = `https://my3.soliq.uz/api/remote-access-api/company/info/${id}?type=full`;

    const response = await axios.get(apiUrl, {
      headers: {
        [apiKeyName]: apiKeyValue,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status) {
      if (error.response.data) {
        const responseBody = error.response.data;
        res.status(error.response.status).json(responseBody);
      } else {
        res.status(error.response.status).json({ error: error.message });
      }
    }
  }
};
module.exports = {
  getInfo,
};
