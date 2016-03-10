Meteor.methods({
    searchPatient: function (query, options) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        options = options || {};
        // guard against client-side DOS: hard limit to 50
        if (options.limit) {
            options.limit = Math.min(50, Math.abs(options.limit));
        } else {
            options.limit = 50;
        }
        // TODO fix regexp to support multiple tokens
        var regex = new RegExp(query, 'i');
        var products = Dental.Collection.Patient.find({
            $or: [{_id: {$regex: regex}}, {name: {$regex: regex}},{age:{$regex: regex}},{gender:{$regex: regex}}]
        }, options);
        var arr = [];
        products.forEach(function (product) {
            if (product.photo) {

                product.url = Files.findOne(product.photo).url();
            } else {
                product.url = '/no_image.jpg';
            }
            arr.push(product);
        });
        return arr;
    }
    //search: function (collectionName, query, options) {
    //    if (!Meteor.userId()) {
    //        throw new Meteor.Error("not-authorized");
    //    }
    //    collectionName = eval(collectionName);
    //    options = options || {};
    //    // guard against client-side DOS: hard limit to 50
    //    if (options.limit) {
    //        options.limit = Math.min(50, Math.abs(options.limit));
    //    } else {
    //        options.limit = 50;
    //    }
    //    // TODO fix regexp to support multiple tokens
    //    var regex = new RegExp(query, 'i');
    //    return collectionName.find({
    //        $or: [{_id: {$regex: regex}}, {name: {$regex: regex}}]
    //    }, options).fetch();
    //}
});