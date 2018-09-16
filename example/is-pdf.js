var IMAGE_EXTENTIONS = ['pdf'];

function isPDF(filename) {
  var ext = filename.split('.').slice(-1)[0];

  if (ext === filename) {
    return false;
  }

  if (IMAGE_EXTENTIONS.indexOf(ext.toLowerCase()) === -1) {
    return false;
  }

  return true;
}

module.exports = isPDF;
