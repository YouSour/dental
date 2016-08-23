Dental.Collection.LaboSalesOrderPayment.before.insert(function (userId, doc) {
    if (doc.balance != 0) {
        doc.status = "Partial";
    } else {
        doc.status = "Close";

        var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({_id:doc.saleOrderId});
        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId},{$set:{
          status:{
            activeDate : salesOrderDoc.status.activeDate ,
            readyDate : salesOrderDoc.status.readyDate,
            checkOutDate : salesOrderDoc.status.checkOutDate,
            closingDate: doc.paymentDate
          }
        }});
    }
});

Dental.Collection.LaboSalesOrderPayment.before.update(function (userId, doc, fieldNames, modifier, options) {
    var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({_id:doc.saleOrderId});
    modifier.$set = modifier.$set || {};
    if (modifier.$set.balance != 0) {
        modifier.$set.status = "Partial";

        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId},{$set:{
          status:{activeDate : salesOrderDoc.status.activeDate ,
            readyDate : salesOrderDoc.status.readyDate,
            checkOutDate : salesOrderDoc.status.checkOutDate,
            closingDate : ""
          }
        }});
    } else {
        modifier.$set.status = "Close";
        //update sale order have closingDate after payment closed
        Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId},{$set:{
          status:{
            activeDate : salesOrderDoc.status.activeDate ,
            readyDate : salesOrderDoc.status.readyDate,
            checkOutDate : salesOrderDoc.status.checkOutDate,
            closingDate: doc.paymentDate
          }
        }});
    }
});

Dental.Collection.LaboSalesOrderPayment.after.remove(function (userId,doc) {
  Meteor.defer(function() {
    var salesOrderDoc = Dental.Collection.LaboSalesOrder.findOne({_id:doc.saleOrderId});
    //update sale order have closingDate after payment closed
    Dental.Collection.LaboSalesOrder.direct.update({_id: doc.saleOrderId},{$set:{
      status:{activeDate : salesOrderDoc.status.activeDate ,
        readyDate : salesOrderDoc.status.readyDate,
        checkOutDate : salesOrderDoc.status.checkOutDate,
        closingDate : ""
      }
    }});

  }); // end defer
});
