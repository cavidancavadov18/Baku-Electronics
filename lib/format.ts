export function money(value: number) {
  const text = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return `${text} ₼`;
}
