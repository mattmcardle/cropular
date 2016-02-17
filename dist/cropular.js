/*!
 * cropular
 * https://github.com/mattmcardle/cropper#readme
 * Version: 0.0.2 - 2016-02-17T19:44:31.044Z
 * License: ISC
 */


(function () { 
"use strict";
var cropular = angular.module('cropular', []);
cropular.controller('CropularController', [
    '$scope', '$element', '$timeout', '$filter', '$http', '$q',
    function($scope, $element, $timeout, $filter) {
        var ctrl = this;
        ctrl.canvas = document.getElementById('canvas');
        ctrl.image = document.getElementById('attachment-image');
        ctrl.cropObject = $scope.cropObject;
        ctrl.enableCrop = $scope.enableCrop;
        ctrl.test = $scope.test;
        
		ctrl.rect = {};
		ctrl.mouseX = 0;
		ctrl.mouseY = 0;
		ctrl.closeEnough = 10;
        
		ctrl.dragTL = false;
		ctrl.dragBL = false;
		ctrl.dragTR = false;
		ctrl.dragBR = false;
        
        $element.find('img').bind('load',  function(){
            ctrl.calculateSize();
            ctrl.crop();
        });
        
        ctrl.saveCrop = function() {
            
			$scope.cropObject = {
				'width': ctrl.rect.w,
				'height': ctrl.rect.h,
				'x': ctrl.rect.startX,
				'y': ctrl.rect.startY,
				'clientImageWidth': ctrl.canvas.width,
				'clientImageHeight': ctrl.canvas.height
			};        
		};
        
        ctrl.calculateSize = function(){
			ctrl.canvas.width = ctrl.image.clientWidth;
			ctrl.canvas.height = ctrl.image.clientHeight;
            ctrl.canvasStyle = {'background-image': "url(" + $scope.imageUrl + ")", 'background-size': "contain"};
        };
        
        ctrl.crop = function() {
            ctrl.ctx = ctrl.canvas.getContext('2d');
			ctrl.showCropControls = true;
			ctrl.editOptions = false;

			ctrl.canvas.addEventListener('mousedown', ctrl.mouseDown, false);
			ctrl.canvas.addEventListener('mouseup', ctrl.mouseUp, false);
			ctrl.canvas.addEventListener('mousemove', ctrl.mouseMove, false);
            
			ctrl.rect = {
				startX: ctrl.image.clientWidth / 4,
				startY: ctrl.image.clientHeight / 4,
				w: ctrl.image.clientWidth / 2,
				h: ctrl.image.clientHeight / 2
			};

			ctrl.draw();
            ctrl.saveCrop();
        };
        
        
		ctrl.mouseDown = function(e) {
			var offset = ctrl.getPageTopLeft(ctrl.canvas);
			ctrl.mouseX = e.pageX - offset.left;
			ctrl.mouseY = e.pageY - offset.top;
			// if there isn't a rect yet
			if (ctrl.rect.w === undefined) {
				ctrl.rect.startX = ctrl.mouseY;
				ctrl.rect.startY = ctrl.mouseX;
				ctrl.dragBR = true;
			} else if (ctrl.checkCloseEnough(ctrl.mouseX, ctrl.rect.startX) && ctrl.checkCloseEnough(ctrl.mouseY, ctrl.rect.startY)) {
				// (if any) was clicked
				// if there is, check which corner
				// 4 cases:
				// 1. top left
				ctrl.dragTL = true;
			} else if (ctrl.checkCloseEnough(ctrl.mouseX, ctrl.rect.startX + ctrl.rect.w) && ctrl.checkCloseEnough(ctrl.mouseY, ctrl.rect.startY)) {
				// 2. top right
				ctrl.dragTR = true;
			} else if (ctrl.checkCloseEnough(ctrl.mouseX, ctrl.rect.startX) && ctrl.checkCloseEnough(ctrl.mouseY, ctrl.rect.startY + ctrl.rect.h)) {
				// 3. bottom left
				ctrl.dragBL = true;
			} else if (ctrl.checkCloseEnough(ctrl.mouseX, ctrl.rect.startX + ctrl.rect.w) && ctrl.checkCloseEnough(ctrl.mouseY, ctrl.rect.startY + ctrl.rect.h)) {
				// 4. bottom right
				ctrl.dragBR = true;
			} else {
				// (5.) none of them
				return;
			}
			ctrl.ctx.clearRect(0, 0, ctrl.canvas.width, ctrl.canvas.height);
			ctrl.draw();
		};

		ctrl.checkCloseEnough = function (p1, p2) {
			return Math.abs(p1 - p2) < ctrl.closeEnough;
		};

		ctrl.mouseUp = function () {
            if (ctrl.dragTL || ctrl.dragTR || ctrl.dragBL || ctrl.dragBR) {
                ctrl.saveCrop();
            }
			ctrl.dragTL = ctrl.dragTR = ctrl.dragBL = ctrl.dragBR = false;
		};

		ctrl.getPageTopLeft = function (el) {
			var rect = el.getBoundingClientRect();
			var docEl = document.documentElement;
			return {
				left: rect.left + (window.pageXOffset || docEl.scrollLeft || 0),
				top: rect.top + (window.pageYOffset || docEl.scrollTop || 0)
			};
		};

		ctrl.mouseMove = function (e) {
			var offset = ctrl.getPageTopLeft(ctrl.canvas);
			ctrl.mouseX = e.pageX - offset.left;
			ctrl.mouseY = e.pageY - offset.top;
			if (ctrl.dragTL) {
				ctrl.rect.w += ctrl.rect.startX - ctrl.mouseX;
				ctrl.rect.h += ctrl.rect.startY - ctrl.mouseY;
				ctrl.rect.startX = ctrl.mouseX;
				ctrl.rect.startY = ctrl.mouseY;
			} else if (ctrl.dragTR) {
				ctrl.rect.w = Math.abs(ctrl.rect.startX - ctrl.mouseX);
				ctrl.rect.h += ctrl.rect.startY - ctrl.mouseY;
				ctrl.rect.startY = ctrl.mouseY;
			} else if (ctrl.dragBL) {
				ctrl.rect.w += ctrl.rect.startX - ctrl.mouseX;
				ctrl.rect.h = Math.abs(ctrl.rect.startY - ctrl.mouseY);
				ctrl.rect.startX = ctrl.mouseX;
			} else if (ctrl.dragBR) {
				if (ctrl.mouseX + 50 <= ctrl.rect.startX || ctrl.mouseY + 50 < ctrl.rect.startY) {
				return false;
				}
				ctrl.rect.w = Math.abs(ctrl.rect.startX - ctrl.mouseX);
				ctrl.rect.h = Math.abs(ctrl.rect.startY - ctrl.mouseY);
			}
			ctrl.ctx.clearRect(0, 0, ctrl.canvas.width, ctrl.canvas.height);
			ctrl.draw();
		};

		ctrl.draw = function() {
			if (ctrl.rect.h < 10) {
				ctrl.rect.h = 10;
			} else if (ctrl.rect.w < 10) {
				ctrl.rect.w = 10;
			}

			ctrl.ctx.rect(ctrl.rect.startX, ctrl.rect.startY, ctrl.rect.w, ctrl.rect.h);
			ctrl.ctx.lineWidth = 1;
			ctrl.ctx.strokeStyle = '#cccccc';
			ctrl.ctx.stroke();
			ctrl.drawShadedBoxes();
			ctrl.drawHandles();
		};

		ctrl.drawShadedBoxes = function() {
			ctrl.ctx.globalAlpha = 0.6;
			ctrl.ctx.fillStyle = "#000";
			ctrl.ctx.fillRect(0, 0, ctrl.rect.startX, ctrl.canvas.height);
			ctrl.ctx.fillRect(ctrl.rect.startX + ctrl.rect.w , 0, ctrl.canvas.width - ctrl.rect.startX, ctrl.canvas.height);
			ctrl.ctx.fillRect(ctrl.rect.startX, ctrl.rect.startY + ctrl.rect.h, ctrl.rect.w, ctrl.canvas.height);
			ctrl.ctx.fillRect(ctrl.rect.startX, 0, ctrl.rect.w, ctrl.rect.startY);
		};

		ctrl.drawHandles = function() {
			ctrl.drawCircle(ctrl.rect.startX, ctrl.rect.startY, ctrl.closeEnough);
			ctrl.drawCircle(ctrl.rect.startX + ctrl.rect.w, ctrl.rect.startY, ctrl.closeEnough);
			ctrl.drawCircle(ctrl.rect.startX + ctrl.rect.w, ctrl.rect.startY + ctrl.rect.h, ctrl.closeEnough);
			ctrl.drawCircle(ctrl.rect.startX, ctrl.rect.startY + ctrl.rect.h, ctrl.closeEnough);
		};

		ctrl.drawCircle = function(x, y, radius) {
			ctrl.ctx.fillStyle = "#4cae4c";
			ctrl.ctx.beginPath();
			ctrl.ctx.fillRect(x - (ctrl.closeEnough / 2), y - (ctrl.closeEnough / 2), ctrl.closeEnough, ctrl.closeEnough);
		};
        
    }
]);
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
}());
angular.module("cropular").run(["$templateCache", function($templateCache) {$templateCache.put("template.html","<div class=\"row\"><div class=\"col-md-12\"><img id=\"attachment-image\" ng-bind=\"imageUrl\" style=\"z-index:0;\" ng-src=\"{{imageUrl}}\" ng-show=\"!enableCrop\" class=\"img-responsive\"><canvas id=\"canvas\" ng-show=\"enableCrop\" style=\"background-image: url(\'{{imageUrl}}\'); background-size: contain\"></canvas></div></div>");}]);