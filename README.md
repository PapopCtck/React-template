<h1>
 React Typescript Template
</h1>

<div align="center"><img alt="Logo" style="border-radius:50%" src="https://avatars.githubusercontent.com/u/10653386?v=4" width="20%" /></div>
<br/>
<p align="center">Brought to you by <a href="https://github.com/PapopCtck">PapopCtck</a></p>
<br/>
<p >A custom <code>create-react-app</code> template</p>
<p >aiming for <strong>maximum customization</strong> and <strong>rapid development</strong></p>


<br/>

## Table of contents

- 🚀 [Getting Started](#getting-started)
- 🔍 [Overview](#overview)
  - 📦 [Included package](#included-package)
    - 🏛 [Framework](#framework)
    - 📚 [additional library](#additional-library)
- ⏱ [Changelogs](#changelogs)
- 📒 [Available Scripts](#available-scripts)
- 📖 [Learn More](#learn-more)

## Getting Started

Run `yarn` or `npm i` to install project's dependency. 

To run development build of project, run `yarn start` or `npm start`.

Additionaly, To run storybook, run `yarn storybook` or `npm storybook`. **( ✅ Recommend )**

## Overview

### Included package

#### Framework
 - transpiled with [typescript](https://www.typescriptlang.org/docs/)
 - bootstraped by [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started)
 - documented with [storybook](https://storybook.js.org/docs/react/get-started/introduction)
 - styled with [emotion](https://emotion.sh/docs/introduction)
 - animate with [framer-motion](https://www.framer.com/api/motion/)
 - testing with [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

#### Additional library

- [craco](https://github.com/gsoft-inc/craco)
- [dayjs](https://day.js.org/)
- [i18next](https://www.i18next.com/)
- [lodash](https://lodash.com/docs/4.17.15)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [redux](https://react-redux.js.org/) with [redux-saga](https://redux-saga.js.org/)
- [uuid](https://github.com/uuidjs/uuid#readme)
- [react-feather](https://feathericons.com/)
- [react-datepicker](https://reactdatepicker.com/)

## Changelogs

Changelogs available at [github](https://github.com/PapopCtck/React-template/releases) or [localhost:6006(storybook)](http://localhost:6006/?path=/story/documentation-changelog--page)

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:generate-output`

Generate test results and output it to a file.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

**Additional Note: you probably don't need this as we already provide most config with craco**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn storybook`

Runs storybook of this app.
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

Also reload if you make edits.

### `yarn build-storybook`

Builds the storybook for production.

### `yarn analyze`

Run `webpack-bundle-analyzer` at `'build/static/js/*.js'` to show bundle size of built project.

### `yarn build:analyze`

Run `build` and `analyze` in sequence.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Learn how to write your own story in the [Storybook documentation](https://storybook.js.org/docs/react/get-started/introduction)

Learn how to write your unit tests in the [@testing-library/react documentaition](https://testing-library.com/docs/react-testing-library/intro/)

For additional usage of `@emotion` [@emotion documentation](https://emotion.sh/docs/introduction)

For additional usage of `framer-motion` [framer-motion documentation](https://www.framer.com/api/motion/)