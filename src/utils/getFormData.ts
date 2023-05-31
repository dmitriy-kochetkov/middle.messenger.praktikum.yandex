export const getFormData = (
    form: HTMLFormElement,
  ): Record<string, FormDataEntryValue> => Object.fromEntries(new FormData(form).entries());
