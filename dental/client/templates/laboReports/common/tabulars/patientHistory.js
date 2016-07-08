Dental.TabularTable.PatientHistory = new Tabular.Table({
    name: 'dentalPatientHistoryList',
    collection: Dental.Collection.PatientHistory,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_patientHistoryAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});