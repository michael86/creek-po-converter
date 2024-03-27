import { ReducerType } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { DispatchProp } from "react-redux";

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
    return sum !== target ? (sum > target ? "To many parcels" : "Not enough parcels") : "";
  }

  if (Array.isArray(target)) {
    const _sum = target.reduce((partialSum, value) => partialSum + value, 0);
    return _sum !== sum && (_sum > sum ? "Not enough parcels" : "To many parcels");
  }

  return;
};

type InputState = {
  val: string;
  error: string;
};

type OnParcelInput = (
  value: string,
  dispatch: Dispatch<SetStateAction<InputState>>,
  inputState: InputState
) => void;

export const onParcelInput: OnParcelInput = (value, dispatch, inputState) => {
  if (!value.match(/^\d*(,\d*)*$/)) return; // Only allow numeric input
  dispatch({ ...inputState, val: value });
};

type OnParcelSubmit = (
  inputState: InputState,
  partialConfirmed: boolean,
  setInputState: Dispatch<SetStateAction<InputState>>,
  dispatch: DispatchProp,
  setPartCount: ReducerType,
  qty: number
) => void;

// export const onParcelSubmit: OnParcelSubmit = (
//   inputState,
//   partialConfirmed,
//   setInputState,
//   dispatch,
//   setPartCount,
//   qty
// ) => {
//   const parcels = inputState.val.split(",").map(Number);
//   const sum = parcels.reduce((partialSum, a) => partialSum + a, 0);

//   const errorMessage = sumUpParcels(sum, qty);
//   const notEnoughErrorMessage = errorMessage && errorMessage.toLowerCase().includes("not");

//   if (errorMessage && (!notEnoughErrorMessage || !partialConfirmed)) {
//     setInputState({
//       ...inputState,
//       error: errorMessage,
//     });
//     return;
//   }

//   setInputState({ ...inputState, error: "" });
//   const copy = structuredClone(partNumbers);
//   copy[index][1] = parcels.length > 1 ? parcels : parcels[0];

//   dispatch(setPartCount(copy));
// };
