Dental.TabularTable.LaboMaterial = new Tabular.Table({
    name: "dental_laboMaterialList",
    collection: Dental.Collection.LaboMaterial,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboMaterialAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"},
        {data: "_unit.name", title: "Unit"},
        {
          data: "avgPrice", title: "Average Price",
          render:function (val,type,doc) {
            if(_.isUndefined(val) || _.isNull(val) || _.isNaN(val)){
              return "None";
            }
            return numeral(val).format('0,0.00');
          }
        },
        {data: "balanceQty", title: "Balance Quantity"},
        {data: "_materialCategory.name", title: "material Categories"},
        {data: "des", title: "Description"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:['unitId','materialCategoryId'],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
