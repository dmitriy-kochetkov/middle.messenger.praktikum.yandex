export function minLength(length: number) {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (testingValue.length < length) {
            return `Минимальная длина: ${length} символа(ов)`;
        }
        return '';
    };
}

export function maxLength(length: number) {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (testingValue.length > length) {
            return `Максимальная длина: ${length} символа(ов)`;
        }
        return '';
    };
}

export function notOnlyDigits() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/^[0-9]*$/g.test(testingValue)) {
            return 'Не должен состоять только из цифр';
        }
        return '';
    };
}

export function login() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/^[A-Za-z0-9_-]*$/g.test(testingValue)) {
            return '';
        }
        return 'Допустимы: латиница, цифры, дефис и подчеркивание';
    };
}

// export function name() {
//     return function fn(inputValue: string): string {
//         const testingValue = inputValue || '';
//         if (/(^[A-Z][A-Za-z-]*$)|(^[А-ЯЁ][А-Яа-яёЁ-]*$)/.test(testingValue)) {
//             return '';
//         }
//         return 'С заглавной буквы, допустимы латиница или кириллица, дефис';
//     };
// }

export function name() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/(^[A-Za-z-]*$)|(^[А-Яа-яёЁ-]*$)/.test(testingValue)) {
            return '';
        }
        return 'Допустимы латиница или кириллица, дефис';
    };
}

export function capital() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/(^[A-Z])|(^[А-ЯЁ])/.test(testingValue)) {
            return '';
        }
        return 'С заглавной буквы';
    };
}

export function phone() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/^\+?[0-9]*$/.test(testingValue)) {
            return '';
        }
        return 'Cостоит из цифр, может начинается с плюса';
    };
}

export function password() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/(?=.*[a-z/а-яё])(?=.*[A-Z/А-ЯЁ])/.test(testingValue)) {
            return '';
        }
        return 'Обязательно хотя бы одна цифра и заглавная буква';
    };
}

export function email() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (/^[a-zA-z0-9-]+@[a-zA-z0-9-]+\.[a-zA-z0-9]+$/g.test(testingValue)) {
            return '';
        }
        return 'Проверьте формат';
    };
}

export function notEmpty() {
    return function fn(inputValue: string): string {
        const testingValue = inputValue || '';
        if (testingValue.length === 0) {
            return 'Не может быть пустым';
        }
        return '';
    };
}

export const repeatPasswordValidationMessage: string = 'Пароли не совпадают';
