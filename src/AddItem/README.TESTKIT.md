# AddItem Testkits

> AddItem

## AddItem TestKit API

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isAddTooltipVisible | - | boolean | returns true if tooltip is visible |
| isAddButtonVisible | - | boolean | returns true if button is visible |
| clickAdd | - | - | click the add button |
| exists (Only in Unit Test) | - | bool | fulfilled if element in the DOM |
| click (Only in E2E) | - | - | click the element |
| element | - | element | returns the driver element |

## Usage Example

> Unit testing example

```javascript
  import React from 'react';
  import {addItemTestkitFactory} from 'wix-style-react/dist/testkit';
  import {addItemTestkitFactory as enzymeImageViewerTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

  /***************
   enzyme example
  ***************/

  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><AddItem tooltipContent="test" dataHook={dataHook}/></div>);
  const testkit = enzymeImageViewerTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  /**********************
   ReactTestUtils example
  **********************/

  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><AddItem tooltipContent="test" dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = addItemTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();
```
> E2E example

```javascript
  //Element should be rendered with a data-hook into the DOM
  <AddItem tooltipContent="test" dataHook='myDataHook'/>

  /*******************
   protractor example
  *******************/

  import {imageViewerTestkitFactory, waitForVisibilityOf} from 'wix-style-react/dist/testkit/protractor';

  //Create an element testkit via the data-hook attribute
  const testkit = AddItemTestkitFactory({dataHook: 'myDataHook'});

  browser.get(appUrl); //Your application url

  waitForVisibilityOf(testkit.element(), 'Cannot find AddItem')
     .then(() => {
        //Do tests
        expect(testkit.element().isDisplayed()).toBeTruthy();
     });
```
