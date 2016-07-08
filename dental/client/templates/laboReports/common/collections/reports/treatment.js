/**
 * Schema
 */
Dental.Schema.TreatmentReport = new SimpleSchema({
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
                return Dental.ListForReport.register();
            }
        }
    },
    date: {
        type: String
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