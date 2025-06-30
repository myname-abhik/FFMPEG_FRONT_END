import React from "react";
import Styles from "./Page.module.css";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Page1 = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      // ✅ Check if videoRef is available
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        if (onReady) {
          onReady(player);
        }
      }));

      // ✅ Ensure autoplay is a boolean before applying
      if (typeof options.autoplay === "boolean") {
        player.autoplay(options.autoplay);
      }

      player.src(options.sources);
    }
  }, [options, videoRef, onReady]); // ✅ Added onReady to dependencies

  React.useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div style={{ width: "150vh"  }} data-vjs-player>
        <div ref={videoRef} />
      </div>
    </>
  );
};

export default Page1;

//////////////////////////////
