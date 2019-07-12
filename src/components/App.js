import React, { useState } from 'react';
import Select from 'react-select';

import Container from './Container';
import Webcam from './Webcam';
import Image from './Image';
import Capture from './Capture';

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

  const [filter, setFilter] = useState(null);

  const handleFilter = e => {
    setFilter({
      value: e.value,
    });

    console.log(filter);
  };

  const handleCapture = () => {
    console.log('CAPTURE!');
  };

  return (
    <Container>
      <Image />

      <Webcam {...filter} />

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
