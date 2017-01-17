// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observable, action, transaction, asFlat } from 'mobx';
import { observer } from 'mobx-react';
import npmManager from 'utils/npmManager';
import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Home.sass';
import { message } from 'antd';
import DevTools from 'mobx-react-devtools';

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

  @action fetchPackagesInfo() {
    this.loading = true;
    const tmpArray = [];
    this.fetchMessage = message.loading("Fetch installed packages info... (Command 'npm ls -l -json -depth 0')", 0);
    npmManager.getPackagesInfo().then(info => {
      for (let prop in info.dependencies) {
        if (info.dependencies.hasOwnProperty(prop)) {
          tmpArray.push(info.dependencies[prop]);
          //this.packages.push(info.dependencies[prop]);
        }
      }
      this.packages.replace(tmpArray);
      this.loading = false;
      this.fetchMessage();
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
        <DevTools />
      </div>
    );
  }
}
