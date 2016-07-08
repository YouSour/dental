/**
 * Schema
 */
Dental.Schema.LaboSalesOrderPaymentListReport = new SimpleSchema({
    staff: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.staffList();
            }
        },
        optional:true
    },
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.branchList();
            }
        },
        optional:true
    },
    status:{
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.statusListForPayment();
            }
        },
        optional:true
    },
    exchange:{
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.exchangeList();
            }
        }
    },
    date: {
        type: String,
        label : "Date Range"
    }
});
