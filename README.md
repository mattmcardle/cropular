# cropular
A cropping frontend for AngularJS.

## Installation
### Install With Bower:
    bower install cropper
Add the script to your HTML:

    <script type="text/javascript" src="/bower_components/cropular/dist/cropular.min.js"></script>
        
If you are using gulp-inject or similar to inject your dependencies to your HTML file, you might need to define angular as a depency for this package in your projects bower.json. This will overcome an issue where the cropular script gets injected before the angularjs script.

Then add cropular to your module depencies:
    
    angular.module('app', ['cropular'])

 ## Usage
 
 Usage is very simple, it requires you create two methods on your controller: crop and rotate. The crop method will be callled when a user is ready to crop the image to their desired size, it takes 1 parameter which is an object of the cropping details, these details should then be passed to the server to do the actually clipping of the image. Similarly, rotate method will take one paramater, which will be called when the user clicks on one of the rotate buttons, the parameter will be number of degrees the image should be rotated, clockwise. At the moment the rotate method is only called with two values, "90" or "-90". The cropulator directive will also require the url of the image that is to be cropped. All of these properties are to be supplied as below:
    
    <cropular image-url="vm.url" crop-method="vm.crop" rotate-method="vm.rotate"></cropular>
    
For further assistance, please check out the example included in this repository.

## Contributing
    git clone https://github.com/mattmcardle/cropular.git
    cd cropular
    npm install
    gulp watch