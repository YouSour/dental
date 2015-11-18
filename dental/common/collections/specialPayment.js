/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.SpecialPayment = new Mongo.Collection('dental_specialPayment');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.SpecialPayment = new SimpleSchema({
  patientId: {
    type: String,
    label: 'Patient'
  },
  specialRegisterId: {
    type: String,
    label: 'Register ID'
  },
  staffId: {
    type: String,
    label: 'Staff',
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.staff();
      }
    }
  },
  paymentDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD H:mm:ss');
      return currentDate;
    },
    //custom: function () {
    //    if (this.value < moment().format('YYYY-MM-DD')) {
    //        return "date";
    //    }
    //},
    label: 'Payment Date'
  },
  paymentMethod: {
    type: Number,
    label: "Payment Method",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.paymentMethod();
      }
    }
  },
  dueAmount: {
    type: Number,
    decimal: true,
    label: 'Due Amount'
  },
  paidAmount: {
    type: Number,
    decimal: true,
    min: 0.01,
    custom: function() {
      if (this.value > this.field('dueAmount').value) {
        return "biggerThan";
      }
    },
    label: 'Paid Amount'
  },
  balance: {
    type: Number,
    decimal: true,
    label: 'Balance'
  },
  des: {
    type: String,
    label: "Description",
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor',
        settings: {
          height: 96,
          toolbar: [
            //[groupname, [button list]]
            ['style', ['bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['misc', ['fullscreen']],
          ]
        }
      }
    }
  },
  //status: {
  //    type: String,
  //    max: 50,
  //    optional: true
  //},
  branchId: {
    type: String
  }
});

/**
 * attachSchema
 */
Dental.Collection.SpecialPayment.attachSchema(Dental.Schema.SpecialPayment);

/*
 * Custom Error Message
 */
SimpleSchema.messages({
  "biggerThan": "Paid Amount Can't Bigger Than Due Amount",
  "date": "Payment Date Can't Smaller Than " + moment().format(
    'YYYY-MM-DD H:mm:ss')
});
