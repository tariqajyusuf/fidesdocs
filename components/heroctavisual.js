import Link from "next/link";

export default function HeroCTAVisual({ title, body, cta, href, image }) {
  return (
    <div className="HeroCTAVisual">
        <div className="branded-callout">
          <h1> {title} </h1>
          <p> {body} </p>

    <Link legacyBehavior href={href}>
          <a className="brand-cta" href="{href}"> {cta} </a>
          </Link>
        </div>
         <div className="HeroCTAImage">
            <img src={image}></img>
         </div>
    </div>
  );
}