const StickerLocation: React.FC<{ location: string }> = ({ location }) => (
  <td className="sticker-location">{location || "Select location"}</td>
);

export default StickerLocation;
