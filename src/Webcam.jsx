// React
import React, { Component } from 'react';

// Styled Components
import styled from 'styled-components';

// Components
import SnapButton from './SnapButton';

// React Select
import Select from 'react-select';

// Icons
import imgIcn from './image.svg';
import downloadIcn from './download.svg';

const Title = styled.h1`
  color: #222;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
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
  { value: 'grayscale(1)', label: 'Grayscale' },
  { value: 'sepia(1)', label: 'Sepia' },
  { value: 'saturate(4)', label: 'Saturation' },
  { value: 'invert(.8)', label: 'Invert' },
  { value: 'hue-rotate(90deg)', label: 'Hue' },
  { value: 'contrast(4)', label: 'Contrast' },
  { value: 'brightness(.5)', label: 'Brightness' },
  { value: 'blur(5px)', label: 'Blur' },
  { value: 'sepia(1) hue-rotate(200deg)', label: 'Tint' },
  { value: 'grayscale(1) brightness(0.45) contrast(1.05)', label: 'Inkwell' },
  { value: 'contrast(1.4) saturate(1.8) sepia(.6)', label: 'Multiple Filters' }
]

class Webcam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      snapIsPressed: false
    }
  }

  componentDidMount() {
    const video = this.refs.video;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.log(`Error: ${ error }`)
    });
  }

  takePic = () => {
    const canvas = this.refs.canvas;
    const video = this.refs.video;
    const ctx = canvas.getContext('2d');
    const { width, height } = this.refs.video;

    ctx.filter = this.state.selectedOption;
    ctx.drawImage(video, 0, 0, width, height);

    const imageURL = canvas.toDataURL('image/png');
    const image = this.refs.image;
    const downloadBtn = this.refs.downloadBtn;

    downloadBtn.href = imageURL;

    downloadBtn.setAttribute('download', 'filtered-image');
    image.setAttribute('src', imageURL);

  }

  handleFilterChange = (e) => {
    this.setState({ selectedOption: e.value });
    console.log(e.value);
  }

  handleTakePic = (event) => {
    event.preventDefault();
    this.takePic();
    this.setState({ snapIsPressed: true })
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <Title>CSS Filters Camera</Title>

        <VideoWrapper>
          <video
            ref='video'
            width={ 400 }
            height={ 300 }
            style={{
              display: 'block',
              filter: `${ selectedOption }`
            }}>
          </video>
        </VideoWrapper>

        <canvas
          ref='canvas'
          width={ 400 }
          height={ 300 }></canvas>

        <SnapButton handleTakePic={ this.handleTakePic } />

        <Select
          onChange={ this.handleFilterChange }
          options={ cssFilters }
          placeholder='Select CSS Filter'
          maxMenuHeight='100'
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: 'rgba(34, 34, 34, 0.3)',
              primary: '#222',
            },
          })}
        />

        <ImageWrapper className={ this.state.snapIsPressed ? 'hasImage' : false }>
          <Image
            ref='image'
            alt=''/>
          <DownloadBtn ref='downloadBtn'>
            <img
              src={ downloadIcn }
              alt='Download Icon'/>
          </DownloadBtn>
        </ImageWrapper>
      </div>
    )
  }
}

export default Webcam;