import AddItem from 'wix-style-react/AddItem';
import React from 'react';
import Example from './Example';

export default {
  category: '3. Inputs',
  storyName: '3.12 AddItem',

  component: AddItem,
  componentPath: '../../src/AddItem',

  componentProps: () => ({
    onClick: () => {},
    examples: <Example/>,
    dataHook: 'storybook-addItem'
  })
};
