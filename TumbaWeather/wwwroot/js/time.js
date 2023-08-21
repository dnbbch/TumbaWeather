// Функция для форматирования чисел с ведущим нулем (для отображения 01, 02 и т.д.)
function formatNumberWithLeadingZero(number) {
  return number.toString().padStart(2, "0");
}

// Функция для получения текущей даты и времени в нужном формате
function getCurrentDateTime() {
  const now = new Date();
  const day = formatNumberWithLeadingZero(now.getDate());
  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hours = formatNumberWithLeadingZero(now.getHours());
  const minutes = formatNumberWithLeadingZero(now.getMinutes());
  const seconds = formatNumberWithLeadingZero(now.getSeconds());

  return `${year}-${month}-${day} / ${hours}:${minutes}:${seconds}`;
}

// Функция для обновления времени на странице
function updateClock() {
  const currentDateTimeElement = document.getElementById("current-time");
  const currentDateTime = getCurrentDateTime();
  currentDateTimeElement.textContent = currentDateTime;
}

// Обновляем время каждую секунду
setInterval(updateClock, 1000);

// Вызываем функцию updateClock() при загрузке страницы
updateClock();
