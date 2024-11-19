import React, { useRef } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  onPlayerReady?: (player: YouTubePlayer) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  onPlayerReady
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null);

  const handleReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    if (onPlayerReady) onPlayerReady(event.target);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6">
      <YouTube
        videoId={videoId}
        onReady={handleReady}
        className="w-full"
        opts={{
          playerVars: {
            autoplay: 0,
            controls: 0 // Hides default YouTube controls
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;
