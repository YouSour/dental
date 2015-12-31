Meteor.methods({
  dental_analysisPatientList: function(params) {
    var self = params;
    var data = {
      title: {},
      header: [],
      content: [],
      footer: [],
      deposit: []
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company,
      date: self.date
    };

    /********* Header ********/



    var branch;
    //var patientDoc = Dental.Collection.Patient.findOne(self.patient);

    if (self.branchId != "") {
      branch = self.branchId;
    } else {
      branch = "All";
    }
    //console.log(JSON.stringify(patientDoc));

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
    var selectorChildMale = {};
    var selectorChildFeMale = {};
    var selectorAdultMale = {};
    var selectorAdultFeMale = {};
    var selectorOldMale = {};
    var selectorOldFeMale = {};

    var date = self.date.split(" To ");
    var fromDate = moment(date[0] + " 00:00:00")
      .format(
        "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59")
      .format(
        "YYYY-MM-DD HH:mm:ss");

    // if (fromDate != null && toDate != null) {
    //   selector.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    //   selectorChildMale.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    //   selectorChildFeMale.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    //   selectorAdultMale.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    //   selectorAdultFeMale.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    //   selectorOldMale.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    //   selectorOldFeMale.invoiceDate = {
    //     $gte: fromDate,
    //     $lte: toDate
    //   };
    // }
    //
    // if (self.branchId != "") {
    //   selector.branchId = self.branchId;
    //   selectorChildMale.branchId = self.branchId;
    //   selectorChildFeMale.branchId = self.branchId;
    //   selectorAdultMale.branchId = self.branchId;
    //   selectorAdultFeMale.branchId = self.branchId;
    //   selectorOldMale.branchId = self.branchId;
    //   selectorOldFeMale.branchId = self.branchId;
    // }


    var arr = [];
    // Child Male

    selectorChildMale["_patient.gender"] = "M";
    selectorChildMale["_patient.age"] = {
      $lte: 13
    }

    var childMale = Meteor.call("analysisPatient", selectorChildMale);
    childMale.map(function(obj) {
      arr.push({
        item: obj._id.item,
        typeOfPatient: "Children (1 - 13)",
        male: obj.total,
        female: 0,
        total: obj.total
      })
    });
    // Child FeMale
    selectorChildFeMale["_patient.gender"] = "F";
    selectorChildFeMale["_patient.age"] = {
      $lte: 13
    }
    var childFeMale = Meteor.call("analysisPatient", selectorChildFeMale);
    childFeMale.map(function(obj) {
      arr.push({
        item: obj._id.item,
        typeOfPatient: "Children (1 - 13)",
        male: 0,
        female: obj.total,
        total: obj.total
      })
    });
    // Adult Male
    selectorAdultMale["_patient.gender"] = "M";
    selectorAdultMale["_patient.age"] = {
      $lte: 30,
      $gte: 14
    }
    var adultMale = Meteor.call("analysisPatient", selectorAdultMale);
    adultMale.map(function(obj) {
      arr.push({
        item: obj._id.item,
        typeOfPatient: "Adult (14 - 30)",
        male: obj.total,
        female: 0,
        total: obj.total
      })
    });
    // Adult FeMale
    selectorAdultFeMale["_patient.gender"] = "F";
    selectorAdultFeMale["_patient.age"] = {
      $lte: 30,
      $gte: 14
    }
    var adultFeMale = Meteor.call("analysisPatient", selectorAdultFeMale);
    adultFeMale.map(function(obj) {
      arr.push({
        item: obj._id.item,
        typeOfPatient: "Adult (14 - 30)",
        male: 0,
        female: obj.total,
        total: obj.total
      })
    });

    // Old Male
    selectorOldMale["_patient.gender"] = "M";
    selectorOldMale["_patient.age"] = {
      $gte: 31
    }
    var oldMale = Meteor.call("analysisPatient", selectorOldMale);
    oldMale.map(function(obj) {
      arr.push({
        item: obj._id.item,
        typeOfPatient: "Old (31 - 80)",
        male: obj.total,
        female: 0,
        total: obj.total
      })
    });
    // Old Male
    selectorOldFeMale["_patient.gender"] = "F";
    selectorOldFeMale["_patient.age"] = {
      $gte: 31
    }
    var oldFeMale = Meteor.call("analysisPatient", selectorOldFeMale);
    oldFeMale.map(function(obj) {
      arr.push({
        item: obj._id.item,
        typeOfPatient: "Old (31 - 80)",
        male: 0,
        female: obj.total,
        total: obj.total
      })
    });

    arr.sort(compare);

    if (arr) {
      arr.reduce(function(key, val) {
        if (!key[val.item + val.typeOfPatient]) {
          key[val.item + val.typeOfPatient] = {
            item: val.item,
            itemName: getItemName(val.item),
            typeOfPatient: val.typeOfPatient,
            male: val.male,
            female: val.female,
            total: val.total
          }
          content.push(key[val.item + val.typeOfPatient]);
        } else {
          key[val.item + val.typeOfPatient].male += val.male;
          key[val.item + val.typeOfPatient].female += val.female;
          key[val.item + val.typeOfPatient].total += val.total;
        }

        return key;
      }, {});
    }

    var itemObj = {};
    content.forEach(function(obj) {
      if (_.isUndefined(itemObj[obj.item])) {
        itemObj[obj.item] = {
          itemName: obj.itemName,
          male: {},
          female: {},
          typeOfPatient: obj.typeOfPatient,
          total: obj.total
        }
        itemObj[obj.item].male[obj.typeOfPatient] = obj.male;
        itemObj[obj.item].female[obj.typeOfPatient] = obj.female;
      } else {
        itemObj[obj.item] = {
          itemName: obj.itemName,
          male: itemObj[obj.item].male,
          female: itemObj[obj.item].female,
          typeOfPatient: itemObj[obj.item].typeOfPatient + ',' +
            obj.typeOfPatient,
          total: itemObj[obj.item].total + obj.total
        }
        if (_.isUndefined(itemObj[obj.item].male[obj.typeOfPatient])) {
          itemObj[obj.item].male[obj.typeOfPatient] = obj.male;
          itemObj[obj.item].female[obj.typeOfPatient] = obj.female;
        } else {
          itemObj[obj.item].male[obj.typeOfPatient] += obj.male;
          itemObj[obj.item].female[obj.typeOfPatient] += obj.female;
        }
      }

    });
    var mergedItem = [];
    var index = 1;
    for (var k in itemObj) {
      mergedItem.push({
        index: index,
        item: k,
        itemName: itemObj[k].itemName,
        typeOfPatient: itemObj[k].typeOfPatient,
        male: itemObj[k].male,
        female: itemObj[k].female,
        total: itemObj[k].total
      });
      index++;
    }
    if (mergedItem.length > 0) {
      data.content = mergedItem;
      //data.footer = [
      //    {col1: 'Subtotal:', col2: numeral(getQuotation.subtotal).format('$0,0.00')},
      //    {col1: 'Discount:', col2: numeral(getQuotation.subDiscount).format('0,0.00')},
      //    {col1: 'Total:', col2: numeral(getQuotation.total).format('$0,0.00')}
      //];
      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});


function compare(a, b) {
  if (a.item < b.item) {
    return -1;
  } else if (a.item > b.item) {
    return 1;
  } else {
    return 0;
  }
}


var getItemName = function(itemId) {
  check(itemId, String);
  item = Dental.Collection.DiseaseItem.findOne(itemId);
  return item.name;
}
