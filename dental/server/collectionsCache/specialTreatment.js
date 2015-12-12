// Collection
Dental.Collection.SpecialTreatment.cacheDoc(
  'specialRegister',
  Dental.Collection.SpecialRegister, ['registerDate', 'des', 'patientId',
    '_patient'
  ]
);

Dental.Collection.SpecialTreatment.cacheDoc(
  'doctor',
  Dental.Collection.Doctor, ['name', 'gender', 'address', 'startDate',
    'telephone', 'photo'
  ]
);
