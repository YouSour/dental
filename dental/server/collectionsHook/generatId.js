/**
 * Created by piseth on 11/30/15.
  */

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
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Register, prefix, 9);
    Dental.ListState.set(id, doc._id);
});

//Treatment
Dental.Collection.Treatment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Treatment, prefix, 12);
    Dental.ListState.set(id ,doc._id);
});

//Despost
Dental.Collection.Deposit.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Deposit, prefix, 12);
    Dental.ListState.set(id, doc._id);
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
    var idPrefix = prefix + dt;
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Payment, idPrefix, 3);
    Dental.ListState.set(id, doc._id);
});

//SpecialRegister
Dental.Collection.SpecialRegister.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialRegister, prefix, 9);
    Dental.ListState.set(id, doc._id);
});

//SpecialTra
Dental.Collection.SpecialTreatment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialTreatment, prefix, 12);
    Dental.ListState.set(id, doc._id);
});

//SpecialPayment
Dental.Collection.SpecialPayment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var idPrefix = prefix + dt;
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialPayment, idPrefix, 3);
    Dental.ListState.set(id, doc._id);
});

//Quotation
Dental.Collection.Quotation.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Quotation, prefix, 9);
    Dental.ListState.set(id, doc._id);
});

//MaterialCost
Dental.Collection.MaterialCost.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var idPrefix = prefix + dt;
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.MaterialCost, idPrefix, 3);
    Dental.ListState.set(id, doc._id);
});

//MaterialCostItem
Dental.Collection.MaterialCostItem.before.insert(function (userId, doc) {
    var prefix = "";
    doc._id = idGenerator.genWithPrefix(Dental.Collection.MaterialCostItem, prefix, 6);
});

//Purchase
Dental.Collection.Purchase.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var idPrefix = prefix + dt;
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.Purchase, idPrefix, 3);
    Dental.ListState.set(id, doc._id);
});

//laboUnit
Dental.Collection.LaboUnit.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboUnit, prefix, 3);
});

//laboMaterialCategory
Dental.Collection.LaboMaterialCategory.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboMaterialCategory, prefix, 3);
});

//laboMaterial
Dental.Collection.LaboMaterial.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboMaterial, prefix, 4);
});

//laboDepartment
Dental.Collection.LaboDepartment.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboDepartment, prefix, 3);
});

//laboCustomerCompany
Dental.Collection.LaboCustomerCompany.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboCustomerCompany, prefix, 3);
});

//laboCustomer
Dental.Collection.LaboCustomer.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboCustomer, prefix, 6);
});

//LaboSupplier
Dental.Collection.LaboSupplier.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboSupplier, prefix, 3);
});

//LaboItemCategories
Dental.Collection.LaboItemCategories.before.insert(function (userId, doc) {
    var prefix = '';
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboItemCategories, prefix, 3);
});

//LaboItem
Dental.Collection.LaboItem.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboItem, prefix, 9);
    Dental.ListState.set(id, doc._id);
});

//LaboPurchase
Dental.Collection.LaboPurchase.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboPurchase, prefix, 9);
    Dental.ListState.set(id, doc._id);
});

//LaboSalesOrder
Dental.Collection.LaboSalesOrder.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboSalesOrder, prefix, 9);
    Dental.ListState.set(id, doc._id);
});

//Labo Quotation
Dental.Collection.LaboQuotation.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboQuotation, prefix, 9);
    Dental.ListState.set(id, doc._id);

    // Check null department
    var departments = [];
    _.forEach(doc.department, function (val) {
        if (!_.isNull(val)) {
            // Find labo deapartment
            val.departmentDoc = Dental.Collection.LaboDepartment.findOne({_id: val.department});
            departments.push(val);
        }
    });
    doc.department = departments;

    // Check null item
    var items = [];
    _.forEach(doc.department, function (val) {
        if (!_.isNull(val)) {
            // Find labo item
            val.itemDoc = Dental.Collection.LaboItem.findOne({_id: val.item});
            items.push(val);
        }
    });
    doc.department = items;
});

Dental.Collection.LaboQuotation.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};

    // Check null department
    var departments = [];
    _.forEach(modifier.$set.department, function (val) {
        if (!_.isNull(val)) {
            // Find labo deapartment
            val.departmentDoc = Dental.Collection.LaboDepartment.findOne({_id: val.department});
            departments.push(val);
        }
    });

    modifier.$set.department = departments;

    // Check null item
    var items = [];
    _.forEach(modifier.$set.department, function (val) {
        if (!_.isNull(val)) {
            // Find labo item
            val.itemDoc = Dental.Collection.LaboItem.findOne({_id: val.item});
            items.push(val);
        }
    });
    modifier.$set.department = items;
});

//payment
Dental.Collection.LaboSalesOrderPayment.before.insert(function (userId, doc) {
    var prefix = stateDental.get('dental');
    var dt = moment().format("YYYYMMDD");
    var idPrefix = prefix + dt;
    var id = doc._id;
    doc._id = idGenerator.genWithPrefix(Dental.Collection.LaboSalesOrderPayment, idPrefix, 3);
    Dental.ListState.set(id, doc._id);
});
