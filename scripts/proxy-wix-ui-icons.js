const fs = require('fs');
const shell = require('child_process').execSync;
const MODULE_NAME = 'wix-ui-icons-common';
const ICONS_DIR = './new-icons';

const getListOfFilesInFolder = dirname => fs.readdirSync(dirname);

const byJsExtension = filename => filename.endsWith('.js');

const createIconProxyFileContent = iconName => `module.exports = require('wix-ui-icons-common/${iconName}');\n`;

const createFile = (name, content, pathToFile) => fs.writeFileSync(pathToFile + name, content);

const getListOfCommonIcons = moduleName => {
  const pathToModuleRoot = require.resolve(moduleName);
  const pathToModuleFolder = pathToModuleRoot
    .substr(0, pathToModuleRoot.indexOf('wix-ui-icons-common') + moduleName.length);

  return getListOfFilesInFolder(pathToModuleFolder).filter(byJsExtension);
};

const getListOfSystemIcons = moduleName => {
  const pathToModuleRoot = require.resolve(moduleName);
  const pathToModuleFolder = pathToModuleRoot
    .substr(0, pathToModuleRoot.indexOf('wix-ui-icons-common') + moduleName.length);

  return getListOfFilesInFolder(`${pathToModuleFolder}/system`).filter(byJsExtension);
};

const prepareSystemIconsProxyFiles = moduleName => {
  const listOfSystemIcons = getListOfSystemIcons(moduleName);
  return listOfSystemIcons.reduce((res, iconName) => {
    res[iconName] = createIconProxyFileContent(`system/${iconName}`);
    return res;
  }, {});
};

const prepareCommonIconsProxyFiles = moduleName => {
  const listOfCommonIcons = getListOfCommonIcons(moduleName);
  return listOfCommonIcons.reduce((res, iconName) => {
    res[iconName] = createIconProxyFileContent(iconName);
    return res;
  }, {});
};

const createIndexFile = (icons, iconsDir) => {
  const indexFileContent = Object
    .keys(icons)
    .reduce((res, iconName) => {
      const name = iconName.replace('.js', '');
      const exportFunc = `Object.defineProperty(exports, '${name}', {enumerable: true, get: function get() { return _interopRequireDefault(_${name}).default;}});\n`;
      return res + `var _${name} = require('./${iconName}');\n` + exportFunc;
    }, '');
  const content = `/*eslint-disable*/Object.defineProperty(exports, '__esModule', {value: true});\n${indexFileContent}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : {default: obj};}`;
  fs.writeFileSync(`${iconsDir}/index.js`, content);
};

const copySync = (src, dist) => {
  shell(`mkdir -p ${dist}`);
  shell(`cp -r ${src}/* ${dist}`);
};

const copyIconsToSrcForBackcompability = iconsDir => {
  copySync(iconsDir, `./src/${iconsDir}`);
};

const createIconsProxyFiles = (moduleName, iconsDir) => {
  const commonIconProxyFileContents = prepareCommonIconsProxyFiles(moduleName);
  const systemProxyFileContents = prepareSystemIconsProxyFiles(moduleName);
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }
  if (!fs.existsSync(`${iconsDir}/system`)) {
    fs.mkdirSync(`${iconsDir}/system`);
  }
  Object.keys(commonIconProxyFileContents)
    .forEach(iconName => {
      createFile(iconName, commonIconProxyFileContents[iconName], `${iconsDir}/`);
      console.log('\x1b[36m', `"${iconName}" was created`);
    });
  Object.keys(systemProxyFileContents)
    .forEach(iconName => {
      createFile(iconName, systemProxyFileContents[iconName], `${iconsDir}/system/`);
      console.log('\x1b[36m', `"system/${iconName}" was created`);
    });

  createIndexFile(commonIconProxyFileContents, iconsDir);

  copyIconsToSrcForBackcompability(iconsDir);
};

createIconsProxyFiles(MODULE_NAME, ICONS_DIR);
