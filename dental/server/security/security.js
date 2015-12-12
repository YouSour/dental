/**
 * Staff
 */
Dental.Collection.Staff.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/**
 * Doctor
 */
Dental.Collection.Doctor.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/**
 * Disease Category
 */
Dental.Collection.DiseaseCategory.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Disease Item
 */

Dental.Collection.DiseaseItem.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Patient History
 */

Dental.Collection.PatientHistory.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Patient
 */

Dental.Collection.Patient.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Patient.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Patient.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

Dental.Collection.Patient.permit(['insert', 'update'])
  .dental_ifDataPatientInsert()
  .apply();

/*
 * Laboratory
 */
Dental.Collection.Laboratory.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Material Cost
 */
Dental.Collection.MaterialCost.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Material Cost Category
 */
Dental.Collection.MaterialCostCategory.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Material Cost Item
 */
Dental.Collection.MaterialCostItem.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 *Supplier
 */
Dental.Collection.Supplier.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 * Order Category
 */
Dental.Collection.OrderCategory.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 *Order Item
 */
Dental.Collection.OrderItem.permit(['insert', 'update', 'remove'])
  .dental_ifSetting()
  .apply();

/*
 *Register
 */
Dental.Collection.Register.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Register.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Register.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 *Special Register
 */
Dental.Collection.SpecialRegister.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.SpecialRegister.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.SpecialRegister.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 *Treatment
 */
Dental.Collection.Treatment.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Treatment.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Treatment.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 *Deposit
 */
Dental.Collection.Deposit.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Deposit.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Deposit.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 * Invoice
 */
Dental.Collection.Invoice.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Invoice.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Invoice.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 *Purchase
 */
Dental.Collection.Purchase.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Purchase.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Purchase.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 * Payment
 */
Dental.Collection.Payment.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Payment.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Payment.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 *Special Treatment
 */
Dental.Collection.SpecialTreatment.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.SpecialTreatment.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.SpecialTreatment.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 *Special Payment
 */
Dental.Collection.SpecialPayment.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.SpecialPayment.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.SpecialPayment.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 * Quotation
 */
Dental.Collection.Quotation.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.Quotation.permit(['update', ])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Quotation.permit(['remove'])
  .dental_ifDataRemove()
  .apply();
