
export default function ThreeColWrap({ children }) {
  return (
    <div className="ThreeCol">
      <h2> Get Started </h2>
    <div className="ThreeColWrap">
     {children}
    </div>
    </div>
  );
}

export function ThreeCol({ title, link, description }) {
  return (
    <div className="blockWrap">
      <a
        key={title}
        href={link}
        className=""
      >
    <span className="block">

      <h3> {title} </h3>
      <p> {description} </p>
      
    </span>
    </a>
    </div>
  );
}
