const fs = require('fs-extra');
const path = require('path');
const DIRECTORY_SRC = 'dist/web';

const NAME_APP = 'AngularSSR';
const FILENAME_WEB_CONFIG = 'web.config';
const FILENAME_SERVE_MAIN = 'main.js';
const FILENAME_BROWSER = 'browser';

const AZURE_DIST = path.join(__dirname, 'azureDist');
const DIST_ANGULAR = path.join(__dirname, 'dist', NAME_APP);
const WEB_CONFIG_ORIGIN = path.join(__dirname, 'src', FILENAME_WEB_CONFIG);
const FILE_SERVE_ORIGIN = path.join(DIST_ANGULAR, 'server', FILENAME_SERVE_MAIN);
const FOLDER_BROWSER_ORIGIN = path.join(DIST_ANGULAR, FILENAME_BROWSER);

const WEB_CONFIG_DIST = path.join(AZURE_DIST, 'web.config');
const FILE_SERVE_DIST = path.join(AZURE_DIST, 'main.js');
const FOLDER_BROWSER_DIST = path.join(AZURE_DIST, 'browser');


const CreateFolderAzureDist = async () => {
  fs.mkdirSync(AZURE_DIST, {recursive: true});
}

const CopyWebConfigFile = async (pathOrigin, pathDestiny) => {
  return fs.copyFileSync(pathOrigin, pathDestiny);
}

const CopyFolderSync = (fromFolder, toFolder) => {
  fs.mkdirSync(toFolder, {recursive: true});
  fs.readdirSync(fromFolder).forEach(element => {
    if (fs.lstatSync(path.join(fromFolder, element)).isFile()) {
      fs.copyFileSync(path.join(fromFolder, element), path.join(toFolder, element));
    } else {
      CopyFolderSync(path.join(fromFolder, element), path.join(toFolder, element));
    }
  });
}

Promise.all([
  CreateFolderAzureDist(),
  CopyWebConfigFile(WEB_CONFIG_ORIGIN, WEB_CONFIG_DIST),
  CopyWebConfigFile(FILE_SERVE_ORIGIN, FILE_SERVE_DIST),
  CopyFolderSync(FOLDER_BROWSER_ORIGIN, FOLDER_BROWSER_DIST)
])
  .then(() => {
    console.log('COMPLETE')
  })
  .catch((error) => {
    console.error(error);
  });
