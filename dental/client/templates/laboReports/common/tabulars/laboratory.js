Dental.TabularTable.Laboratory = new Tabular.Table({
    name: "dentalLaboratoryList",
    collection: Dental.Collection.Laboratory,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_laboratoryAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});