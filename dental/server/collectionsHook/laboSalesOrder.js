Dental.Collection.LaboSalesOrder.after.insert(function(userId, doc) {

  if (doc.status == "Check-Out") {
    //insert
    Meteor.defer(function() {
      if (!_.isUndefined(doc)) {
        doc.salesOrderDetail.forEach(function(salesOrderObj) {
          var ItemDoc = Dental.Collection.LaboItem.findOne({
            _id: salesOrderObj.itemId
          });
          //loop material on Laboitem
          var qtyReduced = 0;
          ItemDoc.materialMap.forEach(function(m) {
            qtyReduced = salesOrderObj.qty * m.qty;

            //generate Id AverageStockId
            var prefix = stateDental.get('dental');
            var avgStockId = idGenerator.genWithPrefix(Dental.Collection.LaboAverageStock, prefix, 22);

            //check material already exist
            Meteor.subscribe('dental_laboAverageStock');
            var lastSalesOrderMaterial = Dental.Collection.LaboAverageStock.findOne({
              materialId: m.material
            }, {
              sort: {
                stockDate: -1
              }
            });

            //check material have purchase
            var purchaseId;
            if (!_.isUndefined(lastSalesOrderMaterial)) {
              if (!_.isUndefined(lastSalesOrderMaterial.purchaseId)) {
                purchaseId = lastSalesOrderMaterial.purchaseId;
              }
            }

            //check OCqty
            var openingQty = 0;
            var closedQty = 0;

            var avgPrice = 0;
            var totalAmount = 0;
            var amount = 0;
            if (lastSalesOrderMaterial) {
              openingQty = parseFloat(lastSalesOrderMaterial.closedQtyBalance);
              closedQty = parseFloat(lastSalesOrderMaterial.closedQtyBalance - qtyReduced);
              //Note: TotalAmount of material - new amount of material//
              amount = qtyReduced * m.price;
              totalAmount = parseFloat(lastSalesOrderMaterial.totalAmount - amount);
              //======================================================//
              avgPrice = totalAmount / closedQty;
            } else {
              openingQty = openingQty;
              // closedQty = parseFloat("-" + salesOrderObj.qty);
              closedQty = parseFloat("-" + qtyReduced);
              amount = qtyReduced * m.price;
              avgPrice = amount / salesOrderObj.qty;
              totalAmount = parseFloat("-" + amount);
            }

            //insert data
            Dental.Collection.LaboAverageStock.direct.insert({
              _id: avgStockId,
              stockDate: doc.salesOrderDate,
              materialId: m.material,
              qty: qtyReduced,
              price: m.price,
              amount: amount,
              totalAmount: totalAmount,
              avgPrice: avgPrice,
              openingQtyBalance: openingQty,
              closedQtyBalance: closedQty,
              saleOrderId: doc._id,
              lastPurchaseId: purchaseId
            });

            //update avgPrice & balanceQty when insert
            console.log(closedQty);
            Dental.Collection.LaboMaterial.direct.update({_id: m.material},{$set:{
              avgPrice: avgPrice,
              balanceQty: closedQty
            }});

          });
        });
      }
    });
  } // end if status == "Check-Out"

});

//update
Dental.Collection.LaboSalesOrder.after.update(function(userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  var previousData = this.previous;
  if (doc.status == "Check-Out") {

    Meteor.defer(function() {
      if (!_.isUndefined(doc)) {

        //Remove
        Dental.Collection.LaboAverageStock.remove({
          saleOrderId: doc._id
        });

        //Insert
        doc.salesOrderDetail.forEach(function(salesOrderObj) {
          var ItemDoc = Dental.Collection.LaboItem.findOne({
            _id: salesOrderObj.itemId
          });
          //loop material on Laboitem
          var qtyReduced = 0;
          ItemDoc.materialMap.forEach(function(m) {
            qtyReduced = salesOrderObj.qty * m.qty;

            //generate Id AverageStockId
            var prefix = doc.branchId + "-";
            var avgStockId = idGenerator.genWithPrefix(Dental.Collection.LaboAverageStock, prefix, 22);

            //check material already exist
            Meteor.subscribe('dental_laboAverageStock');
            var lastSalesOrderMaterial = Dental.Collection.LaboAverageStock.findOne({
              materialId: m.material
            }, {
              sort: {
                stockDate: -1
              }
            });

            //check material have purchase
            var purchaseId;
            if (!_.isUndefined(lastSalesOrderMaterial)) {
              if (!_.isUndefined(lastSalesOrderMaterial.purchaseId)) {
                purchaseId = lastSalesOrderMaterial.purchaseId;
              }
            }

            //check OCqty
            var openingQty = 0;
            var closedQty = 0;

            var avgPrice = 0;
            var totalAmount = 0;
            var amount = 0;
            if (lastSalesOrderMaterial) {
              openingQty = parseFloat(lastSalesOrderMaterial.closedQtyBalance);
              closedQty = parseFloat(lastSalesOrderMaterial.closedQtyBalance - qtyReduced);
              //Note: TotalAmount of material - new amount of material//
              amount = qtyReduced * m.price;
              totalAmount = parseFloat(lastSalesOrderMaterial.totalAmount - amount);
              //======================================================//
              avgPrice = totalAmount / closedQty;
            } else {
              openingQty = openingQty;
              closedQty = parseFloat("-" + salesOrderObj.qty);
              amount = qtyReduced * m.price;
              avgPrice = amount / salesOrderObj.qty;
              totalAmount = parseFloat("-" + amount);
            }

            //insert data
            Dental.Collection.LaboAverageStock.direct.insert({
              _id: avgStockId,
              stockDate: doc.salesOrderDate,
              materialId: m.material,
              qty: qtyReduced,
              price: m.price,
              amount: amount,
              totalAmount: totalAmount,
              avgPrice: avgPrice,
              openingQtyBalance: openingQty,
              closedQtyBalance: closedQty,
              saleOrderId: doc._id,
              lastPurchaseId: purchaseId
            });

            //update avgPrice & balanceQty when insert
            Dental.Collection.LaboMaterial.direct.update({_id: m.material},{$set:{
              avgPrice: avgPrice,
              balanceQty: closedQty
            }});

            //update material avgPrice & balanceQty when
            previousData.salesOrderDetail.forEach(function (sodObj) {

              var item = Dental.Collection.LaboItem.findOne({
                _id: sodObj.itemId
              });

              item.materialMap.forEach(function (previousObj) {

                if(previousObj.material != m.materialId){
                  var lastPurchaseMaterialDoc = Dental.Collection.LaboAverageStock.findOne({
                    materialId: previousObj.material
                  }, {
                    sort: {
                      stockDate: -1
                    }
                  });

                  var dataVar = {
                    material : previousObj.material,
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

                }// end if

              }); // end item loop

            });// end previousData loop

          });
        });
        // end salesOrderDetail loop
      }
      // end if
    });

  } // end if status == "Check-Out"
});

//remove
Dental.Collection.LaboSalesOrder.after.remove(function(userId, doc) {
  Meteor.defer(function() {

    Dental.Collection.LaboAverageStock.remove({
      saleOrderId: doc._id
    });

    // update avgPrice & balanceQty when remove
    doc.salesOrderDetail.forEach(function (sodObj) {

      var item = Dental.Collection.LaboItem.findOne({
        _id: sodObj.itemId
      });

      item.materialMap.forEach(function (i) {

        var lastPurchaseMaterial = Dental.Collection.LaboAverageStock.findOne({
          materialId: i.material
        }, {
          sort: {
            stockDate: -1
          }
        });

        var dataVar = {
          material : i.material,
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

      });// end item loop

    }); // end doc.salesOrderDetail loop

  });
});
