
// never do this at home

function getDevKey(){
        var devKey="d50fdd98d97042b399bc787bbfcdd30d";
    return devKey;
}

function getBearer(){

    var bearer = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE1MjM3MjYyMDAsIm5iZiI6MTUyMzcyMjYwMCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6ImY5MmM2MTUxLWUwYTUtNDUxNy05OGU2LTVhN2MxMTNiNjBmZiIsImF1ZCI6IjQwOTU3YjljLTYzYmMtNGFiNC05ZWNiLTY3YjU0M2M4ZTRjYSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNTIzNzIyNjAwLCJhdXRoX3RpbWUiOjE1MjM3MjI2MDAsIm9pZCI6ImY5MmM2MTUxLWUwYTUtNDUxNy05OGU2LTVhN2MxMTNiNjBmZiIsIm5hbWUiOiJzYW11ZWwiLCJmYW1pbHlfbmFtZSI6InRlaXhlaXJhIiwiZ2l2ZW5fbmFtZSI6IlNhbXVlbCIsImVtYWlscyI6WyJzYW11ZWx0ZWl4ZWlyYXNAZ21haWwuY29tIl0sInRmcCI6IkIyQ18xX0JsdWVCYW5rU1VTSSJ9.HXcyiIfp0rHAblz01J82FHhoPO7_Ul3hvn9gSwavP6rHOAMluNVOSPJpf9oMYyI8_Is4JZL2TQz1tBFZhlC6BzBTJ0NU53cG26GaEoPnDHT4zSJgWkoWzwsfgCRlGxi1idw_KFBnkbn-lGFKJlke7kqEt-Ozxl5TY2tKgO4ZpNgyZPIDXsY9mMuAvGleiIUJ1ZSoSUnw8Rr0QH93ihfsJUYlYm509L-uJnu-AvMe8SyoogG6_HvLz2-yF8gEiQ_5UufrWOCcdAMV7vyEFGhkA03AJEhzuO45EcwwMFPa6wsbEgx49y8FaZwHoF5MwujdfhiTp_pkPZetSz8Tvk08iw";
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


