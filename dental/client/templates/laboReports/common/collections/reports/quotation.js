/**
 * Schema
 */
Dental.Schema.QuotationReport = new SimpleSchema({
    patient: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.patient();
            }
        }
    },
    quotation: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.quotationForPatient();
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