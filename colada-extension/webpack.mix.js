let mix = require('laravel-mix');

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