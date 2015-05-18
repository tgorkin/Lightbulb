var imageUrls =[];
var currentImgIdx = -1;

var isShowing = false;

exports.setImages = function(images) {
  imageUrls = images;
  currentImgIdx = -1;
}

exports.showImage = function(imgUrl) {
  currentImgIdx = imageUrls.indexOf(imgUrl);

  var img = $('<img id="activeImage" class="lightboxImage"/>').attr("src", imgUrl);
  $('#lightboxContent').append(img);

  if( !isShowing ) {
    $('#lightbox').fadeIn(600);
    $("#pageFrame").addClass("blur");
    isShowing = true;
  }
}

exports.hide = function() {
  isShowing = false;
  $(".lightboxImage").remove();
  $("#pageFrame").removeClass("blur");
  $('#lightbox').hide();
}

exports.nextImage = function() {
  currentImgIdx = (currentImgIdx + 1) % imageUrls.length;
  var imgUrl = imageUrls[currentImgIdx];

  var oldImage = $("#activeImage").removeAttr("id");
  var newImage = createImage(imgUrl);

  playImageTransition(oldImage, newImage, -1);
}

exports.prevImage = function() {
  if( currentImgIdx == 0 ) {
    currentImgIdx = imageUrls.length -1;
  } else {
    currentImgIdx--;
  }
  var imgUrl = imageUrls[currentImgIdx];

  var oldImage = $("#activeImage").removeAttr("id");
  var newImage = createImage(imgUrl);

  playImageTransition(oldImage, newImage, 1);
}

function playImageTransition(oldImage, newImage, xDirection) {
  var targetX = xDirection > 0 ? 2000 : -2000;

  oldImage.animate(
    { left: targetX },
    400, "easeInQuad",
    function() { oldImage.remove(); }
  )

  newImage.css('left', -targetX).animate(
    { left: 0 },
    400, "easeInQuad"
  );
}

function createImage(imgUrl) {
  var img = $('<img id="activeImage" class="lightboxImage"/>').attr("src", imgUrl);
  $('#lightboxContent').append(img);
  return img;
}
