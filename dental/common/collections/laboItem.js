//Collection
Dental.Collection.LaboItem = new Mongo.Collection("labo_item");

//Schema
Dental.Schema.LaboItem = new SimpleSchema({
  code: {
    type: String,
    unique: true,
    max: 50
  },
  name: {
    type: String,
    label: "Name",
    max: 250
  },
  price: {
    type: Number,
    label: "Price ($)",
    decimal: true,

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
  itemCategoriesId:{
    type:String,
    label:"Category",
    autoform:{
      type:"select2",
      options:function () {
        return Dental.List.laboItemCategories();
      }
    }
  },
  materialMap: {
    type: Array,
    minCount: 0
  },
  'materialMap.$': {
    type: Object
  },
  'materialMap.$.material': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboMaterial();
      },
      selectizeOptions: {
        hideSelected: true
      }
    }
  },
  'materialMap.$.qty': {
    type: Number,
    label: "Quantity",
    decimal:true,
    min:1
  },
  'materialMap.$.price': {
    type: Number,
    label: "Price",
    decimal:true
  },
  departmentMap: {
    type: Array,
    minCount: 0
  },
  'departmentMap.$': {
    type: Object
  },
  'departmentMap.$.department': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboDepartment();
      },
      selectizeOptions: {
        hideSelected: true
      }
    }
  },
  'departmentMap.$.price': {
    type: Number,
    decimal: true,
    label: "Price",
    min:1
  },
  branchId: {
    type: String
  }
});

//Attach schema
Dental.Collection.LaboItem.attachSchema(Dental.Schema.LaboItem);
