let mix = require('laravel-mix');
let fs = require('fs');

//bundles js, vue and sass files into dist folder

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

    //adds html pages and manifest to dist folder

    mix.after(() => {fs.copyFileSync('./assets/html/popup.html','dist/popup.html');
                  fs.copyFileSync('./assets/html/devtools-panel.html','dist/devtools-panel.html');
                  fs.copyFileSync('./assets/html/devtools-background.html','dist/devtools-background.html');
                  fs.copyFileSync('./manifest.json','dist/manifest.json');
                });

