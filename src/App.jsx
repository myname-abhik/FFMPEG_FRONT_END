import { useState, useRef } from "react";
import videojs from "video.js"; // ✅ Added import
import Page1 from "./Page1";

function App() {
  const playerRef = useRef(null);
  const videoLink = "https://ffmpeg-mauve.vercel.app/hls/index.m3u8";
  // const videoLink = "https://res.cloudinary.com/dfkhg7gkp/video/upload/v1742812634/hls_videos/dwuxpt8grh8hz3usqi7u.m3u8";

  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <Page1 options={videoPlayerOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default App;
