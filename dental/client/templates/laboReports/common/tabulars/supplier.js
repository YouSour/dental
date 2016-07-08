Dental.TabularTable.Supplier = new Tabular.Table({
    name: "dentalSupplierList",
    collection: Dental.Collection.Supplier,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_supplierAction},
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