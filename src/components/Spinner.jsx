import React from 'react';
import { Vortex } from 'react-loader-spinner'
const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Vortex
        colors={['red', 'green', 'blue', 'purple']}
        height='120'
        width='120'
      />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  );
};

export default Spinner;
