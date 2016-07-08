Dental.TabularTable.LaboUnit = new Tabular.Table({
    name: "dental_laboUnitList",
    collection: Dental.Collection.LaboUnit,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboUnitAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
