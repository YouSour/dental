/**
 * Schema
 */
Dental.Schema.PatientHistoryListReport = new SimpleSchema({
  branchId: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.ListForReport.branchList();
      }
    },
    optional: true
  },
  patientId: {
    type: String,
    label: "Patient",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.ListForReport.patient();
      }
    }
  }
});
