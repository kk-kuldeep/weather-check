const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  try {
    for (const city of cities) {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=9667b83247e543489b9184005230306&q=${city}`);
      const { temp_c } = response.data.current;
      weatherData[city] = `${temp_c}C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
