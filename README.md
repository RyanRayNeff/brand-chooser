# Fluke Brand Chooser

This page lives at fluke.com, and lets the user select the appropriate BU.

This page is built for speed. It's built using Boostrap SASS. SVG's have been optimized and inlined, with .gif fallbacks for IE8.

## Usage
Gulp is used to compile the sass.  Browser-sync is used to launch a virtual server, and reload the edited page in the browser on save. The watcher tied to browser-sync is tied to `src\*.html` and `src\styles\*.scss`.  You should only be editing files in the src folder. All compiled files are output in the dist folder. Gulp-inject is used to add the `<style>` tag to the head of the html document.  Gulp inject
1. Clone Locally
2. From the root of the repo, run `npm install` in the command prompt. This will install all supporting node modules
3. From the root of the repo, run `bower install` n the command prompt to install Bootstrap Sass.
4. From the root of the repo run `gulp` in the command prompt.
5. You can now edit index.html or scss files in the src folder, and you css/html will be auto-compiled to the dist folder.

## Weird Stuff and Why
We're doing some weird stuff, for good reasons:
1. Cookies are set via javascript rather than php so we can cache the page. After you select a Fluke IG site, a cookie is dropped that will cause you to be auto-redirected to that site for 24 hours. To get back to the page, you can delete the cookie "flukesiteredirect"
2. Things that would normally be served via a cdn are served locally, because this site is intended for use in China, and some google cdn assets don't work as expected there.
3. We're completely bypassing the drupal theme layer. We've done this for a couple good reasons:
  * Drupal doesn't like .svg's (Rightly so). This page uses highly optimized inline svgs whenever possible, to reduce external file calls and to look great on retina displays. They do have .gif fallbacks to support ie8.
  * We're using minification inlining and compression to finely tune this page for speed, and to support as many browsers as possible. The "crufty" html of drupal would undo a fair bit of our hard earned optimizations.
  * Using an obfuscated development method helps us keep trashy/slow tracking scripts off the page. (The legacy cms's were "plump" with slow-loading scripts)
  * We're using Bootstrap 3 for the ie8 support. We're using 'uncss' to peel away the cruft and keep only what we need.
  * The design calls for a tab style that's not native to bootstrap, so we used tab-collapse.js.

