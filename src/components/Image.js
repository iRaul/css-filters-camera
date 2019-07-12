import React from 'react';
import styled from 'styled-components';

import downloadIcon from '../assets/icons/download.svg';
import imageIcon from '../assets/icons/image.svg';

const ImageWrapper = styled.div`
  position: absolute;
  top: 55px;
  right: -55px;
  width: 150px;
  height: 112.5px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #222;
  background-image: url(${imageIcon});
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 1;

  img {
    width: 100%;
    display: block;
  }

  button {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    visibility: hidden;
    opacity: 0;
    cursor: pointer;
  }

  &.hasImage:hover {
    a {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Image = () => (
  <ImageWrapper>
    <img alt="" />
    <button type="button">
      <img src={downloadIcon} alt="Download Icon" />
    </button>
  </ImageWrapper>
);

export default Image;
