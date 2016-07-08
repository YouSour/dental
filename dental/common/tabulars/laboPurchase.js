Dental.TabularTable.LaboPurchase = new Tabular.Table({
    name: "dentalLaboPurchaseList",
    collection: Dental.Collection.LaboPurchase,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboPurchaseAction},
        {data: "_id", title: "ID"},
        {data: "purchaseDate", title: "Purchase Date"},
        {data: "_supplier.name", title: "Supplier"},
        {data: "_staff.name", title: "Staff"},
        {
          data: "purchaseDetail", title: "Purchase Detail",
          render:function (val, type, doc) {
            return JSON.stringify(val).slice(1, JSON.stringify(val).length - 1);
          }
        },
        {data: "type", title: "Type"},
        {data: "total", title: "Total"}
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:['supplierId','staffId'],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
