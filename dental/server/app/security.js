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
* Labo Setting
*/
Security.defineMethod("dental_ifLaboSetting", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['labo-setting'], 'Dental');
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
* Labo Insert
*/
Security.defineMethod("dental_ifLaboInsert", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['labo-insert'], 'Dental');
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
 * Labo Update
 */
Security.defineMethod("dental_ifLaboUpdate", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['labo-update'], 'Dental');
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
* Labo Remove
*/
Security.defineMethod("dental_ifLaboRemove", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['labo-remove'], 'Dental');
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

/**
 * Labo Reporter
 */
Security.defineMethod("dental_ifLaboReporter", {
  fetch: [],
  transform: null,
  deny: function(type, arg, userId) {
    return !Roles.userIsInRole(userId, ['labo-reporter'], 'Dental');
  }
});
