import Link from "next/link";

export default function ArticleFeatWrap({ children }) {
  return (
    <div className="ArticleFeat">
    <div className="ArticleFeatWrap">
     {children}
    </div>
    </div>
  );
}

export function ArticleFeat({ title, link, img}) {
  return (

    <Link legacyBehavior href={link}>
    <a
        key={title}
        href={link}
        className="articleBlockWrap"
      >
    <img alt={title} src={img}/>
    <div className="">
    <span className="featBlock">

      <h3> {title} </h3>
      
    </span>    
    </div>
    </a>
    </Link>
  );
}


