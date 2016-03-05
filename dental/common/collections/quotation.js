/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Quotation = new Mongo.Collection('dental_quotation');

Dental.Schema.Quotation = new SimpleSchema({
  patientId: {
    type: String,
    autoform: {
      type: 'select2',
      options: function() {
        return Dental.ListForReport.patient();
      }
    }
  },
  quotationDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD H:mm:ss');
      return currentDate;
    },
    label: "Quotation Date"
  },
  des: {
    type: String,
    label: 'Description',
    optional: true
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
    min: 1,
    decimal: true
  },
  'disease.$.price': {
    type: Number,
    decimal: true,
    min: 1
  },
  'disease.$.discount': {
    type: Number,
    min: 0,
    max: 100
  },
  'disease.$.amount': {
    type: Number,
    decimal: true
  },
  subtotal: {
    type: Number,
    decimal: true
  },
  subDiscount: {
    type: Number,
    decimal: true,
    min: 0,
    max: 100,
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
Dental.Collection.Quotation.attachSchema(Dental.Schema.Quotation);
