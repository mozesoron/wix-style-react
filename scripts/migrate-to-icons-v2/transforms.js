/* eslint-disable operator-linebreak */
const {renameIdentifier, getOldIconName, getNewIconName, getListOfImportedIcons} = require('./utils');

const transformWSRComponents = ({node, oldIconName, newIconName}) => {
  const pathes = {
    commonSrcPath: `/src/Icons/dist/components/${oldIconName}`,
    commonPath: `/Icons/dist/components/${oldIconName}`,
    indexSrcPath: `/src/Icons/dist/index`,
    indexPath: `/Icons/dist/index`,
    rootSrcPath: `/src/Icons`,
    rootPath: `/Icons`
  };
  const {value} = node.value.source;
  const isWSRMigration = process.env.MIGRATION === 'wix-style-react';
  const ICONS_FOLDER = 'new-icons';

  if (value.endsWith(pathes.indexSrcPath)) {
    node.value.source.value = isWSRMigration
      ? value.replace(pathes.indexSrcPath, `/${ICONS_FOLDER}`)
      : `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.indexPath)) {
    node.value.source.value = isWSRMigration
      ? value.replace(pathes.indexPath, `/../${ICONS_FOLDER}`)
      : `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.rootSrcPath)) {
    node.value.source.value = isWSRMigration
      ? value.replace(pathes.rootSrcPath, `/${ICONS_FOLDER}`)
      : `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.rootPath)) {
    node.value.source.value = isWSRMigration
      ? value.replace(pathes.rootPath, `/../${ICONS_FOLDER}`)
      : `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.commonSrcPath)) {
    node.value.source.value = isWSRMigration
      ? value.replace(pathes.commonSrcPath, `/${ICONS_FOLDER}/${newIconName}`)
      : `wix-style-react/${ICONS_FOLDER}/${newIconName}`;
  } else if (value.endsWith(pathes.commonPath)) {
    node.value.source.value = isWSRMigration
      ? value.replace(pathes.commonPath, `/../${ICONS_FOLDER}/${newIconName}`)
      : `wix-style-react/${ICONS_FOLDER}/${newIconName}`;
  }
};

const updateImports = ({root, j, file, onError, onTick}) => {
  const iconNames = [];
  const imports = root.find(j.ImportDeclaration);
  imports
    .forEach(node => {
      const iconName = getOldIconName(node);
      const importedIconNames = (getListOfImportedIcons(node) || []);
      if (iconName) {
        importedIconNames.push({value: iconName});
      }
      if (importedIconNames[0] && importedIconNames[0].type !== 'all') {
        importedIconNames.map(icon => icon.value).forEach(name => {
          const newIconName = getNewIconName(name);
          const logObj = {
            newIconName,
            oldIconName: name,
            where: file.path,
            fullValue: node.value.source.value
          };
          if (newIconName) {
            onTick(logObj);
          } else {
            onError(logObj);
          }
        });
      }
      if (importedIconNames[0] && importedIconNames[0].type !== 'all' && importedIconNames.length) {
        const newIconName = getNewIconName(iconName);
        iconNames.push(...importedIconNames.map(icon => icon.value));
        transformWSRComponents({node, newIconName, oldIconName: iconName});
      } else if (importedIconNames[0] && importedIconNames[0].type === 'all') {
        transformWSRComponents({node});
        root.find(j.JSXMemberExpression, {object: {name: importedIconNames[0].value}})
          .forEach(node => {
            if (!node.value.property) {
              return null;
            }
            const oldIconName = node.value.property.name;
            const newIconName = getNewIconName(oldIconName);
            const logObj = {
              newIconName,
              oldIconName,
              where: file.path,
              fullValue: ''
            };
            if (newIconName) {
              node.value.property.name = newIconName;
              onTick(logObj);
            } else {
              onError(logObj);
            }
          });
      }
    });

  return iconNames;
};

const updateIdentifiers = ({root, j, iconNames}) => {
  iconNames.forEach(name => {
    root
      .find(j.Identifier, {name})
      .paths()
      .forEach(path => {
        const newIconName = getNewIconName(name);
        if (newIconName) {
          renameIdentifier(path, newIconName.replace('system/', ''), j);
        }
      });
  });
};

/* import SomeIcon from './Icons/dist/components/SomIcon' to 'import SomeNewIcon from ./icons/SomeIcon'  */
module.exports.transformFile = ({file, api, onError, onTick}) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const iconNames = updateImports({root, j, file, onTick, onError});
  updateIdentifiers({root, j, iconNames});
  return root;
};

// TODO handle wix-style-react/Icons -> wix-style-react/icons
