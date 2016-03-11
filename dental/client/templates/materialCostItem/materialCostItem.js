/**
 * Index
 */
Template.dental_materialCostItem.onCreated(function () {
    Meteor.subscribe('dental_materialCostCategory');
    createNewAlertify(['materialCostItem','materialCostCategoryAddon']);
});

Template.dental_materialCostItem.events({
    'click .insert': function () {
        alertify.materialCostItem(fa("plus", "Material Item"), renderTemplate(Template.dental_materialCostItemInsert)).maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.materialCostItem(fa("pencil", "Material Item"), renderTemplate(Template.dental_materialCostItemUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;

        alertify.confirm(
            fa("remove", "Remove"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.MaterialCostItem.remove(self._id, function (error) {
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

        alertify.materialCostItem(fa("eye", "Material Item"), renderTemplate(Template.dental_materialCostItemShow, data));
    }
});

/*
 * Insert
 */

Template.dental_materialCostItemInsert.events({
    'click .materialCostCategoryAddon': function () {
       alertify.materialCostCategoryAddon(fa("plus","Material Category"),renderTemplate(Template.dental_materialCostCategoryInsert));
    }
});

/*
 * Update
 */

Template.dental_materialCostItemUpdate.events({
    'click .materialCostCategoryAddon': function () {
        alertify.materialCostCategoryAddon(fa("pencil","Material Category"),renderTemplate(Template.dental_materialCostCategoryInsert));
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_materialCostItemInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                Meteor.call('dental');
                return doc
            }
        },
        onSuccess: function (fromType, result) {
            $('select').each(function(){
                $(this).select2("val","");
            });

            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_materialCostItemUpdate: {
        onSuccess: function (fromType, result) {
            alertify.materialCostItem().close();
            alertify.success("Success");
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
