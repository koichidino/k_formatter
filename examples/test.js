var formatter = require('../');

var callback = function() {}

callback.succeed = function(data) {
  console.log(JSON.stringify(data));
}

callback.fail = function(err) {

  console.error(err.message);
}

console.log(formatter.handler('+8860921185084'));
formatter.handler({
  phoneNumber: '886921185084',
  formatter: 'E164', // NATIONAL | E164 | INTERNATIONAL
  countryCode: 'TW'
}, callback)

formatter.handler({
  phoneNumber: '+8860932012553',
  formatter: 'INTERNATIONAL', // NATIONAL | E164 | INTERNATIONAL
  countryCode: 'TW'
}, callback)

formatter.handler({
  phoneNumber: '+8860921185084',
  formatter: 'NATIONAL' // NATIONAL | E164 | INTERNATIONAL
}, callback)

formatter.handler({
  phoneNumber: '0921185508',
  formatter: 'NATIONAL',
  countryCode: 'TW' // If there is no +, add country code
}, callback)

console.log('direct: ' + formatter.handler({
  phoneNumber: '+8613473193861',
  formatter: 'NATIONAL' // NATIONAL | E164 | INTERNATIONAL
}, callback));
