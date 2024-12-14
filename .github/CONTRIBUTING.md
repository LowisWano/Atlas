# Contributing

## Setup

Navigate to your desired directory and run this command:

```bash
# clone the remote repository into your machine
git clone https://github.com/LowisWano/Atlas.git
# change current working directory to the project
cd Atlas
# get the newest version of the remote repo
git pull
# open the current directory in your preferred text editor
code .
```

Once that's done, install the project dependencies via this command: 

```bash
# a node_modules folder will appear after running this command
npm install
```

Now, run this command to start a development server that watches for file changes and automatically reloads the application.

```bash
npm run dev
```

# Project Structure

```
Atlas/
├─ node_modules/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ layouts/
│  │  ├─ ui/
│  ├─ hooks/
│  ├─ pages/
│  ├─ services/
│  ├─ utils/
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx
├─ index.html
├─ package.json
```

## The `src/` Directories

1. `assets` - contains images, graphics, font families, etc. that will be imported into `/src`'s files.
2. `components` - contains commonly reused components.
   - `components/layouts` - header, footer, navbar, sidebars, etc.
   - `components/ui` - commonly used UI elements like buttons, lists, links, etc.
3. `hooks` - contains reusable component logic.
4. `pages` - contains the pages of the application which will be used for routing with React Router.
5. `services` - contains functions used for communicating with the backend or other APIs.
6. `utils` - contains utility functions like formatters and etc.

## Contribution Conventions

Here's an example commit flow with git:

```bash
# sync latest code from the remote repository
git pull
# create a new branch based on the feature you want to work on
git checkout -b <new_branch>
# after making some changes, add and commit your work
git add .
git commit -m "category: do something"
# push your changes and make a pull request on GitHub afterwards so that I can review them
git push origin HEAD
```

The syntax for making `git commit -m <insert_message_here>` messages should follow this syntax for consistency:

```bash
"category: do something"
```

1. `do something` must be written in imperative tone
2. `category` must fall under these categories;
   - `feat:` introduces a new feature or component to the codebase
   - `style:` changes a layout, stylesheet, UI look of a certain component
   - `fix:` patches a bug
   - `docs:` any addition pertaining to documentation (comments, README.md, etc)
   - `nit:` small change
   - `BREAKING CHANGE:` a change that dramatically changes a pre-existing system - possibly leading to bugs to be patched
