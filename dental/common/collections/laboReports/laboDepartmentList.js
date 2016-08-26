/**
 * Schema
 */
Dental.Schema.LaboDepartmentListReport = new SimpleSchema({
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
    department: {
        type: String,
        label: "Department",
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.laboDepartmentList();
            }
        },
        optional: true
    },
    status: {
        type: String,
        label: "Status",
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.laboStatusOfDepartmentReport();
            }
        }
    },
    exchange: {
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
        label: "Date Range"
    }
});
