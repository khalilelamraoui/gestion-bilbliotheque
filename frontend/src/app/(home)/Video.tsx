import React from 'react';

interface VideoSectionProps {
  muted?: boolean;
  loop?: boolean;
}

const VideoSection: React.FC<VideoSectionProps> = ({ muted = true, loop = true }) => {
  const pixelEffectStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
    backgroundImage: 'url(/path/to/pixelated-image.jpg)', // Set the pixelated image as the background
    backgroundSize: '100% 100%', // Ensure the image covers the entire area
    pointerEvents: 'none', // Make sure the pixelated effect doesn't interfere with video playback
    opacity: 0.5, // Adjust the opacity as needed
  };

  return (
    <div className="videoSection" style={{ position: 'relative' }}>
      <video
        className="video"
        autoPlay
        muted={muted}
        loop={loop}
        playsInline
        poster="/path/to/fallback-image.jpg"
        style={{ position: 'relative', zIndex: 1 }} // Ensure the video is on top of the pixelated effect
      >
        <source src="/vid2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="pixelEffect" style={pixelEffectStyle} />
    </div>
  );
};

export default VideoSection;
