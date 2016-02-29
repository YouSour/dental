Dental.TabularTable.OrderItem = new Tabular.Table({
    name: "dentalOrderList",
    collection: Dental.Collection.OrderItem,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_orderItemAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"},
        {data: "unit", title: "Unit"},
        {data: "_orderCategory.name", title: "Category"}
    ],
    order: [["1", "desc"]],
    extraFields:["orderCategoryId"],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});
