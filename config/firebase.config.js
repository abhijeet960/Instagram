const Firebase = require('firebase-admin')
const services = require('../drive-13d1e-firebase-adminsdk-fbsvc-bd2492397f.json')
const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(services),
    storageBucket: 'drive-13d1e.appspot.com'
})