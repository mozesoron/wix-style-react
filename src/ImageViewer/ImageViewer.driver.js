import React from 'react';
import ReactDOM from 'react-dom';
import {buttonTestkitFactory} from 'wix-style-react/dist/testkit';
import addItemDriverFactory from '../AddItem/AddItem.driver';

const imageViewerDriverFactory = ({component, wrapper, element}) => {
  const addItemDataHook = 'add-container';
  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);
  const image = () => byHook('image-viewer-image');
  const updateImageButton = () => buttonTestkitFactory({wrapper: element, dataHook: 'update-image'});
  const removeImageButton = () => buttonTestkitFactory({wrapper: element, dataHook: 'remove-image'});
  const errorIcon = () => byHook('error-tooltip');
  const addItem = () => byHook(addItemDataHook);
  const addItemDriver = addItemDriverFactory({wrapper, element});

  return {
    getAddItemDataHook: () => addItemDataHook,
    getElement: () => element,
    getContainerStyles: () => element.getAttribute('style'),
    getImageUrl: () => image().getAttribute('src'),
    isAddItemVisible: () => !!addItem(),
    isImageVisible: () => !!image(),
    isErrorVisible: () => !!errorIcon(),
    clickAdd: () => addItemDriver.click(),
    clickUpdate: () => updateImageButton().click(),
    clickRemove: () => removeImageButton().click(),
    exists: () => !!element,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default imageViewerDriverFactory;
