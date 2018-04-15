var express = require('express')
var $ = require("jquery");
var cookieParser = require('cookie-parser');
var jsdom = require('jsdom/lib/old-api');
var bodyParser = require('body-parser');
var request = require('request');
var bunyan = require('bunyan');
var app = express();
var passport = require('passport');
var router = express.Router();
var config = require('./config');
var util = require('util');
var methodOverride = require('method-override');
var expressSession = require('express-session');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;


var log = bunyan.createLogger({
    name: 'Application'
});

/******************************************************************************
 * Set up passport in the app 
 ******************************************************************************/

//-----------------------------------------------------------------------------
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.  Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
//-----------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
    done(null, user.oid);
  });
  
  passport.deserializeUser(function(oid, done) {
    findByOid(oid, function (err, user) {
      done(err, user);
    });
  });
  
  // array to hold logged in users
  var users = [];
  
  var findByOid = function(oid, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
     log.info('we are using user: ', user);
      if (user.oid === oid) {
        return fn(null, user);
      }
    }
    return fn(null, null);
  };
  
  //-----------------------------------------------------------------------------
  // Use the OIDCStrategy within Passport.
  // 
  // Strategies in passport require a `verify` function, which accepts credentials
  // (in this case, the `oid` claim in id_token), and invoke a callback to find
  // the corresponding user object.
  // 
  // The following are the accepted prototypes for the `verify` function
  // (1) function(iss, sub, done)
  // (2) function(iss, sub, profile, done)
  // (3) function(iss, sub, profile, access_token, refresh_token, done)
  // (4) function(iss, sub, profile, access_token, refresh_token, params, done)
  // (5) function(iss, sub, profile, jwtClaims, access_token, refresh_token, params, done)
  // (6) prototype (1)-(5) with an additional `req` parameter as the first parameter
  //
  // To do prototype (6), passReqToCallback must be set to true in the config.
  //-----------------------------------------------------------------------------
  passport.use(new OIDCStrategy({
      identityMetadata: config.creds.identityMetadata,
      clientID: config.creds.clientID,
      responseType: config.creds.responseType,
      responseMode: config.creds.responseMode,
      redirectUrl: config.creds.redirectUrl,
      allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
      clientSecret: config.creds.clientSecret,
      validateIssuer: config.creds.validateIssuer,
      isB2C: config.creds.isB2C,
      issuer: config.creds.issuer,
      passReqToCallback: config.creds.passReqToCallback,
      scope: config.creds.scope,
      loggingLevel: config.creds.loggingLevel,
      nonceLifetime: config.creds.nonceLifetime,
      nonceMaxAmount: config.creds.nonceMaxAmount,
      useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
      cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
      clockSkew: config.creds.clockSkew,
      p: "B2C_1_BlueBankSUSI"
    },
    function(iss, sub, profile, accessToken, refreshToken, done) {
      if (!profile.oid) {
        return done(new Error("No oid found"), null);
      }
      // asynchronous verification, for effect...
      process.nextTick(function () {
        findByOid(profile.oid, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            // "Auto-registration"
            users.push(profile);
            return done(null, profile);
          }
          return done(null, user);
        });
      });
    }
  ));


// Middle Route 
//app.use(express.logger());
app.use(methodOverride());
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended : true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


router.use(function (req, res, next) {
    // do logging 
    // do authentication 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Ocp-Apim-Subscription-Key');

    next(); // make sure we go to the next routes and don't stop here
});

var globalRequest;

function getDevKey(){
    var devKey="d50fdd98d97042b399bc787bbfcdd30d";
return devKey;
}

var globalBearer = "";

function getBearer(){

    var bearer = "Bearer "+ globalBearer;
    return bearer;
}

// *************************************

var $;
var urlBase = "https://bluebank.azure-api.net/api/v0.7";
var urlPaymentBase = "https://bluebank.azure-api.net/v0.71/api";
var debug = true;



/**
* group account
* 
* Account Id 7085edd5-eb78-4945-b0bb-1770a24ea8a7
Account Type savings
Sort Code 839999
Account Number 10002358
Balance 100
Account Friendly name group account - 001
Linked Customer id f92c6151-e0a5-4517-98e6-5a7c113b60ff
* 
* 
*/

/**
*  saving account
* 
* Account Id a90c07ca-3d60-4aae-b8ff-387d82a9d54a
Account Type savings
Sort Code 839999
Account Number 10002355
Balance 110.2
Account Friendly name samuel saving account
Linked Customer id f92c6151-e0a5-4517-98e6-5a7c113b60ff
*/

var savingAccount = {
accountId:"a90c07ca-3d60-4aae-b8ff-387d82a9d54a", 
sortCode:"839999",
accountNumber:"10002355"
};

var sampleAccountId = "3ddc4525-7cb6-4148-af68-690fcb19db7b";


function onError(err){
    console.log(err);
}
  

function baseGetCall(url,success,error,callback) {
    
    var html = '<html><body></body></html>';
  
    jsdom.env({
      html: html,
      scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.js'],
      done: function callId(err, window) {
        var $ = window.jQuery;
        $.ajax({
          async: true,
          crossDomain: true,
          url: urlBase + url,
          beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
            xhrObj.setRequestHeader("Authorization",getBearer());
        },
        type: "GET",
        }).done(function(data) {
            if(debug)
                console.log("*** Response ***");
                console.log(data);
     
             success(data,callback);
        })
          .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from "+ urlBase + url);
             console.dir(err);
             error(err);
         });
      }
    });
}

process.on('uncaughtException', function (error) {
    console.log("deu erro ***************")
    console.log(error);
});



 
/** Return the account info **/
function getAccountInfo(accountId,callback){
    baseGetCall( "/accounts/" + accountId, onGetAccountInfo, onError, callback);
 }

 /** account info  callback **/
function onGetAccountInfo(accountInfo,callback){
    console.log("onGetAccountInfo");
    console.log(accountInfo);
    callback(accountInfo);
}

/**
 * 
 * @param {*} accountId 
 */
function startSendSaving(accountId){
    getAccountInfo(accountId,processSendSaving);
}
/**
 * 
 * @param {accountInfoData} data 
 */
function processSendSaving(data){
    console.log("processSendSaving");
    console.log(data);
    
    if(data != undefined){
        sendFromSavingToGroupAccount(data.id,
            savingAccount.sortCode,savingAccount.accountNumber,
            data.accountBalance,"GBP");

    } 
    else 
      console.log("error processSendSaving");
}



function sendFromSavingToGroupAccount(fromAccountId,sortCode,accountNumber,amount,currency){
    console.log("sendFromSavingToGroupAccount");
    
    /**
         * "paymentType": "XFR",
     "fromAccountId": "49ae978c-b342-4307-be12-8b7d0f7c15cc",
    "toSortCode": "83-99-99",
    "toAccountNumber": "00001234",
    "paymentReference": "College Fund",
    "paymentAmount": 600.1,
    "paymentCurrency": "GBP"
    */

    var paymentObj = {
        paymentType:"XFR", 
        fromAccountId:fromAccountId,
        toSortCode:sortCode,
        toAccountNumber:accountNumber,
        paymentReference:"saving",
        paymentAmount:amount,
        paymentCurrency:currency
    };
  
    var body = JSON.stringify(paymentObj);
    var url = "/Payments";
    console.log(body);
    console.log(isFunction(doPayment));
    console.log(isFunction(basePostCall));
    console.log("call payments");

    
    // TODO PQ NAO TA CHAMANDO
    basePostCall(url,body,paymentOK,onError);

    console.log("chamou");
}



function basePostCall(url,_body,success,error) {

    console.log('basePostCall');
    
    var optionsPost = {
        url: urlPaymentBase + url,
        method: 'POST',
        headers: {
          "Ocp-Apim-Subscription-Key":getDevKey(),
          "Authorization":getBearer(),
          "Content-Type":"application/json"
        },
        body: _body
       
    };

    request(optionsPost, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            // Print out the response body
            console.log(body);
        } else {
            onError(error);
        }
    });
}

app.get('/', function (req, res) {

    res.send('Hello World')
})

app.get('/error', function (req, res) {
    if(res["socket"]["parser"]["incoming"]["body"]["id_token"] != undefined ){
        globalBearer = res["socket"]["parser"]["incoming"]["body"]["id_token"];
        res.redirect('/welcome');
    }

    res.send('error')
})

app.get('/welcome',  function (req, res) {
    res.send('welcome')
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  };

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.get('/callback',
  function(req, res, next) {
    if(res["socket"]["parser"]["incoming"]["body"]["id_token"] != undefined ){
        globalBearer = res["socket"]["parser"]["incoming"]["body"]["id_token"];
        res.redirect('/welcome');
    } else {
        console.log(res);
        res.redirect('/error');    
    }
  },
  function(req, res) {
    log.info('We received a return from AzureAD.');
    res.redirect('/');
  });

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
 app.post('/callback',
   function(req, res, next) {
     if(req.body.id_token != undefined ){
         globalBearer = req.body.id_token;
         res.redirect('/welcome');
     } else {
         res.redirect('/error');    
     }
   },
   function(req, res) {
     console.log('We received a return from AzureAD.');
     res.redirect('/welcome');
   });

 

app.get('/loginApp',
  function(req, res) {
    res.redirect('/login?p=B2C_1_BlueBankSUSI');
});


app.get('/login',
  function(req, res, next) {

     passport.authenticate('azuread-openidconnect', 
       { 
         response: res,                      // required
         failureRedirect: '/error' 
       }
    )(req, res, next);
  },
  function(req, res) {
    log.info('Login was called in the Sample');
    res.redirect('/welcome');
});

app.get('/sendMoney', function (req, res) {

    startSendSaving('3ddc4525-7cb6-4148-af68-690fcb19db7b',res);
        // maybe dont need this
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.send('sent to payment');
})

app.listen(8080)