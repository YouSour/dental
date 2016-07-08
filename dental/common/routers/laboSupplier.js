Router.route('dental/laboSupplier', function() {
  this.render('dental_laboSupplier');
}, {
  name: "dental.laboSupplier",
  title: "Laboratory Supplier",
  header: {
    title: "Laboratory Supplier",
    sub: "",
    icon: "fa fa-truck"
  },
  breadcrumb: {
    title: 'Laboratory Supplier',
    parent: 'dental.home'
  }
});
