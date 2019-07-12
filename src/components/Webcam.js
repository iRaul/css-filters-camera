import React from 'react';
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

const Webcam = ({ children }) => <Video>{children}</Video>;

export default Webcam;
