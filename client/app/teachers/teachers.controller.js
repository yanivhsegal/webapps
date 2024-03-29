'use strict';

angular.module('classify').controller('TeachersController', function($scope, $mdEditDialog, teachers, $teachers, $q, $mdDialog,$mdToast) {
    $scope.items = teachers;
    $scope.selected = [];

    $scope.query = {
        sort: 'first_name',
        limit: 5,
        page: 1
    };
    $scope.onFilter = function () {
        $scope.query.page = 1;
        return $scope.getItems();
    };

    $scope.clearFilter = function (name) {
        _.set($scope.query, name, '');
        return $scope.getItems();
    };

    $scope.getItems = function () {
        $scope.promise = $teachers.paginate($scope.query).$promise.then(function (items) {
            $scope.selected = [];
            $scope.items = items;
        });
    };

    $scope.onOrderChange = function (sort) {
        $scope.query.sort = sort;
        return $scope.getItems();
    };

    $scope.deleteItems = function () {
        $q.all(_.map($scope.selected, function (item) {
            return $teachers.delete({}, item).$promise;
        }))
        .then(function () {
            $scope.getItems();
            $mdToast.showSimple('Teacher deleted successfully');
        });
    };

    $scope.addItem = function (ev) {
        $mdDialog.show({
            controller: 'AddTeacher',
            templateUrl: 'app/teachers/new-teacher/new-teacher.html',
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (teacher) {
                return $teachers.save(teacher).$promise;
            })
            .then(function () {
                $scope.getItems();
                $mdToast.showSimple('Teacher  added successfully');
            })
            .catch(function (err) {
                if (err) $mdToast.showSimple('Error adding teacher');
            });
    };

    $scope.changeRole = function (teacher) {
        return $teachers.update({}, teacher).$promise
            .then(function () {
                $mdToast.showSimple('Teacher role changed successfully');
            })
            .catch(function (err) {
                $mdToast.showSimple('Error changing teacher role');
            });
    };
});