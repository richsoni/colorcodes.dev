# The Game

1. The `Game` is single `player`
1. The `Game` accepts a list of `inputColors`
1. The `Game` has three states: `begin`, 'active', and 'complete'
1. The `Game` begins in the `begin` state
1. The `Game` has `scoring`

## The begin State

1. The `begin` state only occurs once, at the beginning of the game
1. The `player` should be able to transition the 'begin' state to 'active'

## The active State

1. The `active` state has numerous `Rounds`
1. The first `Round`, begins upon transition to the `active` state
1. The number of `Rounds` is equal to the number of `inputColors`
1. Each `Round` is provided with a random but unique value selected from `inputColors`
1. The result of each `Round` is provided to the Game, and tallied as `correct` or `incorrect` by the `scoring`
1. After the last round The `Game` transitions to the 'complete' state

### The Round

1. The `Round` accepts a single `unnamedColor`
1. The `Round` has two states: 'active', and 'complete'
1. The `Round` begins in the `active` state
1. The `Round` presents a swatch to the `player`, which shaded with the `unnamedColor`
1. The `player` has one `guess` at the `unnamedColor`
1. A `guess` transitions the `Round`'s state to `complete`
1. The `complete` state reveals unnamedColor's name to the `player`
1. The `complete` state indicates to the player the correctness of their guess
1. The `player` ends the complete state by pressing any key, or touching the screen
1. After the `complete` state the `Round` is over

## The complete State

1. The `complete` state displays final `scoring`
1. The `player` can `reset` the `Game` from the `complete` state

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
