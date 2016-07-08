Dental.TabularTable.MaterialCostCategory = new Tabular.Table({
    name: "dentalMaterialCostCategoryList",
    collection: Dental.Collection.MaterialCostCategory,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_materialCostCategoryAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "des", title: "Description"},
        {data: "_materialCostItemCount", title: "Item+"}
    ],
    autoWidth: false,
    order: [["1", "desc"]],
    columnDefs: [{"width": "12px", targets: 0}]
});