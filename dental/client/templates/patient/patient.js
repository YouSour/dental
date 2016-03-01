/**
 * Index
 */
Template.dental_patient.onCreated(function () {
    // Create new  alertify
    Meteor.subscribe('dental_patientHistory');
    createNewAlertify("patient");
});

Template.dental_patient.helpers({
    selector: function () {
        var pattern = Session.get('currentBranch');
        return {
            branchId: pattern
        };
    }
});

Template.dental_patient.events({
    'click .insert': function (e, t) {
        alertify.patient(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert))
            .maximize();
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.patient(fa("pencil", "Patient"), renderTemplate(Template.dental_patientUpdate,
            data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Patient"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {

                Dental.Collection.Patient.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .show': function (e, t) {
        var data = this;
        // History
        var history = [];
        _.each(data.history, function (val) {
            var historyDoc = Dental.Collection.PatientHistory.findOne(val);
            history.push(historyDoc.name);
        });
        data.historyVal = JSON.stringify(history, null, ' ');

        // Photo
        data.photoUrl = null;
        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo).url();
        }

        alertify.alert(fa("eye", "Patient"), renderTemplate(Template.dental_patientShow,
            data));
    }
});

/**
 * Insert
 */
Template.dental_patientInsert.onRendered(function () {
    memberAutoSelected();
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_patientInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('dental', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('select').each(function () {
                $(this).select2("val", "");
            });

            //return member selected value "No"
            memberAutoSelected();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_patientUpdate: {
        onSuccess: function (formType, result) {
            alertify.patient().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

//AutoSelected
var memberAutoSelected = function () {
    $('[name="member"]').val("No").trigger("change");
};
