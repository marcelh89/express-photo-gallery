var fs = require('fs');
var pdf2img = require('pdf2img');
var join = require('path').join;
var resolve = require('path').resolve;
var sep = require('path').sep;
var isImage = require(__dirname + '/is-image');
var isPdf = require(__dirname + '/is-pdf');
var objectAssign = require('object-assign');


module.exports = function(paths, userOptions, callback) {
  fs.readdir(resolve(paths.photos), function(err, files) {

    if (err) throw err;

    var photoObjects = [];

    files.forEach(function(file) {
      var photoObject = {};

      if (isImage(file)) {

        photoObject.src = join('photos', file);
        if (paths.thumbs) photoObject.thumb = join('thumbs', file);
        if (paths.previews) photoObject.downloadUrl = join('downloads', file);

        photoObjects.push(photoObject);
      } else if(isPdf(file)) {

          console.log("isPDF")
          console.log(file)


          //extract pdf and convert to image...

          var input   = join('photos', file);
          console.log(input)


          pdf2img.setOptions({
              type: 'png',                                // png or jpg, default jpg
              size: 1920,                                 // default 1024
              density: 1080,                               // default 600
              outputdir: join('photos'), // output folder, default null (if null given, then it will create folder name same as file name)
              outputname: file,                         // output file name, dafault null (if null given, then it will create image name same as input name)
              page: null                                  // convert selected page, default null (if null given, then it will convert all pages)
          });

          pdf2img.convert(input, function(err, info) {
              if (err) console.log(err)
              else console.log(info);
          });

      }
    });

    var mandatorySettings = {
      dynamic: true,
      dynamicEl: photoObjects,
      closable: false,
      escKey: false,
    };

    var optionalSettings = {
      download: true,
      thumbnail: !!paths.thumbs
    };

    var payload = objectAssign(optionalSettings, userOptions, mandatorySettings);

    callback(payload);
  });
};
