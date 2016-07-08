Dental.TabularTable.LaboSalesOrderPayment = new Tabular.Table({
  name: "dentalLaboSalesOrderPaymentList",
  collection: Dental.Collection.LaboSalesOrderPayment,
  columns: [{
    title: "<i class='fa fa-bars'></i>",
    tmpl: Meteor.isClient && Template.dental_laboSaleOrderPaymentAction
  }, {
    data: "_id",
    title: "ID"
  }, {
    data: "paymentDate",
    title: "Payment Date"
  }, {
    data: "saleOrderId",
    title: "Sale Order ID"
  }, {
    data: "_customer.name",
    title: "Customer"
  }, {
    data: "_staff.name",
    title: "Staff"
  }, {
    data: "dueAmount",
    title: "Due Amount"
  }, {
    data: "paidAmount",
    title: "Paid Amount"
  }, {
    data: "balance",
    title: "Balance"
  }, {
    data: "des",
    title: "Description"
  }, {
    data: "status",
    title: "Status"
  }],
  order: [
    ["1", "desc"]
  ],
  extraFields: ['customerId','staffId'],
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "target": 0
  }]
});
