cropular.directive('cropular', function() {
    return {
      restrict:'E',
      scope: {
        imageUrl: '=imageUrl',
        cropObject: '=cropObject',
        enableCrop: '=enableCrop'
      },
      templateUrl: 'template.html',
      controller:"CropularController",
    };
  });