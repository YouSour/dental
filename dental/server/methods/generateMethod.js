/**
 * Created by piseth on 2/29/16.
 */
//generate id methods
Meteor.methods({
    dental: function (prefix) {
        stateDental = new ReactiveObj({dental: prefix})
    }
});
