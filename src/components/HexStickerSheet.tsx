import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setHexPrint } from "../slices/hex";

interface StickerSheetProps {
  topMargin: number;
  sideMargin: number;
  verticalPitch: number;
  horizontalPitch: number;
  labelHeight: number;
  labelWidth: number;
  numberAcross: number;
  numberDown: number;
}

const HexStickerSheet: React.FC<StickerSheetProps> = ({
  topMargin,
  sideMargin,
  verticalPitch,
  horizontalPitch,
  labelHeight,
  labelWidth,
  numberAcross,
  numberDown,
}) => {
  const { data, radio } = useAppSelector((state) => state.hex);
  const dispatch = useAppDispatch();

  // Calculate the total height and width of the grid, factoring in the labels and spacing
  const totalHeight = labelHeight * numberDown + verticalPitch * (numberDown - 1);
  const totalWidth = labelWidth * numberAcross + horizontalPitch * (numberAcross - 1);

  const generateStyles = (): React.CSSProperties => {
    return {
      marginTop: `${topMargin}cm`,
      marginLeft: `${sideMargin}cm`,
      display: "grid",
      gridTemplateColumns: `repeat(${numberAcross}, ${labelWidth}cm)`,
      gridTemplateRows: `repeat(${numberDown}, ${labelHeight}cm)`,
      gap: `${verticalPitch}cm ${horizontalPitch}cm`,
      position: "relative" as "relative",
      height: `${totalHeight}cm`, // Updated height calculation
      width: `${totalWidth}cm`, // Updated width calculation
    };
  };

  useEffect(() => {
    window.print();
  }, []);

  return (
    <>
      <button onClick={() => dispatch(setHexPrint(false))}>Back</button>
      <div className="sticker-sheet" style={generateStyles()}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: `${labelWidth}cm`,
                height: `${labelHeight}cm`,
                border: "1px solid black",
                textAlign: "center",
                lineHeight: `${labelHeight}cm`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {radio === 0 ? item.decimal : item.hex}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HexStickerSheet;
