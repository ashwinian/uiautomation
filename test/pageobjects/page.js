export default class Page {
    open (path) {
        browser.url(path)
    }
}

//exports.default = Page;
//module.exports = exports['default'];
module.exports = Page;
