/**
 * Schema
 */
Dental.Schema.RegisterByDiseaseListReport = new SimpleSchema({
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
  diseaseItemId: {
    type: String,
    label: "Disease",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.ListForReport.disease();
      }
    }
  },
  date: {
    type: String,
    label: "Date Range"
  }
});
