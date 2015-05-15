var imageUrls =[];
var currentImgIdx = -1;

exports.setImages = function(images) {
  imageUrls = images;
  currentImgIdx = -1;
}

exports.showImage = function(imgUrl) {
  currentImgIdx = imageUrls.indexOf(imgUrl);
}

exports.nextImage = function() {
  currentImgIdx = (currentImgIdx + 1) % imageUrls.length;
  return imageUrls[currentImgIdx];
}

exports.prevImage = function() {
  if( currentImgIdx == 0 ) {
    currentImgIdx = imageUrls.length -1;
  } else {
    currentImgIdx--;
  }
  return imageUrls[currentImgIdx];
}
