# Version Management

This document summarizes the best practices of how to manage our versions, with some basic information about how it all happens.

## Releasing a new version
1. Make sure the [CHANGELOG](https://github.com/wix/wix-style-react/blob/master/CHANGELOG.md) is updated. The best practice is to update it every time we merge to master, so it won't be annoying to do the dirty work when we want to do the release.

2. Change `package.json` version according to semver rules.
    - **Major** version for incompatible API changes.
    - **Minor** version for adding functionality in a backwards-compatible manner.
    - **Patch** version for backwards-compatible bug fixes.


## Creating a releasable branch
1. Create a branch `version_**`.
2. Update the version in `package.json`.
3. Update surge-auto-release in the package-json with `--ver=<your_new_version>`
4. Push the branch and configure it in github to be a protected branch.

## Parallel versioning
There are 2 reasons why we need to maintain multiple versions:

1. We have different users using different versions, so in case of an important bug fix, we might need to introduce this fix in some older supported versions as well.

2. When we implement a new breaking change which we want to gradually expose to our users, we can create an alpha version and ask some of our users to work with it, before we officially release it.

### Reuqired Configurations
#### Releasable Branches
In order to be able to hold multiple versions, we must have multiple releasable branches. For that reason
we have speacial configurations on CI, where 
Each branch with a name such as `version_**` is automatically becoming a releaseable branch. 
[See here](http://ci.dev.wix/viewType.html?buildTypeId=CommonComponent_WixStyleReact).

When creating a version branch, please make sure to configure it to be a protected branch in Github.

#### npm dist tags
Tags can be used to provide an alias instead of version numbers.
Each time we publish a new version, it also gets a dist tag. When no specific tag is given, the version gets the `latest` tag. When a user do `npm i wix-style-react` without specifying the specific tag, he will get the `latest` tag. In order to get some speacial version, do `npm install <pkg>@<tag>`.
For more infrmation, [read this](https://docs.npmjs.com/cli/dist-tag).


For each releasable branch we can create alpha/ betta / rc versions by using the npm dist tags. Just change the version in the package.json to `3.0.0-alpha` for example, and don't forget to keep a relevant updated changelog for this branch.

#### Storybook
We deploy our storybook by using [teamcity-surge-autorelease](https://github.com/wix-private/fed-infra/tree/master/teamcity-surge-autorelease) package.
In order to deploy a storybook for the specific version, pass `--ver=v5-alpha` or something similar to the surge command in the `package.json` in order to create a storybook with a unique url. 
**Forgetting to do so will `override` our master storybook!**
