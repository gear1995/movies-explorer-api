const allowedCors = [
  'https://gear1995v.nomoredomainsclub.ru',
  'http://gear1995v.nomoredomainsclub.ru',
  'https://api.gear1995v.students.nomoredomains.work',
  'http://api.gear1995v.students.nomoredomains.work',
  'http://localhost:3000',
  'localhost:3000',
];

// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// Если это предварительный запрос, добавляем нужные заголовки

module.exports = (req, res, next) => {
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
  return true;
};
