import { setHours, setMinutes, setSeconds, addDays } from 'date-fns';
import { CartProduct, LocaleIdResponse } from '../interfaces/interfaces';

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  function toRad(x: number): number {
    return (x * Math.PI) / 180;
  }

  var R = 6371; // km
  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;

  return distance;
}
export function groupProductsByType(locale: LocaleIdResponse | null): object {
  const groupedProducts: any = {};
  const tipiRef: string[] = [
    'Antipasti',
    'Primi',
    'Secondi',
    'Pizze',
    'Panini',
    'Hamburger',
    'Bevande',
    'Dessert',
  ];

  locale?.prodotti.forEach((prodotto) => {
    prodotto.tipiProdotto.forEach((tipo) => {
      if (!groupedProducts[tipo.nomeTipoProdotto]) {
        groupedProducts[tipo.nomeTipoProdotto] = [];
      }
      groupedProducts[tipo.nomeTipoProdotto].push(prodotto);
    });
  });

  const orderedProducts: any = {};
  tipiRef.forEach((tipo) => {
    if (groupedProducts[tipo]) {
      orderedProducts[tipo] = groupedProducts[tipo];
    }
  });

  return orderedProducts;
}

export function getTotalPrice(newProduct: CartProduct): number {
  let total: number = newProduct.prezzoProdotto;

  newProduct.ingredienti
    .filter((ingrediente) => ingrediente.isExtra)
    .forEach((ingrediente) => {
      total += ingrediente.prezzoIngrediente * ingrediente.quantita;
    });

  return total;
}

export function isChiuso(
  orarioApertura: string,
  orarioChiusura: string
): boolean {
  const now = new Date();

  const [hoursOpen, minutesOpen, secondsOpen] = orarioApertura
    .split(':')
    .map(Number);
  let oraApertura = setSeconds(
    setMinutes(setHours(now, hoursOpen), minutesOpen),
    secondsOpen
  );
  const [hours, minutes, seconds] = orarioChiusura.split(':').map(Number);
  let oraChiusura = setSeconds(
    setMinutes(setHours(now, hours), minutes),
    seconds
  );

  if (oraApertura.getTime() <= oraChiusura.getTime()) {
    // Opening and closing times are on the same day
    if (
      now.getTime() < oraApertura.getTime() ||
      now.getTime() >= oraChiusura.getTime()
    ) {
      return true; // The place is closed
    } else {
      return false; // The place is open
    }
  } else {
    // apertura e chiusura lo stesso giorno
    if (now.getTime() < oraApertura.getTime()) {
      oraApertura = addDays(oraApertura, -1);
      if (
        now.getTime() < oraApertura.getTime() ||
        now.getTime() >= oraChiusura.getTime()
      ) {
        return true; // chiuso
      } else {
        return false; // aperto
      }
    } else if (now.getTime() >= oraChiusura.getTime()) {
      oraChiusura = addDays(oraChiusura, 1);
      if (
        now.getTime() < oraApertura.getTime() ||
        now.getTime() >= oraChiusura.getTime()
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
