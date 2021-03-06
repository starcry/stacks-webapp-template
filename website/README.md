This website was created (with love) with [Docusaurus](https://docusaurus.io/).

# What's In This Document

- [What's In This Document](#whats-in-this-document)
- [Publishing changes](#publishing-changes)
- [Get Started in 5 Minutes](#get-started-in-5-minutes)
  - [Directory Structure](#directory-structure)
- [Editing Content](#editing-content)
  - [Editing an existing docs page](#editing-an-existing-docs-page)
- [Adding Content](#adding-content)
  - [Adding a new docs page to an existing sidebar](#adding-a-new-docs-page-to-an-existing-sidebar)
  - [Adding items to your site's top navigation bar](#adding-items-to-your-sites-top-navigation-bar)
  - [Adding custom pages](#adding-custom-pages)
- [Full Documentation](#full-documentation)

# Publishing changes

Docusaurus generates a static HTML website that is currently being served on github pages. See their [documentation](https://docusaurus.io/docs/en/publishing#using-github-pages) for more information on how to publish.

To publish locally:
1. `npm install`
2. `npm run build`
3. Substituting the <GIT_USER> for your username, publish the solution
    ```bash
    GIT_USER=<GIT_USER> \
    npm run publish-gh-pages
    ```
This will push the changes to the stacks-webapp-template [gh-pages](https://github.com/amido/stacks-webapp-template/tree/gh-pages) branch. If successful, changes will be public immediately at https://amido.github.io/stacks-webapp-template/.

# Get Started in 5 Minutes

1. Make sure all the dependencies for the website are installed:

```sh
# Install dependencies
$ npm install
```

2. Run your dev server:

```sh
# Start the site
$ npm start
```

## Directory Structure

Your project file structure should look something like this

```
stacks-webapp-template/
  docs/
    doc-1.md
    doc-2.md
    doc-3.md
  website/
    core/
    node_modules/
    pages/
    static/
      css/
      img/
    package.json
    sidebars.json
    siteConfig.js
```

# Editing Content

## Editing an existing docs page

Edit docs by navigating to [docs/](../docs/) and editing in md.

# Adding Content

## Adding a new docs page to an existing sidebar

1. Create the doc as a new markdown file in [docs/](../docs/), example `docs/newly-created-doc.md`:

```md
---
id: newly-created-doc
title: This Doc Needs To Be Edited
---

My new content here..
```

1. Refer to that doc's ID in an existing sidebar in `website/sidebars.json`:

```javascript
// Add newly-created-doc to the Getting Started category of docs
{
  "docs": {
    "Getting Started": [
      "newly-created-doc" // new doc here
    ],
    ...
  },
  ...
}
```

For more information about adding new docs, click [here](https://docusaurus.io/docs/en/navigation)

## Adding items to your site's top navigation bar

1. Add links to docs, custom pages or external links by editing the headerLinks field of `website/siteConfig.js`:

`website/siteConfig.js`

```javascript
{
  headerLinks: [
    ...
    /* you can add docs */
    { doc: 'my-examples', label: 'Examples' },
    /* you can add custom pages */
    { page: 'help', label: 'Help' },
    /* you can add external links */
    { href: 'https://github.com/facebook/docusaurus', label: 'GitHub' },
    ...
  ],
  ...
}
```

For more information about the navigation bar, click [here](https://docusaurus.io/docs/en/navigation)

## Adding custom pages

1. Docusaurus uses React components to build pages. The components are saved as .js files in `website/pages/en`:
1. If you want your page to show up in your navigation header, you will need to update `website/siteConfig.js` to add to the `headerLinks` element:

`website/siteConfig.js`

```javascript
{
  headerLinks: [
    ...
    { page: 'my-new-custom-page', label: 'My New Custom Page' },
    ...
  ],
  ...
}
```

For more information about custom pages, click [here](https://docusaurus.io/docs/en/custom-pages).

# Full Documentation

Full documentation can be found on the [website](https://docusaurus.io/).
