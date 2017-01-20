// tslint:disable-next-line:no-namespace
declare namespace adal {
    interface AdalAuthenticationServiceProvider {
        init(config: {}, $httpProvider: ng.IHttpProvider): void;
    }
}
