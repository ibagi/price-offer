import Decimal from 'decimal.js';
import type { Currency } from './types';

export function getDecimalPlaces(currency: Currency) {
  switch (currency) {
    case 'EUR':
      return 2;
    default:
      return 0;
  }
}

export function netto(prices: number[], currency: Currency) {
  return round(
    prices.reduce((sum, price) => sum + price, 0),
    currency,
  );
}

export function tax(netValue: number, taxRate: number, currency: Currency) {
  const taxMultiplier = new Decimal(taxRate / 100)
    .toDecimalPlaces(2)
    .toNumber();

  return round(netValue * taxMultiplier, currency);
}

export function brutto(netValue: number, taxValue: number, currency: Currency) {
  return round(netValue + taxValue, currency);
}

export function round(value: number, currency: Currency) {
  return new Decimal(value)
    .toDecimalPlaces(getDecimalPlaces(currency))
    .toNumber();
}

export function roundToFractions(value: number, fractions: number) {
  return new Decimal(value).toDecimalPlaces(fractions).toNumber();
}
