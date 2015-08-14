/**
 * Schema
 */
Dental.Schema.RegisterListReport = new SimpleSchema({
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
    status: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.statusListForRegister();
            }
        },
        optional: true

    },
    date: {
        type: String,
        label: "Date Range"
    }
});