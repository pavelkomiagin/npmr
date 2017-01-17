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

import { Spin } from 'antd';
import { Checkbox } from 'antd';
import { Table, Icon, Switch, Radio, Form } from 'antd';
import { message } from 'antd';

@observer
class Content extends Component {

  @observable loading = true;

  // get dependencies() {
  //   console.log(this.state.dependencies);
  //   return this.state.dependencies.map(item => {
  //     return <PackageCard {...{item}} key={item._id} />;
  //   });
  // }

  componentDidMount() {

  }

  componentDidUpdate(nextProps) {
    // Start async loading
    console.log(this.props.packagesStore.loading, nextProps.packagesStore.loading);
    if (!this.props.packagesStore.loading && nextProps.packagesStore.loading) {
      this.fetchMessage = message.loading('Fetch installed packages info...', 0);
      return;
    }

    // Stop async loading
    if (this.props.packagesStore.loading && !nextProps.packagesStore.loading) {
      this.fetchMessage();
    }
  }

  get tableColumns() {
    return [{
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      //onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      }
    }, {
      title: 'CURRENT VERSION',
      dataIndex: 'current',
      key: 'current',
      width: 70,
    }, {
      title: 'WANTED VERSION',
      dataIndex: 'wanted',
      key: 'wanted',
      width: 70,
    }, {
      title: 'LATEST VERSION',
      dataIndex: 'latest',
      key: 'latest',
      width: 70,
    }, {
      title: 'ENVIRONMENT',
      dataIndex: 'environment',
      key: 'environment',
      width: 70,
    }, {
      title: 'ACTIONS',
      key: 'actions',
      width: 70,
      render: (text, record) => (
        <span>
          <a href="#" className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }];
  }

  get tableSettings() {
    return {
      bordered: true,
      loading: this.props.packagesStore.loading,
      pagination: false,
      size: 'small',
      showHeader: true,
      rowSelection: {},
      scroll: undefined,
      locale: {
        emptyText: 'No Data'
      }
    }
  }

  render() {
    const { packagesStore } = this.props;

    const selectedPackage = packagesStore.selectedPackage;

    const selectedPackageName = selectedPackage.name || '';
    const selectedPackageDescription = selectedPackage.description || '';
    const selectedPackageLicense = selectedPackage.license || '';
    const selectedPackageHomepage = selectedPackage.homepage || '';
    const selectedPackageAuthor = (selectedPackage.author && `${selectedPackage.author.name} (${selectedPackage.author.email})`) || '';
    const selectedPackageRepository = (selectedPackage.repository && selectedPackage.repository.url) || '';
    const selectedPackageIssues = (selectedPackage.bugs && selectedPackage.bugs.url) || '';

    const data = [];

    packagesStore.packages.map(item => {
      data.push({
        key: item._id,
        name: item.name,
        current: item.version,
        wanted: item.version,
        latest: item.version,
        environment: `dev`
      });
    });

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
          <div className={styles.packagesListTitle}>{`Packages (${this.props.packagesStore.packages.length})`}</div>

          <Table
            {...this.tableSettings}
            columns={this.tableColumns}
            dataSource={data}
            scroll={{ y: window.innerHeight - 390 }}
          />

          {/*<table className={styles.packagesTable}>*/}
            {/*<thead>*/}
              {/*<tr>*/}
                {/*<th className={styles.checkboxColumn}>*/}
                  {/*<Checkbox />*/}
                {/*</th>*/}
                {/*<th>Package name</th>*/}
                {/*<th>Current version</th>*/}
                {/*<th>Wantd version</th>*/}
                {/*<th>Latest version</th>*/}
                {/*<th>Env</th>*/}
              {/*</tr>*/}
            {/*</thead>*/}
            {/*<tbody>*/}
              {/*{ !packagesStore.loading && packagesStore.packages.map(item => {*/}
                {/*return (*/}
                  {/*<tr className={styles.packageRow}*/}
                      {/*key={item._id}*/}
                      {/*onClick={() => packagesStore.selectPackage(item._id)}*/}
                  {/*>*/}
                    {/*<td className={styles.checkboxColumn}>*/}
                      {/*<Checkbox />*/}
                    {/*</td>*/}
                    {/*<td>{item.name}</td>*/}
                    {/*<td>{item.version}</td>*/}
                    {/*<td>1.0.3</td>*/}
                    {/*<td>1.0.4</td>*/}
                    {/*<td>dev</td>*/}
                  {/*</tr>*/}
                {/*);*/}
              {/*}) }*/}
            {/*</tbody>*/}
          {/*</table>*/}

          {/*{ packagesStore.loading &&*/}
            {/*<div className={styles.preloaderWrapper} >*/}
              {/*<div className={styles.preloaderText}>Fetch installed packages info...</div>*/}
              {/*<Spin />*/}
            {/*</div>*/}
          {/*}*/}

          <div className={styles.packageInfo}>
            <div className={styles.packageInfoTitle}>Additional info for selected package</div>
            <div className={cx(styles.infoItem, styles.name)}>
              <div className={cx(styles.infoItemText, styles.nameText)}>Name:</div>
              <div className={cx(styles.infoItemValue, styles.nameValue)}>{selectedPackageName}</div>
            </div>
            <div className={cx(styles.infoItem, styles.description)}>
              <div className={cx(styles.infoItemText, styles.descriptionText)}>Description:</div>
              <div className={cx(styles.infoItemValue, styles.descriptionValue)}>{selectedPackageDescription}</div>
            </div>
            <div className={cx(styles.infoItem, styles.author)}>
              <div className={cx(styles.infoItemText, styles.authorText)}>Author:</div>
              <div className={cx(styles.infoItemValue, styles.authorValue)}>{selectedPackageAuthor}</div>
            </div>
            <div className={cx(styles.infoItem, styles.license)}>
              <div className={cx(styles.infoItemText, styles.licenseText)}>License:</div>
              <div className={cx(styles.infoItemValue, styles.licenseValue)}>{selectedPackageLicense}</div>
            </div>
            <div className={cx(styles.infoItem, styles.homepage)}>
              <div className={cx(styles.infoItemText, styles.homepageText)}>Homepage:</div>
              <a href={selectedPackageHomepage}
                 className={cx(styles.infoItemValue, styles.homepageValue)}
              >{selectedPackageHomepage}</a>
            </div>
            <div className={cx(styles.infoItem, styles.repository)}>
              <div className={cx(styles.infoItemText, styles.repositoryText)}>Repository:</div>
              <div className={cx(styles.infoItemValue, styles.repositoryValue)}>{selectedPackageRepository}</div>
            </div>
            <div className={cx(styles.infoItem, styles.issues)}>
              <div className={cx(styles.infoItemText, styles.issuesText)}>Issues:</div>
              <div className={cx(styles.infoItemValue, styles.issuesValue)}>{selectedPackageIssues}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
