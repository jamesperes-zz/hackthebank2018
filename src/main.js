
// never do this at home

function getDevKey(){
        var devKey="d50fdd98d97042b399bc787bbfcdd30d";
    return devKey;
}    

function getBearer(){
  
    var bearer = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE1MjM3MTE4NjQsIm5iZiI6MTUyMzcwODI2NCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6ImY5MmM2MTUxLWUwYTUtNDUxNy05OGU2LTVhN2MxMTNiNjBmZiIsImF1ZCI6IjQwOTU3YjljLTYzYmMtNGFiNC05ZWNiLTY3YjU0M2M4ZTRjYSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNTIzNzA4MjY0LCJhdXRoX3RpbWUiOjE1MjM3MDgyNjQsIm9pZCI6ImY5MmM2MTUxLWUwYTUtNDUxNy05OGU2LTVhN2MxMTNiNjBmZiIsIm5hbWUiOiJzYW11ZWwiLCJmYW1pbHlfbmFtZSI6InRlaXhlaXJhIiwiZ2l2ZW5fbmFtZSI6IlNhbXVlbCIsImVtYWlscyI6WyJzYW11ZWx0ZWl4ZWlyYXNAZ21haWwuY29tIl0sInRmcCI6IkIyQ18xX0JsdWVCYW5rU1VTSSJ9.DzDwAlPRUGOXtuoC05Px9EDaDCmtRC6Cf-vsKsc8O3vj2W5XuDnzoNz-41EQfJaifmJWxY_DP7s2SE5nni57RtyJBZqrBhlv1LIFRuxlBqgTxQ77JV5topUjVX5f9QvYTH9JhEKcSxFcMw6gEJCSSDT0b4DdFcDBWsoHvrxfYi3nHP1aMKxkwOj3wCL_No2hvbXswS3wcIqgDAJwl0zr64WzIfKX9-1ceel8vGW1H5ENv6gIpyXLBTZw0ytwfdGWXWhQwIyNCk_pbqlPhyJBfBBh2Sw8RnMIdvQk19L3pheqkZqA4IRE84qPcBf_bAjA5ko3Lazs5DXTAiDu86gb8w";
    return bearer;
}    

// *************************************


var urlBase = "https://bluebank.azure-api.net/api/v0.7";
var debug = true;

var sampleAccountId = "3ddc4525-7cb6-4148-af68-690fcb19db7b";

function baseGetCall(url){

    $.ajax({
        url: urlBase + url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
            xhrObj.setRequestHeader("Authorization",getBearer());
        },
        type: "GET",
    }).done(function(data) {
        if(debug)
            console.log(data);
        return data;
    })
      .fail(function(err) {
         //Didn't get a customers/{id}/accounts response
         console.log("No response from "+ urlBase + url);
         console.dir(err);
     });
}

/**
 This function will return the account balance in the console.
 params - optional 

*/
function getCustomerInfo(customerId){
   var retorno =  baseGetCall( "/customers/" + customerId);
   console.log(retorno); 
}

/**
 This last transaction to try do the new rounding transaction

*/
function getCurrentAccounBalanceCall(currentAccountId){

    if (currentAccountId!=undefined){
           //Got an /accounts/{id}/transactions response

           var base_url = urlBase +"/accounts/"+currentAccountId+"/transactions?";
           var filter = "sortOrder=-transactionDateTime&limit=1";
           var _url = base_url + filter;

           var data = baseGetCall(_url);
        
               //Got an accounts/{id}/transactions response
               if(debug)
                    console.log("Most recent transaction to get the account ballance:")

               //Dump out transactions to the console
               for (var key in data) {
                   if (data.hasOwnProperty(key)) {
                       var element = data[key];

                       if(debug)
                            console.log(element[0].accountBalance);
                       return element[0].accountBalance;
                   }
                   

               }
    }
} 

