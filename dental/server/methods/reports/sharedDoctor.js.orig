Meteor.methods({
  dental_sharedDoctor: function(params) {
    var self = params;

    var data = {
      title: {},
      header: {},
      content: [],
      deposit: [],
      footer: {}
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company,
      date: self.date
    };

    /********* Header ********/
    var branch;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });


    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    data.header = [{
      col1: 'Branch: ' + branch
    }];

    /********** Content & Footer **********/

    var selectorDoctor = {};
    var selector = {};

    var date = self.date.split(" To ");

    var fromDate = moment(date[0] + " 00:00:00").format(
      "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59").format(
      "YYYY-MM-DD HH:mm:ss");

    selector.status = "Close";
    selectorDoctor.status = "Close";

    if (self.branchId != "") {
      selector.branchId = self.branchId;
      selectorDoctor.branchId = self.branchId;
    }

    if (self.date != null) {
      selectorDoctor.closingDate = {
        $gte: fromDate,
        $lte: toDate
      };
      selector.closingDate = {
        $gte: fromDate,
        $lte: toDate
      };
    }
    // find doctor Id all
    var doctorList = Dental.Collection.Register.aggregate([{
      $unwind: "$doctorShare"
    }, {
      $match: selectorDoctor
    }, {
      $group: {
        _id: {
          doctorId: "$doctorShare.doctor",
        },
        amount: {
          $sum: "$doctorShare.amount"
        }
      }
    }, {
      $sort: {
        "_id.doctorId": 1
      }
    }]);

    var content = [];
    doctorList.forEach(function(doctorObj) {
      selector['doctorShare.doctor'] = doctorObj._id.doctorId;
      var results = Dental.Collection.Register.find(selector);
      var doctorDoc = Dental.Collection.Doctor.findOne({
        _id: doctorObj._id.doctorId
      });

      content.push({
        isHeader: true,
        doctorId: doctorObj._id.doctorId + " : " + doctorDoc.name,
        totalAmount: doctorObj.amount
      });


      results.forEach(function(obj) {
        var detailObj = {};
        var totalAmount = 0;
        var paidAmount = 0;

        detailObj.registerId = obj._id;
        detailObj.date = obj.registerDate;
        detailObj.patient = obj.patientId + ' : ' + obj._patient.name +
          ' (' + obj._patient.gender + ')';
        detailObj.subTotal = obj.subTotal;
        detailObj.deposit = obj.deposit;
        detailObj.subDiscount = obj.subDiscount;
        detailObj.totalDue = obj.total;

        Dental.Collection.Payment.find({
          registerId: obj._id
        }).forEach(function(obj) {
          paidAmount = obj.balance;
        });
        detailObj.paidAmount = obj.total - paidAmount;

        detailObj.closedDate = obj.closingDate;
        obj.doctorShare.forEach(function(ob) {
          if (ob.doctor == doctorObj._id.doctorId) {
            detailObj.isHeader = false, detailObj.amount = ob
              .amount;
            totalAmount += ob.amount;
          }
        });
        detailObj.totalAmount = totalAmount;
        content.push(detailObj);
      });
    });

    if (content.length > 0) {
      data.content = content;
      return data;
    } else {
      data.content.push({
        registerId: 'no results'
      });
      return data;
    }

    /*
     results.reduce(function(key,val){

     if(!key[val].doctorId){
     key[val.doctorId]={
     totalAmount: val.amount,
     invoice: val.invoice,
     date: val.date,
     patientId: val.patientId,
     patientName: val.patientName,
     gender: val.gender
     };

     }else{
     key[val.doctorId].totalAmount+=val.amount;
     }
     return key;
     },{});
     */

  }
});
