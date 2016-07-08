Dental.TabularTable.LaboCustomer = new Tabular.Table({
    name: "dentalLaboCustomerList",
    collection: Dental.Collection.LaboCustomer,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboCustomerAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "_customerCompany.name", title: "Company"},
        {data: "gender", title: "Gender"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"},
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:['customerCompanyId'],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
