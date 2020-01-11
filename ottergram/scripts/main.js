var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var SMALL_IMAGE_SELECTOR = '[class="thumbnail-image"]';

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
  var smallImage = smallA.querySelector(SMALL_IMAGE_SELECTOR);
  smallImage.setAttribute('src', imageUrl);
}

//缩略图重设
function resSmall(){
  var thumbnails = getThumbnailsArray();
  for(var i = 0; i < thumbnails.length; i++){
    thumbnails[i].querySelector(SMALL_IMAGE_SELECTOR).setAttribute('src',thumbnails[i].href);
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
    console.log(thumb);
    //缩略图重设
    resSmall();
    //缩略图随机
    var newSmallImageUrl = "https://img1.doubanio.com/view/subject/l/public/s2953709" + Math.floor(Math.random() * 10) + ".jpg";
    setSmall(thumb, newSmallImageUrl);
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();
