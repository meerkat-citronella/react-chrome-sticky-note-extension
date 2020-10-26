![Screenshot](screenshot.png)
This code was built alongside a larger tutorial. [You can check that out here](https://github.com/meerkat-citronella/react-chrome-sticky-note-extension).

[Read the full tutorial](https://meerkat-citronella.github.io/jekyll/update/2020/10/01/welcome-to-jekyll.html)

[Intro Video Walkthrough](https://youtu.be/gVMarA5eE7k)

[Full Video Walkthrough](https://youtu.be/mveFTfzJ_io)

## Available Scripts

In the project directory, you can run:

### `yarn start`

First, set `REACT_APP_LOCAL=true`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build:extension`

First, set `REACT_APP_LOCAL=false`

This command will build the app as a Chrome extension. You will need to navigate to the `chrome://extensions` tab and click `Load unpacked`. Then, select the build folder.
