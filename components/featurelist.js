
export default function FeatureList({ children }) {
  return (
    <div className="FeatureList">
    <div className="FeatureListItem">
     {children}
    </div>
    </div>
  );
}

export function FeatureItem({ title, description, enterprise, openSource }) {

  let entSpan;
    if (enterprise) {
      entSpan = <div className="enterprise"></div>;
    }

      let osSpan;
    if (openSource) {
      osSpan = <div className="os"></div>;
    }
  return (

    <div className="featureItem">


    <div class="featureCopy">
      <h3> {title} </h3>
      <p> {description} </p>
    </div>  

    <div class="tagsWrap">
    {entSpan} {osSpan}
    </div>
          
    
    </div>
  );
}



