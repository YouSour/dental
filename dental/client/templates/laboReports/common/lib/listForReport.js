/**
 * List
 */
Dental.ListForReportState = new ReactiveObj();

Dental.ListForReport = {
  patient: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var currentBranch = Session.get('currentBranch');
    Dental.Collection.Patient.find({
        branchId: currentBranch
      })
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.gender + ')',
          value: obj._id
        });
      });

    return list;
  },
  laboCustomerList: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var currentBranch = Session.get('currentBranch');
    Dental.Collection.LaboCustomer.find({
        branchId: currentBranch
      })
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.gender + ')',
          value: obj._id
        });
      });

    return list;
  },
  disease: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var currentBranch = Session.get('currentBranch');
    Dental.Collection.DiseaseItem.find({
        branchId: currentBranch
      })
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name,
          value: obj._id
        });
      });

    return list;
  },
  staff: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    Dental.Collection.Staff.find()
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.position +
            ')',
          value: obj._id
        });
      });

    return list;
  },
  branch: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    Cpanel.Collection.Branch.find()
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.enName + ' (' + obj.enShortName +
            ')',
          value: obj._id
        });
      });

    return list;
  },
  register: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var patientId = Dental.ListForReportState.get('patientId');
    Dental.Collection.Register.find({
      patientId: patientId
    }).forEach(function(obj) {
      var label = obj._id + ' | Date: ' + obj.registerDate +
        ' | Total: ' + numeral(obj.total).format('0,0.00');
      list.push({
        label: label,
        value: obj._id
      });
    });

    return list;
  },
  quotationForPatient: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var patientId = Dental.ListForReportState.get('patientId');
    Dental.Collection.Quotation.find({
      patientId: patientId
    }).forEach(function(obj) {
      var label = obj._id + ' | Date: ' + obj.quotationDate +
        ' | Total: ' + numeral(obj.total).format('0,0.00');
      list.push({
        label: label,
        value: obj._id
      });
    });

    return list;
  },
  registerListForDeposit: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var patientId = Dental.ListForReportState.get('patientId');
    Dental.Collection.Register.find({
      patientId: patientId
    }).forEach(function(obj) {
      var label = obj._id + ' | Date: ' + obj.registerDate +
        ' | Total: ' + numeral(obj.total).format('0,0.00');
      list.push({
        label: label,
        value: obj._id
      });
    });

    return list;
  },
  patientList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });

    var currentBranch = Session.get('currentBranch');
    Dental.Collection.Patient.find({
        branchId: currentBranch
      })
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.gender + ')',
          value: obj._id
        });
      });

    return list;
  },
  staffList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });

    Dental.Collection.Staff.find()
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.position +
            ')',
          value: obj._id
        });
      });

    return list;
  },
  doctorList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });

    Dental.Collection.Doctor.find()
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.gender + ')',
          value: obj._id
        });
      });

    return list;
  },
  branchList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });

    Cpanel.Collection.Branch.find()
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.enName + ' (' + obj.enShortName +
            ')',
          value: obj._id
        });
      });

    return list;
  },
  supplierList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });

    Dental.Collection.Supplier.find().forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;
  },
  laboSupplierList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });

    var branchSession = Session.get('currentBranch');
    Dental.Collection.LaboSupplier.find({branchId:branchSession}).forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;
  },
  laboTypeOfPurchase: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    list.push({
      label: "In",
      value: "In"
    });
    list.push({
      label: "Adjust",
      value: "Adjust"
    });

    return list;
  },
  laboStatusOfSaleOrder: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    list.push({
      label: "Active",
      value: "Active"
    });
    list.push({
      label: "Check-Out",
      value: "Check-Out"
    });

    return list;
  },
  statusListForPayment: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    list.push({
      label: "Partial",
      value: "Partial"
    });
    list.push({
      label: "Close",
      value: "Close"
    });

    return list;
  },
  statusListForRegister: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    list.push({
      label: "Active",
      value: "Active"
    });
    list.push({
      label: "Close",
      value: "Close"
    });

    return list;
  },
  laboMaterialList: function() {
    var list = [];
    list.push({
      label: "All",
      value: ""
    });
    var branchSession = Session.get('currentBranch');
    var laboMaterialDoc = Dental.Collection.LaboMaterial.find({branchId:branchSession},{sort:{_id:1}});

    laboMaterialDoc.forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;
  },
  exchangeList: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    Cpanel.Collection.Exchange.find()
      .forEach(function(obj) {
        list.push({
          label: numeral(obj.rates.USD).format('0,0.00 $') + " | " +
            numeral(obj.rates.KHR).format('0,0.00') + " R | " +
            numeral(obj.rates.THB).format('0,0.0000') + " B ",
          value: obj._id
        });
      });

    return list;
  }
};
