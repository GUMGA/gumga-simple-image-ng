export default `

<style>
  my-account-embedded .form-control.gmd[disabled]{
    background: #E4E4E4;
  }
  .cropArea {
    background: #E4E4E4;
    overflow: hidden;
    width:100%;
    height:350px;
  }
  .modal-body-my-profile{
    padding: 0;
  }
  .modal-footer-my-profile{
    background-color: #e0e0e0 !important;
    padding: 0;
    border: 0;
    height: 100px;
  }
  .modal-header-my-profile{
    background: #1eb7ad;
    border: none;
    color: #fff;
  }
  .modal-header-my-profile > span{
    font-weight: 500;
    font-size: 19px;
    line-height: 19px;
  }
  .btn-done-my-profile{
    width: 60px;
    color: #fff !important;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    outline: none !important;
    right: 25px;
    top: 365px;
    font-size: 25px;
    background: #1eb7ad;
    padding-top: 10px;
  }
  .btn-take-my-profile{
    width: 60px;
    padding-top: 10px;
    color: #fff !important;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    outline: none !important;
    font-size: 25px;
    right: 25px;
    top: 465px;
    background: #1eb7ad;
  }
  .close-crop-my-profile{
    cursor: pointer;
  }
  .simple-image-container {
    width: 100%;
    text-align: center;
  }

  .simple-image-container > img {
      margin: 0 auto;
      max-height: 200px;
  }
</style>

<div class="simple-image-container">
<img ng-src="{{$ctrl.user.pictureURL}}" class="img-responsive {{$ctrl.typeThumbnail == 'circle' ? 'img-circle' : ''}}"/>
<input class="simple-image-file-input" type="file" style="display: none;" accept=".png, .jpg, .jpeg"/>
<div class="dropdown gmd" align="center" style="margin-top: 15px;">
    <button class="link gmd btn" aria-expanded="false"
         style="white-space: normal;font-size: 13px;overflow: hidden;"
         data-toggle="dropdown"
         aria-haspopup="true"
         aria-hidden="true">
        <i class="glyphicon glyphicon-pencil"></i>
        {{$ctrl.buttonText}}
    </button>
    <ul class="dropdown-menu gmd" aria-labelledby="dropdownMenu">
        <li ><a style="padding: 15px;cursor: pointer;" ng-click="$ctrl.capturePicture()">{{$ctrl.buttonCaptureText}}</a></li>
        <li ><a style="padding: 15px;cursor: pointer;" ng-click="$ctrl.loadPicture()">{{$ctrl.buttonChangeText}}</a></li>
        <li ><a style="padding: 15px;cursor: pointer;" ng-click="$ctrl.removePicture()">{{$ctrl.buttonRemoveText}}</a></li>
    </ul>
</div>
</div>
`
