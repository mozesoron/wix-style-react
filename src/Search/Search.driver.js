import inputDriverFactory from '../InputWithOptions/InputWithOptions.driver';
import ReactTestUtils from 'react-dom/test-utils';

const EXPANDABLE_CLASS = 'expandableStyles';
const EXPANDABLE_COLLAPSED = 'collapsed';
const EXPANDABLE_EXPANDED = 'expanded';

const searchDriverFactory = args => {
  const inputDriver = inputDriverFactory({
    ...args,
    element: args.element ? args.element.childNodes[0] : null
  });

  const {element} = args;

  return {
    ...inputDriver,
    clickToExtend: () => ReactTestUtils.Simulate.click(element),
    isExpandable: () => element.className.includes(EXPANDABLE_CLASS),
    isCollapsed: () => element.className.includes(EXPANDABLE_COLLAPSED),
    isExtended: () => element.className.includes(EXPANDABLE_EXPANDED)
  };
};

export default searchDriverFactory;
