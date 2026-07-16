console.log("========== Task 4 ==========");

const cities = [
  {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: "London",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    name: "Tokyo",
    lat: 35.6762,
    lon: 139.6503,
  },
];

async function fetchWeather(city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed for ${city.name}`);
  }

  const data = await response.json();

  return {
    city: city.name,
    temperature: data.current_weather.temperature,
    windSpeed: data.current_weather.windspeed,
  };
}

async function weatherDashboard() {
  console.time("Async Await");

  try {
    const results = await Promise.all(
      cities.map(fetchWeather)
    );

    console.table(results);
  } catch (err) {
    console.error(err.message);
  } finally {
    console.timeEnd("Async Await");
  }
}

weatherDashboard();