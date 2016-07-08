Dental.TabularTable.OrderCategory = new Tabular.Table({
    name: "dentalOrderCategoryList",
    collection: Dental.Collection.OrderCategory,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_orderCategoryAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"},
        {data: "_orderItemCount", title: "Item+"}
    ],
    autoWidth: false,
    order: [["1", "desc"]],
    columnDefs: [{"width": "12px", targets: 0}]
});