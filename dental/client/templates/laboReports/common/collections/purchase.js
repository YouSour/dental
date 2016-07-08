/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Purchase = new Mongo.Collection('dental_purchase');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Purchase = new SimpleSchema({
  purchaseDate: {
    type: String,
    label: "Purchase Date",
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    }
  },
  supplierId: {
    type: String,
    label: "Supplier",
    max: 20,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.supplier();
      }
    }
  },
  registerId: {
    type: String,
    label: "Register ID",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.registerPurchase();
      }
    },
    optional: true
  },
  items: {
    label: "Items",
    type: Array,
    minCount: 0
  },
  'items.$': {
    type: Object
  },
  'items.$.orderItemId': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.orderItem();
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

Dental.Collection.Purchase.attachSchema(Dental.Schema.Purchase);
