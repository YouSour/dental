/**
 * Schema
 */
Dental.Schema.MaterialCostListReport = new SimpleSchema({
    doctorId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.doctorList();
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
    date: {
        type: String,
        label: "Date Range"
    },
    exchange: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.exchangeList();
            }
        }
    }
});