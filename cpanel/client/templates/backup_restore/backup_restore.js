/**
 * Backup
 */
var state = new ReactiveObj({
    module: '',
    type: '',
    branch: ''
});

Template.cpanel_backup.helpers({
    type: function () {
        var module = state.get('module');
        return typeForBackupRestore(module);
    },
    branch: function () {
        var type = state.get('type');
        return branchForBackupRestore(type);
    }
});

Template.cpanel_backup.events({
    'change [name="module"]': function (e, t) {
        var module = $(e.currentTarget).val();
        state.set('module', module);
    },
    'change [name="type"]': function (e, t) {
        var type = $(e.currentTarget).val();
        state.set('type', type);
    }
});

// Hook
AutoForm.hooks({
    cpanel_backup: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            var dumpUrl, filename, collections, query, module, type, branch;
            module = insertDoc.module;
            type = insertDoc.type;
            branch = insertDoc.branch;

            dumpUrl = '/appDump?';

            collections = [];
            if (module != 'all') {
                if (type != 'all') {
                    collections = Module[module]['dump'][type];
                } else { // all
                    _.each(Module[module]['dump'], function (type) {
                        _.each(type, function (col) {
                            collections.push(col);
                        });
                    });
                }
            }

            query = {};
            if (branch != 'all') {
                query.branchId = branch;
            }
            filename = module + '_' + type + '_' + branch;

            dumpUrl += 'token=' + insertDoc.token;
            dumpUrl += '&filename=' + filename;
            dumpUrl += '&collections=' + collections;
            dumpUrl += '&query=' + JSON.stringify(query);

            console.log(dumpUrl);

            window.location.href = dumpUrl;
            clearSelect2();
            this.done();
        }
    }
});

/**
 * Restore
 */
var restoreWaiting = new ReactiveVar(false);

Template.cpanel_restore.helpers({
    restoreWaiting: function () {
        return restoreWaiting.get();
    },
    type: function () {
        var module = state.get('module');
        return typeForBackupRestore(module);
    },
    branch: function () {
        var type = state.get('type');
        return branchForBackupRestore(type);
    },
    dropCollections: function () {
        var value = false;
        var module = state.get('module');
        var type = state.get('type');

        if (!_.isEmpty(module)) {
            if (module == 'all') {
                value = true;
            } else {
                // Check type
                if (type == 'all') {
                    var colsList = [];
                    _.each(Module[module].dump, function (cols) {
                        _.each(cols, function (col) {
                            colsList.push(col);
                        })
                    });
                    value = colsList;
                } else {
                    value = Module[module]['dump'][type];
                }
            }
        } else {
            value = false;
        }

        return value;
    },
    dropQuery: function () {
        var value = {};
        var branch = state.get('branch');

        if (_.isEmpty(branch) || branch == 'all') {
            value = {};
        } else {
            value = {branchId: branch};
        }

        return JSON.stringify(value);
    }
});

Template.cpanel_restore.events({
    'change [name="module"]': function (e, t) {
        var module = $(e.currentTarget).val();
        state.set('module', module);
    },
    'change [name="type"]': function (e, t) {
        var type = $(e.currentTarget).val();
        state.set('type', type);
    },
    'change [name="branch"]': function (e, t) {
        var branch = $(e.currentTarget).val();
        state.set('branch', branch);
    }
});

// Hook
AutoForm.hooks({
    cpanel_restore: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            var self = this;
            self.event.preventDefault();
            restoreWaiting.set(true);

            var formData, $form;
            $form = $('#cpanel_restore');
            formData = new FormData($form[0]);

            var restoreFile = insertDoc.restoreFile;
            var filename = (restoreFile.split('\\').pop().split('/').pop().split('.'))[0];
            var filenameArr = filename.split('_');
            var module = filenameArr[0];
            var type = filenameArr[1];
            var branch = filenameArr[2];

            /***** Check file name *****/
            if (insertDoc.module != module || insertDoc.type != type || insertDoc.branch != branch) {
                alertify.error('Restore file name don\'t match');
                restoreWaiting.set(false);
                clearSelect2();
                self.done();
                return false;
            }

            //console.log(insertDoc);
            //restoreWaiting.set(false);
            //self.done();
            //return false;


            return $.ajax({
                type: 'POST',
                url: '/appDump',
                data: formData,
                cache: false,
                enctype: 'multipart/form-data',
                contentType: false,
                processData: false
            }).done(function (data) {
                console.log(data);
                restoreWaiting.set(false);
                Meteor.logout();
                Router.go('cpanel.welcome');
                alertify.success('Restore is successful');
                self.done();
                return false;
            }).fail(function (err) {
                console.log('Error restore: ' + err.responseText);
            }).always(function () {
                restoreWaiting.set(false);
            });
        }
    }
});

// List
var typeForBackupRestore = function (module) {
    var list = [];

    if (!_.isEmpty(module)) {
        if (module == 'all' || module == 'Cpanel') {
            list.push({label: '- All -', value: 'all'});
        } else {
            //list.push({label: '- All -', value: 'all'});
            _.each(Module[module].dump, function (val, key) {
                list.push({label: key, value: key});
            });
        }
    }
    list.unshift({label: '(Select One)', value: ''});

    return list;
};

var branchForBackupRestore = function (type) {
    var currentModule = Session.get('currentModule'),
        currentBranch = Session.get('currentBranch'),
        list = [];

    if (!_.isEmpty(type)) {
        // Check current module
        if (type == 'all' || type == 'setting') {
            list.push({label: '- All -', value: 'all'});
        } else {
            _.each(Meteor.user().rolesBranch, function (branch) {
                var getBranch = Cpanel.Collection.Branch.findOne(branch);
                list.push({label: getBranch.enName, value: getBranch._id});
            });
        }
    }
    list.unshift({label: '(Select One)', value: ''});

    return list;
};

