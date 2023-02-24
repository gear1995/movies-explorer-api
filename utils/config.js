function validateUrl(url) {
  const regEx = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm;

  if (regEx.test(url)) {
    return url;
  }
  throw new Error('Некорректый формат ссылки');
}

module.exports = { validateUrl };
