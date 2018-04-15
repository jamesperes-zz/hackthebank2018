

describe('OAuth2',function(){
    var OAuth = require('oauth');
  
     it('gets bearer token', function(done){
       var OAuth2 = OAuth.OAuth2;    
       var clientId = 'f236fe43-41fd-4687-bcf2-5de2da784eda';


       //clientId, clientSecret, baseSite, authorizePath, accessTokenPath, customHeaders
       var oauth2 = new OAuth2(
        clientId,
         '', 
         'https://login.microsoftonline.com/', 
         'bluebankb2c.onmicrosoft.com/oauth2/v2.0/authorize',
         'bluebankb2c.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1_BlueBankSUSI', 
         '');
       oauth2.getOAuthAccessToken(
            '',
            {
            "grant_type":"authorization_code",
            "scope": "0f7ef810-2f9c-424c-942a-48c6ea361d9a offline_access",
            "redirect_uri":"http://localhost:8080/callback",
            "code": 'eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..FzgUPSdI5OH5J2lO.r103kgCBQEjvG9zWVSEH_tomQNfsFcV4BMaz0lWSlsfiWP3iMgUT6ieLDxAKjtabvcrNWgU8dQ276QC5gUHsawUlwbEy_7MJCOm8rQf3Cv57q1QR2iqk8Ic2DPu3Yc4L7t6xz5BSzfCVbyGwlcY0Xhz-KmRs12562DQ2azHw_yEn6IuXVw_0BJ3I9LfnNTh-tTdgQ9lsLuMDTDvk_jhrWrxD91g2v3hCcJNcfLzrzv2361dwNq-uBR_mxF-aZRerCS86zDNzvQQ5KzMrS6oNxObqF9L_iZyD88Xhro-QJkVNfoTAt8SgwaCKjivy09yea-5Fkjuc_dEyMaAJeP4EvLSiamkVvydoNQcKJ_nfGyHLauObh_2DPro_xY54C-iSOwALY2LZJUdx2XBi82aNitgLIoi_TcKwiwgnsMP-LXAWCzW2YSsnjACjOD5eI2N_3RPlYyq5Lxi5bdGqdMoJXzKoVARr6qbhfwcxDi3uKaGEXV4jdmcMZLP0s6e8-BGkc7suhqXsL1mCNw4QE2H9Q-Bf0D_Wy_tY9l_r7n0Bzu2hT0cIRphr4JenDwG1CO4cUvA5jow.9Px34oySFyMIrtWuonjSlA'
        },
            function (e, access_token, refresh_token, results){
                console.log('e: ',e);    
                console.log('refresh_token: ',refresh_token); 
                console.log('results: ',results); 
                console.log('bearer: ',access_token);
                done();
       });
     });
});