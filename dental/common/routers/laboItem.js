Router.route('dental/laboItem', function() {
  this.render('dental_laboItem');
}, {
  name: 'dental.laboItem',
  title: 'Laboratory Item',
  header: {
    title: 'Laboratory Item',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Item',
    parent: 'dental.home'
  }
});
