const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    trailingSlash: true,
    distDir: 'build',
    optimizeFonts: false,
    images:{
        unoptimized: true,
    }
}