Package.describe({
    name: 'theara:autoform-select2',
    version: '0.0.4',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');

    api.use('templating');
    api.use('blaze');
    api.use('aldeed:template-extension@3.4.3');
    api.use('aldeed:autoform@4.0.0 || 5.0.0');

    api.addFiles([
        'autoform-select2.html',
        'autoform-select2.js'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('theara:autoform-select2');
    api.addFiles('autoform-select2-tests.js');
});
