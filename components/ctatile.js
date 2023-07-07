import Link from "next/link";

export default function CtaTileWrap({ children }) {
  return (
    <div className="CtaFeat">
    <div className="CtaFeatWrap">
     {children}
    </div>
    </div>
  );
}

export function CtaTile({ title, link }) {
  return (

    <Link legacyBehavior href={link}>
    <a
    key={title}
    href={link}
    className=""
  >
    <div className="ctaBlockWrap">

    <span className="ctaBlock">

      <h3> {title} </h3>
      
    </span>
          
    </div>
    </a>
    </Link>
  );
}
