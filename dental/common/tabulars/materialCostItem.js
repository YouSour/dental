Dental.TabularTable.MaterialCostItem = new Tabular.Table({
    name: "dentalMaterialCostItemList",
    collection: Dental.Collection.MaterialCostItem,
    columns: [
        {title: "<i class='fa fa-bars'></i>", tmpl: Meteor.isClient && Template.dental_materialCostItemAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"},
        {data: "unit", title: "Unit"},
        {data: "_materialCostCategory.name", title: "Category"}
    ],
    order: [["1", "desc"]],
    extraFields:["materialCostCategoryId"],
    autoWidth: false,
    columnDefs: [{"width": "12px", "targets": 0}]
});
