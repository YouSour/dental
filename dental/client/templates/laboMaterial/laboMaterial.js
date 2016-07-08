/**
 * Index
 */
Template.dental_laboMaterial.onRendered(function () {
    // Subscribe
    Meteor.subscribe('dental_laboMaterialCategory');
    Meteor.subscribe('dental_laboUnit');
    // Create new  alertify
    createNewAlertify(["laboMaterial","laboUnit","laboMaterialCategory"]);
});

Template.dental_laboMaterial.events({
    'click .insert': function (e, t) {
        alertify.laboMaterial(fa("plus", "Laboratory Material"), renderTemplate(Template.dental_laboMaterialInsert));
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboMaterial(fa("pencil", "Laboratory Material"), renderTemplate(Template.dental_laboMaterialUpdate, data));
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Material"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboMaterial.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            }, null
        );
    },
    'click .show': function (e, t) {
        var data = this;
        alertify.laboMaterial(fa("eye", "Laboratory Material"), renderTemplate(Template.dental_laboMaterialShow, data));
    }
});

/**
 * Insert
 */
Template.dental_laboMaterialInsert.events({
    'click .laboUnitAddon': function (e, t) {
        alertify.laboUnit(fa("plus", "Laboratory Unit"),
            renderTemplate(Template.dental_laboUnitInsert));
    },
    'click .laboMaterialCategoryAddon': function (e, t) {
        alertify.laboMaterialCategory(fa("plus", "Laboratory Material Category"),
            renderTemplate(Template.dental_laboMaterialCategoryInsert));
    }
});

/**
 * Update
 */
Template.dental_laboMaterialUpdate.events({
    'click .laboUnitAddon': function (e, t) {
        alertify.laboUnit(fa("plus", "Laboratory Unit"),
            renderTemplate(Template.dental_laboUnitInsert));
    },
    'click .laboMaterialCategoryAddon': function (e, t) {
        alertify.laboMaterialCategory(fa("plus", "Laboratory Material Category"),
            renderTemplate(Template.dental_laboMaterialCategoryInsert));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboMaterialInsert: {
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
    dental_laboMaterialUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboMaterial().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
