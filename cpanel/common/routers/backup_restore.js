Router.route('cpanel/backup', function () {

    this.render('cpanel_backup');

}, {
    name: 'cpanel.backup',
    title: "Backup",
    header: {title: 'backup', icon: 'download'},
    breadcrumb: {title: 'Backup', parent: 'cpanel.welcome'}
});

Router.route('cpanel/restore', function () {

    this.render('cpanel_restore');

}, {
    name: 'cpanel.restore',
    title: "Restore",
    header: {title: 'restore', icon: 'upload'},
    breadcrumb: {title: 'Restore', parent: 'cpanel.welcome'}
});

