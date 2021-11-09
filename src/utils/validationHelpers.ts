const is_null = (parameter: any) => {
  if (parameter === null) {
    return true;
  }

  return false;
};

const is_undefined = (parameter: any) => {
  if (typeof parameter === "undefined") {
    return true;
  }

  return false;
};

export const is_undefined_nan = (parameter: any) => {
  if (is_undefined(parameter)) {
    return true;
  }

  if (is_null(parameter)) {
    return true;
  }

  return false;
};

export const is_valid_prop = (
  prop: any,
  intended_type?: string,
  can_be_null?: boolean | false
) => {
  if (is_undefined(prop)) {
    return false;
  }

  if (intended_type === "boolean") {
    if (
      prop.toString() !== "true" &&
      prop.toString() !== "false" &&
      typeof prop !== "boolean"
    ) {
      return false;
    }
  }

  if (typeof prop !== "string" && typeof prop !== intended_type) {
    return false;
  }

  if (!can_be_null && is_null(prop)) {
    return false;
  }

  return true;
};
