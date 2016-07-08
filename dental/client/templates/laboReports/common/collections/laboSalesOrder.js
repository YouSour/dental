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
    label: "Customer",
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
    type: String,
    label: "Status",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboStatusSalesOrder();
      }
    }
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
