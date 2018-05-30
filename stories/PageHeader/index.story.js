import React from 'react';

import PageHeader from 'wix-style-react/PageHeader';
import Button from 'wix-style-react/Button';

import Breadcrumbs from '../Page/Breadcrumbs';
import './PageHeader.scss';

const action = <Button>Action</Button>;

export default {
  category: '2. Layout',
  storyName: '2.5 + PageHeader',
  component: PageHeader,
  componentPath: '../../src/PageHeader',

  componentProps: {
    onBackClicked: () => {},
    title: 'Page Header',
    dataHook: 'story-page-header'
  },

  exampleProps: {
    breadcrumbs: ['', Breadcrumbs],
    actionsBar: ['', action]
  }
};
