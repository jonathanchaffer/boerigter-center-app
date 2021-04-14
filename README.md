# Boerigter Center App _(Working Title)_

An app built for the Boerigter Center for Calling and Career at Hope College. Written by Jonathan Chaffer, Josie Crane, Nam Do, and Will von Seeger.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Make sure you have [Node.js](https://www.npmjs.com/get-npm), [npm](https://www.npmjs.com/get-npm), [Git](https://git-scm.com/downloads), and [VSCode](https://code.visualstudio.com/Download) installed on your computer. Clone the repository, navigate to the [`.vscode`](.vscode) directory, and open the code workspace ([`boerigter-center-app.code-workspace`](.vscode/workspace.code-workspace)) in VSCode.

**Important note:** Do not just open the project directory in VSCode! Be sure to open the **code workspace** for the project (shown above), rather than just the project directory. This lets you take advantage of the VSCode configurations for this specific project, ensuring that all contributors' code follows the same standards when committed to the repository. You can learn more about VSCode workspaces [here](https://stackoverflow.com/questions/44629890/what-is-a-workspace-in-visual-studio-code).

Once you've opened the workspace in VSCode, open a terminal and run `npm install`. This generates a [`node_modules`](node_modules) directory in your project and adds all the required dependencies.

This project also uses API keys to access certain data, which should be contained in a [`.env`](.env) file in the root directory. This file is purposely gitignored so no API keys are accessible in the public repository, so you will have to add it yourself – check with [Mike Jipping](jipping@hope.edu) for the required contents of the file.

Finally, once everything is set up, open a terminal and run `npm start`. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser. The page will automatically reload if you make any edits, and you will see any lint errors in the console.

## Deploying Code

Follow these steps to deploy code to the live site:

1. Always make sure you're currently on the `master` branch before deploying to the live site.
2. Make sure you have the [Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) installed.
3. If you haven't done so already, use the Firebase CLI to switch to the [`boerigter-center-app`](https://console.firebase.google.com/u/0/project/boerigter-center-app) project.
4. Run `npm run-script build` to build the app for production to the [`build`](build) folder.
5. After a successful build, run `firebase deploy`. It may take a few minutes, but if successful, the project should be deployed to the [live site](https://boerigter-center-app.web.app).

## Configuration

Open [`boerigter-center-app.code-workspace`](.vscode/workspace.code-workspace) in VSCode to take advantage of the built-in configurations of this template, including ESLint configs, Prettier configs, and VSCode settings. It is highly recommended that you install all of the recommended VSCode extensions listed in [`extensions.json`](.vscode/extensions.json). If you are missing any of the recommended extensions, VSCode will prompt you to install them.

## Contribution Guidelines

### Branches

- `master` holds production code.
- `feature/<xyz>` holds code for new features.
- `bugfix/<xyz>` holds code for bug fixes.

Branches should be named according to the work being done on the branch, or should include the story ID shown on the corresponding PivotalTracker task.

### Pull Requests & Code Review

The [BitBucket repository](https://bitbucket.org/jonathanchaffer-hope/boerigter-center-app) is configured such that commits cannot be made to the `master` branch without an approved pull request. This is to ensure that proper code review is performed for every new feature.

As a general rule of thumb, pull requests should be small, frequent, and easy to review, in order to avoid large merge conflicts. Ideally, each _individual feature_ will have a corresponding pull request, rather than each _group_ of features. Pull requests should have a concise title and a helpful description describing the work that was done in the pull request.

### Documentation

All code should be well-documented. This not only takes the form of comments, but also descriptive function and variable names. Specifically, functions and variables that are reused throughout the project should be documented with [JSDoc](https://en.wikipedia.org/wiki/JSDoc) comments, for example:

```
/**
 * Returns a random number between 0 and x.
 * @param {number} x The maximum.
 * @returns {number} A random integer between 0 and x.
 */
export function getRandom(x: number): number {
  return Math.floor(Math.random() * x);
}
```

When documenting method bodies, it's not necessary to comment every single line of code, as most code should be **self-documenting**, meaning it's easy to tell what the code does by reading the code itself.

As a general rule of thumb, non-JSDoc comments should explain **why** the code was implemented the way it was, rather than **what** the code does.

Learn more about good commenting practice [here](https://javascript.info/comments).

## Project Structure

The [`src`](src) directory contains several subdirectories:

- [`assets`](src/assets): Images, fonts, etc.
- [`components`](src/components): The actial React components that make up the app.
- [`styles`](src/styles): Global styles used througout the app.
- [`contexts`](src/contexts): React [contexts](https://reactjs.org/docs/context.html) for holding shared state.
- [`models`](src/models): Interfaces that represent objects within the app.
- [`services`](src/services): Helper functions that interface with outside data (usually asynchronous).
- [`utilities`](src/utilities): Helper functions and global constants.

Barrelling is highly recommended to simplify imports as the project gets larger. You can learn more about barreling [here](https://basarat.gitbook.io/typescript/main-1/barrel).

## React Recommendations

It is highly recommended that you use [functional components](https://reactjs.org/docs/components-and-props.html) over class components to utilize the [React Hooks](https://reactjs.org/docs/hooks-intro.html) API.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
