
export default function HeroVisual({ title, image }) {
  return (
    <div className="HeroVisual">
         <h1> {title} </h1>
         <div className="HeroImage">
            <img src={image} alt=""></img>
         </div>
    </div>
  );
}