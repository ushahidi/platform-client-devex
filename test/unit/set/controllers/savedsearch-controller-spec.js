var ROOT_PATH = '../../../../';

describe('set savedsearches controller', function () {

    var $rootScope,
        $scope,
        Notify,
        Session,
        $controller;

    beforeEach(function () {
        require(ROOT_PATH + 'test/unit/mock/mock-modules.js');

        var testApp = angular.module('testApp', [
        'ushahidi.mock'
        ]);

        testApp.controller('savedsearchesController', require(ROOT_PATH + 'app/set/controllers/savedsearches-controller.js'))
        .service('RoleHelper', require(ROOT_PATH + 'app/common/services/role-helper.js'));

        require(ROOT_PATH + 'test/unit/simple-test-app-config')(testApp);

        angular.mock.module('testApp');
    });

    beforeEach(inject(function (_$rootScope_, _$controller_, _Notify_, _Session_) {
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        Notify = _Notify_;
        Session = _Session_;
        $scope = _$rootScope_.$new();

        $rootScope.goBack = function () {};
    }));


    beforeEach(function () {
        spyOn($rootScope, '$emit').and.callThrough();

        $controller('savedsearchesController', {
           $scope: $scope,
           savedSearch: {
              allowed_privileges: 'update'
           },
           $routeParams: {view: 'list'}
        });

        $rootScope.$digest();
        $rootScope.$apply();
    });

    it('should retrieve load and set title', function () {
        expect($rootScope.$emit).toHaveBeenCalled();
    });
   
    it('should save a notification', function () {
        spyOn(Notify, 'showNotificationSlider');
        $scope.saveNotification({id:'pass'});

        expect(Notify.showNotificationSlider).toHaveBeenCalled();
    });

    it('should set teoggle is open', function () {
        $scope.setSavedSearchOpen();
        expect($scope.savedSearchOpen.data).toBe(true);

        $scope.setSavedSearchOpen();
        expect($scope.savedSearchOpen.data).toBe(false);
    });

    it('should return current view', function () {
        var test = $scope.currentView();

        expect(test).toEqual('list');
    });
});
