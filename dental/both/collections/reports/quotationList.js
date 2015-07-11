/**
 * Schema
 */
Dental.Schema.QuotationListReport = new SimpleSchema({
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patientList();
            }
        }
    },
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.branchList();
            }
        }
    },
    date: {
        type: String,
        label: "Date Range"
    }
    //exchange: {
    //    type: String,
    //    autoform: {
    //        type: "select2",
    //        options: function () {
    //            return Dental.ListForReport.exchange();
    //        }
    //    }
    //}
});