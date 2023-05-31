import Block from "./Block"

export const validateInput = (inputName: string, inputValue: string) => {
  let regStr = '';
  let errorText = '';

  switch (inputName) {
      case "first_name":
      case "second_name":
          regStr = '[A-ZА-ЯЁ]+[а-яa-z]*';
          errorText = 'Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
          break;
      case "login":
          regStr = '(?![0-9_-]+$)[a-zA-Z0-9+_-]{3,20}';
          errorText = 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов';
          break;
      case "email":
          regStr = '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+';
          errorText = 'Некорректный email, строка должна содержать @';
          break;
      case "password":
          regStr = '(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,40}';
          errorText = 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
          break;
      case "phone":
          regStr = '[\+]?[0-9]{10,15}';
          errorText = 'От 10 до 15 символов, состоит из цифр, может начинается с плюса';
          break;
      case "message":
          regStr = '^\.';
          break;
      default:
          break;
    }

    const reg = new RegExp(regStr);
    console.log({regStr: regStr, errTxt: errorText, value: inputValue, result:reg.test(inputValue)});

    const result = {
        isValid: reg.test(inputValue),
        errorText: errorText
    }

    return result;
}

export const minLength =
  (length: number) =>
  (inputValue: string): string => {
    const testingValue = inputValue || '';
    if (testingValue.length < length) {
      return `Минимальная длина: ${length} символа(ов)`;
    }
    return '';
  };

  export const maxLength =
  (length: number) =>
  (inputValue: string): string => {
    const testingValue = inputValue || '';
    if (testingValue.length > length) {
      return `Максимальная длина: ${length} символа(ов)`;
    }
    return '';
  };
