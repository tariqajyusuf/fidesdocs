
export default function Screenshot({ img, description }) {
  return (
    <span className="screenshot">
     <img alt={description} src={img} />
    </span>
  );
}