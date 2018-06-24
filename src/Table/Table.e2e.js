import eyes from 'eyes.it';

import {tableTestkitFactory} from '../../testkit/protractor';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from '../../test/utils/protractor';
import {storySettings} from '../../stories/Table/storySettings';

describe('Table', () => {
  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName, withExamples: false});

  const driver = tableTestkitFactory({dataHook: 'storybook-table'});

  beforeAll(() => browser.get(storyUrl));

  it('should be able to use DataTable driver methods', async () => {
    await waitForVisibilityOf(driver.element(), 'Can not find Table Component');
    expect(await driver.rowsCount()).toBe(2);
  });

  eyes.it('should display table only', async () => {
    await waitForVisibilityOf(driver.element(), 'Can not find Table Component');
    await scrollToElement(driver.element());
    // need snapshot only
  });
});
