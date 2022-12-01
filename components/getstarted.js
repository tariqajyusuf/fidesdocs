
export default function GetStartedWrap({ children }) {
  return (
    <div className="GetStarted">
      <h2> Get Started with Fides </h2>
      <p> Not sure where to start? Try the following articles to quickly configure Fides for your business or project needs. </p>
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
