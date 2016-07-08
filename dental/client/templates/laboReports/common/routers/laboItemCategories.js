Router.route('dental/laboItemCategories', function() {
  this.render('dental_laboItemCategories');
}, {
  name: 'dental.laboItemCategories',
  title: 'Laboratory Item Categories',
  header: {
    title: 'Laboratory Item Categories',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Item Categories',
    parent: 'dental.home'
  }
});
