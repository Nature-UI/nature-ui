import * as React from 'react';
import { parser } from '../src';

export default {
  title: 'Parser',
};

const theme = {
  padding: '1rem',
  boxSizing: 'border-box',
};

const styles = parser({
  // css: {
  //   display: 'flex',
  //   color: 'primary',

  // },
  display: 'flex',
  color: 'blue',
  // _active: {
  //   display: 'flex',
  // },
  // _focus: {
  //   padding: '1rem',
  //   boxSizing: 'border-box',
  // },
});

export const Test = () => {
  console.log({ styles });

  return (
    <div>
      {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
      <pre>{JSON.stringify(styles, null, 2)}</pre>
    </div>
  );
};
