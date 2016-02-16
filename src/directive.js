cropular.directive('cropular', function() {
    return {
      restrict:'E',
      scope: {
        height:'@',
        imageUrl: '=',
      },
      templateUrl: 'template.html',
      controller:"CropularController",
      controllerAs:"vm"
    };
  });