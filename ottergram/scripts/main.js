var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetail(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

//缩略图随机函数
function setSmall(smallA, imageUrl) {
  'use strict';
  var smallImage = smallA.querySelector('[class="thumbnail-image"]');
  smallImage.setAttribute('src', imageUrl);
}

//缩略图重设
function resSmall(){
  var thumbnails = getThumbnailsArray();
  for(var i = 0; i < thumbnails.length; i++){
    thumbnails[i].querySelector('[class="thumbnail-image"]').setAttribute('src',thumbnails[i].href);
  }
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailFromThumb(thumbnail) {
  'use strict';
  setDetail(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailFromThumb(thumb);

    // //缩略图重设
    // resSmall();
    // //缩略图随机
    // var newSmallImageUrl = "https://img1.doubanio.com/view/subject/l/public/s2953709" + Math.floor(Math.random() * 10) + ".jpg";
    // setSmall(thumb, newSmallImageUrl);

    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails(){
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails(){
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function(){
    frame.classList.remove(TINY_EFFECT_CLASS);
  },50);
}

function addKeyPressHandler(){
  'use strict';
  document.body.addEventListener('keyup',function(event){
    event.preventDefault();
    console.log(event.keyCode);
    if(event.keyCode === ESC_KEY){
      hideDetails();
    }
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
