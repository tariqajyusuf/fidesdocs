
export default function Screenshot({ img, description, mw }) {
console.log('mw : '+mw);
  return (
    <span className="screenshot">
     <img alt={description} src={img} width={mw}/>
    </span>
  );
}