Dental.TabularTable.SpecialTreatment = new Tabular.Table({
  name: "dentalSpecialTreatmentList",
  collection: Dental.Collection.SpecialTreatment,
  columns: [{
      title: "<i class='fa fa-bars'></i>",
      tmpl: Meteor.isClient && Template.dental_specialTreatmentAction
    }, {
      data: "specialTreatmentDate",
      title: "Special Treatment Date"
    }, {
      data: "doctorId",
      title: "Doctor ID"
    }, {
      data: "_doctor.name",
      title: "Doctor Name"
    }, {
      data: "des",
      title: "Description"
    },
    // {
    //   data: "attachFile",
    //   title: "<i class='fa fa-paperclip'></i>",
    //   render: function(val, type, doc) {
    //     //console.log(doc._doctor.name);
    //     if (_.isUndefined(val)) {
    //       return null;
    //     } else {
    //       var attacheFile = Files.findOne(val);
    //       return lightbox(attacheFile.url(), doc._id, doc.doctorId,
    //         'paperclip');
    //     }
    //   }
    // },
    {
      title: "Attach File",
      tmpl: Meteor.isClient && Template.dental_specialTreatmentDesAction
    },
  ],
  order: [
    ["1", "desc"]
  ],
  extraFields: ['patientId', 'specialRegisterId', 'des'],
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }, {
    "width": "12px",
    "targets": 4
  }]
});
