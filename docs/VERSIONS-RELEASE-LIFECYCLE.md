# Versions Release Lifecycle

* [Overview](#overview)
* [How to release a new version](#how-to-release-a-new-version)
   * [Regular release](#regular-release)
      * [Major release](#major-release)
      * [Minor or patch release](#minor-or-patch-release)
   * [Older version release](#older-version-release)
      * [Minor sensitive feature](#minor-sensitive-feature)
      * [Alpha release](#alpha-release)
   * [Special rc version release](#speacial-rc-version-release)
* [Motivation](#motivation)
    * [Why semantic versioning](#why-semantic-versioning)
    * [Why do we need to maintain multiple versions](#why-do-we-need-to-maintain-multiple-versions)
      * [Maintain older version](#maintain-older-version)
      * [Gradual exposure](#gradual-exposure)
* [Maintaining a CHANGELOG](#maintaining-a-changelog)
* [Releasable Branches](#releasable-branches)
* [Npm dist tags](#npm-dist-tags)
* [Storybook](#storybook)
   * [When do we deploy a new storybook](#When-do-we-deploy-a-new-storybook)
* [Eyes](#eyes)

## Overview
This document summarizes the best practices of how to manage our versions, with some basic information about how it all happens.

## How to release a new version

### Regular release
#### Major release
Let's say we wish to release version `4.0.0`.

1. First thing we need to do is to create a releasable version branch for current version `3`:
- Create a new releasable branch from master branch called `version_3.x`. and configure it as a [protected branch](https://github.com/wix/wix-style-react/settings/branches).
-  Update the `surge-auto-release` command which runs during the `postpublish` step in the `package.json` with `--ver=v3` flag:
```
"scripts": {
    "postpublish": "npx teamcity-surge-autorelease@^1.0.0 --dist=storybook-static --ver=v3"
}
```

2. Release the new version:
- Create a new branch from master branch called `release/<new_version>`.
- Make sure the [CHANGELOG](https://github.com/wix/wix-style-react/blob/master/CHANGELOG.md) is updated.
- Change `package.json` version according to semver rules.
- Create a pr, wait for the pr build to pass and merge to master.
- Announce on #wix-style-react slack channel. If there are new components or features worth mentioning, add it to the slack message.

#### Minor or patch release
Follow step 2 of the [How to release a new version](#how-to-release-a-new-version)


### Older version release
Let's say we wish to introduce some bug fix to an older version which is represented by the version branch `version_3.x`. This branch should have been created in the previous major release.

- Create a new branch from the `version_3.x` branch and name it with the next relevant version, for example: `release/3.1.1`.
- Make sure the CHANGELOG is updated.
- Change `package.json` version according to semver rules.
- Create a pr, wait for the pr build to pass and merge to `version_3.x` branch.

### Speacial rc version release

#### Minor sensitive feature

Let's say that our current latest version is `4.1.0`, and we wish to introduce some sensitive new feature we call `new-icons`.
When we want to release an rc version to gradualy expose this feature:
- Create a new release branch `version_new-icons`. This branch must be configured as a [protected branch](https://github.com/wix/wix-style-react/settings/branches).
- Update the version in `package.json`.
- Update the `surge-auto-release` command which runs during the `postpublish` step in the `package.json` has the relevant `--ver=new_icons` flag:
```
"scripts": {
    "postpublish": "npx teamcity-surge-autorelease@^1.0.0 --dist=storybook-static --ver=new_icons"
}
```

#### Alpha release

Let's say we want to test some new breaking features that are planned to be added to the next major version `4`.
Before we officially release the major version, we can create an alpha version:

- Create a new release branch `version_4-alpha.x`. This branch must be configured as a [protected branch](https://github.com/wix/wix-style-react/settings/branches).
- Update the version in `package.json`.
- Update the `surge-auto-release` command which runs during the `postpublish` step in the `package.json` has the relevant `--ver=v4-alpha` flag:
```
"scripts": {
    "postpublish": "npx teamcity-surge-autorelease@^1.0.0 --dist=storybook-static --ver=v4-alpha"
}
```

## Motivation

### Why semantic versioning

wix-style-react is a large infrastucture library which has many projects using it. The library is under a heavy development and often needs to break some API's or styling. It will not be realistic to break the users every time we wish to improve something, and that is where semver helps us.
Instead of releasing automatically after every commit, we release our package manually with versions which complies with semver rules:

   - **Major** version for incompatible API changes.
   - **Minor** version for adding functionality in a backwards-compatible manner.
   - **Patch** version for backwards-compatible bug fixes.

### Why do we need to maintain multiple versions

#### Maintain older version

When releasing a new major version, it often introduces breaking changes. We can't expect our users to immediately upgrade to the latest version, so we must maintain the older version as well.

Since We have different users using different versions, when we fix an important bug, we might need to introduce this fix in some older supported versions as well.

The library officially supports the 2 latest major versions, and in case some project uses a realy old version, we might break its build in order to force him to upgrade by using [depkeeper](https://github.com/wix/depkeeper).

#### Gradual exposure
When we implement a new breaking change which we want to gradually expose to our users, we can create an alpha version and ask some of our users to work with it, before we officially release it.

## Maintaining a CHANGELOG
The [CHANGELOG](https://github.com/wix/wix-style-react/blob/master/CHANGELOG.md) purpose is to reflect what have changed, added or fixed in each version.

The CHANGELOG should be updated in any given time. The reason for that is that when we want to make a release, it should be simple like pressing a button. Having to update the CHANGELOG every time before we are about to release is annoying and might lead to a postponement of the release.

## Releasable Branches
In order to be able to hold multiple versions, we must have multiple releasable branches. For that reason we have speacial configurations on CI, where each branch with a name such as `version_**` is automatically becoming a releaseable branch. [See here](http://ci.dev.wix/viewType.html?buildTypeId=CommonComponent_WixStyleReact).

When creating a version branch, please make sure to configure it to be a protected branch in Github.

## Npm dist tags
Tags can be used to provide an alias instead of version numbers.
Each time we publish a new version, it also gets a dist tag. When no specific tag is given, the version gets the `latest` tag. When a user do `npm i wix-style-react` without specifying the specific tag, he will get the `latest` tag. In order to get some speacial version, do `npm install <pkg>@<tag>`.
For more infrmation, [read this](https://docs.npmjs.com/cli/dist-tag).

For each releasable branch we can create alpha/ betta / rc versions by using the npm dist tags. Just change the version in the package.json to `3.0.0-alpha` for example, and don't forget to keep a relevant updated changelog for this branch.

## Storybook
We deploy our storybook by using [teamcity-surge-autorelease](https://github.com/wix-private/fed-infra/tree/master/teamcity-surge-autorelease) package.

### When do we deploy a new storybook

1. Each time master branch is doing `npm publish` in CI, `postpublish` is running and deploying a new storybook to `https://wix-wix-style-react.surge.sh`.

2. Each time some regular branch runs in teamcity-pr, after the build is passing we run the `pr-postbuild` command to deploy the story to `https://wix-wix-style-react-pr-<pr_number>.surge.sh/`.

3. Each version branch should pass a `--ver=<version>` flag to the surge command running in `postpublish` step. The storybook will be deployed to `https://wix-wix-style-react-pr-<version>.surge.sh/`.

**Forgetting to pass --ver flag will `override` our master storybook!**

## Eyes 
(TBD)
