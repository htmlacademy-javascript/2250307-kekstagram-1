const DEFAULT_DIRECTORY = 'https://28.javascript.htmlacademy.pro/kekstagram';

const Path = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const Method = {
  GET_DATA: 'GET',
  POST_DATA: 'POST',
};

const ErrorMessage = {
  GET_DATA:  'Не удалось загрузить данные. Обновите страницу!',
  POST_DATA: 'Ошибка отправки формы. Попробуйте ещё раз!',
};

const loadData = (path, method, body, errorMessage) =>
  fetch(`${DEFAULT_DIRECTORY}${path}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => loadData(Path.GET_DATA, Method.GET_DATA, null, ErrorMessage.GET_DATA);

const postData = (body) => loadData(Path.POST_DATA, Method.POST_DATA, body, ErrorMessage.POST_DATA);

export {getData, postData};
