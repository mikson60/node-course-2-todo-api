const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var password = 'admin1';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, encrypted) => {
//         console.log(encrypted);
//     });
// });

var encryptedPassword = '$2b$10$aes6EsNMarxYzIsIVpHDH.I40ap4CS5K6D4mpZbiPsbgnKQxoI3ym';

bcrypt.compare(password, encryptedPassword, (err, res) => {
    console.log(res);
});


// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token , '123abc');
// console.log('decoded', decoded);

// var message = 'I am user number 2';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };


// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed');
// }