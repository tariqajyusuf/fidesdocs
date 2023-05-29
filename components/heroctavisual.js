
export default function HeroCTAVisual({ title, body, cta, href, image }) {
  return (
    <div className="HeroCTAVisual">
        <div className="branded-callout">
          <h1> {title} </h1>
          <p> {body} </p>
          <a className="brand-cta" href="{href}"> {cta} </a>
        </div>
         <div className="HeroCTAImage">
            <img src={image}></img>
         </div>
    </div>
  );
}