Dental.TabularTable.DiseaseCategory = new Tabular.Table({
    name: "dentalDiseaseCategoryList",
    collection: Dental.Collection.DiseaseCategory,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_diseaseCategoryAction},
        {data: "_id", title: "ID"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "_itemCount", title: "Item+"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});