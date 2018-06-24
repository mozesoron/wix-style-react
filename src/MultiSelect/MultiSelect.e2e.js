import {multiSelectTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';
import {protractor} from 'protractor';
import eyes from 'eyes.it';

describe('MultiSelect', () => {
  const storyUrl = getStoryUrl('3. Inputs', '3.8 Tags');
  const driver = multiSelectTestkitFactory({dataHook: 'multi-select'});

  beforeEach(() => {
    browser.get(storyUrl);
  });

  eyes.it('should show focus style', () => {
    return waitForVisibilityOf(driver.element(), 'Cannot find <MultiSelect/>')
      .then(async () => {
        await browser.actions().sendKeys(protractor.Key.TAB).perform();
        await browser.actions().sendKeys(protractor.Key.TAB).perform();
        // Should be in focus now
      });
  });

  eyes.it('should break to new line when needed', () => {
    const ELEMENT_HEIGHT_SINGLE_LINE = 36;

    waitForVisibilityOf(driver.element(), 'Cannot find <MultiSelect/>')
      .then(() => {
        for (let i = 0; i < 9; i++) {
          driver.addTag();
        }
        return driver.getHeight();
      }).then(height => {
        expect(height).toBe(ELEMENT_HEIGHT_SINGLE_LINE);
      });
  }, {version: '<Input/> - On text click - select all'});
});
