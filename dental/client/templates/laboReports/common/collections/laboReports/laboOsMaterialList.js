/**
 * Schema
 */
Dental.Schema.OsLaboMaterialListReport = new SimpleSchema({
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.ListForReport.branchList();
            }
        },
        optional: true
    },
    material: {
        type: String,
        label: "Material",
        autoform:{
          type:"select2",
          options:function () {
            return Dental.ListForReport.laboMaterialList();
          }
        },
        optional:true
    }
});
