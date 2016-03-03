/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.SpecialRegister = new Mongo.Collection(
  'dental_specialRegister');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.SpecialRegister = new SimpleSchema({
  patientId: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.patient();
      }
    }
  },
  doctorId: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.doctor();
      }
    }
  },
  registerDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
      return currentDate;
    },
    label: "Register Date"
  },
  des: {
    type: String,
    label: "Description",
    max: 500,
    optional: true
  },
  status: {
    type: String,
    optional: true
  },
  closingDate: {
    type: String
  },
  disease: {
    type: Array,
    minCount: 0
  },
  'disease.$': {
    type: Object
  },
  'disease.$.item': {
    type: String,
    autoform: {
      type: "select",
      options: function() {
        return Dental.List.diseaseItem();
      }
    }
  },
  'disease.$.qty': {
    type: Number,
    min: 1
  },
  'disease.$.price': {
    type: Number,
    decimal: true,
    min: 1
  },
  'disease.$.discount': {
    type: Number,
    min: 0,
    max: 100,
    decimal: true
  },
  'disease.$.amount': {
    type: Number,
    decimal: true
  },
  //doctorShare: {
  //    type: Array,
  //    minCount: 0,
  //    label: "Income By Doctor",
  //    optional: true
  //},
  //'doctorShare.$': {
  //    type: Object
  //},
  //'doctorShare.$.doctor': {
  //    type: String,
  //    autoform: {
  //        //type: "select2",
  //        type: "selectize",
  //        options: function () {
  //            return Dental.List.doctor();
  //        }
  //    }
  //},
  //'doctorShare.$.amount': {
  //    type: Number,
  //    decimal: true,
  //    min: 0.01,
  //    custom: function () {
  //        if (this.value > this.field('total').value) {
  //            return "biggerThan";
  //        }
  //    }
  //},
  //doctorShareTotal: {
  //    type: Number,
  //    decimal: true,
  //    defaultValue: 0
  //},
  //laboExpense: {
  //    type: Array,
  //    minCount: 0,
  //    label: "Laboratory Expense",
  //    optional: true
  //},
  //'laboExpense.$': {
  //    type: Object
  //},
  //'laboExpense.$.laboratory': {
  //    type: String,
  //    autoform: {
  //        //type: "select2",
  //        type: "selectize",
  //        options: function () {
  //            return Dental.List.laboratoryItem();
  //        }
  //    }
  //},
  //'laboExpense.$.amount': {
  //    type: Number,
  //    decimal: true,
  //    min: 0.01,
  //    custom: function () {
  //        if (this.value > this.field('total').value) {
  //            return "biggerThan";
  //        }
  //    }
  //},
  //laboExpenseTotal: {
  //    type: Number,
  //    decimal: true,
  //    defaultValue: 0
  //},
  paymentMethod: {
    type: Array,
    minCount: 0,
    label: "Payment Method",
    optional: true
  },
  'paymentMethod.$': {
    type: Object
  },
  'paymentMethod.$.paymentMethodDate': {
    type: String,
    defaultValue: function() {
      //var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD').format('YYYY-MM-DD');
      return currentDate;
    }
  },
  'paymentMethod.$.amount': {
    type: Number,
    decimal: true,
    min: 0.01,
    custom: function() {
      if (this.value > this.field('total').value) {
        return "greaterThan";
      }
    }
  },
  paymentMethodTotal: {
    type: Number,
    decimal: true,
    custom: function() {
      if (this.value > this.field('total').value) {
        return "greaterThanTotal";
      }
    },
    defaultValue: 0
  },
  subTotal: {
    type: Number,
    decimal: true,
    defaultValue: 0
  },
  deposit: {
    type: Number,
    decimal: true,
    defaultValue: 0
  },
  subDiscount: {
    type: Number,
    decimal: true,
    defaultValue: 0
  },
  total: {
    type: Number,
    decimal: true
  },
  branchId: {
    type: String
  }
});

/***
 *AttachSchema
 */
Dental.Collection.SpecialRegister.attachSchema(Dental.Schema.SpecialRegister);

/*
 * Custom Error Message
 */
SimpleSchema.messages({
  "greaterThan": "Amount Can't Be Greater Than Total",
  "greaterThanTotal": "Payment Method Total Can't Be Greater Than Total",
  "smallerThan": "Amount Can't Smaller Than Total"
});
