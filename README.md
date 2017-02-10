# Application to demo endless ADAL redirects

Reproducable testcase for issue AzureAD/azure-activedirectory-library-for-js#463

Steps te reproduce:
```
npm install
node_modules/.bin/gulp
```

* This will open a browser to http://localhost:3000
* The default route is protected so you are redirected to azure AD
* Login with username `okay@wilfredvanderdeijl.onmicrosoft.com` and password `Qabu3960Zupa8695` to get a succesful login
* You are redirected back to the localhost application and all userInfo is shown
* Close browser and visit page again
* Login with username `notokay@wilfredvanderdeijl.onmicrosoft.com` and password `Zupa8695Qabu3960`
* This is a valid username/password but the application has `User assignment required` enabled
  in Azure AD and this notokay user is not authorized for this application.
* The user is redirected to the application with an error code
* The appliation fails to detect this error code and fire any event listener to redirect
  to a unauthroized page. Instead it triggers the login flow again. When using identity federation
  to an on-premise secure token server this doesn't even ask for new credentials and immediately logs
  the user in with the same credentials, redirecting the user back to the application with a unauthorized
  error. This triggers and endless loop when using on-premise identity federation
* We can't find a way in this application to detect the unauthorized error
