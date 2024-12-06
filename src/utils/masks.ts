export const lettersMask = (value: string): string => {
  if (value) {
    const regex = /^[0-9]+$/;

    const formattedValue = value.replace(regex, "");

    return formattedValue;
  }

  return value;
};

export const hostNameMask = (value: string): string => {
  if (value) {
    const regex = /[^a-z\s]/gi;

    const formattedValue = value.replace(regex, "");

    return formattedValue;
  }

  return value;
};

export const numbersMask = (value: string): string => {
  if (value) {
    const regex = /^[A-Za-z]/gi;

    const formattedValue = value.replace(regex, "");

    return formattedValue;
  }

  return value;
};

export const cpfMask = (value: string | undefined): string => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  return "";
};

export const cepMask = (value: string | undefined): string => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  }

  return "";
};

export const phoneMask = (value: string | undefined): string => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  return "";
};

export const cardMask = (value: string | undefined): string => {
  if (value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4}(?!\s))/g, "$1 ")
      .trim();
  }
  return "";
};

export const removeNonDigitNumbers = (value: string) => {
  return value
    .split("")
    .filter((el) => !isNaN(parseFloat(el)))
    .join("");
};
