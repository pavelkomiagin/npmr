// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Preloader.sass';

class Preloader extends Component {

  render() {
    return (
      <div className={styles.preloader}>
        <div className={styles.point} />
        <div className={styles.point} />
      </div>
    );
  }
}

export default Preloader;
