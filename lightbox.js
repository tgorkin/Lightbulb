/* List of image URLs */
var _imageUrls = [];
/* List of image titles */
var _imageTitles =[];
/* Index of the current image being displayed */
var _currentImgIdx = -1;
/* Whether the lightbox overlay is currently shown */
var _isShowing = false;

/* Initializes a list of images to display in the lightbox.
 * @param imageUrls list of image URLs
 * @param imageTitles list of title strings associated with each image
 */
exports.setImages = function(imageUrls, imageTitles) {
  _imageUrls = imageUrls;
  _imageTitles = imageTitles;
  _currentImgIdx = -1;
}

/* Shows a specified image in the lightbox overlay.
 * @param imgUrl  URL of the image to show
 */
exports.showImage = function(imgUrl) {
  $(".lightboxImageContainer").remove();

  _currentImgIdx = _imageUrls.indexOf(imgUrl);
  if( _currentImgIdx >= 0 ) {
    var imgTitle = _imageTitles[_currentImgIdx];
    createImage(imgUrl, imgTitle);

    if( !_isShowing ) {
      $('#lightbox').fadeIn(600);
      $("#pageFrame").addClass("blur");
      _isShowing = true;
    }
  }
}

/* Hides the lightbox overlay. */
exports.hide = function() {
  _isShowing = false;
  $(".lightboxImageContainer").remove();
  $("#pageFrame").removeClass("blur");
  $('#lightbox').hide();
}

/* Advances the lightbox overlay to show the next image */
exports.nextImage = function() {
  _currentImgIdx = (_currentImgIdx + 1) % _imageUrls.length;
  var imgUrl = _imageUrls[_currentImgIdx];
  var imgTitle = _imageTitles[_currentImgIdx];

  var oldImage = $("#activeImage").removeAttr("id");
  var newImage = createImage(imgUrl, imgTitle);

  playImageTransition(oldImage, newImage, -1);
}

/* Advances the lightbox overlay to show the previous image */
exports.prevImage = function() {
  if( _currentImgIdx == 0 ) {
    _currentImgIdx = _imageUrls.length -1;
  } else {
    _currentImgIdx--;
  }
  var imgUrl = _imageUrls[_currentImgIdx];
  var imgTitle = _imageTitles[_currentImgIdx];

  var oldImage = $("#activeImage").removeAttr("id");
  var newImage = createImage(imgUrl, imgTitle);

  playImageTransition(oldImage, newImage, 1);
}

/* Plays the transition animation when advancing the lightbox to the next or
 * previous image.
 * @param currentImage  the currently shown image to hide
 * @param newImage      next image to show
 * @param xDirection    left/right direction to play the transition animation
 */
function playImageTransition(currentImage, newImage, xDirection) {
  var targetX = xDirection > 0 ? 3000 : -3000;

  currentImage.animate(
    { left: targetX },
    400,
    function() {
      $(this).remove();
    }
  )

  newImage.css('left', -targetX).animate(
    { left: 0 },
    400, "swing"
  );
}

/* Creates a new image element to show in the lightbox overlay */
function createImage(imgUrl, imgTitle) {
  var imgDiv = $('<div  class="lightboxImageContainer" id="activeImage"/>');
  var img = $('<img class="lightboxImage"/>').attr("src", imgUrl);
  var imgTitle = $('<p class="lightboxImageTitle">'+imgTitle+'</p>');
  imgDiv.append(img);
  imgDiv.append(imgTitle);
  $('#lightboxContent').append(imgDiv);
  return imgDiv;
}
