
// never do this at home

function getDevKey(){
        var devKey="ef5b4bba1c104b7598075bc936746a88";
        //"d50fdd98d97042b399bc787bbfcdd30d";


    return devKey;
}

function getBearer(){

    var bearer = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE1MjM3OTEyMDAsIm5iZiI6MTUyMzc4NzYwMCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6ImMwZDgxMjdiLThmNTQtNGU0OC1iNjQxLTVkYjQ0NGQ5MDQ0YiIsImF1ZCI6IjQwOTU3YjljLTYzYmMtNGFiNC05ZWNiLTY3YjU0M2M4ZTRjYSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNTIzNzg3NjAwLCJhdXRoX3RpbWUiOjE1MjM3ODc2MDAsIm9pZCI6ImMwZDgxMjdiLThmNTQtNGU0OC1iNjQxLTVkYjQ0NGQ5MDQ0YiIsIm5hbWUiOiJSYWZhZWwgU2FudGlhZ28iLCJmYW1pbHlfbmFtZSI6IlNhbnRpYWdvIiwiZ2l2ZW5fbmFtZSI6IlJhZmFlbCIsImVtYWlscyI6WyJybXhzYW50aWFnb0BnbWFpbC5jb20iXSwidGZwIjoiQjJDXzFfQmx1ZUJhbmtTVVNJIn0.qdA7ewkKVASyL4OvAiHAQH2mFUqKsbu8IqRSxQOTTA51WUCMHPBt5ZOJmTJfybEEnf-74xeh3ou_JqHIe4r1UtJWXO-oKhNMiMUx8PyU6ICHFAHTDGcAm0ppBsqKH6cRvz_LR2ERa1bgkgLt8z1BltPeODiR9ZbuuNb9T_vxBxvyzhM2yE-dbGdVKLT2G8ARjqWPpgZCT1fhldjJF6yVF-bFiPaehstWYh0S9ot1PhNdoo68LbsOIKJ7QrLljMfNcblZaIq_zwoTqaCe5yoTGdb6i76D5TMJbkGUiyws0-mSOd9gAaZekPOuhVE1p4_LgW3iPn1j8m7CwT64xbtLEw";
    return bearer;
}

// *************************************


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

/** Base Http GET calls **/
function baseGetCall(url,success,error,callback){
  console.log("*** Request ***")
  console.log("URL" + urlBase + url);

  $.ajax({
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

exports.basePostCall = function basePostCall(url,body,success,error){

    alert("base");
    $.ajax({
        url: urlPaymentBase + url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Authorization",getBearer());
        },
        type: "POST",
        // Request body
        data: body,
    }).done(function(data) {
        alert("ok");
        alert(data);
        success(data);
        if(debug)
            console.log(data);
    })
      .fail(function(err) {
         //Didn't get a customers/{id}/accounts response
         console.log("No response from "+ urlPaymentBase + url);
         console.dir(err);
         alert(err);
         error(err);
     });
}



/**
 This function will return the account balance in the console.
 params - optional

*/
function getCustomerInfo(customerId){
   baseGetCall( "/customers/" + customerId, onCustomerInfo, onError);
}

/** Customer Info Callback **/
function onCustomerInfo(customerInfo){
  return customerInfo;
}

/** Return the current balance from an specific account **/
function getAccountBalance(accountId){
   baseGetCall( "/accounts/" + accountId, onGetAccountBalance, onError);
}


/** Balance callback **/
function onGetAccountBalance(accountInfo){
  console.log(accountInfo.accountBalance);
  return accountInfo.accountBalance;
}

/** Return the account info **/
function getAccountInfo(accountId,callback){
    baseGetCall( "/accounts/" + accountId, onGetAccountInfo, onError, callback);
 }

 /** account info  callback **/
function onGetAccountInfo(accountInfo,callback){

    console.log(accountInfo);

    if(callback != undefined)
      callback(accountInfo);
    else
      return accountInfo;

}

function checkData(callback, data){
  if(callback != undefined){
    console.log("checkData() - calling callback");
    callback(data);
  }else{
    console.log("checkData() - returning data");
    return data;
  }
}

function getAccountTransactions(accountId){
   baseGetCall( "/accounts/" + accountId + "/transactions", onGetTransactions, onError);
}

function onGetTransactions(transactions){
  return checkData(undefined, transactions);
}



function getAccountTransactions(accountId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
         url: urlBase + "/accounts/" + accountId + "/transactions",
         beforeSend: function(xhrObj){
             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
             xhrObj.setRequestHeader("Authorization",getBearer());
         },
         type: "GET",
    }).done(function(data) {
         if(debug)
             console.log("*** Response ***");
             console.log(data);

          resolve(data);
     })
       .fail(function(err) {
          //Didn't get a customers/{id}/accounts response
          //console.log("No response from "+ urlBase + url);
          console.error(err);
          reject(err);
      });
  });
}

function checkBid(accountId, clientAccountId){
  getAccountTransactions(accountId)
  .then(function(transactions) {
    console.log('Success:');
    console.log(transactons);

    var dictTransactions = filterTransactions(transactions);
    var client = dictTransactions[clientAccountId];

    var array = $.map(dictTransactions, function(value, index) {
      return [value];
    });

    array.sort(function(first, second){
      return first.transactionAmount < second.transactionAmount;
    });

    return array.indexOf(client);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  })
}

function filterTransactions(transactions){
  var dict = {};
  transactions.results.forEach(function(element) {
    var myRegexp = /\d{8}/g;
    var string = element.transactionDescription;
    var match = myRegexp.exec(string);
    if(match != null){
      var userAccount = match[0];
      if(dict[userAccount] != undefined){
        var oldBalance = dict[userAccount].transactionAmount
        var newValue = element.transactionAmount
        dict[userAccount].transactionAmount = parseFloat(oldBalance) + parseFloat(newValue);
      }else{
        dict[userAccount] = element;
      }
    }
  });
  return dict;
}



/**
 This last transaction to try do the new rounding transaction
*/
function getLastTransaction(currentAccountId){

    if (currentAccountId!=undefined){
           //Got an /accounts/{id}/transactions response

           var base_url = "/accounts/"+currentAccountId+"/transactions?";
           var filter = "sortOrder=-transactionDateTime&limit=1";
           var _url = base_url + filter;

           baseGetCall(_url,createPaymentComplement,onError);
    }
}

function createPaymentComplement(data){
    console.log(data);

    if(debug)
        console.log("Most recent transaction to get the complement")

    //Dump out transactions to the console
    for (var key in data) {
    if (data.hasOwnProperty(key)) {
        var element = data[key];

        if(debug)
            console.log(element[0]);
        // last transacton

    }


    }
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

    console.log(data);

    if(data != undefined){
        sendFromSavingToGroupAccount(data.id,
            savingAccount.sortCode,savingAccount.accountNumber,
            data.accountBalance,"EUR");

    }
    else
      console.log("error processSendSaving");
}

function sendFromSavingToGroupAccount(fromAccountId,sortCode,accountNumber,amount,currency){

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
    basePostCall(url,body,paymentOK,onError);

}

function paymentOK(data){
    console.log(data);
}


function returnDataFunction(data){
    console.log(data);
}
