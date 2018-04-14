
// never do this at home

function getDevKey(){
        var devKey="d50fdd98d97042b399bc787bbfcdd30d";
    return devKey;
}    

function getBearer(){
  
    var bearer = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsifQ.eyJleHAiOjE1MjM3MDU5NjAsIm5iZiI6MTUyMzcwMjM2MCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5taWNyb3NvZnRvbmxpbmUuY29tL2Q1Zjg1NjgyLWY2N2EtNDQ0NC05MzY5LTJjNWVjMWEwZThjZC92Mi4wLyIsInN1YiI6ImY5MmM2MTUxLWUwYTUtNDUxNy05OGU2LTVhN2MxMTNiNjBmZiIsImF1ZCI6IjQwOTU3YjljLTYzYmMtNGFiNC05ZWNiLTY3YjU0M2M4ZTRjYSIsIm5vbmNlIjoiZGVmYXVsdE5vbmNlIiwiaWF0IjoxNTIzNzAyMzYwLCJhdXRoX3RpbWUiOjE1MjM3MDIzNjAsIm9pZCI6ImY5MmM2MTUxLWUwYTUtNDUxNy05OGU2LTVhN2MxMTNiNjBmZiIsIm5hbWUiOiJzYW11ZWwiLCJmYW1pbHlfbmFtZSI6InRlaXhlaXJhIiwiZ2l2ZW5fbmFtZSI6IlNhbXVlbCIsImVtYWlscyI6WyJzYW11ZWx0ZWl4ZWlyYXNAZ21haWwuY29tIl0sInRmcCI6IkIyQ18xX0JsdWVCYW5rU1VTSSJ9.Nu00lFOrtthJRS922uguP1uubDQbdAyj2IWoib-j0BnVGaj-q3pI7fcO739NBYZ7Si5X3ESfvunjAVsqFZXTEsragqwq7QZkTzWZvkXrk7yE4IEm9xz45zhwDNW-skErUDsp_3Pvufrz7DrbWouTXIoGEVgVK6pxbaP3QqtEDkBWP5bDA26uOUcS56BTI-0WsUrl7UdRmjL1eLrIUrI-0cSIvaEeDsR73zp8LXz9MLf6pdB-rHYYLVV0sxn0f4Xr0eeezFpPd1nibf6g1xfUtUGIZFfOpLySn65BWzzgW5S9nxU33NXjSgORFUV3AzlxhCGGpRYigdIH09PkD5rC8Q";
    return bearer;
}    

// *************************************


var urlBase = "https://bluebank.azure-api.net/api/v0.7";
var debug = true;

/**
 This function will return the account balance in the console.
 params - optional 

*/
function getCurrentAccounBalance(customerId){


    $.ajax({
            url: urlBase + "/customers/" + customerId,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
                xhrObj.setRequestHeader("Authorization",getBearer());
            },
            type: "GET",
        }).done(function(data) {
            if(debug)
                console.log(data);

            //getCustomer(data);

        })
          .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from GET /customers/{id}/accounts");
             console.dir(err);
         });
}

