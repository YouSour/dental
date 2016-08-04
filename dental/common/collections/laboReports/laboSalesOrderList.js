/**
 * Schema
 */
Dental.Schema.LaboSalesOrderListReport = new SimpleSchema({
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.branchList();
            }
        },
        optional: true
    },
    customer: {
        type: String,
        label: "Customer",
        autoform:{
          type:"select2",
          options:function () {
           return Dental.ListForReport.laboCustomerList();
          }
        },
        optional:true
    },
    date: {
        type: String,
        label: "Date Range"
    }
});
