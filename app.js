
// Simple Weather App - OpenWeatherMap (HTML + Bootstrap)
// Replace the apiKey value with your own key from https://openweathermap.org/api
document.getElementById('form').addEventListener('submit', async function(e){
  e.preventDefault();
  const city = document.getElementById('city').value.trim();
  const apiKey = document.getElementById('apikey').value.trim();
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');
  resultDiv.style.display = 'none';
  errorDiv.style.display = 'none';
  if (!city) { errorDiv.textContent = 'Escribe una ciudad.'; errorDiv.style.display = 'block'; return; }
  if (!apiKey) { errorDiv.textContent = 'Coloca tu API Key de OpenWeatherMap.'; errorDiv.style.display = 'block'; return; }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${apiKey}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.message || 'Error al obtener datos');
    }
    const data = await resp.json();
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('desc').textContent = data.weather.map(w => w.description).join(', ');
    document.getElementById('temp').textContent = data.main.temp.toFixed(1);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
    resultDiv.style.display = 'block';
  } catch (err) {
    errorDiv.textContent = 'No se pudo obtener el clima: ' + err.message;
    errorDiv.style.display = 'block';
  }
});
