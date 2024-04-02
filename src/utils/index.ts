import { Dispatch, SetStateAction } from "react";
import { Parts } from "../slices/purchaseOrders";

export const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}/${month < 10 && "0"}${month + 1}/${year}`;
};

export const getRandomColor = () => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 255 + 1);
  };

  return `rgba(${getRandomNumber()}, ${getRandomNumber()}, ${getRandomNumber()},0.5)`;
};

export const sumUpParcels = (sum: number, target: number | number[]) => {
  if (typeof target === "number") {
    return sum !== target ? (sum > target ? "To many parcels" : "Not enough parcels") : undefined;
  }

  if (Array.isArray(target)) {
    const _sum = target.reduce((partialSum, value) => partialSum + value, 0);
    return _sum !== sum && (_sum > sum ? "Not enough parcels" : "To many parcels");
  }

  return undefined;
};

type OnParcelInput = (value: string, dispatch: Dispatch<SetStateAction<string>>) => void;

export const onParcelInput: OnParcelInput = (value, dispatch) => {
  if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
  dispatch(value);
};

export const findIndexBySku = (arr: Parts, sku: string) =>
  arr.findIndex((part) => part[0].toLowerCase() === sku.toLowerCase());
