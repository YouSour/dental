Router.route('dental/laboCustomer', function() {
  this.render('dental_laboCustomer');
}, {
  name: 'dental.laboCustomer',
  title: 'Laboratory Customer',
  header: {
    title: 'Laboratory Customer',
    sub: '',
    icon: 'user'
  },
  breadcrumb: {
    title: 'Laboratory Customer',
    parent: 'dental.home'
  }
});
