# What we can deprecate?
1. prop types removal with deprecation console logs - for small changes in API that are not relevant
2. Feature flags - for new designs or small behavior change that might affect existing functionality / toggling new/old components. this allows smooth migration.
3. Major version - for breaking changes and new APIs

All kind of deprecations should be documented in the CHANGELOG.

## Deprecating components
Deprecating a component means we change API drastically,
so we have a completely new component. If we decide to completely remove
the component in a major version, no need to deprecate the component at all,
but usually we would like to do it gradually with backward compatibility.

In such cases, we suggest keeping the src/ComponentName folder, because users still use this path.
Then, in the index file of it, map between the new/old component using some feature flag.
featureFlagOn ? NewComponent : OldComponent

1. Move your component to `wix-style-react/src/Deprecated` folder
2. Update all internal imports of your component
3. Use  deprecationLog inside old component folder to warn the user that he using deprecated component and explain him his next steps
Example
```javascript
  ...
  import deprecationLog from '../utils/deprecationLog';

  class SomeDeprecatedComponent extends React.Component {
    constructor(props) {
      super(props);
      deprecationLog('"SomeDeprecatedComponent" was deprecated, please use "AnotherComponent" instead');
    }
    ...
  }
```

## Deprecating props
1. Remove your prop from propTypes definition(to prevent showing it in docs)
2. Make sure that docs do not show your deprecated prop
3. Use  deprecationLog to warn the user that he using deprecated prop and explain him his next steps
Example
```javascript
  ...
  import deprecationLog from '../utils/deprecationLog';

  class SomeComponent extends React.Component {
    ...

    render(props) {
      if (this.props.deprecatedProp !== undefined) {
        deprecationLog('SomeComponent prop "deprecatedProp" is deprecated, use "newProp" instead');
      }
      return <div>...</div>
    }
  }
```

## Deprecating props values/types
1. Update your propType
Example
before:
```javascript
  static propTypes = {
    size: oneOf(['small', 'normal', 'large'])
  }
```
after
before:
```javascript
  static propTypes = {
    size: oneOf(['small', 'medium', 'large'])
  }
```
2. Make sure that docs do not show your deprecated prop value or type
3. Use  deprecationLog to warn the user that he using deprecated prop value and explain him his next steps
Example
```javascript
  ...
  import deprecationLog from '../utils/deprecationLog';

  class SomeComponent extends React.Component {
    ...

    render(props) {
      if (this.props.size !== 'normal') {
        deprecationLog('SomeComponent prop "size" with value "normal" is deprecated and will be removed in next major release, please use "medium" size instead');
      }
      return <div>...</div>
    }
  }
```
