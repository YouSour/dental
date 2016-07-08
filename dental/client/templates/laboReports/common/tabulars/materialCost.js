Dental.TabularTable.MaterialCost = new Tabular.Table({
    name: "dentalMaterialCostList",
    collection: Dental.Collection.MaterialCost,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_materialCostAction
        },
        {data: "_id", title: "ID"},
        {
            data: "materialCostDate",
            title: "Material Cost Date",
            render: function (val, doc, type) {
                return moment(val).format("YYYY-MM-DD");
            }
        },
        {
            data: "doctorId",
            title: "Doctor"
        },
        {
            data: "items",
            title: "Material Cost Detail",
            render: function (val, doc, type) {
                return JSON.stringify(val).slice(1, JSON.stringify(val).length - 1);
            }
        },
        {
            data: "total",
            title: "Total"
        }
    ],
    order: [["0", "desc"]],
    autoWidth: false,
    columnDefs: [{"width": "12px", "target": 0}]
});
