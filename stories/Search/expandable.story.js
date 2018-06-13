import Search from 'wix-style-react/Search';

const settings = {
  category: '3. Inputs',
  storyName: '3.9b Expandable Search',
  dataHook: 'storybook-search',
  options: [
    'The quick',
    'brown',
    'fox',
    'jumps over'
  ].map((value, index) => ({id: index, value}))
};

export default {
  category: settings.category,
  storyName: settings.storyName,
  component: Search,
  componentPath: '../../src/Search',

  componentProps: setState => ({
    dataHook: settings.dataHook,
    value: '',
    options: settings.options,
    expandable: true,

    onChange: e =>
      setState({value: e.target.value}),

    onSelect: option =>
      setState({value: option.value})
  }),

  exampleProps: {
    onSelect: option => option.value
  }
};
