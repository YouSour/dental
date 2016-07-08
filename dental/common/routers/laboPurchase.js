Router.route('dental/laboPurchase', function() {
  this.render('dental_laboPurchase');
}, {
  name: 'dental.laboPurchase',
  title: 'Laboratory Purchase',
  header: {
    title: 'Laboratory Purchase',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Purchase',
    parent: 'dental.home'
  }
});
