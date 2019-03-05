angular.module('Search', [])
    .controller("yearselecter",
    function contactListCtrl($scope) {

    var year = new Date().getFullYear();
    var range = ['2562'];
    range.push(year);
    for (var i = 1; i < 20; i++) {
        range.push(year - i);
    }
    $scope.years = range;
});