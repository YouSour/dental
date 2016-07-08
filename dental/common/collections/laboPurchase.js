//Collection
Dental.Collection.LaboPurchase = new Mongo.Collection('labo_purchase');

//Schema
Dental.Schema.LaboPurchase = new SimpleSchema({
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
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboSuppiler();
      }
    }
  },
  staffId: {
    type: String,
    label: "Staff",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.staff();
      }
    }
  },
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboPurchaseType();
      }
    }
  },
  purchaseDetail: {
    type: Array,
    label: "Purchase Detail",
    minCount: 0
  },
  'purchaseDetail.$': {
    type: Object
  },
  'purchaseDetail.$.materialId': {
    type: String,
    label: "Material",
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboMaterial();
      }
    }
  },
  'purchaseDetail.$.qty': {
    type: Number,
    label: "Qty"
  },
  'purchaseDetail.$.price': {
    type: Number,
    label: "Price",
    decimal: true
  },
  'purchaseDetail.$.amount': {
    type: Number,
    label: "Amount",
    decimal: true
  },
  total: {
    type: Number,
    label: "Total",
    decimal: true
  },
  branchId: {
    type: String
  }
});

//Attach Schema
Dental.Collection.LaboPurchase.attachSchema(Dental.Schema.LaboPurchase);
