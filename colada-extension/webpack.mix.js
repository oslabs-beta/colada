let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('app-frontend/src/assets/style.scss', 'dist/css')
    .js('./assets/js/background.js', 'dist/js')
    .js('./assets/js/content-script.js','dist/js')
    .js('./assets/js/popup.js', 'dist/js').vue()
    .options({
        processCssUrls: false
    });