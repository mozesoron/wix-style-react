/*
 it was created with such script
  JSON.stringify(
    $$('tr').reduce(
      (res, node) => {
        res[node.childNodes[0].textContent] = node.childNodes[1].textContent;
        return res;
      }, {}
    ), null, 4
  )

  ran on http://electric-process.surge.sh/
*/
const oldToNewIconsNamesMap = require('./assets/oldToNewIconsNamesMap.json');
const oldIconNames = Object.keys(oldToNewIconsNamesMap);

module.exports.getOldIconName = node => oldIconNames.find(
  iconName => node.value.source && node.value.source.value.endsWith(`Icons/dist/components/${iconName}`)
);

module.exports.getListOfImportedIcons = node => {
  if (node.value.source.value.endsWith('/Icons') || node.value.source.value.endsWith('/Icons/dist/index')) {
    const icons = [];
    node.node.specifiers.forEach((item, index) => {
      if (item.imported && item.imported.name) {
        if (item.imported && item.imported.name) {
          icons.push({
            value: item.imported.name
          });
        }
      } else if (index === node.node.specifiers.length - 1) {
        if (item.local.name) {
          // edge case, when import * as Icons from 'wsr/Icons'
          icons.push({
            type: 'all',
            value: item.local.name
          });
        }
      }
    });
    return icons;
  }
  return null;
};

module.exports.getNewIconName = oldIconName => oldToNewIconsNamesMap[oldIconName];

module.exports.renameIdentifier = (path, newName, j) => j(path).replaceWith(() => j.identifier(newName));
