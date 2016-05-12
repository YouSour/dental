Dental.ListState = new ReactiveObj();

//Template.afArrayField_customArrayFieldInvoiceForDiseaseItem.helpers({
//    register: function () {
//        var register = Dental.RegisterState.get('data');
//
//        return register;
//    }
//});

/***
 * Index
 */
Template.dental_register.onCreated(function () {
  Meteor.subscribe('dental_doctor');
  Meteor.subscribe('dental_register');
  Meteor.subscribe('dental_payment');
  Meteor.subscribe('dental_treatment');
  Meteor.subscribe('dental_deposit');
  Meteor.subscribe('dental_staff');
  Meteor.subscribe('dental_patientHistory');
  Meteor.subscribe('dental_patient');
  Meteor.subscribe('dental_diseaseItem');
  Meteor.subscribe('dental_laboratory');

    createNewAlertify([
        'register',
        'patientAddon',
        'statusAction',
        'treatmentAction',
        'appointmentAction',
        'depositAction',
        'paymentAction',
        "staffAddon",
        "doctorAddon"
    ]);
});

Template.dental_register.helpers({
    selector: function () {
        var pattern = Session.get('currentBranch');
        return {
            branchId: pattern
        };
    }
});


Template.dental_register.events({
    'click .btn-link': function () {
        var self = this;
        checkRegisterClosing(self);
    },
    'click .insert': function () {
        alertify.register(fa("plus", "Register"), renderTemplate(Template.dental_registerInsert))
            .maximize();
    },
    'click .update': function () {
        var data = this;
        Dental.ListState.set('updateWork', true);
        alertify.register(fa("pencil", "Register"), renderTemplate(Template.dental_registerUpdate,
            data)).maximize();
    },
    'click .remove': function () {
        var id = this._id;
        alertify.confirm(
            fa("remove", "Register"),
            "Are you sure to delete [" + id + "] ?",
            function (closeEvent) {
                Dental.Collection.Register.remove(id, function (error) {
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
        Dental.ListState.set('showWork', true);
        var data = this;
        // Doctor

        var doctor = [];
        _.each(data.doctorShare, function (val) {
            var doctorDoc = Dental.Collection.Doctor.findOne(val.doctor);
            doctor.push(doctorDoc.name);
        });
        data.doctor = JSON.stringify(doctor, null, '');

        // History
        var history = [];
        _.each(data._patient.history, function (val) {
            var historyDoc = Dental.Collection.PatientHistory.findOne(val);
            history.push(historyDoc.name);
        });
        data._patient.historyVal = JSON.stringify(history, null, ' ');

        // Photo
        data._patient.photoUrl = null;
        if (!_.isUndefined(data._patient.photo)) {
            data._patient.photoUrl = Files.findOne(data._patient.photo).url();
        }

        alertify.register(fa("eye", "Register"), renderTemplate(Template.dental_registerShow,
            data));
    },
    'click .statusAction': function () {
        var self = this;
        // Close register
        if (self.status == "Active") {
            var data = Dental.Collection.Register.findOne({
                _id: self._id
            });
            data.status = 'Close';
            data.closingDate = moment().format('YYYY-MM-DD HH:mm:ss');

            alertify.statusAction(fa("repeat", "Register Closing"),
                renderTemplate(Template.dental_registerClosingDate, data));
        } else {
            // Reactive register
            if (_.isUndefined(self._paymentCount) || self._paymentCount == 0) {
                alertify.confirm(
                    fa("undo", "Register Active"),
                    "Are you sure to reactive [" + self._id + "] ?",
                    function (result) {
                        Dental.Collection.Register.update(self._id, {
                            $set: {
                                status: 'Active',
                                closingDate: 'none'
                            }
                        });


                    }, null);
            } else {
                alertify.error(
                    'You can\'t reactive this, because it has been payment.');
            }
        }
    },
    'click .treatmentAction': function (e, t) {
        Session.set('closeTreatment', false);
        var data = this;
        if (data.status == "Active") {
            if (e.ctrlKey) {
                registerState(this);
                Router.go('dental.treatment', {
                  registerId: this._id
                });
            } else {
                alertify.treatmentAction(
                    fa("plus", "Treatment"),
                    renderTemplate(Template.dental_treatmentInsert, data)
                ).maximize();
            }
        }
    },
    'click .appointmentAction': function (e, t) {
        Session.set('closeAppointment', false);
        var data = this;
        if (data.status == "Active") {
            if (e.ctrlKey) {
                registerState(this);
                Router.go('dental.calendarEvent', {
                  registerId: this._id
                });
            } else {
                alertify.appointmentAction(
                    fa("plus", "Appointment"),
                    renderTemplate(Template.dental_calendarEventInsert, data)
                );
            }
        }
    },
    'click .depositAction': function (e, t) {
        Session.set('closeDeposit', false);
        var data = this;
        if (data.status == "Active") {
            if (e.ctrlKey) {
                registerState(this);
                Router.go('dental.deposit', {
                          registerId: this._id
                });
            } else {
                alertify.depositAction(
                    fa("plus", "Deposit"),
                    renderTemplate(Template.dental_depositInsert, data)
                );
            }
        }
    },
    'click .paymentAction': function (e, t) {
        Session.set('closePayment', false);
        var data = this;
        if (data.status == "Close") {
            if (e.ctrlKey) {
                registerState(this);
                Router.go('dental.payment', {
                  registerId: this._id
                });
            } else {
                // Check last balance
                var paymentLast = Dental.Collection.Payment.findOne({
                    registerId: data._id
                }, {
                    sort: {
                        _id: -1
                    }
                });

                //get date time from system
                data.paymentDate = moment(Date()).format("YYYY-MM-DD HH:mm:ss");

                if (!_.isUndefined(paymentLast)) {
                    data.total = paymentLast.balance;
                }
                alertify.paymentAction(
                    fa("plus", "Payment"),
                    renderTemplate(Template.dental_paymentInsert, data)
                );
            }
        }
    },
    // Print action
    'click .treatmentPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = 'treatmentReportGen?' + q;
        window.open(url);
    },
    'click .invoiceReportPrintAction': function () {
        var q = 'patient=' + this.patientId + '&register=' + this._id;
        var url = 'invoiceReportGen?' + q;
        window.open(url);
    }
});


/**
 * Status Closing Date
 */
Template.dental_registerClosingDate.onRendered(function () {
    datepicker();
});

/**
 * Insert
 */
Template.dental_registerInsert.onRendered(function () {
    Meteor.typeahead.inject();
    //$('.patientId').hide();
    // $('.item').attr('disabled', "disabled");
    //reset value sharingRemain
    Dental.ListState.set('sharingRemain', 0);

    datepicker();
    statusAutoSelected();
    $('.btnAdd').attr('disabled', "disabled");

});


Template.dental_registerInsert.helpers({
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

    },
    item: function (query, sync, callback) {
        Meteor.call('searchItem', query, {}, function (err, res) {
            if (err) {
                console.log(err);
                return;
            }
            callback(res);
        });
    },
    Item: function (event, suggestion, dataSetName) {
        // event - the jQuery event object
        // suggestion - the suggestion object
        // datasetName - the name of the dataset the suggestion belongs to
        // TODO your event handler here
        //var id = suggestion._id;
        $('[name="item"]').typeahead('val', suggestion._id + ' | ' + suggestion.name)
        //$('.patientId').val(id);
        //var patient = $('.patientId').val(id);
        //if (patient) {
        //    $('.item').removeAttr('disabled');d
        //}


    }

});
Template.dental_registerInsert.events({
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'change .patientId': function (e) {
        var patient = $(e.currentTarget).val();
        Session.set('patientId', patient);
        var index = 0;
        $('div.array-item').each(function () {
            //clear selectize
            var cssSelector = '[name="disease.' + index + '.item"]';
            $(cssSelector)[0].selectize.clear(true);
            index++;
        });
    },
    'keyup .doctorShareAmount,.laboAmount': function (e, t) {
        sharingRemain();
    },
    'change .item': function (e, t) {
      var patient = $('.patientId').val();
      if(patient ==''){
        alertify.error('Please , Select Patient !');
        $('[name="search"]').focus();
      }else{
        sharingRemain();
      }
    },
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert))
            .maximize();
    },
    'click #saveAndPrint': function () {
        Meteor.subscribe('dental_register');
        Session.set('printInvoice', true);
    }
});


/**
 * Update
 */
Template.dental_registerUpdate.onRendered(function () {

    //typeaheadupdate
    Meteor.typeahead.inject();
    $('[name="search"]').typeahead('val', this.data.patientId + " | " + this.data._patient.name + " | " + this.data._patient.gender);

    datepicker();

    //run this function when on update get value for total
    calculateTotal();
    calculateTotalForDoctorShare();
    calculateTotalForLaboExpense();
    //run this function when on update get value for sharingRemain
    sharingRemain();
});

//helper by piseth
Template.dental_registerUpdate.helpers({
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

Template.dental_registerUpdate.events({
    'click .btnAdd': function (e) {
        var orderItemId = $(e.currentTarget).val();

        if (orderItemId != "") {
            $('.btnAdd').removeAttr('disabled');
        } else {
            $('.btnAdd').attr('disabled', "disabled");

        }
    },
    'keyup .patientId': function (e) {
        $('[name="search"]').show();
        $('.patientId').hide();

    },
    'keyup .doctorShareAmount,.laboAmount': function (e, t) {
        sharingRemain();
    },
    'change .item': function (e, t) {
      var patient = $('.patientId').val();
      if(patient ==''){
        alertify.error('Please , Select Patient !');
        $('[name="search"]').focus();
      }else{
        sharingRemain();
      }
    },
    'click .patientAddon': function (e, t) {
        alertify.patientAddon(fa("plus", "Patient"), renderTemplate(Template.dental_patientInsert))
            .maximize();
    },
    'click .showDescription': function () {
        // Show Description
        var q = 'treatmentId=' + this._id;
        var url = 'treatmentDescriptionGen?' + q;
        window.open(url);
    }
});

/**
 * Disease Item
 */
Template.afArrayField_customArrayFieldInvoiceForDiseaseItem.events({
    'change .item': function (e, t) {
        var thisObj = $(e.currentTarget);
        var itemId = $(e.currentTarget).val();
        var patient = Session.get('patientId');

        var qty, price, discount, amount;

        if (itemId != "" && patient != "") {
            var itemDoc = Dental.Collection.DiseaseItem.findOne({
                _id: itemId
            });
            var checkingMemberPrice = Dental.Collection.Patient.findOne({
                _id: $('[name="patientId"]').val()
            }, {
                member: "Yes"
            });
            qty = 1;

            if (!_.isUndefined(checkingMemberPrice) && checkingMemberPrice.member ==
                "Yes") {
                price = math.round(itemDoc.memberPrice, 2);
            } else {
                price = math.round(itemDoc.price, 2);
            }
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
    'click .btnRemove': function (e, t) {
        var thisValue = $(e.currentTarget).closest('.register').find('.amount').val();
        thisValue = parseFloat(thisValue);

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
        calculateTotal(thisValue);
        sharingRemain();
    },
    'click .btnFree': function (e, t) {
        var thisObj = $(e.currentTarget);
        thisObj.parents('div.array-item').find('.discount').val(100);

        CalculateTotalAndAmount(e);
        // Cal footer
        calculateTotal();
        // Cal sharingRemain for doc share
        sharingRemain();
    },
    'click .btnNonFree': function (e, t) {
        var thisObj = $(e.currentTarget);
        thisObj.parents('div.array-item').find('.discount').val(0);

        CalculateTotalAndAmount(e);
        // Cal footer
        calculateTotal();
        // Cal sharingRemain for doc share
        sharingRemain();
    },
    'keyup .qty,.discount, click .qty,.discount': function (e, t) {

        CalculateTotalAndAmount(e);

        // Cal footer
        calculateTotal();

        // Cal sharingRemain for doc share
        sharingRemain();
    },
    'keyup #subDiscountRegister, click #subDiscountRegister': function (e, t) {
        // Cal footer
        calculateTotal();

        // Cal sharingRemain for doc share
        sharingRemain();
    }
});

/**
 * Income By Doctor
 */
Template.afArrayField_customArrayFieldInvoiceForDoctorShare.helpers({
    sharingRemain: function () {
        return Dental.ListState.get('sharingRemain');
    }
});
Template.afArrayField_customArrayFieldInvoiceForDoctorShare.events({
    'click .btnRemoveForDoctorShare': function (e, t) {
        var thisValueDoctorShared = $(e.currentTarget).closest('.doctorShared').find('.doctorShareAmount').val();
        thisValueDoctorShared = parseFloat(thisValueDoctorShared);
        var enable = true;
        $('.doctorShareAmount').each(function () {
            var amount = $(this).val() == "" ? 0 : parseFloat($(this)
                .val());
            if (amount == 0) {
                enable = false;
                return false;
            }
            enable = true;
        });

        // Cal footer for doc share
        calculateTotalForDoctorShare(thisValueDoctorShared);
        // Cal sharingRemain for doc share
        sharingRemain(thisValueDoctorShared);
    },
    'keyup .doctorShareAmount': function (e, t) {
        // Cal footer for doc share
        calculateTotalForDoctorShare();
    }
});

/**
 * Laboratory Expense
 */
Template.afArrayField_customArrayFieldInvoiceForLaboExpense.events({
    'change .laboratory': function (e, t) {
        var laboId = $(e.currentTarget).val();
        var thisObj = $(e.currentTarget);
        var laboDoc = Dental.Collection.Laboratory.findOne({
            _id: laboId
        });

        //get price labo item
        if (!_.isUndefined(laboDoc)) {
            thisObj.parents('div.array-item').find('.laboAmount').val(laboDoc.price);
        }
        // Cal footer for labo expense
        calculateTotalForLaboExpense();
        // Cal sharingRemain for labo expense
        sharingRemain();
    },
    'click .btnRemoveForLaboExpense': function (e, t) {
        var thisValuelabo = $(e.currentTarget).closest('.labo').find('.laboAmount').val();
        thisValuelabo = parseFloat(thisValuelabo);
        var enable = true;
        $('.laboAmount').each(function () {
            var amount = $(this).val() == "" ? 0 : parseFloat($(this)
                .val());
            if (amount == 0) {
                enable = false;
                return false;
            }
            enable = true;
        });

        // Cal footer for labo expense
        calculateTotalForLaboExpense(thisValuelabo);
        // Cal sharingRemain for labo expense
        sharingRemain(thisValuelabo);
    },
    'keyup .laboAmount': function (e, t) {
        // Cal footer for labo expense
        calculateTotalForLaboExpense();
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    dental_registerInsert: {
        before: {
            insert: function (doc) {
                doc.status = "Active";
                doc.closingDate = 'none';
                doc.branchId = Session.get('currentBranch');
                doc.total = $('.total').val();
                doc.doctorShareTotal = $('.doctorShareTotal').val();
                doc.laboExpenseTotal = $('.laboExpenseTotal').val();
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
            // $('select.doctor')[0].selectize.clear(true);
            // $('select.laboratory')[0].selectize.clear(true);

            var printSession = Session.get('printInvoice');
            Meteor.call('getRegisterId', result, function (err, result) {
                var data = Dental.Collection.Register.findOne(result);
                if (printSession) {
                    var q = 'patient=' + data.patientId + '&register=' + data._id;
                    var url = '/dental/invoiceReportGen?' + q;
                    window.open(url);
                }
                Session.set('printInvoice', false);
            });
            alertify.success("Success");
        },
        onError: function (fromType, error) {
            alertify.error(error.message);
        }
    },
    dental_registerClosingDate: {
        onSuccess: function (formType, result) {
            alertify.statusAction().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    dental_registerUpdate: {
        before: {
            update: function (doc) {
                doc.$set.total = $('.total').val();
                doc.$set.doctorShareTotal = $('.doctorShareTotal').val();
                doc.$set.laboExpenseTotal = $('.laboExpenseTotal').val();
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.register().close();
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
    var registerDate = $('[name="registerDate"]');
    var closingDate = $('[name="closingDate"]');
    DateTimePicker.dateTime(registerDate);
    DateTimePicker.dateTime(closingDate);
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
function calculateTotal(minusValue) {
    minusValue = minusValue == null ? 0 : minusValue;
    minusValue = math.round(minusValue, 2);
    // Cal subtotal by items amount
    var subtotal = math.round(0, 2);
    $('.register .amount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        subtotal += amount;
    });
    subtotal = subtotal - minusValue;

    // Cal total after deposit and sub discount
    var deposit = _.isEmpty($('[name="deposit"]').val()) ? 0 : parseFloat($(
        '[name="deposit"]').val());
    var subDiscount = _.isEmpty($('[name="subDiscount"]').val()) ? 0 : parseFloat(
        $('[name="subDiscount"]').val());

    var total = math.round((subtotal - deposit) - subDiscount, 2);

    // Set value on subtotal textbox
    $('[name="subTotal"]').val(subtotal);
    // Set value on total
    $('.total').val(total);
}

/**
 * Calculate total for income by doctor
 */
function calculateTotalForDoctorShare(minusValueDrShared) {
    minusValueDrShared = minusValueDrShared == null ? 0 : minusValueDrShared;
    minusValueDrShared = math.round(minusValueDrShared, 2);
    // Cal subtotal by items amount
    var totalForDoctorShare = math.round(0, 2);

    $('.doctorShareAmount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        totalForDoctorShare += amount;
    });
    totalForDoctorShare = totalForDoctorShare - minusValueDrShared;
    // Set value on subtotal textbox
    $('.doctorShareTotal').val(totalForDoctorShare);
}

/**
 * Calculate total for laboratory expense
 */
function calculateTotalForLaboExpense(minusValueLabo) {
    minusValueLabo = minusValueLabo == null ? 0 : minusValueLabo;
    minusValueLabo = math.round(minusValueLabo, 2);
    // Cal subtotal by items amount
    var totalForLaboExpense = 0;

    $('.laboAmount').each(function () {
        var amount = _.isEmpty($(this).val()) ? 0 : parseFloat($(this).val());
        totalForLaboExpense += amount;
    });
    totalForLaboExpense = totalForLaboExpense - minusValueLabo;
    // Set value on subtotal textbox
    $('.laboExpenseTotal').val(totalForLaboExpense);
}

//AutoSelected
var statusAutoSelected = function () {
    $('[name="status"]').val("Active").trigger("change");
};

//check register Close update & remove hide
function checkRegisterClosing(self) {
    var checkRegisterClosing = Dental.Collection.Register.findOne({
        _id: self._id
    });
    var registerClosing = checkRegisterClosing.status;

    if (registerClosing == "Active") {
        $('.update').show();
        $('.remove').show();
    } else {
        $('.update').hide();
        $('.remove').hide();
    }
}

/**
 * Register state
 */
var registerState = function (param) {
    var registerDoc = Dental.Collection.Register.findOne({
        _id: param._id
    });
    /***** Patient *****/
    // History
    var history = [];
    _.each(registerDoc._patient.history, function (val) {
        var historyDoc = Dental.Collection.PatientHistory.findOne(val);
        history.push(historyDoc.name);
    });
    registerDoc._patient.historyVal = JSON.stringify(history, null, ' ');

    // Photo
    registerDoc._patient.photoUrl = null;
    if (!_.isUndefined(registerDoc._patient.photo)) {
        registerDoc._patient.photoUrl = Files.findOne(registerDoc._patient.photo)
            .url();
    }

    // Get treatment
    var treatment = Dental.Collection.Treatment.find({
        registerId: param._id
    });
    registerDoc._treatment = treatment;

    // Set state for treatment
    Dental.ListState.set('data', registerDoc);
};

var sharingRemain = function (minusValueDrShared, minusValueLabo) {
    minusValueDrShared = minusValueDrShared == null ? 0 : minusValueDrShared;
    minusValueDrShared = math.round(minusValueDrShared, 2);

    minusValueLabo = minusValueLabo == null ? 0 : minusValueLabo;
    minusValueLabo = math.round(minusValueLabo, 2);

    var shareAmount = 0;
    var laboAmount = 0;
    var totalRegister = $('.total').val();
    var subtotalRegister = $('.subTotal').val();
    totalRegister = totalRegister == null ? 0 : parseFloat(totalRegister);
    var totalAmount;
    $('.doctorShareAmount').each(function () {
        if (this.value != '') {
            shareAmount += parseFloat(this.value);
        }
    });
    shareAmount = shareAmount - minusValueDrShared;

    $('.laboAmount').each(function () {
        if (this.value != '') {
            laboAmount += parseFloat(this.value);
        }
    });
    laboAmount = laboAmount - minusValueLabo;

    if (totalRegister == 0) {
        totalAmount = (shareAmount + laboAmount) - totalRegister;
    } else {
      if (Dental.ListState.get('updateWork')) {
          totalAmount = subtotalRegister - (shareAmount + laboAmount);
        } else {
          totalAmount = totalRegister - (shareAmount + laboAmount);
      }
    }

    return Dental.ListState.set('sharingRemain', totalAmount);
};
