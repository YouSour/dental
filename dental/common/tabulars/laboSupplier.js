Dental.TabularTable.LaboSupplier = new Tabular.Table({
    name: "dentalLaboSupplierList",
    collection: Dental.Collection.LaboSupplier,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_laboSupplierAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "telephone", title: "Telephone"},
        {data: "address", title: "Address"},
        {data: "des", title: "Description"}
    ],
    order: [["1", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", targets: 0}]
});
