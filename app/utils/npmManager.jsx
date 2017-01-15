import parseJson from 'parse-json';
import cp from 'child_process';
const exec = cp.exec;

/**
 * Npm API commands
 */
class NpmManager {

  /**
   * Execute shell command
   * @param command
   * @param params
   * @returns {Promise}
   */
  static executeCommand(command = '', params = {}) {
    return new Promise(resolve => {
      exec(command, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
        console.log(command);
        if (stdout && stdout.length > 0) {
          resolve(params.inJson ? parseJson(stdout) : stdout);
        }
      });
    });
  }

  /**
   * Get NPM version
   * @returns {*}
   */
  static getNpmVersion() {
    return NpmManager.executeCommand('npm -v');
  }

  /**
   * Get all packages info for specific project
   * @returns {*}
   */
  static getPackagesInfo() {
    return NpmManager.executeCommand('npm ls -l -json', { inJson: true });
  }

  /**
   * Get info about packages installed globally
   * @returns {*}
   */
  static getGlobalPackagesInfo() {
    return NpmManager.executeCommand('npm ls -g -l -json -depth 0', { inJson: true });
  }
}

export default NpmManager;
