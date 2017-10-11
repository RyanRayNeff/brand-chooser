# Fluke Brand Chooser

This page lives at fluke.com, and lets the user select the appropriate BU.

This page is built for speed. It's built using Boostrap SASS. SVG's have been optimized and inlined, with .gif fallbacks for IE8.

## Usage
Gulp is used to compile the sass.  Browser-sync is used to launch a virtual server, and reload the edited page in the browser on save. The watcher tied to browser-sync is tied to `src\*.html` and `src\styles\*.scss`.  You should only be editing files in the src folder. All compiled files are output in the dist folder. Gulp-inject is used to add the `<style>` tag to the head of the html document.  Gulp inject
1. Clone Locally
2. From the root of the repo, run `npm install` in the command prompt. This will install all supporting node modules
3. From the root of the repo, run `bower install` n the command prompt to install Bootstrap Sass.
4. From the root of the repo run `gulp` in the command prompt.
5. You can now edit index.html or scss files in the src folder.

