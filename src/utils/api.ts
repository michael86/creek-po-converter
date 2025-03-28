export const validateErrorResponse = (message: string) => {
  let valid = false;

  switch (message) {
    case "Purchase order ID not found or invalid":
      valid = true;
      break;

    default:
      break;
  }

  return valid;
};
