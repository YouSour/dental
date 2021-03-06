//Collection
Dental.Collection.LaboSalesOrder = new Mongo.Collection('labo_salesOrder');

//Schema
Dental.Schema.LaboSalesOrder = new SimpleSchema({
  salesOrderDate: {
    type: String,
    label: "Sales Order Date",
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    }
  },
  customerId: {
    type: String,
    label: "Doctor",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboCustomer();
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
  status: {
    type: Object,
  },
  "status.activeDate": {
      type: String,
      optional: true
  },
  "status.readyDate": {
      type: String,
        optional: true
  },
  "status.checkOutDate": {
      type: String,
        optional: true
  },
  "status.closingDate": {
      type: String,
        optional: true
  },
  salesOrderDetail: {
    type: Array,
    label: "Sales Order Detail",
    minCount: 0
  },
  'salesOrderDetail.$': {
    type: Object
  },
  'salesOrderDetail.$.itemId': {
    type: String,
    label: "Item",
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboItems();
      },
      selectizeOptions: {
        hideSelected: true
      }
    }
  },
  'salesOrderDetail.$.qty': {
    type: Number,
    label: "Qty",
    min: 1
  },
  'salesOrderDetail.$.price': {
    type: Number,
    label: "Price",
    decimal: true
  },
  'salesOrderDetail.$.discount': {
    type: Number,
    label: "Discount",
    min: 0,
    max: 100
  },
  'salesOrderDetail.$.amount': {
    type: Number,
    label: "Amount",
    decimal: true
  },
  departmentMap: {
    type: Array,
    minCount: 0
  },
  'departmentMap.$': {
    type: Object
  },
  'departmentMap.$.department': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboDepartment();
      },
      selectizeOptions: {
        hideSelected: true
      }
    }
  },
  'departmentMap.$.price': {
    type: Number,
    decimal: true,
    label: "Price",
    min:1
  },
  subTotal: {
    type: Number,
    label: "Sub Total",
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
    label: "Total",
    decimal: true
  },
  branchId: {
    type: String
  }
});

//Attach Schema
Dental.Collection.LaboSalesOrder.attachSchema(Dental.Schema.LaboSalesOrder);
