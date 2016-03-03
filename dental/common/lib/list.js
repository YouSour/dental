/**
 * List
 */
Dental.ListState = new ReactiveObj();

Dental.List = {
  gender: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    list.push({
      label: 'Male',
      value: 'M'
    });
    list.push({
      label: 'Female',
      value: 'F'
    });

    return list;
  },
  position: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    list.push({
      label: 'Admin',
      value: "Admin"
    });
    list.push({
      label: 'Assistant',
      value: "Assistant"
    });
    list.push({
      label: 'Accountant',
      value: "Accountant"
    });
    list.push({
      label: 'Cashier',
      value: "Cashier"
    });

    return list;
  },
  diseaseCategory: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.DiseaseCategory.find({branchId:branchSession})
      .forEach(function(obj) {
        list.push({
          label: obj.code + ' : ' + obj.name,
          value: obj._id
        });
      });

    return list;
  },
  laboratoryItem: function() {
    var list = [];
    // list.push({
    //   label: "(Select One)",
    //   value: ""
    // });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.Laboratory.find({branchId:branchSession}).forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;

  },
  materialCostCategory: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.MaterialCostCategory.find({branchId:branchSession})
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name,
          value: obj._id
        });
      });

    return list;
  },
  materialCostItem: function() {
    var list = [];
    // list.push({
    //   label: "(Select One)",
    //   value: ""
    // });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.MaterialCostItem.find({branchId:branchSession}).forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;

  },
  orderCategory: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.OrderCategory.find({branchId:branchSession})
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name,
          value: obj._id
        });
      });

    return list;
  },
  member: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });
    list.push({
      label: "Yes",
      value: "Yes"
    });
    list.push({
      label: "No",
      value: "No"
    });

    return list;
  },
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
  history: function() {
    var list = [];
  var branchSession = Session.get('currentBranch');
    Dental.Collection.PatientHistory.find({branchId:branchSession})
      .forEach(function(obj) {
        list.push({
          label: obj.name,
          value: obj._id
        });
      });

    return list;
  },
  diseaseItem: function() {

    var list = [];
    // list.push({
    //   label: "(Select One)",
    //   value: ""
    // });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.DiseaseItem.find({branchId:branchSession})
      .forEach(function(obj) {
        var label = obj.name + ' (' + obj._diseaseCategory.name + ')' +
          ' | Price: ' + numeral(obj.price).format('0,0.00');

        list.push({
          label: label,
          value: obj._id
        });
      });

    return list;
  },
  diseaseItemForInvoice: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    //var checkingMemberPrice = Dental.Collection.Patient.findOne({_id: $('[name="patientId"]').val()}, {member: "Yes"});

    Dental.Collection.DiseaseItem.find()
      .forEach(function(obj) {
        var label = obj.name + ' (' + obj._diseaseCategory.name + ')' +
          ' | Price: ' + numeral(obj.price).format('0,0.00');

        list.push({
          label: label,
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
    var branchSession = Session.get('currentBranch');
    Dental.Collection.Staff.find({branchId:branchSession})
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.position +
            ')',
          value: obj._id
        });
      });

    return list;
  },

  doctor: function() {
    var list = [];
    // list.push({
    //   label: "(Select One)",
    //   value: ""
    // });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.Doctor.find({branchId:branchSession})
      .forEach(function(obj) {
        list.push({
          label: obj._id + " : " + obj.name + ' (' + obj.gender + ')',
          value: obj._id
        });
      });

    return list;
  },
  registerForPatient: function() {
    var list = [];
    list.push({
      label: "(Select One)",
      value: ""
    });

    var patientId = Dental.ListState.get('patientId');
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
  registerPurchase: function(selectOne) {
    var list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }

    Dental.Collection.Register.find().forEach(function(obj) {
      list.push({
        label: obj._id + ": " + obj._patient.name + " (" + obj._patient
          .gender + ")",
        value: obj._id
      });
    });

    return list;
  },
  supplier: function(selectOne) {
    var list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }
    var branchSession = Session.get('currentBranch');
    Dental.Collection.Supplier.find({branchId:branchSession}).forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;
  },
  orderItem: function() {
    var list = [];
    // list.push({
    //   label: "(Select One)",
    //   value: ""
    // });
    var branchSession = Session.get('currentBranch');
    Dental.Collection.OrderItem.find({branchId:branchSession}).forEach(function(obj) {
      list.push({
        label: obj._id + " : " + obj.name,
        value: obj._id
      });
    });

    return list;

  },
  paymentMethod: function(selectOne) {
    var list = [];

    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }
    var specialPaymentDoc = Dental.RegisterState.get('data');
    var specialPayment = Dental.Collection.SpecialPayment.find({specialRegisterId: specialPaymentDoc._id}).fetch();
    var lastIndex = undefined;
    if(specialPayment){
      specialPayment.forEach(function(payment){
        lastIndex = payment.paymentMethod;
      });
    }
    var arr = [specialPaymentDoc];
   arr.forEach(function(object) {
      if(!_.isUndefined(lastIndex)){
        //get second + paymentMethod
        var payment = object.paymentMethod[lastIndex];
        list.push({
          label: payment.index + ": Date : " + payment.paymentMethodDate +
          " | Amount : " + payment.amount,
          value: payment.index + " | " + payment.amount
        });
      }else{
        //get first paymentMethod
        var payment = object.paymentMethod[0];
        list.push({
          label: payment.index + ": Date : " + payment.paymentMethodDate +
          " | Amount : " + payment.amount,
          value: payment.index + " | " + payment.amount
        });
      }

    });

    return list;

  },
  register: function(selectOne) {
    var list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "(Select One)",
        value: ""
      });
    }
    var patientId = Dental.ListState.get('patientId');
    Dental.Collection.Register.find({
      patientId: patientId,
      status: "Close"
    }).forEach(function(obj) {
      var patient = Dental.Collection.Patient.findOne({
        _id: obj.patientId
      });
      var payment = Dental.Collection.Payment.findOne({
        registerId: obj._id,
      }, {
        sort: {
          _id: -1
        }
      });

      if (payment != null && payment.balance > 0 && payment.status ==
        "Partial") {
        list.push({
          label: "ID : " + obj._id + " | " + patient.name + " : " +
            obj.registerDate + " | " + "Amount : " + payment.balance,
          value: obj._id + "|" + payment.balance

        });
      } else if (payment == null) {
        list.push({
          label: "ID : " + obj._id + " | " + patient.name + " : " +
            obj.registerDate + " | " + "Amount : " + obj.total,
          value: obj._id + "|" + obj.total

        });
      }


    });

    return list;
  },
  branchForUser: function(selectOne, userId) {
    var list = [];
    if (!_.isEqual(selectOne, false)) {
      list.push({
        label: "All",
        value: ""
      });
    }
    var userId = _.isUndefined(userId) ? Meteor.userId() : userId;
    Meteor.users.findOne(userId).rolesBranch
      .forEach(function(branch) {
        var label = Cpanel.Collection.Branch.findOne(branch).enName;
        list.push({
          label: label,
          value: branch
        });
      });
    return list;
  },
  backupAndRestoreTypes: function() {
    return [{
      value: '',
      label: 'Select One'
    }, {
      value: 'Setting',
      label: 'Setting'
    }, {
      value: 'Default',
      label: 'Default'
    }, {
      value: 'Setting,Default',
      label: 'Setting And Default'
    }];
  }

};
