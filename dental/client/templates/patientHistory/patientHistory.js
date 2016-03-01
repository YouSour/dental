/*
 * Index
 */
Template.dental_patientHistory.onRendered(function () {
    createNewAlertify('patientHistory');
});

Template.dental_patientHistory.events({
    'click .insert': function () {
        alertify.patientHistory(fa("plus", "Patient History"), renderTemplate(
            Template.dental_patientHistoryInsert));
    },
    'click .update': function () {
        var data = this;
        alertify.patientHistory(fa("pencil", "Patient History"),
            renderTemplate(Template.dental_patientHistoryUpdate, data));
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Patient History"),
            "Are you sure to delete [" + self._id + "] ?",
            function () {
                Dental.Collection.PatientHistory.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success('Success');
                    }
                });
            },
            null
        );
    },
    'click .show': function () {
        alertify.alert(fa("eye", "Patient History"), renderTemplate(Template.dental_patientHistoryShow,
            this));
    }
});

/*
 * Hook
 */

AutoForm.hooks({
    dental_patientHistoryInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                Meteor.call('dental');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_patientHistoryUpdate: {
        onSuccess: function (formType, result) {
            alertify.patientHistory().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
