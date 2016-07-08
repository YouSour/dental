Dental.TabularTable.SpecialRegister = new Tabular.Table({
  name: "dentalSpecialRegisterList",
  collection: Dental.Collection.SpecialRegister,
  columns: [{
      title: '<i class="fa fa-bars"></i>',
      tmpl: Meteor.isClient && Template.dental_registerAction
    }, {
      title: '<i class="fa fa-print"></i>',
      tmpl: Meteor.isClient && Template.dental_specialRegisterPrintAction
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
      data: "_doctor.name",
      title: "Doctor Name"
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
      title: "Status Date"
    }, {
      data: "status",
      title: "Status"
    }, {
      data: "_treatmentCount",
      title: "T+",
      tmpl: Meteor.isClient && Template.dental_specialTreatmentLinkAction
    },
    //{
    //    data: "_appointmentCount",
    //    title: "A+",
    //    tmpl: Meteor.isClient && Template.dental_specialAppointmentLinkAction
    //},
    {
      data: "_paymentCount",
      title: "P+",
      tmpl: Meteor.isClient && Template.dental_specialPaymentLinkAction
    }
  ],
  order: [
    ['2', 'desc']
  ],
  autoWidth: false,
  extraFields:["des","doctorId","disease","subTotal","deposit","subDiscount","paymentMethod","paymentMethodTotal"],
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }, {
    "width": "12px",
    "targets": 1
  }]
});
