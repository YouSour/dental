// Exchange
Meteor.publish('dental.exchange', function (id) {
    if (this.userId) {
        id = _.isUndefined(id) ? {} : id;
        return Cpanel.Collection.Exchange.find(id);
    }
});
