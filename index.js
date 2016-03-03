// Require `PhoneNumberFormat`.
var PNF = require('google-libphonenumber').PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

exports.handler = function(event, context) {
  if (!event.phoneNumber) {
    context.fail(new Error('Missing phoneNumber'));
    return;
  }

  // Parse number with country code.
  //var phoneNumber = phoneUtil.parse(event.phoneNumber);
  var phoneNumber = phoneUtil.parse(event.phoneNumber, (event.countryCode ? event.countryCode : null));

  if (event.formatter) {

    var gPhoneNumber = (phoneUtil.format(phoneNumber,
          (PNF[event.formatter] ? PNF[event.formatter] : PNF.INTERNATIONAL)));
  } else {
    // Print number in the international format.
    var gPhoneNumber = (phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
    // => +1 202-456-1414
  }

  //context.succeed(phoneNumber);
  context.succeed(gPhoneNumber);
  return gPhoneNumber;
}
