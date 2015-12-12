Router.route('dental/specialTreatmentReport', function() {
  this.render('dental_specialTreatmentReport');
}, {
  name: 'dental.specialTreatmentReport',
  title: "Treatment List Report",
  header: {
    title: 'Treatment Report',
    sub: '',
    icon: 'file-text-o'
  },
  breadcrumb: {
    title: 'Treatment Report',
    parent: 'dental.home'
  }
});

Router.route('dental/specialTreatmentReportGen', function() {
  // Config layout
  this.layout('reportLayout', {
    // Page size: a4, a5, mini
    // Orientation: portrait, landscape
    // Font size: fontBody: undefined (10px), bg (12px)
    data: {
      pageSize: 'a4',
      orientation: 'portrait',
      fontBody: 'bg'
    }
  });

  var q = this.params.query;
  this.render('dental_specialTreatmentReportGen', {
    data: function() {
      return q;
    }
  });
}, {
  name: 'dental.specialTreatmentReportGen'
});
