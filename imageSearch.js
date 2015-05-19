var Flickr = require('flickrapi');

/* Flickr API settings
 * TODO!!!! - Move these to server and setup proxy for Flickr API calls.
 */
var flickrOptions = {
    api_key: "fb7ed8d351907c80e11932ee8972e32e",
    secret: "370e4c8cc2c19c4b"
};

/* Gets a photoset from Flickr by photosetId
 * @param photosetId  id of the photoset to query
 * @param onComplete  callback when function completes successfully
 */
exports.getPhotosetFlickr = function(photosetId, onComplete) {

  Flickr.tokenOnly(flickrOptions, function(error, flickr) {

    flickr.photosets.getPhotos({
      photoset_id : photosetId,
      user_id : "30966612@N02"
    }, function(err, result) {
      if(err) { throw new Error(err); }
      var photoList = result.photoset.photo;
      photoUrls = new Array(photoList.length);
      photoList.forEach( function(photoData, index, array) {
          photoUrls[index] = createPhotoUrl(photoData);
        }

      )
      onComplete(photoUrls);
    });
  });
}

/* Searches Flickr for photos tagged with a given search term.
 * @param searchTerm  search term to query
 * @param onComplete  callback when function completes successfully
 */
exports.searchFlickr = function(searchTerm, onComplete) {

  Flickr.tokenOnly(flickrOptions, function(error, flickr) {

    flickr.photos.search({
      text : searchTerm,
      page: 1,
      per_page: 192
    }, function(err, result) {
      if(err) { throw new Error(err); }
      var photoList = result.photos.photo;
      photoUrls = new Array(photoList.length);
      photoTitles = new Array(photoList.length);
      photoList.forEach( function(photoData, index, array) {
          photoUrls[index] = createPhotoUrl(photoData);
          photoTitles[index] = photoData.title;
        }
      )
      onComplete(photoUrls, photoTitles);
    });
  });
}

/* Transform raw photo data from Flickr into an image url. */
function createPhotoUrl(photoData) {
  var url = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg";

  url = url.replace("{farm-id}", photoData.farm);
  url = url.replace("{server-id}", photoData.server);
  url = url.replace("{id}", photoData.id);
  url = url.replace("{secret}", photoData.secret);

  return url;
}
