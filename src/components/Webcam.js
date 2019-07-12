import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Video = styled.div`
  border: 8px solid #222;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  video {
    display: block;
    width: 100%;
  }
`;

const Webcam = ({ value }) => {
  const videoEl = useRef(null);

  useEffect(() => {
    if (!videoEl) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        const video = videoEl.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }, [videoEl]);

  return (
    <Video>
      <video
        muted
        style={{ filter: `${value}` }}
        width={520}
        height={390}
        ref={videoEl}
      />
      <canvas />
    </Video>
  );
};

export default Webcam;
