//Метод для запроса с сервера данных, относитльно названия города.
async function getWeather() {
  // Отправляет запрос и получаем ответ
  var cityName = document.getElementById("cityNameId");
  const response = await fetch(
    `https://localhost:7172/get_weather?city_name=${cityName.value}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  // Если запрос прошел нормально
  if (response.ok === true) {
    // Получаем данные
    const result = await response.json();
    console.log("City");
    console.log(result.result.city.name);
    console.log(result);

    // Обновляем текст в элементе city-title
    var cityTitleElement = document.getElementById("city-title");
    cityTitleElement.textContent = result.result.city.name;
  }
}
//Метод для запроса с сервера данных, относительно координат
async function getWeatherByCoord(lat, lon) {
  const response = await fetch(
    `https://localhost:7172/get_weather?lat=${lat}&lon=${lon}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    }
  );
  // Если запрос прошел нормально
  if (response.ok === true) {
    // Получаем данные
    const result = await response.json();

    // Перекинуть
    console.log("Coordinate");
    console.log(result.result.city.name);
    console.log(result);

    // Обновляем текст в элементе city-title
    var cityTitleElement = document.getElementById("city-title");
    cityTitleElement.textContent = result.result.city.name;
  }
}
document
  .getElementById("sendButtonId")
    .addEventListener("click", () => getWeather());
navigator.geolocation.getCurrentPosition(function (position) {
  getWeatherByCoord(position.coords.latitude, position.coords.longitude);
});
