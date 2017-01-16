// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import npmManager from 'utils/npmManager';
import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Home.sass';

class PackagesStore {
  @observable packages = [];
  @observable loading = false;
  @observable selectedPackage = {};

  @action fetchGlobalPackagesInfo() {
    this.loading = true;
    npmManager.getGlobalPackagesInfo().then(info => {
      this.packages = [];

      for (let prop in info.dependencies) {
        if (info.dependencies.hasOwnProperty(prop)) {
          this.packages.push(info.dependencies[prop]);
        }
      }
      this.loading = false;
    });
  }

  @action selectPackage(id) {
    this.selectedPackage = this.packages.find(item => item._id === id);
  }
}

let packagesStore = new PackagesStore();

@observer
export default class Home extends Component {

  render() {
    return (
      <div>
        <div className={styles.container}>
          <Sidebar packagesStore={packagesStore} />
          <Content packagesStore={packagesStore} />
        </div>
      </div>
    );
  }
}
