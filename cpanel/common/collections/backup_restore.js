/**
 * Schema
 */
Cpanel.Schema.Backup = new SimpleSchema({
    token: {
        type: String,
        optional: true,
        defaultValue: function () {
            return userToken();
        }
    },
    module: {
        type: String,
        label: 'Module',
        autoform: {
            type: 'select2',
            options: function () {
                return moduleForBackupRestore();
            }
        }
    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: 'select2'
        }
    },
    branch: {
        type: String,
        label: 'Branch',
        autoform: {
            type: 'select2'
        }
    }
});

Cpanel.Schema.Restore = new SimpleSchema({
    token: {
        type: String,
        optional: true,
        defaultValue: function () {
            return userToken();
        }
    },
    module: {
        type: String,
        label: 'Module',
        autoform: {
            type: 'select2',
            options: function () {
                return moduleForBackupRestore();
            }
        }
    },
    type: {
        type: String,
        label: 'Type',
        autoform: {
            type: 'select2'
        }
    },
    branch: {
        type: String,
        label: 'Branch',
        autoform: {
            type: 'select2'
        }
    },
    restoreFile: {
        type: String,
        label: 'Restore file',
        autoform: {
            type: 'file'
        }
    },
    dropCollections: {
        type: String,
        optional: true
    },
    dropQuery: {
        type: String,
        optional: true
    }
});

// List
var moduleForBackupRestore = function () {
    var userId = Meteor.userId(),
        currentModule = Session.get('currentModule'),
        list = [];
    list.push({label: "(Select One)", value: ""});

    if (currentModule == 'Cpanel') {
        list.push({label: "- All -", value: "all"});
        Roles.getGroupsForUser(userId)
            .forEach(function (group) {
                var label = Module[group].name;
                list.push({label: label, value: group});
            });
    } else {
        var label = Module[currentModule].name;
        list.push({label: label, value: currentModule});
    }

    return list;
};
