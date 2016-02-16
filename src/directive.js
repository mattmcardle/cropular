cropular.directive('cropular', function() {
    return {
      restrict:'E',
      scope: {
        height:'@',
        imageUrl: '=',
        cropMethod: '&',
        rotateMethod: '&'
      },
      templateUrl: 'template.html',
      controller:"CropularController",
      controllerAs:"vm"
    };
  });