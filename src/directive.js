cropular.directive('cropular', function() {
    return {
      restrict:'E',
      scope: {
        imageUrl: '=',
        cropObject: '=',
        enableCrop: '='
      },
      templateUrl: 'template.html',
      controller:"CropularController",
    };
  });