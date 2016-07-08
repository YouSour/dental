Dental.TabularTable.LaboItemCategories = new Tabular.Table({
    name: "dentalLaboItemCategoriesList",
    collection: Dental.Collection.LaboItemCategories,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboItemCategoriesAction},
        {data: "_id", title: "ID"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
