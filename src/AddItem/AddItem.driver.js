import ReactTestUtils from 'react-dom/test-utils';
import tooltipDriverFactory from '../Tooltip/Tooltip.driver';

const addItemDriverFactory = ({wrapper, element}) => {

  const ratioRegex = /ratio\d+x\d+/;
  const byHook = dataHook => element.querySelector(`[data-hook="${dataHook}"]`);
  const addButton = () => byHook('add-container');
  const addTooltip = () => byHook('add-tooltip');

  return {
    /** return the driver element */
    element: () => element,
    /** return the element ratio class */
    getRatio: () => {
      const result = element.getAttribute('class').match(ratioRegex);
      return result ? result[0].replace('ratio', '') : '';
    },
    /** return the element's height */
    getHeight: () => window.getComputedStyle(element).height,
    /** return the element's width */
    getWidth: () => window.getComputedStyle(element).width,
    /** return true if tooltip is visible */
    isAddButtonVisible: () => !!addButton(),
    /** return true if button is visible */
    isAddTooltipVisible: () => !!addTooltip(),
    /** click the add button */
    click: () => ReactTestUtils.Simulate.click(addButton()),
    /** get the Tooltip's driver */
    getTooltipDriver: () => tooltipDriverFactory({wrapper, element: addTooltip()}),
    exists: () => !!element
  };
};

export default addItemDriverFactory;
