// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Sidebar.sass';
import cx from 'classnames';

class Sidebar extends Component {

  // get tags() {
  //   const { item } = this.props;
  //
  //   return (
  //     <div className={styles.keywords}>
  //       { item.keywords &&
  //         item.keywords.map((keyword, index) => {
  //           return (
  //             <div className={styles.keyword} key={index}>{keyword}</div>
  //           );
  //         })
  //       }
  //     </div>
  //   );
  // }

  render() {
    //const { item } = this.props;

    return (
      <div className={styles.sidebar}>
        <div className={styles.top}>
          <div className={styles.npmVersionText}>
            Installed npm version:
            <span className={styles.npmVersion}>4.1.1</span>
          </div>
          <div className={styles.updateNpmButton}>
            <i className="fa fa-refresh" />
            Update
          </div>
        </div>
        <div className={styles.sidebarItems}>
          <div className={cx(styles.sidebarItem, styles.globalPackages)}>
            <i className="fa fa-globe" />
            Global packages
          </div>

          <div className={styles.divider} />

          <div className={styles.projectsText}>Projects</div>

          <div className={cx(styles.sidebarItem, styles.projectPackages)}>
            <i className="fa fa-folder" />
            erly_fronts
          </div>

          <div className={cx(styles.sidebarItem, styles.projectPackages)}>
            <i className="fa fa-folder" />
            stoege
          </div>
        </div>

        <div className={styles.addProjectButton}>
          <i className="fa fa-plus" />
          Add project
        </div>
      </div>
    );
  }
}

// Sidebar.propTypes = {
//   item: PropTypes.object
// };

export default Sidebar;
