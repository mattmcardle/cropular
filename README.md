# cropular
A cropping frontend for AngularJS.

## Installation
### Install With Bower:

    
```
$ bower install cropper
```

Add the script to your HTML:
```html
    <script type="text/javascript" src="/bower_components/cropular/dist/cropular.min.js"></script>
```
If you are using gulp-inject or similar to inject your dependencies to your HTML file, you might need to define angular as a depency for this package in your projects bower.json. This will overcome an issue where the cropular script gets injected before the angularjs script.

Then add cropular to your module depencies:
```javascript  
    angular.module('app', ['cropular'])
```

## Usage
 
 Cropular usage is very simple, it requires you provide 3 properties, the url of the image to be cropped, the crop object, which will hold the details of the crop to be sent to the server, and a crop enabled flag which determines whether or not to display the image in cropping mode. All of these properties have 2 way binding, so if they are updated in the directive, you have access to the changes in your controller, and vice versa. 
 
 After you make the crop call to the server you can update the ```image-url``` property with the new url, or if the url does not change I recommend appending the url with a timestamp to facilitate cache-busting.
    
    <cropular image-url="vm.url" crop-object="vm.cropObject" enable-crop="vm.cropEnabled" my-test="vm.test"></cropular>
    
For further assistance, please check out the example included in this repository.

## Contributing
```
    $ git clone https://github.com/mattmcardle/cropular.git
    $ cd cropular
    $ npm install
    $ gulp watch
```