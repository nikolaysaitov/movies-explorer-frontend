function validation(name, value) {
  let errors = {};
  if (name === "email") {
    if (!value) {
      errors = { [name]: "Емейл обязателен" };
    } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
      errors = { [name]: "Адресс не валиден" };
    }
  }
  if (name === "password") {
    if (!value || value.length < 6) {
      errors = { [name]: "Пароль обязателен(Не менее 6-ти символов)" };
    }
  }
  if (name === "name") {
    if (!value ) {
      errors = { [name]: "Имя обязательно" };
    } else if (!/^[a-zа-яё-\s]+$/i.test(value)) {
      errors = {
        [name]: "Имя может содержать только латиницу, пробел или дефис",
      };
    } else if (value.length < 2) {
      errors = { [name]: "Имя не должно быть меньше 2 символов" };
    }
  }

  return errors;
}

export default validation;
