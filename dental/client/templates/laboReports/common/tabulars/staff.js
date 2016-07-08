Dental.TabularTable.Staff = new Tabular.Table({
    name: "dentalStaffList",
    collection: Dental.Collection.Staff,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_staffAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "position", title: "Position"},
        {data: "startDate", title: "Start Date"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});