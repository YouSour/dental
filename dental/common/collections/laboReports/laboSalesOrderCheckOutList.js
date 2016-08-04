/**
 * Schema
 */
Dental.Schema.LaboSalesOrderCheckOutListReport = new SimpleSchema({
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
  status: {
    type: String,
    label:"Status",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.ListForReport.laboStatusOfSaleOrder();
      }
    }
  },
  date: {
    type: String,
    label: "Date Range"
  }
});
