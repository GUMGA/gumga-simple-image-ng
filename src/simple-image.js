
import simpleCropTemplate from './simple-image-crop.template.js'
import simpleCropController from './simple-image-crop.controller.js'

import simpleImageTemplate from './simple-image.template.js'

import takePictureModalController from './tack-picture.controller.js'
import takePictureTemplate from './tack-picture.template.js'

function simpleImage($timeout, $uibModal, $http, $rootScope, $element, $scope) {
    var ctrl = this, inputFile;


    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    ctrl.buttonText = ctrl.buttonText || 'Alterar Foto';
    ctrl.buttonChangeText = ctrl.buttonChangeText || 'Carregar Foto';
    ctrl.buttonCaptureText = ctrl.buttonCaptureText || 'Tirar Foto';
    ctrl.buttonRemoveText = ctrl.buttonRemoveText || 'Remover Foto';
    ctrl.typeThumbnail = ctrl.typeThumbnail || 'circle';

    var getPictureDefault = () => {
        return ctrl.defaultPicture || 'resources/images/user-not-image.png';
    }

    var setPictureURLByPicture = (picture, ignoreSave) => {
      $timeout(function(){
        if(ctrl.ngModel){
            if (typeof ctrl.ngModel === 'string' && ctrl.isUrl(ctrl.ngModel)) {
	            ctrl.user.pictureURL = ctrl.ngModel;
            } else {
	            ctrl.user.pictureURL = 'data:' + ctrl.ngModel.mimeType + ';base64,' + ctrl.ngModel.bytes;
            }
        }else{
          ctrl.user.pictureURL = getPictureDefault();
        }
      })
      if(!ignoreSave)
        savePicture();
    }

	ctrl.isUrl = url => {
		return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
	}

    var savePicture = function(){
      ctrl.ngModel = ctrl.user.picture;
    }

    $timeout(function(){
      inputFile = $element.find('input')[0]

      inputFile.onchange = function(event) {
          var elm = event.srcElement || event.target;
          if(elm.files.length == 0) return;
          var file = elm.files[0];
          if(file){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(evt) {
              var data = evt.target.result;
              ctrl.openModalCropImage(data);
            };
          }
      }
      if(ctrl.user.picture){
        setPictureURLByPicture(ctrl.user.picture, true);
      }else{
        ctrl.user.pictureURL = getPictureDefault();
      }
    }, 1000)

    ctrl.capturePicture = function() {
      var modalInstance = $uibModal.open({
        template: takePictureTemplate,
        controller: takePictureModalController,
        controllerAs: '$ctrl',
        backdrop: 'static',
        size: 'md',
        resolve: {
        }
      });
      modalInstance.result.then(function (picture) {
        if(picture){
          ctrl.openModalCropImage(picture);
        }
      });
    }

    ctrl.loadPicture = function() {
      inputFile.click()
    };

    ctrl.removePicture = function() {
        $timeout(()=>{
          ctrl.user.pictureURL = getPictureDefault();
          ctrl.user.picture = null;
          savePicture();
        })
    }

    ctrl.openModalCropImage = function(image){
      var modalInstance = $uibModal.open({
        template: simpleCropTemplate,
        controller: simpleCropController,
        controllerAs: '$ctrl',
        backdrop: 'static',
        size: 'md',
        resolve: {
          image: function () {
            return image;
          },
          type: function() {
            return ctrl.type || 'circle';
          }
        }
      });
      modalInstance.result.then(function (picture) {
        if(picture){
          ctrl.user.picture = picture;
          setPictureURLByPicture(ctrl.user.picture);
        }
      });
    }

    $scope.$watch('$ctrl.ngModel', (data) => {
        ctrl.user = {
          picture: ctrl.ngModel
        }
        if(ctrl.user.picture){
          setPictureURLByPicture(ctrl.user.picture, true);
        }else{
          ctrl.user.pictureURL = getPictureDefault();
        }
    }, true);

}

simpleImage.$inject = ['$timeout', '$uibModal', '$http', '$rootScope', '$element', '$scope'];

export default {
    bindings: {
      defaultPicture: '@?',
      type: '@?',
      ngModel: '=',
      buttonText: '@?',
      buttonChangeText: '@?',
      buttonCaptureText: '@?',
      buttonRemoveText: '@?',
      typeThumbnail: '@?'
    },
    template: simpleImageTemplate,
    controller: simpleImage
}
