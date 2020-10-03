import * as React from 'react';

export const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '50%',
  maxWidth: '630px',
  minWidth: '320px',
  background: 'orange',
  minHeight: 300,
  height: 'auto',
  backfaceVisibility: 'hidden',
  padding: '1rem',
  transform: `translateX(-50%) translateY(-50%)`,
};

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const Modal = (props: DivProps) => (
  <div {...props} style={{ ...modalStyles, ...props.style }}>
    <h1 className='text-lg font-bold'>Animate Me</h1>
    <p className='mt-6'>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius porro quas
      tempora delectus magni esse vero dolorum laudantium veritatis illum.
    </p>
  </div>
);
