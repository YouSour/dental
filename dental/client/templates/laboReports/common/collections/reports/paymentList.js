/**
 * Schema
 */
Dental.Schema.PaymentListReport = new SimpleSchema({
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
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patientList();
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