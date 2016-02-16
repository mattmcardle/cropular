cropular.directive('cropular', function() {
    return {
      restrict:'E',
      scope: {
        imageUrl: '=',
        cropMethod: '&',
        rotateMethod: '&'
      },
      templateUrl: 'template.html',
      controller:"CropularController",
      controllerAs:"vm"
    };
  });