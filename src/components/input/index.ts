import Block from '../../core/Block';
import template from './input.hbs';

export type InputValidationFn = (inputValue: string) => string;

interface IValidationResult {
    isValid: boolean;
    errorMessages?: string[] | null;
}

export interface IInputProps {
    label?: string,
    name: string,
    type: 'text' | 'password' | 'file',
    value?: string,
    disabled?: boolean,
    danger?: boolean,
    enableErrorMessage: boolean,
    errorMessage: string,
    placeholder?:string,
    events?: {
        focusout?: (evt: FocusEvent) => void,
        change?: (evt: Event) => void,
    },
    validationFns?: InputValidationFn[];
}

export class Input extends Block {
    constructor(props: IInputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }

    public validate(): IValidationResult {
        const { validationFns = [] } = this.props;
        const inputValue = this.getValue();
        const validationResult: string[] = [];
        validationFns.forEach((validator: InputValidationFn) => {
            validationResult.push(validator(inputValue));
        });
        const errors = validationResult.filter((result) => !!result);
        return {
            isValid: !errors.length,
            errorMessages: errors,
        };
    }

    public setValidState(isValid: boolean): void {
        this.props.danger = !isValid;
    }

    public getValue(): string {
        return this._getHTMLInputElement().value;
    }

    public setValue(value: string) {
        this._getHTMLInputElement().value = value;
    }

    private _getHTMLInputElement(): HTMLInputElement {
        const { element } = this;
        return element?.getElementsByTagName('input')[0];
    }
}
