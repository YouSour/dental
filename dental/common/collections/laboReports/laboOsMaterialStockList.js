/**
 * Schema
 */
Dental.Schema.OsLaboMaterialStockListReport = new SimpleSchema({
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
  category: {
    type: String,
    label: "Material Category",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboMaterialCategory();
      }
    },
    optional: true
  },
  material: {
    type: String,
    label: "Material",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.ListForReport.laboMaterialList();
      }
    },
    optional: true
  },
  exchange: {
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
    label: "Date"
  }
});
