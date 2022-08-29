const VALIDATION_PARAMS = {
  REGEX: {
    NAME: /^[a-zа-яё-\s]+$/i,
    EMAIL: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,

  },
  MESSAGES: {
    NAME: 'Имя должно содержать только буквы, пробелы и "-"',
    EMAIL: "Неправильный формат e-mail",
  },
};

const VALIDATION_CONFIGS = {
  USER_DATA: {
    INPUTS: ["name", "email"],
    REGEX: {
      name: VALIDATION_PARAMS.REGEX.NAME,
      email: VALIDATION_PARAMS.REGEX.EMAIL,
    },
    MESSAGES: {
      name: VALIDATION_PARAMS.MESSAGES.NAME,
      email: VALIDATION_PARAMS.MESSAGES.EMAIL,
    },
  },

  LOGIN: {
    INPUTS: ["email"],
    REGEX: {
      email: VALIDATION_PARAMS.REGEX.EMAIL,
    },
    MESSAGES: {
      email: VALIDATION_PARAMS.MESSAGES.EMAIL,
    },
  },
};

const MESSAGES = {
  NOT_FOUND: "Ничего не найдено",
  ERROR:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
};

const CARD_COUNT = {
  SMALL_DEVICE: {
    ADD: 2,
    START: 5,
  },
  MIDDLE_DEVICE: {
    ADD: 2,
    START: 8,
  },
  BIG_DEVICE: {
    ADD: 3,
    START: 12,
  },
};

const CARD_BRAKEPOINT = {
  TWO: 1000,
  ONE: 700,
};

const SHORT_DURATION = 40;

const DANGER_MESSAGES = {
  SUCCESSFULLY: {
    UPDATE_PROFILE: "Данные профиля успешно обновлены!",
  },

  ERROR: {
    UPDATE_PROFILE: "Не удалось обновить данные профиля!",
    DELETE_FILM: "Не удалось удалить фильм!",
    ADD_FILM: "Не удалось добавить фильм!",
    GET_USER: "Произошла ошибка!",
  },
};

const PAGES = {
  MOVIES: "/movies",
  SAVED_MOVIES: "/saved-movies",
  PROFILE: "/profile",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  MAIN: "/",
};

const BASE_URL = "https://api.nomoreparties.co";

export {
  VALIDATION_PARAMS,
  VALIDATION_CONFIGS,
  MESSAGES,
  CARD_COUNT,
  CARD_BRAKEPOINT,
  SHORT_DURATION,
  DANGER_MESSAGES,
  PAGES,
  BASE_URL,
};
