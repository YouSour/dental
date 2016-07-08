Dental.Collection.LaboPurchase.after.insert(function(userId, doc) {

  //insert
  Meteor.defer(function() {
    if (!_.isUndefined(doc)) {
      doc.purchaseDetail.forEach(function(obj) {
        //generate Id AverageStockId
        var prefix = stateDental.get('dental');
        var avgStockId = idGenerator.genWithPrefix(Dental.Collection.LaboAverageStock, prefix, 22);

        //check material already exist
        Meteor.subscribe('dental_laboAverageStock');
        var lastPurchaseMaterial = Dental.Collection.LaboAverageStock.findOne({
          materialId: obj.materialId
        }, {
          sort: {
            stockDate: -1
          }
        });

        //check material using sales order
        var saleOrderId;
        if(!_.isUndefined(lastPurchaseMaterial)){
            if(!_.isUndefined(lastPurchaseMaterial.saleOrderId)){
              saleOrderId = lastPurchaseMaterial.saleOrderId;
            }
        }

        //check OCqty
        var openingQty = 0;
        var closedQty = 0;

        var avgPrice = 0;
        var totalAmount = 0;
        if (lastPurchaseMaterial) {
          openingQty = lastPurchaseMaterial.closedQtyBalance;
          closedQty = lastPurchaseMaterial.closedQtyBalance + obj.qty;
          //Note: TotalAmount of material + new amount of material//
          totalAmount = lastPurchaseMaterial.totalAmount + obj.amount;
          //======================================================//
          avgPrice = totalAmount / closedQty;
        } else {
          openingQty = openingQty;
          closedQty = obj.qty;
          avgPrice = obj.amount / closedQty;
          totalAmount = obj.amount;
        }

        //insert data into LaboAverageStock
        Dental.Collection.LaboAverageStock.direct.insert({
          _id: avgStockId,
          stockDate: doc.purchaseDate,
          materialId: obj.materialId,
          qty: obj.qty,
          price: obj.price,
          amount: obj.amount,
          totalAmount: totalAmount,
          avgPrice: avgPrice,
          openingQtyBalance: openingQty,
          closedQtyBalance: closedQty,
          purchaseId: doc._id,
          lastSaleOrderId : saleOrderId
        });

        //update avgPrice & balanceQty when insert
        Dental.Collection.LaboMaterial.direct.update({_id: obj.materialId},{$set:{
          avgPrice: avgPrice,
          balanceQty: closedQty
        }});

      });
    }
    //end if
  });
});

//update
Dental.Collection.LaboPurchase.after.update(function(userId, doc, fieldNames, modifier, options) {
 modifier.$set = modifier.$set || {};
  var previousData = this.previous;

  Meteor.defer(function() {
    if (!_.isUndefined(doc)) {

      //Remove
      Dental.Collection.LaboAverageStock.remove({
        purchaseId: doc._id
      });

      //insert
      doc.purchaseDetail.forEach(function(obj) {
        //generate Id AverageStockId
        var prefix = doc.branchId + "-";
        var avgStockId = idGenerator.genWithPrefix(Dental.Collection.LaboAverageStock, prefix, 22);

        //check material already exist
        Meteor.subscribe('dental_laboAverageStock');
        var lastPurchaseMaterial = Dental.Collection.LaboAverageStock.findOne({
          materialId: obj.materialId
        }, {
          sort: {
            stockDate: -1
          }
        });

        //check material using sales order
        var saleOrderId;
        if(!_.isUndefined(lastPurchaseMaterial)){
            if(!_.isUndefined(lastPurchaseMaterial.saleOrderId)){
              saleOrderId = lastPurchaseMaterial.saleOrderId;
            }
        }

        //check OCqty
        var openingQty = 0;
        var closedQty = 0;

        var avgPrice = 0;
        var totalAmount = 0;
        if (lastPurchaseMaterial) {
          openingQty = lastPurchaseMaterial.closedQtyBalance;
          closedQty = lastPurchaseMaterial.closedQtyBalance + obj.qty;
          //Note: TotalAmount of material + new amount of material//
          totalAmount = lastPurchaseMaterial.totalAmount + obj.amount;
          //======================================================//
          avgPrice = totalAmount / closedQty;
        } else {
          openingQty = openingQty;
          closedQty = obj.qty;
          avgPrice = obj.amount / closedQty;
          totalAmount = obj.amount;
        }

        //insert data
        Dental.Collection.LaboAverageStock.direct.insert({
          _id: avgStockId,
          stockDate: doc.purchaseDate,
          materialId: obj.materialId,
          qty: obj.qty,
          price: obj.price,
          amount: obj.amount,
          totalAmount: totalAmount,
          avgPrice: avgPrice,
          openingQtyBalance: openingQty,
          closedQtyBalance: closedQty,
          purchaseId: doc._id,
          lastSaleOrderId : saleOrderId
        });

        //update avgPrice & balanceQty when update
        Dental.Collection.LaboMaterial.direct.update({_id: obj.materialId},{$set:{
          avgPrice: avgPrice,
          balanceQty: closedQty
        }});

        //update material avgPrice & balanceQty when
        previousData.purchaseDetail.forEach(function (previousObj) {
              if(previousObj.materialId != obj.materialId){
                var lastPurchaseMaterialDoc = Dental.Collection.LaboAverageStock.findOne({
                  materialId: previousObj.materialId
                }, {
                  sort: {
                    stockDate: -1
                  }
                });

                var dataVar = {
                  material : previousObj.materialId,
                  avgPrice: null,
                  closedQty : 0
                }

                if(!_.isUndefined(lastPurchaseMaterialDoc)){
                  dataVar.material = lastPurchaseMaterialDoc.materialId;
                  dataVar.avgPrice = lastPurchaseMaterialDoc.avgPrice;
                  dataVar.closedQty = lastPurchaseMaterialDoc.closedQtyBalance;
                }

                Dental.Collection.LaboMaterial.direct.update({_id: dataVar.material},{$set:{
                  avgPrice: dataVar.avgPrice,
                  balanceQty: dataVar.closedQty
                }});

              }
        });

      });

    }
    //end if
  });
});

//remove
Dental.Collection.LaboPurchase.after.remove(function(userId, doc) {
  Meteor.defer(function() {

    Dental.Collection.LaboAverageStock.remove({
      purchaseId: doc._id
    });

    // update avgPrice & balanceQty when remove
    var lastPurchaseRemoveDoc = doc.purchaseDetail.forEach(function (lprdObj) {

      var lastPurchaseMaterial = Dental.Collection.LaboAverageStock.findOne({
        materialId: lprdObj.materialId
      }, {
        sort: {
          stockDate: -1
        }
      });

      var dataVar = {
        material : lprdObj.materialId,
        avgPrice: null,
        closedQty : 0
      }

      if(!_.isUndefined(lastPurchaseMaterial)){
        dataVar.material = lastPurchaseMaterial.materialId;
        dataVar.avgPrice = lastPurchaseMaterial.avgPrice;
        dataVar.closedQty = lastPurchaseMaterial.closedQtyBalance;
      }

        Dental.Collection.LaboMaterial.direct.update({_id: dataVar.material},{$set:{
          avgPrice: dataVar.avgPrice,
          balanceQty: dataVar.closedQty
        }});

    });

  }); // end defer
});
