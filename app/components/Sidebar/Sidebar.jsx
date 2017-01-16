// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Sidebar.sass';
import cx from 'classnames';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import npmManager from 'utils/npmManager';

@observer
class Sidebar extends Component {

  @observable npmVersion = '';

  constructor(props, context) {
    super(props, context);

    this.handleGlobalPackagesClick = this.handleGlobalPackagesClick.bind(this);
  }

  componentDidMount() {
    npmManager.getNpmVersion().then(version => {
      this.npmVersion = version;
    });
  }

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

  handleGlobalPackagesClick() {
    npmManager.getGlobalPackagesInfo().then(info => {
      console.log(info)
    });
  }

  render() {
    //const { item } = this.props;

    return (
      <div className={styles.sidebar}>
        <div className={styles.top}>
          <div className={styles.npmVersionText}>
            Installed npm version:
            <span className={styles.npmVersion}>{this.npmVersion}</span>
          </div>
          <div className={styles.updateNpmButton}>
            <i className="fa fa-refresh" />
            Update
          </div>
        </div>
        <div className={styles.sidebarItems}>
          <div
            className={cx(styles.sidebarItem, styles.globalPackages)}
            onClick={ this.handleGlobalPackagesClick }
          >
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
