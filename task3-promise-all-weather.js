console.log("========== Task 3 ==========");

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

function getWeather(city) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed for ${city.name}`);
      }

      return response.json();
    })
    .then((data) => ({
      city: city.name,
      temperature: data.current_weather.temperature,
      windSpeed: data.current_weather.windspeed,
    }));
}

console.time("Promise.all");

Promise.all(cities.map(getWeather))
  .then((results) => {
    console.table(results);
  })
  .catch((err) => {
    console.error("Weather Fetch Error:", err.message);
  })
  .finally(() => {
    console.timeEnd("Promise.all");
  });