//Collection
Dental.Collection.LaboAverageStock = new Mongo.Collection('labo_averageStock');

//Schema
Dental.Schema.LaboAverageStock = new SimpleSchema({
  stockDate: {
    type: String,
    label: "Stock Date"
  },
  materialId: {
    type: String,
    label: "Material"
  },
  qty: {
    type: Number,
    label: "Qty",
    decimal: true
  },
  price: {
    type: Number,
    label: "Price",
    decimal: true
  },
  amount:{
    type:Number,
    decimal:true
  },
  totalAmount:{
    type:Number,
    decimal:true
  },
  avgPrice: {
    type: Number,
    label: "Avg Cost",
    decimal: true
  },
  openingQtyBalance: {
    type: Number,
    decimal: true
  },
  closedQtyBalance: {
    type: Number,
    decimal: true
  },
  purchaseId: {
    type: String,
    optional: true
  },
  lastPurchaseId: {
    type: String,
    optional: true
  },
  saleOrderId: {
    type: String,
    optional: true
  },
  lastSaleOrderId: {
    type: String,
    optional: true
  }
});

//Attach Schema
Dental.Collection.LaboAverageStock.attachSchema(Dental.Schema.LaboAverageStock);
