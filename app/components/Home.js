// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import Sidebar from 'components/Sidebar/Sidebar';
import Content from 'components/Content/Content';
import styles from './Home.sass';

// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
// const { Header, Content, Footer, Sider } = Layout;

//import jsonfile from 'jsonfile';
//import parseJson from 'parse-json';
//import npm from 'npm';
//import stream from 'stream';
//import fs from 'fs';
// import cp from 'child_process';
// const exec = cp.exec;

export default class Home extends Component {

  render() {
    return (
      <div>
        <div className={styles.container}>
          <Sidebar />
          <Content />
        </div>
      </div>
    );
  }
}
