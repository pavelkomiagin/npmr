// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Home.sass';

let packages = observable([]);

@observer
export default class Home extends Component {

  render() {
    return (
      <div>
        <div className={styles.container}>
          <Sidebar />
          <Content packages={packages} />
        </div>
      </div>
    );
  }
}
