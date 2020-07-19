import * as React from 'react';

import './scss/base.scss';
import logo from './logo.svg';

const App: React.FC = () => {
  return (
    <div className='App px-20'>
      <header className='App-header'>
        <img alt='logo' className='App-logo' src={logo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          rel='noopener noreferrer'
          target='_blank'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
