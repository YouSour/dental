Dental.TabularTable.Register = new Tabular.Table({
  name: "dentalRegisterList",
  collection: Dental.Collection.Register,
  columns: [{
    title: '<i class="fa fa-bars"></i>',
    tmpl: Meteor.isClient && Template.dental_registerAction
  }, {
    title: '<i class="fa fa-print"></i>',
    tmpl: Meteor.isClient && Template.dental_registerPrintAction
  }, {
    data: "_id",
    title: "ID"
  }, {
    data: "registerDate",
    title: "Register Date"
  }, {
    data: "patientId",
    title: "Patient ID"
  }, {
    data: "_patient.name",
    title: "Patient Name"
  }, {
    data: "_patient.photo",
    title: "Photo",
    render: function(val, type, doc) {
      if (_.isUndefined(val)) {
        return "None";
      } else {
        var img = Files.findOne(val);
        return lightbox(img.url(), doc._id, doc._patient.name);
      }
    }
  }, {
    data: "total",
    title: "Total"
  }, {
    data: "closingDate",
    title: "Closed Date"
  }, {
    data: "status",
    title: "Status",
    tmpl: Meteor.isClient && Template.dental_statusLinkAction
  }, {
    data: "_treatmentCount",
    title: "T+",
    tmpl: Meteor.isClient && Template.dental_treatmentLinkAction
  }, {
    data: "_depositCount",
    title: "D+",
    tmpl: Meteor.isClient && Template.dental_depositLinkAction
  }, {
    data: "_appointmentCount",
    title: "A+",
    tmpl: Meteor.isClient && Template.dental_appointmentLinkAction
  }, {
    data: "_paymentCount",
    title: "P+",
    tmpl: Meteor.isClient && Template.dental_paymentLinkAction
  }],
  order: [
    ['2', 'desc']
  ],
  autoWidth: false,
  extraFields:["des","disease","subTotal","deposit","subDiscount","doctorShareTotal","laboExpenseTotal","_patient","laboExpense","doctorShare","credit"],
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }, {
    "width": "12px",
    "targets": 1
  }]
});
