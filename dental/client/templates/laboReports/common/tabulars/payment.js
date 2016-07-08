Dental.TabularTable.Payment = new Tabular.Table({
  name: "dentalPaymentList",
  collection: Dental.Collection.Payment,
  columns: [{
    title: "<i class='fa fa-bars'></i>",
    tmpl: Meteor.isClient && Template.dental_paymentAction
  }, {
    data: "_id",
    title: "ID"
  }, {
    data: "paymentDate",
    title: "Payment Date"
  }, {
    data: "registerId",
    title: "Register ID"
  }, {
    data: "_patient.name",
    title: "Patient Name"
  }, {
    data: "staffId",
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
  extraFields: ['patientId'],
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "target": 0
  }]
});
