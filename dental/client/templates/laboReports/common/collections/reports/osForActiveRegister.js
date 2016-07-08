/**
 * Schema
 */
Dental.Schema.osForActiveRegisterReport = new SimpleSchema({
    //patient: {
    //    type: String,
    //    autoform: {
    //        type: "select2",
    //        options: function () {
    //            return Dental.ListForReport.patient();
    //        }
    //    }
    //},
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
    date: {
        type: String,
        label: "Date"
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