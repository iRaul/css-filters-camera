import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';

import Container from './Container';
import Webcam from './Webcam';
import Image from './Image';
import Capture from './Capture';

import downloadIcon from '../assets/icons/download.svg';

const App = () => {
  const filters = [
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
    {
      value: 'contrast(1.4) saturate(1.8) sepia(.6)',
      label: 'Multiple Filters',
    },
  ];

  const [filter, setFilter] = useState('');
  const [image, setImage] = useState(null);

  const canvasElm = useRef(null);
  const videoElm = useRef(null);

  const handleFilter = e => {
    setFilter({
      value: e.value,
    });
  };

  const handleCapture = () => {
    const canvas = canvasElm.current;
    const video = videoElm.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = video;

    ctx.filter = filter.value;
    ctx.drawImage(video, 0, 0, width, height);

    console.log(ctx);

    setImage(canvas.toDataURL('image/png'));
  };

  useEffect(() => {
    if (!videoElm) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        const video = videoElm.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log(`Error: ${error}`);
      });
  }, [videoElm]);

  return (
    <Container>
      <Image className={image ? 'hasImage' : ''}>
        <img
          className="filtered-image"
          src={image}
          alt={image ? 'Filtered Pic' : ''}
        />
        <a href={image} download="filtered-image">
          <img src={downloadIcon} alt="Download Icon" />
        </a>
      </Image>

      <Webcam>
        <video
          muted
          style={{ filter: `${filter.value}` }}
          width={520}
          height={390}
          ref={videoElm}
        />
        <canvas width={520} height={390} ref={canvasElm} />
      </Webcam>

      <Capture onClick={handleCapture} />

      <Select
        className="select-filter"
        onChange={handleFilter}
        options={filters}
        placeholder="Select CSS Filter"
        maxMenuHeight="160"
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: 'rgba(34, 34, 34, 0.3)',
            primary: '#222',
          },
        })}
      />
    </Container>
  );
};

export default App;
