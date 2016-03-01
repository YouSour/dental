/**
/**
 * Created by piseth on 11/30/15.
 // */

//patient
Dental.Collection.Patient.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Patient, prefix, 6);
});

//stuff
Dental.Collection.Staff.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Staff, prefix, 4);
});

//doctor
Dental.Collection.Doctor.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Doctor, prefix, 4);
});

//PatientHistory
Dental.Collection.PatientHistory.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.PatientHistory, prefix, 3);
});
//DiseaseCategory
Dental.Collection.DiseaseCategory.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.DiseaseCategory, prefix, 3);
});

//DiseaseItem
Dental.Collection.DiseaseItem.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.DiseaseItem, prefix, 6);
});
//LaboratoryItem
Dental.Collection.Laboratory.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Laboratory, prefix, 3);
});

//MaterialCostCategory
Dental.Collection.MaterialCostCategory.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.MaterialCostCategory, prefix, 3);
});

//supplier
Dental.Collection.Supplier.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Supplier, prefix, 3);
});

//OrderCategory
Dental.Collection.OrderCategory.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.OrderCategory, prefix, 3);
});

//OrderItem
Dental.Collection.OrderItem.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.OrderItem, prefix, 6);
});


//Register
Dental.Collection.Register.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Register, prefix, 9);
});

//Register
Dental.Collection.Treatment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Treatment, prefix, 12);
});

//Register
Dental.Collection.Deposit.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Deposit, prefix, 12);
});

//Appointment
Dental.Collection.CalendarEvent.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.CalendarEvent, prefix, 12);
});

//payment
Dental.Collection.Payment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var hello = prefix + dt;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Payment, hello, 3);
});

//SpecialRegister
Dental.Collection.SpecialRegister.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialRegister, prefix, 9);
});

//SpecialTra
Dental.Collection.SpecialTreatment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialTreatment, prefix, 12);
});

//SpecialPayment
Dental.Collection.SpecialPayment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var hello = prefix + dt;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialPayment, hello, 3);
});

//Quotation
Dental.Collection.Quotation.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Quotation, prefix, 9);
});

//MaterialCost
Dental.Collection.MaterialCost.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var hello = prefix + dt;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.MaterialCost, hello, 3);
});

//MaterialCost
Dental.Collection.MaterialCostItem.before.insert(function (userId, doc) {
    var prefix = "";
    doc._id = idGenerator.genWithPrefix(Dental.Collection.MaterialCostItem, prefix, 6);
});

//Purchase
Dental.Collection.Purchase.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var hello = prefix + dt;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Purchase, hello, 3);
});
