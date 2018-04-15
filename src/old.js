
function pad(s) { return (s < 10) ? '0' + s : s; }

function convertDate(dateInput) {
   var d = dateInput;
  return d.getFullYear()+"-"+pad(d.getMonth()+1)+pad(d.getDate())+"T00:00:00.000Z";
}

/**
 This function will return the account balance in the console.
 params - optional 

*/
function getCurrentAccounBalance(params){


    $.ajax({
            url: "https://bluebank.azure-api.net/api/v0.6.3/customers?" + $.param(params),beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
                xhrObj.setRequestHeader("bearer",getBearer());
            },
            type: "GET",
        }).done(function(data) {

            getCustomer(data);

        })
          .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from GET /customers/{id}/accounts");
             console.dir(err);
         });
}


function getCustomer(data){

        //Got a customers response
        var customerId=data[0].id;
        console.log("Customer Id: %s",customerId);

         $.ajax({
                url: "https://bluebank.azure-api.net/api/v0.6.3/customers/"+customerId+"/accounts?" + $.param(params),
                beforeSend: function(xhrObj){
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                    xhrObj.setRequestHeader("bearer",bearer);
                },
                type: "GET",
            })
            .done(function(data) {
                //Got customers/{id}/accounts response
                var currentAccountId = getCustomerAccount(data);
                getCurrentAccounBalanceCall(currentAccountId,customerId);

                
               
            })
         .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from GET /customers/{id}/accounts");
             console.dir(err);
         });
}

/**
 This function will call the endpoint to return the account balance in the console.
 params - optional 

*/
function getCurrentAccounBalanceCall(currentAccountId){

     if (currentAccountId!=undefined){
            //Got an /accounts/{id}/transactions response

            var _base_url = "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions?";
            var _filter = "sortOrder=-transactionDateTime&limit=1";
            var _url = _base_url + _filter;
            $.ajax({
                url: "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions?sortOrder=-transactionDateTime&limit=20",
                beforeSend: function(xhrObj){
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                    xhrObj.setRequestHeader("bearer",bearer);
                },
                type: "GET",
            })
            .done(function(data) {
                //Got an accounts/{id}/transactions response
                console.log("Most recent transaction to get the account ballance:")

                //Dump out transactions to the console
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                    }
                    // TODO
                    // we should define a target for this information , can be a db or a id element
                    console.log(element.accountBalance);
                    return element.accountBalance;

                }
            })
            .fail(function(err) {
                //Didn't get an accounts/{id}/transactions response
                console.log("No response from GET /accounts/{id}/transactions");
                console.dir(err);
            });
        }
        else{
            console.log("did not find a current account for customer id %s",customerId);
        }
} 



/**
 Get the last account balance based in the number of months provided 
*/
function getPastAccountBalance(lanstNMonths){
    var today = new Date();
    var filters = [];
    var monthsArray = []; 
    var months = lanstNMonths;
    for (var i = 1; i < months; i++) {
         var pastMonth  = new Date(today.getFullYear(), d.getMonth() - i, 0).getDate();
         monthsArray.push(pad(pastMonth.getMonth() +1));
         filters.push(getMonthFilter(pastMonth.getFullYear(),pastMonth.getMonth()));
    }


    // for each month get the account balance and insert into the db
    for (var i = filters.length - 1; i >= 0; i--) {
        getPastCustomerBalance(filters[i],monthsArray[i]);

    };
}



function getPastCustomerBalance(filter,month){


    $.ajax({
            url: "https://bluebank.azure-api.net/api/v0.6.3/customers?" + $.param(params),beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
                xhrObj.setRequestHeader("bearer",getBearer());
            },
            type: "GET",
        }).done(function(data) {

            getCustomerForPastBalance(data,filter,month);

        })
          .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from GET /customers/{id}/accounts");
             console.dir(err);
         });
}


function getCustomerForPastBalance(data,filter,month){

        //Got a customers response
        var customerId=data[0].id;
        console.log("Customer Id: %s",customerId);

         $.ajax({
                url: "https://bluebank.azure-api.net/api/v0.6.3/customers/"+customerId+"/accounts?" + $.param(params),
                beforeSend: function(xhrObj){
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                    xhrObj.setRequestHeader("bearer",bearer);
                },
                type: "GET",
            })
            .done(function(data) {
                //Got customers/{id}/accounts response
                var currentAccountId = getCustomerAccount(data);
               getAccounBalanceByFilterCall(currentAccountId,filter,month);
               
            })
         .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from GET /customers/{id}/accounts");
             console.dir(err);
         });
}


/**
 This function will call the endpoint to return the account balance for a specific month in the console.
 params - optional 

*/
function getAccounBalanceByFilterCall(currentAccountId,filter,month){

     if (currentAccountId!=undefined){
            //Got an /accounts/{id}/transactions response

            var _base_url = "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions?";
            var _url = _base_url + filter;
            $.ajax({
                url: "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions?sortOrder=-transactionDateTime&limit=20",
                beforeSend: function(xhrObj){
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                    xhrObj.setRequestHeader("bearer",bearer);
                },
                type: "GET",
            })
            .done(function(data) {
                //Got an accounts/{id}/transactions response
                console.log("get last transaction of the month:" + month)

                //Dump out transactions to the console
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                    }
                    // TODO
                    // we should define a target for this information , can be a db or a id element
                    console.log("currentAccountId"+ currentAccountId + "month:" + month + "account balance " + element.accountBalance);
                    return element.accountBalance;

                }
            })
            .fail(function(err) {
                //Didn't get an accounts/{id}/transactions response
                console.log("No response from GET /accounts/{id}/transactions");
                console.dir(err);
            });
        }
        else{
            console.log("did not find a current account for customer id %s",customerId);
        }
} 



/*

    month 0-11
    var _filter = "sortOrder=-transactionDateTime&limit=20";
    var _filter = "filter=transactionAmount.gt.50,transactionDate.lt.2015.01.31";

*/
function getMonthFilter(year,month){

    var lastDayOfMonth = convertDate(new Date(year, month, 0).getDate());
    var filter ="transactionDateTime.lte."+lastDayOfMonth;
        filter += "sortOrder=-transactionDateTime&limit=1";
    return filter;
}



// get the first "Standard Current Account"
function getCustomerAccount(data){

    var currentAccountId;
    for (var account in data) {
        if (data.hasOwnProperty(account)) {
            var element = data[account];
            if (element.accountType=="Standard Current Account"){
                console.log("Found a current account: %s",element.id);
                currentAccountId=element.id;
            }
        }
    }

    return currentAccountId;
}


// -------------------------------------------------


// get all transactions of a month
function  getTransactionsByAccountID(currentAccountId,filter){
    _filter = filter | "";

    if (currentAccountId!=undefined){
            //Got an /accounts/{id}/transactions response

            var _base_url = "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions?";
          

            var _url = _base_url + _filter;
            $.ajax({
                url: "https://bluebank.azure-api.net/api/v0.6.3/accounts/"+currentAccountId+"/transactions?sortOrder=-transactionDateTime&limit=20",
                beforeSend: function(xhrObj){
                    // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",devKey);
                    xhrObj.setRequestHeader("bearer",bearer);
                },
                type: "GET",
            })
            .done(function(data) {
          
                //Dump out transactions to the console
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var element = data[key];
                    }
                    console.log("    %s    Amount=%s    Balance=%s",element.transactionDateTime,element.transactionAmount,element.accountBalance);
                }
            })
            .fail(function(err) {
                //Didn't get an accounts/{id}/transactions response
                console.log("No response from GET /accounts/{id}/transactions");
                console.dir(err);
            });
        }
        else{
            console.log("did not find a current account for customer id %s",customerId);
        }

}



function getCustomers(params){


    $.ajax({
            url: "https://bluebank.azure-api.net/api/v0.6.3/customers?" + $.param(params),beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",getDevKey());
                xhrObj.setRequestHeader("bearer",getBearer());
            },
            type: "GET",
        }).done(function(data) {

            var currentAccountId = f(data);

        })
          .fail(function(err) {
             //Didn't get a customers/{id}/accounts response
             console.log("No response from GET /customers/{id}/accounts");
             console.dir(err);
         });
}





// identify the salary , 
function  getAmountByMonth(month){

    var amounts = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var element = data[key];
        }

        // element is the obj is the field retuned 
        console.log("    %s    Amount=%s    Balance=%s",element.transactionDateTime,element.transactionAmount,element.accountBalance);
        if(element.transactionAmount > 0){
            amounts.push(element.transactionAmount);
        }
        
    }



};

