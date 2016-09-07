Router.route('dental/laboCustomer', function() {
  this.render('dental_laboCustomer');
}, {
  name: 'dental.laboCustomer',
  title: 'Laboratory Doctor',
  header: {
    title: 'Laboratory Doctor',
    sub: '',
    icon: 'user'
  },
  breadcrumb: {
    title: 'Laboratory Doctor',
    parent: 'dental.home'
  }
});
