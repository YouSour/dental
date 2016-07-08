Meteor.methods({
      getRegisterId: function (registerId) {
        return Dental.ListState.get(registerId);
      },
      getTreatmentId: function (treatmentId) {
        return Dental.ListState.get(treatmentId);
      },
      getDepositId: function (depositId) {
        return Dental.ListState.get(depositId);
      },
      getPaymentId: function (paymentId) {
        return Dental.ListState.get(paymentId);
      },
      getSpecialRegisterId: function (specialRegisterId) {
        return Dental.ListState.get(specialRegisterId);
      },
      getSpecialTreatmentId: function (specialTreatmentId) {
        return Dental.ListState.get(specialTreatmentId);
      },
      getSpecialRegisterIdForPayment: function (specialRegisterIdForPayment) {
        return Dental.ListState.get(specialRegisterIdForPayment);
      },
      getQuotationId: function (quotationId) {
        return Dental.ListState.get(quotationId);
      },
      getMaterialCostId: function (materialCostId) {
        return Dental.ListState.get(materialCostId);
      },
      getPurchaseId: function (purchaseId) {
        return Dental.ListState.get(purchaseId);
      },
      getLaboPurchaseId: function (purchaseId) {
        return Dental.ListState.get(purchaseId);
      },
      getLaboSalesOrderId:function (salesOrderId) {
        return Dental.ListState.get(salesOrderId);
      }
});
