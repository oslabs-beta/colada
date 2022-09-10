let mix = require('laravel-mix');

mix.setPublicPath('./')
    .js('./assets/js/background.js', 'dist/js')
    .js('./assets/js/popup.js', 'dist/js').vue()
    .options({
        processCssUrls: false
    });