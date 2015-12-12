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
