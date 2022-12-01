
export default function KeyFeatWrap({ children }) {
  return (
    <div className="KeyFeat">
      <h2> Key Features </h2>
    <div className="KeyFeatWrap">
     {children}
    </div>
    </div>
  );
}

export function KeyFeat({ title, link, description }) {
  return (
    <div className="featBlockWrap">

    <span className="featBlock">

      <h3> {title} </h3>
      <p> {description} </p>
      
    </span>
          <a
        key={title}
        href={link}
        className=""
      >
      Learn more
    </a>
    </div>
  );
}
