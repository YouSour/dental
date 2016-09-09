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

Dental.Collection.Quotation.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.Quotation.permit(['remove'])
  .dental_ifDataRemove()
  .apply();

/*
 * Staff For Labo
 */
  Dental.Collection.Staff.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboUnit
 */
  Dental.Collection.LaboUnit.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboMaterialCategory
 */
  Dental.Collection.LaboMaterialCategory.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboMaterial
 */
  Dental.Collection.LaboMaterial.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboDepartment
 */
  Dental.Collection.LaboDepartment.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboCustomerCompany
 */
  Dental.Collection.LaboCustomerCompany.permit(['insert'])
    .dental_ifLaboInsert()
    .apply();
  Dental.Collection.LaboCustomerCompany.permit(['update'])
    .dental_ifLaboUpdate()
    .apply();
  Dental.Collection.LaboCustomerCompany.permit(['remove'])
    .dental_ifLaboRemove()
    .apply();

/*
 * LaboCustomer
 */
  Dental.Collection.LaboCustomer.permit(['insert'])
    .dental_ifLaboInsert()
    .apply();
  Dental.Collection.LaboCustomer.permit(['update'])
    .dental_ifLaboUpdate()
    .apply();
  Dental.Collection.LaboCustomer.permit(['remove'])
    .dental_ifLaboRemove()
    .apply();

/*
 * LaboSupplier
 */
  Dental.Collection.LaboSupplier.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboItemCategories
 */
  Dental.Collection.LaboItemCategories.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboItem
 */
  Dental.Collection.LaboItem.permit(['insert', 'update', 'remove'])
    .dental_ifLaboSetting()
    .apply();

/*
 * LaboPurchase
 */
  Dental.Collection.LaboPurchase.permit(['insert'])
    .dental_ifLaboInsert()
    .apply();

  Dental.Collection.LaboPurchase.permit(['update'])
    .dental_ifLaboUpdate()
    .apply();

  Dental.Collection.LaboPurchase.permit(['remove'])
    .dental_ifLaboRemove()
    .apply();

/*
 * LaboSalesOrder
 */
  Dental.Collection.LaboSalesOrder.permit(['insert'])
      .dental_ifLaboInsert()
      .apply();

  Dental.Collection.LaboSalesOrder.permit(['update'])
      .dental_ifLaboUpdate()
      .apply();

  Dental.Collection.LaboSalesOrder.permit(['remove'])
      .dental_ifLaboRemove()
      .apply();

/*
 * LaboSalesOrderPayment
 */
  Dental.Collection.LaboSalesOrderPayment.permit(['insert'])
      .dental_ifLaboInsert()
      .apply();

  Dental.Collection.LaboSalesOrderPayment.permit(['update'])
      .dental_ifLaboUpdate()
      .apply();

  Dental.Collection.LaboSalesOrderPayment.permit(['remove'])
      .dental_ifLaboRemove()
      .apply();
/*
 * LaboQuotation
 */
  Dental.Collection.LaboQuotation.permit(['insert'])
      .dental_ifLaboInsert()
      .apply();

  Dental.Collection.LaboQuotation.permit(['update'])
      .dental_ifLaboUpdate()
      .apply();

  Dental.Collection.LaboQuotation.permit(['remove'])
      .dental_ifLaboRemove()
      .apply();
