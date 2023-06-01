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

export const notOnlyDigits =
    () =>
    (inputValue: string): string => {
        const testingValue = inputValue || '';
        if (/^[0-9]*$/g.test(testingValue)) {
            return 'Не должен состоять только из цифр';
        }
        return '';
    };

export const login =
    () =>
    (inputValue: string): string => {
        const testingValue = inputValue || '';
        if (/^[A-Za-z0-9_-]*$/g.test(testingValue)) {
            return '';
        }
        return 'Допустимы: латиница, цифры, дефис и подчеркивание';
    };

export const name =
    () =>
    (inputValue: string): string => {
        const testingValue = inputValue || '';
        if (/(^[A-Z][A-Za-z-]*$)|(^[А-ЯЁ][А-Яа-яёЁ-]*$)/.test(testingValue)) {
            return '';
        }
        return 'С заглавной буквы, допустимы латиница или кириллица, дефис';
    };

export const phone =
    () =>
    (inputValue: string): string => {
        const testingValue = inputValue || '';
        if (/^\+?[0-9]*$/.test(testingValue)) {
            return '';
        }
        return 'Cостоит из цифр, может начинается с плюса';
    };

export const password =
    () =>
    (inputValue: string): string => {
        const testingValue = inputValue || '';
        if (/(?=.*[a-z/а-яё])(?=.*[A-Z/А-ЯЁ])/.test(testingValue)) {
            return '';
        }
        return 'Обязательно хотя бы одна цифра и заглавная буква';
    };

export const email =
    () =>
    (inputValue: string): string => {
        const testingValue = inputValue || '';
        if (/^[a-zA-z0-9-\.]+@[a-zA-z0-9-]+\.[a-zA-z0-9]+$/g.test(testingValue)) {
            return '';
        }
        return 'Проверьте формат';
    };

export const notEmpty =
    () =>
    (inputValue: string): string => {
      const testingValue = inputValue || '';
      if (testingValue.length === 0) {
        return 'Не может быть пустым';
      }
      return '';
    };

export const repeatPasswordValidationMessage: string = 'Пароли не совпадают';
