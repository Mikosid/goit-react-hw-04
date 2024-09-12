export default function ImageCard({ alt, src, onClick }) {
  return (
    <div>
      <img src={src} alt={alt} onClick={onClick} />
    </div>
  );
}
