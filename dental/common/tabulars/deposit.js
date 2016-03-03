Dental.TabularTable.Deposit = new Tabular.Table({
  name: "dentalDepositList",
  collection: Dental.Collection.Deposit,
  columns: [{
    title: "<i class='fa fa-bars'></i>",
    tmpl: Meteor.isClient && Template.dental_depositAction
  }, {
    data: "depositDate",
    title: "Deposit Date"
  }, {
    data: "amount",
    title: "Amount",
    render: function(val, doc, type) {
      return numeral(val)
        .format('0,0.00');
    }
  }],
  order: [
    ["1", "desc"]
  ],
  extraFields:['patientId','registerId'],
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }]
});
