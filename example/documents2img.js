var fs = require('fs');
var pdf2img = require('pdf2img');
var join = require('path').join;
var resolve = require('path').resolve;
var sep = require('path').sep;
var isPdf = require(__dirname + '/is-pdf');
var objectAssign = require('object-assign');


function documents2img() {

    var documentPath = __dirname + '/../example/documents';
    var photosPath = __dirname + '/../example/photos';
    console.log(documentPath)


    fs.readdir(resolve(documentPath), function(err, files) {
        if (err) throw err;

        var documents = [];

        files.forEach(function(file) {

            if(isPdf){
                console.log(file);

                var input   = join(documentPath, file);
                console.log(input);

                pdf2img.setOptions({
                    type: 'png',                                // png or jpg, default jpg
                    size: 1024,                                 // default 1024
                    density: 600,                               // default 600
                    outputdir: photosPath,                      // output folder, default null (if null given, then it will create folder name same as file name)
                    outputname: file,                         // output file name, dafault null (if null given, then it will create image name same as input name)
                    page: null                                  // convert selected page, default null (if null given, then it will convert all pages)
                });

                pdf2img.convert(input, function(err, info) {
                    if (err) console.log(err)
                    else console.log(info);
                });


            }
        })
    })

}

documents2img();
