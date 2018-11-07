import React from 'react';
import Routes from './router/Routes';
import styles from './App.scss';

const App = () => (
  <div className={styles.bgWrapper}>
    <header>
      <div className={styles.logo}/>
      NoriginMedia
    </header>
    <div role='main' className={styles.wrapper}>
      <Routes />
    </div>
  </div>
);

export default App;
