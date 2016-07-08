Dental.TabularTable.LaboCustomerCompany = new Tabular.Table({
    name: "dental_laboCustomerCompanyList",
    collection: Dental.Collection.LaboCustomerCompany,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboCustomerCompanyAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
