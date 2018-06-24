
import {mouseEnter} from 'wix-ui-test-utils/protractor';
import {isFocused} from '../test-common';

const toggleSwitchDriverFactory = component => ({
  element: () => component,
  hover: () => mouseEnter(component.$('textarea')),
  click: () => component.$('textarea').click(),
  isFocused: () => isFocused(component.$('textarea')),
  isHovered: () => component.$(':hover').isPresent()
});

export default toggleSwitchDriverFactory;
