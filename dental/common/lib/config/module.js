/**
 * Module
 */
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Dental = {
  name: 'Dental Clinic System',
  version: '0.0.1',
  summary: 'Dental Clinic System is ...',
  roles: [
    'setting',
    'data-insert',
    'data-update',
    'data-remove',
    'data-patient-insert',
    'reporter'
  ],
  dump: {
    setting: [
      'dental_staff',
      'dental_doctor',
      'dental_patientHistory',
      'dental_diseaseCategory',
      'dental_diseaseItem',
      'dental_laboratory',
      'dental_materialCostCategory',
      'dental_materialCostItem',
      'dental_supplier',
      'dental_orderCategory',
      'dental_orderItem',
    ],
    data: [
      'dental_patient',
      'dental_register',
      'dental_treatment',
      'dental_deposit',
      'dental_calendarEvent',
      'dental_payment',
      'dental_specialRegister',
      'dental_specialPayment',
      'dental_quotation',
      'dental_materialCost',
      'dental_purchase',
    ]
  }
};
