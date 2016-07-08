Router.route('dental/patientHistoryListReport', function() {
  this.render('dental_patientHistoryListReport');
}, {
  name: 'dental.patientHistoryListReport',
  title: "Patient History List Report",
  header: {
    title: 'Patient History Report',
    sub: '',
    icon: 'file-text-o'
  },
  breadcrumb: {
    title: 'Patient History Report',
    parent: 'dental.home'
  }
});

Router.route('dental/patientHistoryListReportGen', function() {
  // Config layout
  this.layout('reportLayout', {
    // Page size: a4, a5, mini
    // Orientation: portrait, landscape
    // Font size: fontBody: undefined (10px), bg (12px)
    data: {
      pageSize: 'a4',
      orientation: 'landscape',
      fontBody: 'bg'
    }
  });

  var q = this.params.query;
  this.render('dental_patientHistoryListReportGen', {
    data: function() {
      return q;
    }
  });
});
