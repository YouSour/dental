/**
 * Index
 */
Template.dental_laboItem.onRendered(function () {
    //Subscribe
    Meteor.subscribe('dental_laboUnit');
    Meteor.subscribe('dental_laboItemCategories');
    Meteor.subscribe('dental_laboMaterial');
    Meteor.subscribe('dental_laboDepartment');
    // Create new  alertify
    createNewAlertify(["laboItem","laboItemCategories","laboUnit"]);
});

Template.dental_laboItem.events({
    'click .insert': function (e, t) {
        alertify.laboItem(fa("plus", "Laboratory Item"), renderTemplate(Template.dental_laboItemInsert)).maximize();
    },
    'click .update': function (e, t) {
        var data = this;
        alertify.laboItem(fa("pencil", "Laboratory Item"), renderTemplate(Template.dental_laboItemUpdate, data)).maximize();
    },
    'click .remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Laboratory Item"),
            "Are you sure to delete [" + self._id + "] ?",
            function (closeEvent) {
                Dental.Collection.LaboItem.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            }, null
        );
    },
    'click .show': function (e, t) {
        var data = this;
        alertify.laboItem(fa("eye", "Laboratory Item"), renderTemplate(Template.dental_laboItemShow, data));
    }
});

Template.dental_laboItemShow.helpers({
  materialMapFormat: function () {
      var materialMap = "<ul>";
      var data = this.materialMap;
      data.forEach(function (obj) {
          materialMap +=
              "<li>" + 'Material: ' + obj.material + ' | Qty: ' + obj.qty +'</li>';
      });
      materialMap += '</ul>';

      return new Spacebars.SafeString(materialMap);
  },
  departmentMapFormat: function () {
      var departmentMap = "<ul>";
      var data = this.departmentMap;
      data.forEach(function (obj) {
          departmentMap +=
              "<li>" + 'Department: ' + obj.department + ' | Qty: ' + obj.price +'</li>';
      });
      departmentMap += '</ul>';

      return new Spacebars.SafeString(departmentMap);
  },
});
/**
 * Insert
 */
 Template.dental_laboItemInsert.events({
     'click .laboUnitAddon': function (e, t) {
         alertify.laboUnit(fa("plus", "Laboratory Unit"),
             renderTemplate(Template.dental_laboUnitInsert));
     },
     'click .laboItemCategoriesAddon': function (e, t) {
         alertify.laboItemCategories(fa("plus", "Laboratory Item Categories"),
             renderTemplate(Template.dental_laboItemCategoriesInsert));
     }
 });

/**
 * Update
 */
 Template.dental_laboItemUpdate.events({
   'click .laboUnitAddon': function (e, t) {
       alertify.laboUnit(fa("plus", "Laboratory Unit"),
           renderTemplate(Template.dental_laboUnitInsert));
   },
   'click .laboItemCategoriesAddon': function (e, t) {
       alertify.laboItemCategories(fa("plus", "Laboratory Item Categories"),
           renderTemplate(Template.dental_laboItemCategoriesInsert));
   }
 });

 /**
  * MaterialMap Events
  */
 Template.customObjectFieldForMaterialMap.events({
   'change .material': function(e) {
     var arr = [];
     $('.materialItem .material').each(function() {
       var material = $(this).val();
       if(material != ""){
       arr.push(material);
       }
     });

     if(hasDuplicate(arr)){
       var thisObj = $(e.currentTarget);
       var qty = thisObj.parents('div.array-item').find('.qty').val('');
       var price = thisObj.parents('div.array-item').find('.price').val('')
       alertify.error("Sorry , Duplicate Material !");
     }else{
       onChangeMaterial(e);
     }
   },
 });

 /**
  * DepartmentMap Events
  */
 Template.customObjectFieldForDepartmentMap.events({
   'change .department': function(e) {
     var arr = [];
     $('.departments .department').each(function() {
       var department = $(this).val();
       if(department != ""){
       arr.push(department);
       }
     });

     if(hasDuplicate(arr)){
       var thisObj = $(e.currentTarget);
       var price = thisObj.parents('div.array-item').find('.price').val('');
       alertify.error("Sorry , Duplicate Department !");
     }
   }
 });

 /**
  * onChange material
  */
 function onChangeMaterial(e) {
   var thisObj = $(e.currentTarget);
   var materialId = $(e.currentTarget).val();

   var qty, price;

   if (materialId != "" && price != 0 && qty != 0) {
     var matrailDoc = Dental.Collection.LaboMaterial.findOne({
       _id: materialId
     });

     qty = 1;
     price = math.round(matrailDoc.price, 2);
   }

   thisObj.parents('div.array-item').find('.qty').val(qty);
   thisObj.parents('div.array-item').find('.price').val(price);
 }

/**
 * Hook
 */
AutoForm.hooks({
    dental_laboItemInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                var prefix = doc.branchId + '-';
                Meteor.call('dental', prefix);
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            $('select').each(function(){
                $(this).select2("val","");
            });

            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
  dental_laboItemUpdate: {
        onSuccess: function (formType, result) {
            alertify.laboItem().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// check array material duplicate
function hasDuplicate(arr) {
  return (arr.length != _.uniq(arr).length);
}
