// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Npm API commands
 */
class NpmManager extends Component {

  /**
   * Get NPM version
   * @returns {Promise}
   */
  getNpmVersion() {
    return new Promise(resolve => {
      exec('npm -v', (err, stdout, stderr) => {
        let npmVersion;

        //$log.warn(err, stderr);

        if (stdout && stdout.length > 0) {
          npmVersion = stdout.toString();
        }
        resolve(npmVersion);
      });
    });
  }

  /**
   * Get all packages info
   * @returns {Promise}
   */
  getPackagesInfo() {
    return new Promise(resolve => {
      console.dir('Loading info...');
      exec('npm ls -l -json', { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
        let packagesInfo;

        //$log.warn(err, stderr);

        if (stdout && stdout.length > 0) {
          packagesInfo = stdout;
        }
        resolve(packagesInfo);
      });
    });
  }

  render() {
    return null;
  }
}

export default NpmManager;
