
export default function TutorialKey({ duration, product, topic, video, interactive }) {
  let durationSpan;
    if (duration) {
      durationSpan = <span className="tutorial-duration">{duration}min</span>;
    }
  let productSpan;
    if (product) {
      productSpan = <span className="tutorial-product">{product}</span>;
    }
  let topicSpan;
    if (topic) {
      topicSpan = <span className="tutorial-topic">{topic}</span>;
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
    <div className="tutorialKey">
        {durationSpan}{productSpan}{topicSpan}{videoSpan}{interactiveSpan}
    </div>
  );
}