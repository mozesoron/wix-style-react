const {transformFile} = require('./transforms');

const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const errors = [];
const migratedIcons = [];

const printDepricationMessage = error => {
  console.log(RED, error.text);
  console.log(CYAN, 'Problem happen in file', error.where);
  console.log(CYAN, 'On trying to migrate such value', error.fullValue);
  console.log('\n');
};

const onError = ({oldIconName, where, fullValue}) => {
  errors.push({
    where,
    fullValue,
    text: `Icon with name "${oldIconName}" is not supported anymore, please ask your UX person to provide alternative`
  });
};

const onTick = ({oldIconName, newIconName, where, fullValue}) => {
  migratedIcons.push({
    where,
    fullValue,
    text: `Icon with name "${oldIconName}" was migrated, now it called "${newIconName}`
  });
};

module.exports = (file, api) => {
  const result = transformFile({file, api, onError, onTick});

  console.log(CYAN, '\n', migratedIcons.length, 'icons was migrated, in file', file.path, '\n');

  if (errors.length) {
    console.log(RED, '\n', errors.length, ' icons was not migrated and require your attention: \n');
  }

  errors.forEach(printDepricationMessage);

  return result.toSource({quote: 'single'});
};
