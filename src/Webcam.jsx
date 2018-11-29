// React
import React, { Component } from 'react';

// Styled Components
import styled from 'styled-components';

// Components
import SnapButton from './SnapButton';

// React Select
import Select from 'react-select';

// Image Icon
import imgIcn from './image.svg';
import downloadIcn from './download.svg';


const ImageWrapper = styled.div`
  position: absolute;
  top: -55px;
  right: -55px;
  width: 150px;
  height: 112.5px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #222;
  background-image: url(${ imgIcn });
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  &.hasImage:hover {
    a {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  display: block;
`;

const VideoWrapper = styled.div`
  border: 8px solid #222;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`;

const DownloadBtn = styled.a`
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
`;

const cssFilters = [
  { value: 'none', label: 'Normal' },
  { value: 'grayscale(100%)', label: 'Grayscale' },
  { value: 'sepia(100%)', label: 'Sepia' },
  { value: 'invert(100%)', label: 'Invert' },
  { value: 'hue-rotate(90deg)', label: 'Hue' },
  { value: 'contrast(200%)', label: 'Contrast' }
]

class Webcam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      snapIsPressed: false
    }

    this.handleTakePic = this.handleTakePic.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.takePic = this.takePic.bind(this);
  }

  componentDidMount() {
    const video = document.querySelector('video');

    navigator.mediaDevices.getUserMedia({
      video: {
        width: 400,
        height: 300
      },
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.log(`Error: ${ error }`)
    });
  }

  takePic() {
    const width = 400;
    const height = 300;
    const canvas = document.querySelector('canvas');
    const video = document.querySelector('video');
    const context = canvas.getContext('2d');

    if (width && height) {
      canvas.width = width;
      canvas.height = height;

      context.drawImage(video, 0, 0, width, height);

      const imgURL = canvas.toDataURL('image/png');
      const img = document.querySelector('img');
      const link = document.querySelector('a');

      link.href = imgURL;

      link.setAttribute('download', 'filtered-image');
      img.setAttribute('src', imgURL);
      img.style.filter = this.state.selectedOption;
    }
  }

  handleFilterChange(e) {
    this.setState({ selectedOption: e.value });
    console.log(e.value);
  }

  handleTakePic(event) {
    event.preventDefault();
    this.takePic();
    this.setState({ snapIsPressed: true })
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <VideoWrapper>
          <video
            style={{
              display: 'block',
              filter: `${ selectedOption }`
            }}>
          </video>
        </VideoWrapper>

        <canvas></canvas>

        <SnapButton handleTakePic={ this.handleTakePic } />

        <Select
          value={ selectedOption }
          onChange={ this.handleFilterChange }
          options={ cssFilters }
          placeholder='Select CSS Filter'
        />

        <ImageWrapper className={ this.state.snapIsPressed ? 'hasImage' : false }>
          <Image alt=''/>
          <DownloadBtn>
            <img src={ downloadIcn } alt='Download Icon'/>
          </DownloadBtn>
        </ImageWrapper>
      </div>
    )
  }
}

export default Webcam;