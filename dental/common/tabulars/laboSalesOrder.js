Dental.TabularTable.LaboSalesOrder = new Tabular.Table({
    name: "dentalLaboSalesOrderList",
    collection: Dental.Collection.LaboSalesOrder,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_laboSalesOrderAction},
        {data: "_id", title: "ID"},
        {data: "salesOrderDate", title: "Date"},
        {data: "_customer.name", title: "Customer"},
        {data: "_staff.name", title: "Staff"},
        {
          data: "status", title: "Status",
          tmpl: Meteor.isClient && Template.dental_statusSaleOrderLinkAction
        },
        {
          data: "salesOrderDetail", title: "Sale Order Detail",
          render:function (val,type,doc) {
            return JSON.stringify(val).slice(1, JSON.stringify(val).length - 1);
          }
        },
        {data: "total", title: "Total"},
        {
          data: "_salesOrderPaymentCount",
          title: "P+",
          tmpl: Meteor.isClient && Template.dental_salesOrderPaymentLinkAction
        }
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:['customerId','staffId','subTotal','subDiscount'],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
