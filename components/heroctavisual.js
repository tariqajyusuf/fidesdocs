import Link from "next/link";

export default function HeroCTAVisual({ title, highlight, body, cta, href, image, bg }) {
  return (
    <div className="HeroCTAVisual" style={{backgroundImage: `url(${bg})`}}>
        <div className="branded-callout">
          <h1> {title} <span style={{color:'#955CFF'}}>{highlight}</span></h1>
          <p> {body} </p>

    <Link legacyBehavior href={href}>
          <a className="brand-cta" href="{href}" target="_blank"> {cta} </a>
          </Link>
        </div>
         <div className="HeroCTAImage">
            <img src={image} alt=""></img>
         </div>
    </div>
  );
}