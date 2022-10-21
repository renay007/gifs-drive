export type ValidationType = {
  isValid: boolean;
  message?: string;
};

export const validateBody = (
  required: Array<string>,
  object: any
): ValidationType => {
  for (const field of required) {
    if (!(field in object))
      return {
        isValid: false,
        message: `Missing required field: ${field}`,
      };
  }
  return { isValid: true };
};

export const checkForNonEmptyString = (
  fields: Array<string>,
  object: { [key: string]: string }
): ValidationType => {
  for (const field of fields) {
    if (field in object && object[field] === "") {
      return {
        isValid: false,
        message: `${field} must be a non-empty string.`,
      };
    }
  }
  return { isValid: true };
};
