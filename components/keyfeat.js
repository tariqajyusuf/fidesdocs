import Link from "next/link";

export default function KeyFeatWrap({ children }) {
  return (
    <div className="KeyFeat">
    <div className="KeyFeatWrap">
     {children}
    </div>
    </div>
  );
}

export function KeyFeat({ title, link, description }) {
  return (

    <Link legacyBehavior href={link}>
    <a
        key={title}
        href={link}
        className="featBlockWrap"
      >
    <div className="">

    <span className="featBlock">

      <h3> {title} </h3>
      <p> {description} </p>
      
    </span>
          
      <span className="featCTA">Learn more</span>
    
    </div>
    </a>
    </Link>
  );
}
