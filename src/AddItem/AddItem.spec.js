import React from 'react';
import {createDriverFactory, resolveIn} from '../test-common';
import {addItemTestkitFactory} from '../../testkit';
import {addItemTestkitFactory as enzymeAddItemTestkitFactory} from '../../testkit/enzyme';
import AddItem from './AddItem';
import addItemDriverFactory from './AddItem.driver';
import {isTestkitExists, isEnzymeTestkitExists} from '../../testkit/test-common';
import {mount, shallow} from 'enzyme';

describe('AddItem', () => {

  const TOOLTIP_CONTENT = 'BLA BLA';
  const createDriver = createDriverFactory(addItemDriverFactory);
  let props, driver;
  let addItem;


  beforeEach(() => {
    document.body.innerHTML = '';
    addItem = jest.fn();
    props = {
      onClick: addItem,
      tooltipContent: TOOLTIP_CONTENT
    };

  });

  describe('when default scenario', () => {

    it('should trigger add item', () => {
      driver = createDriver(<AddItem {...props}/>);
      driver.click();
      expect(addItem).toBeCalled();
    });

  });

  describe('height and width', () => {

    it('should use asspect ratio from props', () => {
      props = {
        aspectRatio: '16/9'
      };
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getRatio()).toEqual('16x9');
    });

    it('should have default asspect ratio 1x1', () => {
      driver = createDriver(<AddItem/>);
      expect(driver.getRatio()).toEqual('1x1');
    });

    it('should ignore asspect ratio from props when height is given', () => {
      props = {
        aspectRatio: '16/9',
        height: 300
      };
      driver = createDriver(<AddItem {...props}/>);
      expect(driver.getHeight()).toEqual('300px');
    });

  });

  describe('hide or show add item', () => {

    it('should have a tooltip with given content', () => {
      driver = createDriver(<AddItem {...props}/>);
      const TooltipDriver = driver.getTooltipDriver();
      TooltipDriver.mouseEnter();
      return resolveIn(50)
        .then(() => {
          expect(TooltipDriver.isShown()).toBeTruthy();
          expect(TooltipDriver.getContent()).toEqual(props.tooltipContent);
        });
    });

    it('should have an AddItem tooltip markup', () => {
      const wrapper = shallow(<AddItem {...props}/>);
      expect(wrapper.find('Tooltip').exists()).toBeTruthy();
    });

    it('should not have an AddItem tooltip markup', () => {
      const wrapper = shallow(<AddItem/>);
      expect(wrapper.find('Tooltip').exists()).toBeFalsy();
    });

  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<AddItem/>, addItemTestkitFactory)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<AddItem/>, enzymeAddItemTestkitFactory, mount)).toBeTruthy();
    });
  });

});
