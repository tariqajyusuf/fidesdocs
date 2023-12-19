
export default function VimeoVideo({ src }) {

  return (
    <div style={{position: 'relative'}}>
    <div style={{ padding:'56.25% 0 0 0', margin: 'relative', margin:' 10px 0px' }}>
        <iframe src={src} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ position: 'absolute' , top: '0', left:'0', width: '100%', height: '100%', loading: 'lazy' }} title="Privacy Orientation"></iframe>
    </div>
    <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
}