import React from 'react';
import { Button, Slider } from 'antd';

interface VideoControlsProps {
  selectedVideo: { name: string; url: string } | null;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (seconds: number) => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  selectedVideo,
  onPlay,
  onPause,
  onSeek
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
        {selectedVideo ? (
          <div className="text-2xl font-bold">{selectedVideo.name}</div>
        ) : (
          <div className="text-2xl font-bold">No video selected</div>
        )}
      </div>
      <div className="flex space-x-4">
        <Button type="primary" onClick={onPlay}>
          Play
        </Button>
        <Button type="default" onClick={onPause}>
          Pause
        </Button>
        <Button type="dashed" onClick={() => onSeek(10)}>
          Seek +10s
        </Button>
      </div>
      <div className="w-full max-w-lg">
        <Slider
          min={0}
          max={100}
          defaultValue={0}
          tooltip={{ formatter: (value) => `${value}s` }}
          onChange={(value) => onSeek(value as number)}
        />
      </div>
    </div>
  );
};

export default VideoControls;
