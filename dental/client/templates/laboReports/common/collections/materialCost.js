/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.MaterialCost = new Mongo.Collection('dental_materialCost');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.MaterialCost = new SimpleSchema({
  materialCostDate: {
    type: String,
    label: "Material Cost Date",
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    }
  },
  doctorId: {
    type: String,
    label: "Doctor",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.doctorForOther();
      }
    }
  },
  items: {
    label: "Items",
    type: Array,
    minCount: 0
  },
  'items.$': {
    type: Object
  },
  'items.$.materialCostItemId': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.materialCostItem();
      }
    }
  },
  'items.$.qty': {
    type: Number,
    min: 1,
    decimal: true
  },
  'items.$.price': {
    type: Number,
    decimal: true
  },
  'items.$.amount': {
    type: Number,
    decimal: true,
    optional: true
  },
  total: {
    type: Number,
    decimal: true,
    autoform: {
      afFieldInput: {
        type: "hidden"
      }
    }
  },
  branchId: {
    type: String
  }
});

Dental.Collection.MaterialCost.attachSchema(Dental.Schema.MaterialCost);
