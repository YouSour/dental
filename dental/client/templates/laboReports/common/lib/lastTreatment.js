// Get last treatment
lastTreatment = function (registerId, activeDate) {
    var getLast;
    var selector = {registerId: registerId};

    if (!_.isUndefined(activeDate)) {
        selector.performDate = {$lte: activeDate};
    }
    getLast = Dental.Collection.Treatment.findOne(selector, {sort: {_id: -1}});

    return getLast;
};

// Get last treatment except id
lastTreatmentExcept = function (registerId, exceptId, activeDate) {
    var getLast;
    var selector = {
        _id: {$ne: exceptId},
        registerId: registerId
    };

    if (!_.isUndefined(activeDate)) {
        selector.performDate = {$lte: activeDate};
    }
    getLast = Dental.Collection.Treatment.findOne(selector, {sort: {_id: -1}});

    return getLast;
};