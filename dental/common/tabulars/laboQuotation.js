Dental.TabularTable.LaboQuotation = new Tabular.Table({
    name: "dentalLaboQuotationList",
    collection: Dental.Collection.LaboQuotation,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboQuotationAction},
        {data: "_id", title: "ID"},
        {data: "saleOrderId", title: "Sale Order ID"},
        {data: "_staff.name", title: "Staff"},
        {data: "_doctorCompany.name", title: "Doctor Company"},
        {   data:"department",
            title: "Department",
            tmpl: Meteor.isClient && Template.dental_departmentArray
        },
        {data: "startDate", title: "Start Date"},
        {data: "deadLine", title: "Deadline"},
        {data: "type", title: "Type"},
        {data: "status", title: "Status"},

    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:["des","doctorCompanyId","staffId"],
    columnDefs: [
        {"width": "12px", "targets": 1}
    ]
});
