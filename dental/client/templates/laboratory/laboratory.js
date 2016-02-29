/**
 * Index
 */
Template.dental_laboratory.onRendered(function () {
    createNewAlertify('laboratory');
});

Template.dental_laboratory.events({
    'click .insert': function () {
        alertify.laboratory(fa("plus", "Laboratory Item"), renderTemplate(Template.dental_laboratoryInsert));
    },
    'click .update': function () {
        var data = this;
        alertify.laboratory(fa("pencil", "Laboratory Item"), renderTemplate(Template.dental_laboratoryUpdate, data));
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Remove"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.Laboratory.remove(self._id, function (error) {
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

        alertify.alert(fa("eye", "Laboratory Item"), renderTemplate(Template.dental_laboratoryShow, data));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboratoryInsert: {
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Dental.Collection.Laboratory, 3);
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (fromType, result) {
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_laboratoryUpdate: {
        onSuccess: function (fromType, result) {
            alertify.laboratory().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
