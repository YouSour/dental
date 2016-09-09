/**
 * Staff
 */
Meteor.publish('dental_staff', function() {
  if (this.userId) {
    return Dental.Collection.Staff.find();
  }
});

/**
 * Doctor
 */
Meteor.publish('dental_doctor', function() {
  if (this.userId) {
    return Dental.Collection.Doctor.find();
  }
});

/**
 * Disease Category
 */
Meteor.publish('dental_diseaseCategory', function() {
  if (this.userId) {
    return Dental.Collection.DiseaseCategory.find();
  }
});

/**
 * Disease Item
 */
Meteor.publish('dental_diseaseItem', function() {
  if (this.userId) {
    return Dental.Collection.DiseaseItem.find();
  }
});

/*
 * Patient History
 */
Meteor.publish('dental_patientHistory', function() {
  if (this.userId) {
    return Dental.Collection.PatientHistory.find();
  }
});

/**
 * Patient
 */
Meteor.publish('dental_patient', function() {
  if (this.userId) {
    return Dental.Collection.Patient.find();
  }
});

/*
 * Laboratory
 */
Meteor.publish('dental_laboratory', function() {
  return Dental.Collection.Laboratory.find();
});

/*
 * Material Cost
 */
Meteor.publish('dental_materialCost', function() {
  return Dental.Collection.MaterialCost.find();
});

/*
 * Material Cost Category
 */
Meteor.publish('dental_materialCostCategory', function() {
  return Dental.Collection.MaterialCostCategory.find();
});

/*
 * Material Cost Item
 */
Meteor.publish('dental_materialCostItem', function() {
  return Dental.Collection.MaterialCostItem.find();
});

/*
 *Supplier
 */
Meteor.publish('dental_supplier', function() {
  return Dental.Collection.Supplier.find();
});

/*
 * Order Category
 */
Meteor.publish('dental_orderCategory', function() {
  return Dental.Collection.OrderCategory.find();
});

/*
 *Order Item
 */
Meteor.publish('dental_orderItem', function() {
  return Dental.Collection.OrderItem.find();
});

/*
 *Register
 */
Meteor.publish('dental_register', function() {
  return Dental.Collection.Register.find();
});

/*
 *Special Register
 */
Meteor.publish('dental_specialRegister', function() {
  return Dental.Collection.SpecialRegister.find();
});

/*
 * Treatment
 */
Meteor.publish('dental_treatment', function() {
  return Dental.Collection.Treatment.find();
});

/*
 * Deposit
 */
Meteor.publish('dental_deposit', function() {
  return Dental.Collection.Deposit.find();
});

/*
 * Invoice
 */
Meteor.publish('dental_invoice', function() {
  return Dental.Collection.Invoice.find();
});

/*
 * Purchase
 */
Meteor.publish('dental_purchase', function() {
  return Dental.Collection.Purchase.find();
});

/*
 * Payment
 */
Meteor.publish('dental_payment', function() {
  return Dental.Collection.Payment.find();
});

/*
 *Special Treatment
 */
Meteor.publish('dental_specialTreatment', function() {
  return Dental.Collection.SpecialTreatment.find();
});

/*
 *Special Payment
 */
Meteor.publish('dental_specialPayment', function() {
  return Dental.Collection.SpecialPayment.find();
});

/*
 * Quotation
 */
Meteor.publish('dental_quotation', function() {
  return Dental.Collection.Quotation.find();
});

/*
 * LaboUnit
 */
Meteor.publish('dental_laboUnit', function() {
  return Dental.Collection.LaboUnit.find();
});

/*
 * laboMaterialCategory
 */
Meteor.publish('dental_laboMaterialCategory', function() {
  return Dental.Collection.LaboMaterialCategory.find();
});

/*
 * laboMaterial
 */
Meteor.publish('dental_laboMaterial', function() {
  return Dental.Collection.LaboMaterial.find();
});

/*
 * laboDepartment
 */
Meteor.publish('dental_laboDepartment', function() {
  return Dental.Collection.LaboDepartment.find();
});

/*
 * laboCustomerCompany
 */
Meteor.publish('dental_laboCustomerCompany', function() {
  return Dental.Collection.LaboCustomerCompany.find();
});

/*
 * laboCustomer
 */
Meteor.publish('dental_laboCustomer', function() {
  return Dental.Collection.LaboCustomer.find();
});

/*
 * laboSupplier
 */
Meteor.publish('dental_laboSupplier', function() {
  return Dental.Collection.LaboSupplier.find();
});

/*
 * LaboItemCategories
 */
Meteor.publish('dental_laboItemCategories', function() {
  return Dental.Collection.LaboItemCategories.find();
});

/*
 * LaboItem
 */
Meteor.publish('dental_laboItem', function() {
  return Dental.Collection.LaboItem.find();
});

/*
 * LaboPurchase
 */
Meteor.publish('dental_laboPurchase', function() {
  return Dental.Collection.LaboPurchase.find();
});

/*
 * LaboAverageStock
 */
Meteor.publish('dental_laboAverageStock', function() {
  return Dental.Collection.LaboAverageStock.find();
});

/*
 * LaboSalesOrder
 */
Meteor.publish('dental_laboSalesOrder', function() {
  return Dental.Collection.LaboSalesOrder.find();
});

/*
 * LaboSalesOrderPayment
 */
Meteor.publish('dental_laboSalesOrderPayment', function() {
  return Dental.Collection.LaboSalesOrderPayment.find();
});

/*
 * LaboQuotation
 */
Meteor.publish('dental_laboQuotation', function() {
  return Dental.Collection.LaboQuotation.find();
});
