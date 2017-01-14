// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './PackageCard.sass';

class PackageCard extends Component {

  componentDidMount() {
    console.dir(styles.packageCard);
  }

  get tags() {
    const { item } = this.props;

    return (
      <div className={styles.keywords}>
        { item.keywords &&
          item.keywords.map((keyword, index) => {
            return (
              <div className={styles.keyword} key={index}>{keyword}</div>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { item } = this.props;

    return (
      <div className={styles.packageCard}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.version}>{`${item.version}`}</div>
        <div title={item.description} className={styles.description}>{item.description}</div>
        <a href={item.homepage} className={styles.link}>{item.homepage}</a>
        {this.tags}
      </div>
    );
  }
}

PackageCard.propTypes = {
  item: PropTypes.object
};

export default PackageCard;
