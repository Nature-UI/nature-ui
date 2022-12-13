import React from 'react';

export const modalStyles: React.CSSProperties = {
  maxWidth: '630px',
  minWidth: '320px',
  background: 'skyblue',
  minHeight: 300,
  height: 'auto',
  padding: '1rem',
  borderRadius: '5px',
  margin: '1rem',
};

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Modal = (props: DivProps) => (
  <div
    {...props}
    style={{
      ...modalStyles,
      ...props.style,
    }}
    className='bg-red-500'
  >
    <h1 className='text-lg font-bold'>Animate Me</h1>
    <p className='mt-6'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius porro quas
      tempora delectus magni esse vero dolorum laudantium veritatis illum.
    </p>
  </div>
);
