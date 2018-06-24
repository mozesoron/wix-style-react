import dataTableDriverFactory from '../DataTable/DataTable.protractor.driver';

const tableDriverFactory = component => ({
  ...dataTableDriverFactory(component.$(`[data-hook="table"]`))
});

export default tableDriverFactory;

