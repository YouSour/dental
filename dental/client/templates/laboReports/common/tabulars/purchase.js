Dental.TabularTable.Purchase = new Tabular.Table({
    name: "dentalPurchaseList",
    collection: Dental.Collection.Purchase,
    columns: [
        {
            title: "<i class='fa fa-bars'></i>",
            tmpl: Meteor.isClient && Template.dental_purchaseAction
        },
        {data: "_id", title: "ID"},
        {
            data: "purchaseDate",
            title: "Purchase Date",
            render: function (val, doc, type) {
                return moment(val).format("YYYY-MM-DD");
            }
        },
        {
            data: "supplierId",
            title: "Suppiler"
            //,
            //render: function (val, doc, type) {
            //    return labelCon(val, val, "primary");
            //}
        },
        {
            data: "registerId",
            title: "Register",
            render: function (val, doc, type) {
                if (!_.isUndefined(val)) {
                    return val;
                }
                return "None";
            }
        },
        {
            data: "items",
            title: "Purchase Detail",
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