Dental.ListState = new ReactiveObj();
/*
 * Index
 */
Template.dental_treatment.onCreated(function () {
    createNewAlertify(['treatment', 'doctorAddon']);
});

Template.dental_treatment.helpers({
    register: function () {
        return Dental.ListState.get('data');
    },
    selector: function () {
        var registerId = Dental.ListState.get('data')._id;
        return {
            registerId: registerId
        };
    }
});

Template.dental_treatment.events({
    'click .insert': function () {
        Session.set('closeTreatment', true);
        var data = Dental.ListState.get('data');
        alertify.treatment(fa("plus", "Treatment"), renderTemplate(Template.dental_treatmentInsert,
            data)).maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.treatment(fa("pencil", "Treatment"), renderTemplate(Template
            .dental_treatmentUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Treatment"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Dental.Collection.Treatment.remove(self._id, function (error) {
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
    'click .show': function () {
        var data = this;
        alertify.alert(fa("eye", "Treatment"), renderTemplate(Template.dental_treatmentShow,
            data));
    },
    'click .showDescription': function () {
        // Show Description
        var q = 'treatmentId=' + this._id;
        var url = 'treatmentDescriptionGen?' + q;
        window.open(url);
    },
    'click .treatmentPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this.registerId;
        var url = 'treatmentReportGen?' + q;
        window.open(url);
    }
});

/**
 * Insert
 */
Template.dental_treatmentInsert.onRendered(function () {
    datepicker();
});

Template.dental_treatmentInsert.events({
    'click .doctorAddon': function (e, t) {
        alertify.doctorAddon(
            fa("plus", "Doctor"),
            renderTemplate(Template.dental_doctorInsert)
        ).maximize();
    },
    'click #saveAndPrint': function (e, t) {
        Meteor.subscribe('dental_treatment');
        return Session.set('printTreatment', true);
    }
});

/**
 * Update
 */
Template.dental_treatmentUpdate.onRendered(function () {
    datepicker();
});

Template.dental_treatmentUpdate.events({
    'click .doctorAddon': function (e, t) {
        alertify.doctorAddon(
            fa("plus", "Doctor"),
            renderTemplate(Template.dental_doctorInsert)
        );
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_treatmentInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('dental', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            if (Session.get('closeTreatment')) {
                alertify.treatment().close();
            }
            //clear select2
            $('select').each(function () {
                $(this).select2("val", "");
            });

            var printSession = Session.get('printTreatment');
            Meteor.call('getTreatmentId', result, function (err, result) {
              var data = Dental.Collection.Treatment.findOne(result);
                if (printSession) {
                  var q = 'patient=' + data.patientId + '&register=' + data.registerId;
                  var url = 'treatmentReportGen?' + q;
                  window.open(url);
                }
            Session.set('printTreatment', false);
            });
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_treatmentUpdate: {
        onSuccess: function (formType, result) {
            alertify.treatment().close();
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datepicker = function () {
    var treatmentDate = $('[name="treatmentDate"]');
    DateTimePicker.dateTime(treatmentDate);
};
