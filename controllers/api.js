const axios = require("axios");
const { ctrlWrapper } = require("../helpers");

const getInfo = async (req, res) => {
  try {
    const id = req.body.id;
    const apiKeyName = process.env.API_KEY;
    const apiKeyValue = process.env.KEY_VALUE;
    const apiUrl = `https://my3.soliq.uz/api/remote-access-api/company/info/${id}?type=full`;
    console.log(apiKeyValue, apiKeyName);

    const response = await axios.get(
      apiUrl,
      { timeout: 10000 },
      {
        headers: {
          [apiKeyName]: apiKeyValue,
        },
      }
    );
    console.log(response);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
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
  getInfo: ctrlWrapper(getInfo),
};
