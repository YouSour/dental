Dental.TabularTable.LaboItem = new Tabular.Table({
    name: "dentalLaboItemList",
    collection: Dental.Collection.LaboItem,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboItemAction},
        {data: "_id", title: "ID"},
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "price", title: "Price"},
        {data: "_unit.name", title: "Unit"},
        {data: "_itemCategories.name", title: "Category"},
        {
          data: "materialMap", title: "Material Map",
          render:function (val,type,doc) {
            if(!_.isUndefined(val)){
              return JSON.stringify(val).slice(1, JSON.stringify(val).length - 1);
            }
            return "None";
          }
        }
        // ,
        // {
        //   data: "departmentMap", title: "Department Map",
        //   render:function (val,type,doc) {
        //     if(!_.isUndefined(val)){
        //       return JSON.stringify(val).slice(1, JSON.stringify(val).length - 1);
        //     }
        //     return "None";
        //   }
        // }
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:['unitId','itemCategoriesId'],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
