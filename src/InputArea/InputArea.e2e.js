import eyes from 'eyes.it';
import {inputAreaTestkitFactory} from '../../testkit/protractor';
import {createStoryUrl, waitForVisibilityOf} from '../../test/utils/protractor';

describe('input area page', () => {
  // const storyUrl = getStoryUrl('3. Inputs', '3.2 + InputArea');
  const storyUrl = createStoryUrl({kind: '3. Inputs', story: '3.2 + InputArea', withExamples: false});
  const inputAreaTestkit = inputAreaTestkitFactory({dataHook: 'storybook-inputarea'});

  beforeEach(async () => {
    await browser.get(storyUrl);
    await waitForVisibilityOf(inputAreaTestkit.element());
  });

  eyes.it('should render default props', () => {
    expect(inputAreaTestkit.isFocused()).toBe(false, 'isFocused');
  });

  eyes.it('should show focus styles', async () => {
    expect(inputAreaTestkit.isFocused()).toBeFalsy();
    await browser.actions().sendKeys(protractor.Key.TAB).perform();
    expect(inputAreaTestkit.isFocused()).toBeTruthy();
  });

  eyes.it('should show hover styles', async () => {
    expect(await inputAreaTestkit.isHovered()).toBeFalsy();
    await inputAreaTestkit.hover();
    expect(await inputAreaTestkit.isHovered()).toBeTruthy();
  });

  eyes.it('should show hover and focus styles', async () => {
    expect(await inputAreaTestkit.isHovered()).toBeFalsy();
    expect(inputAreaTestkit.isFocused()).toBeFalsy();
    await inputAreaTestkit.click();
    expect(inputAreaTestkit.isFocused()).toBeTruthy();
    expect(await inputAreaTestkit.isHovered()).toBeTruthy();
  });
});
