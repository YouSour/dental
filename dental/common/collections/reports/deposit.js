/**
 * Schema
 */
Dental.Schema.DepositReport = new SimpleSchema({
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patient();
            }
        }
    },
    register: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.registerListForDeposit();
            }
        }
    },
    date: {
        type: String
    }
});