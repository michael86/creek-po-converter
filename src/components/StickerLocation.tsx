const StickerLocation: React.FC<{ location: string }> = ({ location }) => (
  <td className="sticker-location">{location || <p className="no-print">Select location</p>}</td>
);

export default StickerLocation;
