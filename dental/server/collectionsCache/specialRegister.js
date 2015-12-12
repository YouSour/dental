// Collection
Dental.Collection.SpecialRegister.cacheDoc(
  'patient',
  Dental.Collection.Patient, ['name', 'gender', 'age', 'occupation',
    'address', 'history', 'member', 'telephone', 'des', 'photo'
  ]
);

Dental.Collection.SpecialRegister.cacheDoc(
  'doctor',
  Dental.Collection.Doctor, ['name', 'gender', 'startDate', 'address',
    'telephone'
  ]
);

Dental.Collection.SpecialRegister.cacheCount('treatmentCount', Dental.Collection
  .SpecialTreatment, 'specialRegisterId');
Dental.Collection.SpecialRegister.cacheCount('appointmentCount', Dental.Collection
  .CalendarEvent, 'specialRegisterId');
Dental.Collection.SpecialRegister.cacheCount('paymentCount', Dental.Collection.SpecialPayment,
  'specialRegisterId');

Dental.Collection.SpecialRegister.cacheArrayField(['disease', 'doctorShare',
  'laboExpense', 'paymentMethod'
]);
