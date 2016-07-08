/**
 * Schema
 */
Dental.Schema.AppointmentListReport = new SimpleSchema({
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
    date: {
        type: String,
        label:"Date Range"
    }
});