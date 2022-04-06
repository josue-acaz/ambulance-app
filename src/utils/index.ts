import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDatetime(date: string | Date, date_format_type: string) {
  if(!date) return date;

  date = new Date(date);
  const formatted = format(date, date_format_type, {locale: ptBR});
  return formatted;
}

export const setToLS = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLS = (key: string) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
}

export function toPhoneNumber(v: string) {
  v = v.toString().replace(/^(\d{2})(\d)/g, '($1)$2'); //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.toString().replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
  return v;
}

export function maskPhoneNumber(event: any) {
  //Remove tudo o que não é dígito
  event.target.value = event.target.value.replace(/\D/g, '');
  event.target.value = toPhoneNumber(event.target.value);
}

export function maskCurrency(event: any) {
  event.target.value = event.target.value.toString();
  event.target.value = event.target.value.replace(/\D/g,'');
  event.target.value = (Number(event.target.value)/100).toFixed(2) + '';
  event.target.value = event.target.value.replace(".", ",");
  event.target.value = event.target.value.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  event.target.value = event.target.value.replace(/(\d)(\d{3}),/g, "$1.$2,");
}

export function currencyToNumber(currency: string) {
  return Number(currency.split(".").join("").replace(",", "."));
}

export function numberToCurrency(number: number) {
  return number.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}

export function numberToCurrencyBRL(number: number) {
  return number.toLocaleString('pt-br',{ style: 'currency', currency: 'BRL' });
}

export function onlyNumbers(value: string) {
  return value.replace(/\D/g, '');
}