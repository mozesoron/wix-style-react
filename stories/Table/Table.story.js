import React from 'react';
import Table from 'wix-style-react/Table';
import Button from 'wix-style-react/Button';
import Search from 'wix-style-react/Search';
import styles from '../../src/Card/Header/Header.scss';
import s from './Table.story.scss';
import {storySettings} from './storySettings';

const defaultHeader = (
  <div className={styles.header}>
    <div className={styles.container}>
      <div data-hook="title" className={styles.title}>
        <span>Table title</span>
      </div>
      <div data-hook="subtitle" className={styles.subtitle}>
        Table subtitle
      </div>
    </div>
    <div className={s.actions}>
      <Search
        options={[
          {
            id: 0,
            value: 'Red'
          },
          {
            id: 1,
            value: 'Green'
          }
        ]}
        />
    </div>
  </div>);

const selectionHeader = (
  <div className={s.actions}>
    <Button>
      Bulk Action
    </Button>
    <Button>
      Bulk Action
    </Button>
  </div>);

const counterRender = count => `${count} Selected`;


export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Table,
  componentPath: '../../src/Table',

  componentProps: {
    dataHook: storySettings.dataHook,
    id: 'id',
    data: [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}],
    selections: [false, false],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    showSelection: true,
    header: defaultHeader,
    selectionHeader,
    selectionCounter: counterRender
  }
};
