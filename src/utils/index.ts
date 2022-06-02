import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { isMobile } from "react-device-detect";

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
  if(!v) return "";

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

export function shareOnWhatsapp(endpoint_share: string) {
  const whatsapp_desktop = 'https://web.whatsapp.com/send?text=';
  const whatsapp_mobile = 'https://wa.me/?text=';

  window.open((isMobile ? whatsapp_mobile : whatsapp_desktop) + encodeURIComponent(
      `Acesse:: ${endpoint_share}`
  ), '_blank');
}

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}

// Google Maps Directions (START)
export function typecastRoutes(routes: any){
  routes.forEach(function(route: any){
      route.bounds = asBounds(route.bounds);
      // I don't think `overview_path` is used but it exists on the
      // response of DirectionsService.route()
      route.overview_path = asPath(route.overview_polyline);

      route.legs.forEach(function(leg: any){
          leg.start_location = asLatLng(leg.start_location);
          leg.end_location   = asLatLng(leg.end_location);

          leg.steps.forEach(function(step: any){
              step.start_location = asLatLng(step.start_location);
              step.end_location   = asLatLng(step.end_location);
              step.path = asPath(step.polyline);
          });

      });
  });
}

function asBounds(boundsObject: any){
  return new google.maps.LatLngBounds(asLatLng(boundsObject.southwest),
                                  asLatLng(boundsObject.northeast));
}

function asLatLng(latLngObject: any){
  return new google.maps.LatLng(latLngObject.lat, latLngObject.lng);
}

function asPath(encodedPolyObject: any){
  return google.maps.geometry.encoding.decodePath( encodedPolyObject.points );
}
// Google Maps Directions (END)