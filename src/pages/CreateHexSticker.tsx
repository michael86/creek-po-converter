import "../styles/create_hex.css";

import HexStickerSheet from "../components/HexStickerSheet";
import { useAppSelector } from "../hooks";

import GenerateHex from "../components/GenerateHex";

const CreateHexSticker = () => {
  const { print } = useAppSelector((state) => state.hex);

  return (
    <>
      {print ? (
        <HexStickerSheet
          topMargin={1.2}
          sideMargin={0.4}
          verticalPitch={0}
          horizontalPitch={2.0 - 1.7}
          labelHeight={1.0}
          labelWidth={1.7}
          numberAcross={10}
          numberDown={27}
        />
      ) : (
        <GenerateHex />
      )}
    </>
  );
};

export default CreateHexSticker;
