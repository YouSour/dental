/**
 * Schema
 */
Dental.Schema.LaboPurchaseListReport = new SimpleSchema({
  supplierId: {
      type: String,
      autoform: {
          type: "select2",
          options: function () {
              return Dental.ListForReport.laboSupplierList();
          }
      },
      optional:true
  },
  typeOfPurchase: {
      type: String,
      autoform: {
          type: "select2",
          options: function () {
              return Dental.ListForReport.laboTypeOfPurchase();
          }
      },
      label:"Type",
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
  date: {
      type: String,
      label: "Date Range"
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
