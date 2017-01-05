var app = angular.module('app', ['ngRoute', 'ngResource'])

        .config(['$routeProvider', function ($routerProvider) {
                $routerProvider
                        .when('/home', {
                            templateUrl: 'templates/list.html',
                            controller: 'HomeCtrl'
                        })
                        .when('/edit/:id', {
                            templateUrl: 'templates/edit.html',
                            controller: 'EditCtrl'
                        })
                        .when('/create/', {
                            templateUrl: 'templates/create.html',
                            controller: 'CreateCtrl'
                        })
                        .when('/costos', {
                            templateUrl: 'templates/listCostos.html',
                            controller: 'CostosCtrl'
                        })
                        .when('/addCosto/', {
                            templateUrl: 'templates/addCostos.html',
                            controller: 'AddCostoCtrl'
                        })
                        .when('/view/:id', {
                            templateUrl: 'templates/view.html',
                            controller: 'ViewCtrl'
                        })
                        
                        .when('/addConsumos/', {
                            templateUrl: 'templates/addConsumos.html',
                            controller: 'addConsumos'
                        })
                        .when('/consumos', {
                            templateUrl: 'templates/listConsumos.html',
                            controller: 'ConsumosCtrl'
                        })
                        
                        .otherwise({redirectTo: '/home'});
            }])

        .controller('HomeCtrl', ['$scope', 'Recargas', '$route', function ($scope, Recargas, $route) {
                
                Recargas.get(function (data) {
                    $scope.recargas = data.response;
                })

                $scope.remove = function (id) {
                    Recargas.delete({id: id}).$promise.then(function (data) {
                        if (data.response) {
                            $route.reload();
                        }
                    })
                }
            }])

        .controller('CreateCtrl', ['$scope', 'Recargas', 'Costos', function ($scope, Recargas, Costos) {

                Costos.get(function (data) {
                    $scope.costos = data.response;
                })

                $scope.settings = {
                    pageTitle: "Agregar Recarga",
                    action: "Agregar"
                };

                $scope.recarga = {
                    id: "",
                    numero: "",
                    valor: ""
                };

                $scope.submit = function () {

                    Recargas.save({recarga: $scope.recarga}).$promise.then(function (data) {
                        if (data.response) {
                            angular.copy({}, $scope.recarga);
                            $scope.settings.success = "La recarga ha sido creada correctamente!";
                        }
                    })
                }
            }])

        .controller('EditCtrl', ['$scope', 'Recargas', '$routeParams', function ($scope, Recargas, $routeParams) {
                $scope.settings = {
                    pageTitle: "Editar recarga",
                    action: "Editar"
                };

                var id = $routeParams.id;

                Recargas.get({id: id}, function (data) {
                    $scope.recarga = data.response;
                });

                $scope.submit = function () {
                    Recargas.update({id: id}, {recarga: $scope.recarga}, function (data) {
                        $scope.settings.success = "La recarga ha sido editada correctamente!";
                    });
                }
            }])

        .controller('CostosCtrl', ['$scope', 'Costos', '$route', function ($scope, Costos, $route) {
                Costos.get(function (data) {
                    $scope.costos = data.response;
                })

                $scope.remove = function (id) {
                    Costos.delete({id: id}).$promise.then(function (data) {
                        if (data.response) {
                            $route.reload();
                        }
                    })
                }

                $scope.active = function (id, status) {
                    Costos.update({id: id}, {status: status}).$promise.then(function (data) {
                        if (data.response) {
                            $route.reload();
                        }
                    })
                }

            }])

        .controller('AddCostoCtrl', ['$scope', 'Costos', function ($scope, Costos) {
                $scope.settings = {
                    pageTitle: "Agregar Costo",
                    action: "Agregar"
                };
                $scope.costo = {
                    id: "",
                    costo_seg: ""
                };
                $scope.submit = function () {
                    Costos.save({costo: $scope.costo}).$promise.then(function (data) {
                        if (data.response) {
                            angular.copy({}, $scope.costo);
                            $scope.settings.success = "El costo ha sido creada correctamente!";
                        }
                    })
                }
            }])
        
        /*Consumos*/
        
        .controller('ConsumosCtrl', ['$scope', 'Consumos', '$route','$routeParams', function ($scope, Consumos, $route,$routeParams) {
                
                Consumos.get(function (data) {
                    $scope.consumos = data.response;
                })

                $scope.remove = function (id) {
                    Consumos.delete({id: id}).$promise.then(function (data) {
                        if (data.response) {
                            $route.reload();
                        }
                    })
                }
            }])

        .controller('addConsumos', ['$scope', 'Consumos', function ($scope, Consumos) {
                $scope.settings = {
                    pageTitle: "Agregar Consumo",
                    action: "Agregar"
                };
                $scope.consumo = {
                    id: "",
                    numero_celular: "",
                    consumo_seg: ""
                };
                $scope.submit = function () {
                    Consumos.save({consumo: $scope.consumo}).$promise.then(function (data) {
                        if (data.response) {
                            angular.copy({}, $scope.consumo);
                            $scope.settings.success = "El consumo ha sido agregado correctamente!";
                            $scope.settings.error = "Error inesperado";
                        }
                    })
                }
            }])
        
        /*Fin consumos*/
        
        .controller('ViewCtrl', ['$scope', 'Recargas', 'Consumos', '$routeParams', function ($scope, Recargas, Consumos, $routeParams) {
                var id = $routeParams.id;

                Recargas.get({id: id,numero:"3102487538"}, function (data) {
                    $scope.recarga = data.response;
                });

                Consumos.get({id: id}, function (data) {
                    $scope.consumos = data.response;
                })
            }])

        .factory('Recargas', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/recargas/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])

        .factory('Costos', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/costos/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])
        
        .factory('Consumos', ['$resource', function ($resource) {
                return $resource('http://localhost/apirest/consumos/:id', {id: "@_id"}, {
                    update: {method: "PUT", params: {id: "@_id"}}
                })
            }])

   