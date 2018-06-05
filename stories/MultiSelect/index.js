import React from 'react';
import {storiesOf} from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from '../../src/MultiSelect/README.md';
import ReadmeTestKit from '../../src/MultiSelect/README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';
import ExampleWithLimitedNumRows from './ExampleWithLimitedNumRows';
import ExampleWithLimitedNumRowsRaw from '!raw-loader!./ExampleWithLimitedNumRows';
import ExampleWithoutOptions from './ExampleWithoutOptions';
import ExampleWithoutOptionsRaw from '!raw-loader!./ExampleWithoutOptions';
import ExampleReadOnly from './ExampleReadOnly';
import ExampleReadOnlyRaw from '!raw-loader!./ExampleReadOnly';

storiesOf('3. Inputs', module)
  .add('3.8 Tags', () => (
    <TabbedView tabs={['API', 'TestKits']}>
      <div>
        <Markdown source={Readme}/>
        <h1>Usage examples</h1>
        <CodeExample title="Standard" code={ExampleStandardRaw}>
          <ExampleStandard/>
        </CodeExample>

        <CodeExample title="Limited num rows" code={ExampleWithLimitedNumRowsRaw}>
          <ExampleWithLimitedNumRows/>
        </CodeExample>

        <CodeExample title="Read Only with Arrow" code={ExampleReadOnlyRaw}>
          <ExampleReadOnly/>
        </CodeExample>

        <CodeExample title="Without options & with Error" code={ExampleWithoutOptionsRaw}>
          <ExampleWithoutOptions/>
        </CodeExample>
      </div>

      <Markdown source={ReadmeTestKit}/>
    </TabbedView>
  ));
