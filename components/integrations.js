import Link from "next/link";

export default function TopIntegrationsWrap({ children }) {
  return (
    <div className="Integrations">
      <h2> Get Started with Fides </h2>
      <p> Not sure where to start? Try the following articles to quickly configure Fides for your business or project needs. </p>
    <div className="IntegrationsWrap">
     {children}
    </div>
    </div>
  );
}

export function TopIntegrations({ name, link }) {
  return (
    <div className="overviewBlockWrap">

    <Link legacyBehavior href={link}>
      <a
        key={title}
        href={link}
        target="_blank"
        className=""
      >
    <span className="overviewBlock">

      <h3> {name} </h3>
    </span>
    </a>
    </Link>
    </div>
  );
}
