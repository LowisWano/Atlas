# Atlas

- A medieval RPG style task management app that gamifies your goals and tasks. 
- Earn exp, gold, and rank points as you accomplish tasks to level up your character and increase your rank!

# Contributing

## Setup

Navigate to your desired directory and run this command:

```bash
# clones the remote repository into your machine
git clone git@github.com:LowisWano/Atlas.git
# change current working directory to the project
cd Atlas
# gets the newest version of the remote repo
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
git add .
git commit -m "category: do something"
git push origin main
```

The syntax for making `git commit -m <insert_message_here>` messages should follow this syntax for consistency:

```bash
"category: do something"
```

1. `do something` must be written in [imperative tone](https://www.theserverside.com/video/Follow-these-git-commit-message-guidelines#:~:text=If%20you%20want%20to%20write,Instead%2C%20describe%20what%20was%20done.).
2. `category` must fall under these categories;
   - `feat:` introduces a new feature or component to the codebase
   - `style:` changes a layout, stylesheet, UI look of a certain component
   - `fix:` patches a bug
   - `docs:` any addition pertaining to documentation (comments, README.md, etc)
   - `nit:` small change based on some sort of convention, see [this SO question](https://stackoverflow.com/questions/27810522/what-does-nit-mean-in-hacker-speak).
   - `BREAKING CHANGE:` a change that dramatically changes a pre-existing system - possibly leading to bugs to be patched
