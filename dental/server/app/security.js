/**
 * Setting
 */
Security.defineMethod("dental_ifSetting", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['setting'], 'Dental');
  }
});

/**
 * Data Insert
 */
Security.defineMethod("dental_ifDataInsert", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['data-insert'], 'Dental');
  }
});

/**
 * Data Update
 */
Security.defineMethod("dental_ifDataUpdate", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['data-update'], 'Dental');
  }
});

/**
 * Data Remove
 */
Security.defineMethod("dental_ifDataRemove", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['data-remove'], 'Dental');
  }
});

/**
 * Data Patient Insert
 */
Security.defineMethod("dental_ifDataPatientInsert", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['data-patient-insert'], 'Dental');
  }
});

/**
 * Reporter
 */
Security.defineMethod("dental_ifReporter", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['reporter'], 'Dental');
  }
});
