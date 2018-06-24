import dataTableDriverFactory from '../DataTable/DataTable.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';

const tableDriverFactory = ({element, wrapper, component, eventTrigger}) => {
  const dataTableDriver = dataTableDriverFactory({element, wrapper, component});

  const getHeader = () => element.querySelector('[data-hook="table-header"]');
  const getSelectionHeader = () => element.querySelector('[data-hook="table-selection-header"]');
  const getSelectionHeaderTitle = () => element.querySelector('[data-hook="table-selection-header"]');
  const getSelectionCounter = () => element.querySelector('[data-hook="table-selection-counter"]');
  const getFooter = () => element.querySelector('[data-hook="table-footer"]');
  const getRowCheckboxDriver = index => checkboxDriverFactory({
    element: dataTableDriver.getCell(index, 0).querySelector('[data-hook="row-select"]'),
    eventTrigger
  });
  const getBulkSelectionCheckboxDriver = () => checkboxDriverFactory({
    element: dataTableDriver.getHeaderCell(0).querySelector('[data-hook="table-select"]'),
    eventTrigger
  });
  return {
    ...dataTableDriver,
    clickRowChecbox: index => getRowCheckboxDriver(index).click(),
    clickBulkSelectionCheckbox: () => getBulkSelectionCheckboxDriver().click(),
    isRowCheckboxVisible: index => getRowCheckboxDriver(index).exists(),
    isBulkSelectionCheckboxVisible: () => getBulkSelectionCheckboxDriver().exists(),
    isRowSelected: index => getRowCheckboxDriver(index).isChecked(),
    isBulkSelectionChecked: () => {
      const checkboxDriver = getBulkSelectionCheckboxDriver();
      return checkboxDriver.isChecked() && !checkboxDriver.isIndeterminate();
    },
    isBulkSelectionIndeterminate: () => {
      const checkboxDriver = getBulkSelectionCheckboxDriver();
      return !checkboxDriver.isChecked() && checkboxDriver.isIndeterminate();
    },
    isBulkSelectionUnchecked: () => {
      const checkboxDriver = getBulkSelectionCheckboxDriver();
      return !checkboxDriver.isChecked() && !checkboxDriver.isIndeterminate();
    },
    isHeaderDisplayed: () => !!getHeader(),
    isSelectionHeaderDisplayed: () => !!getSelectionHeader(),
    getSelectionHeaderTitle: () => !!getSelectionHeaderTitle() && getSelectionHeaderTitle().innerHTML,
    getSelectionCounterText: () => !!getSelectionCounter() && getSelectionCounter().innerHTML,
    isFooterDisplayed: () => !!getFooter()
  };
};

export default tableDriverFactory;

