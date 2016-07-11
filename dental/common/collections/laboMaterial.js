//Laboratory Material
Dental.Collection.LaboMaterial = new Mongo.Collection('labo_material');

//Schema
Dental.Schema.LaboMaterial = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 200,
    unique:true
  },
  price: {
    type: Number,
    label: "Price ($)",
    decimal: true
  },
  des: {
    type: String,
    label: 'Description',
    optional: true
  },
  unitId: {
    type: String,
    label: "Unit",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboUnit();
      }
    }
  },
  materialCategoryId: {
    type: String,
    label: "Material Category",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboMaterialCategory();
      }
    }
  },
  balanceQty: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  avgPrice: {
    type: Number,
    decimal: true,
    optional: true
  },
  branchId: {
    type: String
  }
});

//Attach Schema
Dental.Collection.LaboMaterial.attachSchema(Dental.Schema.LaboMaterial);
