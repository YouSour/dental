/**
 * Index
 */
Template.dental_quotation.onCreated(function () {
    Meteor.subscribe('dental_patient');
    Meteor.subscribe('dental_diseaseItem');
    createNewAlertify(['quotation', 'patientAddon']);
});

Template.dental_quotation.events({
    'click .insert': function () {
        alertify.quotation(fa("plus", "Quotation"), renderTemplate(Template.dental_quotationInsert))
            .maximize();
    },
    'click .update': function () {
        var data = this;
        alertify.quotation(fa("pencil", "Quotation"), renderTemplate(Template
            .dental_quotationUpdate, data)).maximize();
    },
    'click .remove': function () {
        var self = this;
        alertify.confirm(
            fa("remove", "Quotation"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Dental.Collection.Quotation.remove(self._id, function (error) {
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
        alertify.quotation(fa("eye", "Quotation"), renderTemplate(Template.dental_quotationShow,
            this));
    },
    'click .quotationPrintAction': function () {
        var q = 'patient=' + this.patientId + '&quotation=' + this._id;
        var url = 'quotationReportGen?' + q;
        window.open(url);
    }
});

/**
 * Insert
 */
Template.dental_quotationInsert.onRendered(function () {
    Meteor.typeahead.inject();
    $('.item').attr('disabled', "disabled");
    datepicker();
    $('.btnAdd').attr('disabled', "disabled");
});


/**
 * Update
 */
Template.dental_quotationUpdate.onRendered(function () {
    datepicker();
    //run this function when on update get value for total
    calculateTotal();
});

/**
 * Disease Item Insert
 */

Template.dental_quotationInsert.helpers({
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
        var patient = $('.patientId').val(id);
        if (patient) {
            $('.item').removeAttr('disabled');
        }


    }

});
Template.dental_quotationInsert.events({
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert))
            .maximize();
    },
    'change .item': function (e, t) {
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();
        var qty, price, discount, amount;

        if (itemId != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({
                _id: itemId
            });

            qty = 1;
            price = math.round(itemDoc.price, 2);
            discount = 0;
            amount = math.round(qty * price, 2);

            $('.btnAdd').attr('disabled', false);
        } else {
            $('.btnAdd').attr('disabled', true);
        }

        thisObj.parents('div.array-item').find('.qty').val(qty);
        thisObj.parents('div.array-item').find('.price').val(price);
        thisObj.parents('div.array-item').find('.discount').val(discount);
        thisObj.parents('div.array-item').find('.amount').val(amount);

        // Cal footer
        calculateTotal();
    },
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'click .btnRemove': function (e, t) {
        var thisValueQuotation = $(e.currentTarget).closest('.quotation').find('.amount').val();
        thisValueQuotation = parseFloat(thisValueQuotation);
        var enable = true;
        $('.amount').each(function () {
            var amount = $(this).val() == "" ? 0 : parseFloat($(this)
                .val());
            if (amount == 0) {
                enable = false;
                return false;
            }
            enable = true;
        });

        if (enable) {
            $('.btnAdd').attr('disabled', false);
        } else {
            $('.btnAdd').attr('disabled', true);

        }

        // Cal footer
        calculateTotal(thisValueQuotation);
    },
    'keyup .qty,.discount, click .qty,.discount': function (e, t) {

        CalculateTotalAndAmount(e);
        // Cal footer
        calculateTotal();
    },
    'keyup #subDiscount, click #subDiscount': function (e, t) {
        // Cal footer
        calculateTotal();
    },
    'click #saveAndPrint': function () {
        Meteor.subscribe('dental_quotation');
        Session.set('printQuotation', true);
    }
});

/**
 * Disease Item Update
 */
//piseth edited
Template.dental_quotationUpdate.onRendered(function () {

    //typeaheadupdate
    Meteor.typeahead.inject();
    $('[name="search"]').typeahead('val', this.data.patientId + " | " + this.data._patient.name + " | " + this.data._patient.gender);


});

Template.dental_quotationUpdate.helpers({
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
        var patient = $('.patientId').val(id);
        if (patient) {
            $('.item').removeAttr('disabled');
        }


    }
});

Template.dental_quotationUpdate.events({
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert))
            .maximize();
    },
    'change .item': function (e, t) {
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();
        var qty, price, discount, amount;

        if (itemId != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({
                _id: itemId
            });

            qty = 1;
            price = math.round(itemDoc.price, 2);
            discount = 0;
            amount = math.round(qty * price, 2);

            $('.btnAdd').attr('disabled', false);
        } else {
            $('.btnAdd').attr('disabled', true);
        }

        thisObj.parents('div.array-item').find('.qty').val(qty);
        thisObj.parents('div.array-item').find('.price').val(price);
        thisObj.parents('div.array-item').find('.discount').val(discount);
        thisObj.parents('div.array-item').find('.amount').val(amount);

        // Cal footer
        calculateTotal();
    },
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'click .btnRemove': function (e, t) {
        var thisValueQuotation = $(e.currentTarget).closest('.quotation').find('.amount').val();
        thisValueQuotation = parseFloat(thisValueQuotation);
        var enable = true;
        $('.amount').each(function () {
            var amount = $(this).val() == "" ? 0 : parseFloat($(this)
                .val());
            if (amount == 0) {
                enable = false;
                return false;
            }
            enable = true;
        });

        if (enable) {
            $('.btnAdd').attr('disabled', false);
        } else {
            $('.btnAdd').attr('disabled', true);

        }

        // Cal footer
        calculateTotal(thisValueQuotation);
    },
    'keyup .qty,.discount, click .qty,.discount': function (e, t) {

        CalculateTotalAndAmount(e);
        // Cal footer
        calculateTotal();
    },
    'keyup #subDiscount, click #subDiscount': function (e, t) {
        // Cal footer
        calculateTotal();
    }
});

/*
 * Show
 */

/**
 * Show
 */
Template.dental_quotationShow.helpers({
    quotationDiseaseFormat: function () {
        var quotationDisease = "<ul>";
        var data = this.disease;
        data.forEach(function (obj) {
            quotationDisease +=
                "<li>" + 'Item: ' + obj.item + ' | Qty: ' + obj.qty +
                ' | Price : ' + obj.price + ' | Dis: ' + obj.discount +
                ' | Amount: ' + obj.amount + '</li>';
        });
        quotationDisease += '</ul>';

        return new Spacebars.SafeString(quotationDisease);
    },
    quotationDateFormat: function () {
        return moment(this.purchaseDate).format("YYYY-MM-DD");
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_quotationInsert: {
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

            var printSession = Session.get('printQuotation');
            Meteor.call('getQuotationId', result, function (err, result) {
                var data = Dental.Collection.Quotation.findOne(result);
                if (printSession) {
                    var q = 'patient=' + data.patientId + '&quotation=' + data._id;
                    var url = 'quotationReportGen?' + q;
                    window.open(url);
                }
                Session.set('printQuotation', false);
            });
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    dental_quotationUpdate: {
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
    var quotationDate = $('[name="quotationDate"]');
    DateTimePicker.dateTime(quotationDate);
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

    if (qty > 0 && (discount >= 0 && discount <= 100)) {
        $('.btnAdd').removeAttr('disabled');
    } else {
        $('.btnAdd').attr('disabled', "disabled");
    }
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
