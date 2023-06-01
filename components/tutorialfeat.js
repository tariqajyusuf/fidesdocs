
export default function KeyTutorialWrap({ children }) {
  return (
    <div className="KeyTutorial">
    <div className="KeyTutorialWrap">
     {children}
    </div>
    </div>
  );
}

export function TutorialFeat({ title, link, description, duration, video, interactive}) {
    let durationSpan;
    if (duration) {
      durationSpan = <span className="tutorial-duration">{duration}min</span>;
    }
  let videoSpan;
    if (video) {
      videoSpan = <span className="tutorial-video">Video</span>;
    }
  let interactiveSpan;
    if (interactive) {
      interactiveSpan = <span className="tutorial-interactive">Interactive</span>;
    }

  return (
    <a
        key={title}
        href={link}
        className="tutorialBlockWrap"
      >
    <div className="">

    <span className="tutorialBlock">

      <h3> {title} </h3>
      <p> {description} </p>
      
    </span>
          
      <div className="tutorialCTAKey">
        {durationSpan}{videoSpan}{interactiveSpan}
    </div>
    </div>
    </a>
  );
}
