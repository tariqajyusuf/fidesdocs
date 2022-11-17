
export default function GetStartedWrap({ children }) {
  return (
    <div className="GetStarted">
      <h2> Get Started </h2>
      <p> According to all known laws of aviation </p>
    <div className="GetStartedWrap">
     {children}
    </div>
    </div>
  );
}

export function GetStarted({ title, link, description }) {
  return (
    <div className="overviewBlockWrap">
      <a
        key={title}
        href={link}
        target="_blank"
        className=""
      >
    <span className="overviewBlock">

      <h3> {title} </h3>
      <p> {description} </p>
      
    </span>
    </a>
    </div>
  );
}
