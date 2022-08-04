export function currencyMask(value: string): string {
  value = value
    .replace(".", "")
    .replace(",", "")
    .replace(/\D/g, "")
    .replace("R$ ", "");
  const options = { minimumFractionDigits: 2 }; //decimal places
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(value) / 100 // factor
  );
  return `R$ ${result}`;
}
export function numberMask(value: string) {
  if (value[0] === "0" && value.length > 1)
    return value.substring(1, value.length);
  return value === "" ? "0" : value;
}
