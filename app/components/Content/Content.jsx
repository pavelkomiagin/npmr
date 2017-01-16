// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Content.sass';
import cx from 'classnames';
import PackageCard from 'components/PackageCard/PackageCard';
//import jsonfile from 'jsonfile';
import parseJson from 'parse-json';
//import cp from 'child_process';
import npmManager from 'utils/npmManager';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Content extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dependencies: []
    };
  }

  componentDidMount() {
    this.fillPackages();
  }

  @action fillPackages() {
    npmManager.getPackagesInfo().then(info => {
      this.props.packages.splice(0);
      for (let prop in info.dependencies) {
        if (info.dependencies.hasOwnProperty(prop)) {
          this.props.packages.push(info.dependencies[prop]);
        }
      }
    });
  }

  getFileInfo() {
    // const file = './package.json';
    // jsonfile.readFile(file, (err, obj) => {
    //   console.dir(obj);
    //
    //   let deps = [];
    //   for (let prop in obj.dependencies) {
    //     if (obj.dependencies.hasOwnProperty(prop)) {
    //       deps.push({
    //         name: prop,
    //         version: obj.dependencies[prop]
    //       });
    //     }
    //   }
    //
    //   this.setState({
    //     dependencies: deps
    //   });
    // });
  }

  // get dependencies() {
  //   console.log(this.state.dependencies);
  //   return this.state.dependencies.map(item => {
  //     return <PackageCard {...{item}} key={item._id} />;
  //   });
  // }

  render() {
    console.log(this.props.packages);

    return (
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.installPackagesButton}>
            <i className="fa fa-cloud-download" />
            Install packages...
          </div>
        </div>
        {/*<div className={cx(styles.dependenciesContainer, styles.cardView)}>
          {this.dependencies}
        </div>*/}

        <div className={cx(styles.dependenciesContainer, styles.tableView)}>
          <div className={styles.packagesListTitle}>{`Packages (24)`}</div>

          <table className={styles.packagesTable}>
            <thead>
              <tr>
                <th className={styles.checkboxColumn}>
                  <input type="checkbox" name="selectAll"/>
                </th>
                <th>Package name</th>
                <th>Current version</th>
                <th>Wanted version</th>
                <th>Latest version</th>
                <th>Env</th>
              </tr>
            </thead>
            <tbody>
              { this.props.packages.map(item => {
                return (
                  <tr className={styles.packageRow}>
                    <td className={styles.checkboxColumn}>
                      <input type="checkbox" name="select"/>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.version}</td>
                    <td>1.0.3</td>
                    <td>1.0.4</td>
                    <td>dev</td>
                  </tr>
                );
              }) }
            </tbody>
          </table>
          {/*{this.dependencies}*/}
          <div className={styles.packageInfo}>
            <div className={styles.packageInfoTitle}>Additional info for selected package</div>
            <div className={cx(styles.infoItem, styles.name)}>
              <div className={cx(styles.infoItemText, styles.nameText)}>Name:</div>
              <div className={cx(styles.infoItemValue, styles.nameValue)}>babel-preset-stage-0</div>
            </div>
            <div className={cx(styles.infoItem, styles.description)}>
              <div className={cx(styles.infoItemText, styles.descriptionText)}>Description:</div>
              <div className={cx(styles.infoItemValue, styles.descriptionValue)}>-</div>
            </div>
            <div className={cx(styles.infoItem, styles.author)}>
              <div className={cx(styles.infoItemText, styles.authorText)}>Author:</div>
              <div className={cx(styles.infoItemValue, styles.authorValue)}>-</div>
            </div>
            <div className={cx(styles.infoItem, styles.license)}>
              <div className={cx(styles.infoItemText, styles.licenseText)}>License:</div>
              <div className={cx(styles.infoItemValue, styles.licenseValue)}>-</div>
            </div>
            <div className={cx(styles.infoItem, styles.homepage)}>
              <div className={cx(styles.infoItemText, styles.homepageText)}>Homepage:</div>
              <div className={cx(styles.infoItemValue, styles.homepageValue)}>-</div>
            </div>
            <div className={cx(styles.infoItem, styles.repository)}>
              <div className={cx(styles.infoItemText, styles.repositoryText)}>Repository:</div>
              <div className={cx(styles.infoItemValue, styles.repositoryValue)}>-</div>
            </div>
            <div className={cx(styles.infoItem, styles.issues)}>
              <div className={cx(styles.infoItemText, styles.issuesText)}>Issues:</div>
              <div className={cx(styles.infoItemValue, styles.issuesValue)}>-</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
