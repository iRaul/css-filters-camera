import React from 'react';
import styled from 'styled-components';

import cameraIcon from '../assets/icons/camera.svg';

const Button = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  padding: 8px;
  background: #222;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  margin: -42px auto 20px;
  transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  outline: none;
  display: block;
  transform: scale(1);

  &:active {
    transform: scale(0.9);
  }
`;

const Capture = ({ onClick }) => (
  <Button onClick={onClick}>
    <img src={cameraIcon} alt="Camera Icon" />
  </Button>
);

export default Capture;
