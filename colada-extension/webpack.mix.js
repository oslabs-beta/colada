let mix = require('laravel-mix');
let fs = require('fs');

mix.before(() => {fs.copyFileSync('./assets/html/popup.html','dist/popup.html');
                  fs.copyFileSync('./assets/html/devtools-panel.html','dist/devtools-panel.html');
                  fs.copyFileSync('./assets/html/devtools-background.html','dist/devtools-background.html');
                  fs.copyFileSync('./manifest.json','dist/manifest.json');

                            });

mix.setPublicPath('./')
    .sass('app-frontend/src/assets/style.scss', 'dist/css')
    .js('./assets/js/background.js', 'dist/js')
    .js('./assets/js/content-script.js','dist/js')
    .js('./assets/js/devtools-background.js', 'dist/js')
    .js('./assets/js/devtools-panel.js', 'dist/js').vue()
    .js('./assets/js/popup.js', 'dist/js')
    .options({
        processCssUrls: false
    });

