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

  // Очищаем контейнер перед добавлением новых карточек
  const cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Если запрос прошел нормально
  if (response.ok === true) {
    // Получаем данные
    const data = await response.json();

    // Обновляем город и страну
    const cityTitleElement = document.getElementById("city-title");
    const countryTitleElement = document.getElementById("country-title");

    // Обновляем содержимое элемента aside__header
    cityTitleElement.innerHTML = `${data.result.city.name}<span id="country-title">${data.result.city.country}</span>`;

    // Обновляем страну
    countryTitleElement.textContent = data.result.city.country;

    // Обновляем текст в карточках
    const cardContainer = document.getElementById("card-container");

    for (let i = 0; i < data.result.list.length / 8; i++) {
      const card = document.createElement("div");
      card.className = "article__card";

      const cardDateElement = document.createElement("p");
      cardDateElement.className = "card__date";

      const cardHeader = document.createElement("div");
      cardHeader.className = "card__header";

      const cardIconsElement = document.createElement("div");
      cardIconsElement.className = "card__icons";

      card.appendChild(cardDateElement);
      card.appendChild(cardHeader);
      cardHeader.appendChild(cardIconsElement);

      cardContainer.appendChild(card);

      const forecastData = data.result.list.slice(i * 8, (i + 1) * 8);
      cardDateElement.textContent = forecastData[0].dt_txt.split(" ")[0];

      forecastData.forEach((weatherData) => {
        const dateTime = new Date(weatherData.dt_txt);
        const temperature = Math.round(weatherData.main.temp);
        const iconCode = weatherData.weather[0].icon;

        const tempElement = document.createElement("p");
        tempElement.className = "card__temp";
        tempElement.innerHTML = `${dateTime.toLocaleTimeString("ru-RU", {
          hour: "numeric",
          minute: "numeric",
        })} | ${temperature} °C`;

        const iconElement = document.createElement("img");
        iconElement.src = `../icons/fill/${iconCode}.svg`;
        iconElement.alt = "Weather Icon";

        const tempIconContainer = document.createElement("div");
        tempIconContainer.className = "temp-icon-container";
        tempIconContainer.appendChild(tempElement);
        tempIconContainer.appendChild(iconElement);

        cardHeader.appendChild(tempIconContainer);
      });
    }
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

  // Очищаем контейнер перед добавлением новых карточек
  const cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Если запрос прошел нормально
  if (response.ok === true) {
    // Получаем данные
    const data = await response.json();

    // Обновляем текст в элементе city-title
    const cityTitleElement = document.getElementById("city-title");
    const countryTitleElement = document.getElementById("country-title");

    // Обновляем содержимое элемента aside__header
    cityTitleElement.innerHTML = `${data.result.city.name}<span id="country-title">${data.result.city.country}</span>`;

    // Обновляем страну
    countryTitleElement.textContent = data.result.city.country;

    // Обновляем текст в карточках
    const cardContainer = document.getElementById("card-container");

    for (let i = 0; i < data.result.list.length / 8; i++) {
      const card = document.createElement("div");
      card.className = "article__card";

      const cardDateElement = document.createElement("p");
      cardDateElement.className = "card__date";

      const cardHeader = document.createElement("div");
      cardHeader.className = "card__header";

      const cardIconsElement = document.createElement("div");
      cardIconsElement.className = "card__icons";

      card.appendChild(cardDateElement);
      card.appendChild(cardHeader);
      cardHeader.appendChild(cardIconsElement);

      cardContainer.appendChild(card);

      const forecastData = data.result.list.slice(i * 8, (i + 1) * 8);
      cardDateElement.textContent = forecastData[0].dt_txt.split(" ")[0];

      forecastData.forEach((weatherData) => {
        const dateTime = new Date(weatherData.dt_txt);
        const temperature = Math.round(weatherData.main.temp);
        const iconCode = weatherData.weather[0].icon;

        const tempElement = document.createElement("p");
        tempElement.className = "card__temp";
        tempElement.innerHTML = `${dateTime.toLocaleTimeString("ru-RU", {
          hour: "numeric",
          minute: "numeric",
        })} | ${temperature}°C`;

        const iconElement = document.createElement("img");
        iconElement.src = `../icons/fill/${iconCode}.svg`;
        iconElement.alt = "Weather Icon";

        const tempIconContainer = document.createElement("div");
        tempIconContainer.className = "temp-icon-container";
        tempIconContainer.appendChild(tempElement);
        tempIconContainer.appendChild(iconElement);

        cardHeader.appendChild(tempIconContainer);
      });
    }
  }
}
document
  .getElementById("sendButtonId")
  .addEventListener("click", () => getWeather());
navigator.geolocation.getCurrentPosition(function (position) {
  getWeatherByCoord(position.coords.latitude, position.coords.longitude);
});
