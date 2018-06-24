import React from 'react';
import RadioGroup from 'wix-style-react/RadioGroup';

const exampleChildren = [
  {
    label: '4 radios',
    value:
      [1, 2, 3, 4].map(n =>
        <RadioGroup.Radio key={n} value={n} children={`Option ${n}`}/>
      )
  },
  {
    label: '2 radios',
    value: [
      <RadioGroup.Radio key={0} value={1}>
        <div>Option 1</div>
        <small>best option</small>
      </RadioGroup.Radio>,
      <RadioGroup.Radio key={1} value={2}>
        <div>Option 2</div>
        <small>Also pretty good option</small>
      </RadioGroup.Radio>
    ]
  }
];

export const NUM_OF_BUTTONS_IN_EXAMPLE = exampleChildren[0].length;

export default {
  category: '4. Selection',
  storyName: '4.3 Radio Button Group',
  component: RadioGroup,
  componentPath: '../src/RadioGroup',

  componentProps: setState => ({
    value: 1,
    hasError: false,
    size: 'medium',
    children: exampleChildren[0].value,
    onChange: value => setState({value}),
    dataHook: 'storybook-radiogroup'
  }),

  exampleProps: {
    children: exampleChildren,
    onChange: value => value
  }
};
