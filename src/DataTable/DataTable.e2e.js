import eyes from 'eyes.it';
import {dataTableTestkitFactory, getStoryUrl, waitForVisibilityOf, scrollToElement} from '../../testkit/protractor';

describe('Data Table', () => {
  const storyUrl = getStoryUrl('10. Tables', '10.1 DataTable');
  const dataHook = 'story-data-table';

  eyes.it('should call func on row click', () => {
    const driver = dataTableTestkitFactory({dataHook});
    const indexToClick = 2;
    const name = 'Deborah Rhodes';

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cant find Data Table Component')
      .then(() => {
        const rowData = driver.getRowTextByIndex(indexToClick);
        expect(rowData).toBe(`#${indexToClick + 1} ${name}`);
        driver.clickRowByIndex(indexToClick);

        const EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), 10000, 'Alert is not getting present :(')
          .then(() => {
            expect(browser.switchTo().alert().getText()).toBe(`You clicked "${name}", row number ${indexToClick + 1}`);
            browser.switchTo().alert().accept();
          });
      });
  });

  eyes.it('display new data when received', async () => {
    const dataHook = 'story-data-table-infinite-scroll';
    const driver = dataTableTestkitFactory({dataHook});

    browser.get(storyUrl);

    await waitForVisibilityOf(driver.element(), 'Cant find Data Table Component');
    const initialItems = 20;
    const itemsAfterLoad = 40;
    driver.scrollToRowByIdx(initialItems - 1);

    await browser.wait(async () => await driver.rowsCount() === itemsAfterLoad, 10000, 'New data wasnt loaded :(');
    expect(driver.rowsCount()).toEqual(itemsAfterLoad);
  });

  eyes.it('display story-data-table-sortable', async () => {
    const dataHook = 'story-data-table-sortable';
    const driver = dataTableTestkitFactory({dataHook});

    browser.get(storyUrl);

    await waitForVisibilityOf(driver.element(), 'Cant find Data Table Component');
    await scrollToElement(driver.element());
    // We only need a snapshot
  });

  eyes.it('display story-data-table-without-header', async () => {
    const dataHook = 'story-data-table-without-header';
    const driver = dataTableTestkitFactory({dataHook});

    browser.get(storyUrl);

    await waitForVisibilityOf(driver.element(), 'Cant find Data Table Component');
    await scrollToElement(driver.element());
    // We only need a snapshot
  });
});
