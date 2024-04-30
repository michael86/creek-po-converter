import "../styles/stickers.css";
import SelectedStickers from "../components/StickerTable";
import PoSelect from "../components/PoSelect";
import { useAppSelector } from "../hooks";

const DownloadPo = () => {
  const { order } = useAppSelector((state) => state.purchase);

  return (
    <>
      <PoSelect />
      {order && <SelectedStickers />}
    </>
  );
};

export default DownloadPo;
