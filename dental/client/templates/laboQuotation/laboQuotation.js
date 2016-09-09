/**
 * Index
 */
Template.dental_laboQuotation.onCreated(function () {
    Meteor.subscribe('dental_staff');
    Meteor.subscribe('dental_laboCustomerCompany');
    Meteor.subscribe('dental_laboDepartment');
    Meteor.subscribe('dental_laboItem');
    createNewAlertify(['quotation', 'staffAddon','drCompanyAddon']);
});

Template.dental_laboQuotation.events({
    'click .insert': function () {
        alertify.quotation(fa("plus", "Laboratory Quotation"), renderTemplate(Template.dental_laboQuotationInsert))
            .maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.quotation(fa("pencil", "Laboratory Quotation"), renderTemplate(Template
            .dental_laboQuotationUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;
        alertify.confirm(
            fa("remove", "Laboratory Quotation"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Dental.Collection.LaboQuotation.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            }, null
        );
    },
    'click .show': function () {
        alertify.quotation(fa("eye", "Laboratory Quotation"), renderTemplate(Template.dental_laboQuotationShow,
            this));
    },
    'click .laboQuotationPrintAction': function () {
        var q = 'doctorCompany=' + this.doctorCompanyId + '&laboQuotation=' + this._id;
        var url = 'laboQuotationReportGen?' + q;
        window.open(url);
    }
});

Template.dental_departmentArray.helpers({
    jsonViewOpts: function () {
        return {collapsed: true};
    }
});

Template.dental_laboQuotationShow.helpers({
  jsonViewOpts: function () {
    return {collapsed: true};
  }
});
/**
 * Insert
 */
Template.dental_laboQuotationInsert.onRendered(function () {
    Meteor.typeahead.inject();
    datepicker();
    // $('.btnAdd').attr('disabled', "disabled");
});


/**
 * Update
 */
Template.dental_laboQuotationUpdate.onRendered(function () {
    datepicker();
    //run this function when on update get value for total
    calculateTotal();
});

/**
 * Disease Item Insert
 */

Template.dental_laboQuotationInsert.helpers({
    search: function (query, sync, callback) {
        Meteor.call('searchPatient', query, {}, function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    selected: function (event, suggestion, dataSetName) {
        // event - the jQuery event object
        // suggestion - the suggestion object
        // datasetName - the name of the dataset the suggestion belongs to
        // TODO your event handler here
        var id = suggestion._id;
        $('[name="search"]').typeahead('val', suggestion._id + ' | ' + suggestion.name + " | " + suggestion.age);
        $('.patientId').val(id);
        // var patient = $('.patientId').val(id);
        // if (patient) {
        //     $('.item').removeAttr('disabled');
        // }


    }

});
Template.dental_laboQuotationInsert.events({
    'click .staffAddon': function (e, t) {
        alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
    },
    'click .doctorCompanyAddon': function (e, t) {
        alertify.drCompanyAddon(fa("plus", "Doctor Company"), renderTemplate(Template.dental_laboCustomerCompanyInsert));
    },
    'click #saveAndPrint': function () {
        Meteor.subscribe('dental_laboQuotation');
        Session.set('printLaboQuotation', true);
    }
});

/**
 * Disease Item Update
 */
//piseth edited
Template.dental_laboQuotationUpdate.onRendered(function () {

    //typeaheadupdate
    Meteor.typeahead.inject();
    $('[name="search"]').typeahead('val', this.data.patientId + " | " + this.data._patient.name + " | " + this.data._patient.gender);


});

Template.dental_laboQuotationUpdate.helpers({
    //typeAhead: function () {
    //    return data.patientId
    //},

    search: function (query, sync, callback) {
        Meteor.call('searchPatient', query, {}, function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    selected: function (event, suggestion, dataSetName) {
        // event - the jQuery event object
        // suggestion - the suggestion object
        // datasetName - the name of the dataset the suggestion belongs to
        // TODO your event handler here
        var id = suggestion._id;
        $('[name="search"]').typeahead('val', suggestion._id + ' | ' + suggestion.name + " | " + suggestion.age);
        $('.patientId').val(id);
        // var patient = $('.patientId').val(id);
        // if (patient) {
        //     $('.item').removeAttr('disabled');
        // }


    }
});

Template.dental_laboQuotationUpdate.events({
  'click .staffAddon': function (e, t) {
      alertify.staffAddon(fa("plus", "Staff"), renderTemplate(Template.dental_staffInsert));
  },
  'click .doctorCompanyAddon': function (e, t) {
      alertify.drCompanyAddon(fa("plus", "Doctor Company"), renderTemplate(Template.dental_laboCustomerCompanyInsert));
  }
});

/**
 * Show
 */
Template.dental_laboQuotationShow.helpers({
    quotationDateFormat: function () {
        return moment(this.purchaseDate).format("YYYY-MM-DD");
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboQuotationInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                doc.total = $('.total').val();
                var prefix = doc.branchId + '-';
                Meteor.call('dental', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            //clear select2
            $('select').each(function () {
                $(this).select2("val", "");
            });
            //clear selectize
            // $('select.item')[0].selectize.clear(true);

            var printSession = Session.get('printLaboQuotation');
            Meteor.call('getLaboQuotationId', result, function (err, result) {
                var data = Dental.Collection.LaboQuotation.findOne(result);
                if (printSession) {
                  var q = 'doctorCompany=' + data.doctorCompanyId + '&laboQuotation=' + data._id;
                  var url = 'laboQuotationReportGen?' + q;
                  window.open(url);
                }
                Session.set('printLaboQuotation', false);
            });
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    dental_laboQuotationUpdate: {
        before: {
            update: function (doc) {
                doc.$set.total = $('.total').val();
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.quotation().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datepicker = function () {
    var startDate = $('[name="startDate"]');
    DateTimePicker.dateTime(startDate);
    var deadLine = $('[name="deadLine"]');
    DateTimePicker.dateTime(deadLine);
};

/**
 * Calculate total & Amount for disease item When keyUp & click
 */

function CalculateTotalAndAmount(e) {
    var thisObj = $(e.currentTarget);
    var qty = thisObj.parents('div.array-item').find('.qty').val();
    var price = thisObj.parents('div.array-item').find('.price').val();
    var discount = thisObj.parents('div.array-item').find('.discount').val();
    var amount = math.round(qty * price, 2);
    var amountAfterDiscount = math.round(amount - (amount * discount / 100), 2);

    thisObj.parents('div.array-item').find('.amount').val(amountAfterDiscount);

    // if (qty > 0 && (discount >= 0 && discount <= 100)) {
    //     $('.btnAdd').removeAttr('disabled');
    // } else {
    //     $('.btnAdd').attr('disabled', "disabled");
    // }
}

/**
 * Calculate total for disease items
 */
function calculateTotal(minusValueQuotation) {
    minusValueQuotation = minusValueQuotation == null ? 0 : minusValueQuotation;
    minusValueQuotation = math.round(minusValueQuotation, 2);
    // Cal subtotal by items amount
    var subtotal = 0;
    $('.quotation .amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        subtotal += amount;
    });

    subtotal = subtotal - minusValueQuotation;
    // Set value on subtotal textbox
    $('[name="subtotal"]').val(subtotal);

    // Cal total after deposit and sub discount
    var deposit = _.isEmpty($('[name="deposit"]').val()) ? 0 : parseFloat($(
        '[name="deposit"]').val());
    var subDiscount = _.isEmpty($('#subDiscount').val()) ? 0 : parseFloat($(
        '#subDiscount').val());

    var total = math.round((subtotal - deposit) - subDiscount, 2);

    // Set value on total
    $('.total').val(total);
}
