Template.jsonView.onRendered(function () {
    var self = this;
    self.autorun(function () {
        var json = self.view.lookup('json')();
        var options = self.view.lookup('options')();
        self.$('.json-view').JSONView(json || {}, options || {});
    });
});