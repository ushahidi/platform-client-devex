module.exports = [
    '$scope',
    '$translate',
    '$rootScope',
    '$location',
    'RoleEndpoint',
    'PermissionEndpoint',
function (
    $scope,
    $translate,
    $rootScope,
    $location,
    RoleEndpoint,
    PermissionEndpoint
) {
	
    // Redirect to home if not authorized
    if ($rootScope.hasManageSettingsPermission() == false) {
        return $location.path("/");
    }
	
    $translate('tool.manage_roles').then(function (title) {
        $scope.title = title;
        $scope.$emit('setPageTitle', title);
    });
    // Change mode
    $scope.$emit('event:mode:change', 'settings');

}];
