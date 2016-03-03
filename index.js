// Require `PhoneNumberFormat`.
var PNF = require('google-libphonenumber').PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

exports.handler = function(event, context) {
  if (typeof event === 'string') {
    event = { phoneNumber: event };
  }

  if (!event.phoneNumber) {
    if (context && typeof context.fail === 'function') {
      context.fail(new Error('Missing phoneNumber'));
    }
    return;
  }

  // Parse number with country code.
  //var phoneNumber = phoneUtil.parse(event.phoneNumber);
  var phoneNumber = phoneUtil.parse(event.phoneNumber, (event.countryCode ? event.countryCode : null));

  if (event.formatter) {

    var gPhoneNumber = (phoneUtil.format(phoneNumber,
          (PNF[event.formatter] ? PNF[event.formatter] : PNF.E164)));
  } else {
    // Print number in the international format.
    var gPhoneNumber = (phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
    // => +1 202-456-1414
  }

  if (context && typeof context.succeed === 'function') {
    context.succeed((gPhoneNumber || event.phoneNumber));
  }
  return (gPhoneNumber || event.phoneNumber);
}
