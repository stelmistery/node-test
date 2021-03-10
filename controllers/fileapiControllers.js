const fs = require('fs');

exports.wite_file = function (request, response) {
    let data = request.body[0].body;
    try {
        fs.appendFileSync('testFile.txt', data + '\n');
    } catch (err) {
        console.log('Write file error');
        throw err;
    }
    response.status(200);
    response.set('Content-Type', 'text/json');
    response.json('Write file success');
}


exports.search = function (request, response) {
    let searchText = request.query.text;
    let stream = fs.createReadStream('testFile.txt', 'utf8')
    var obj = {};
    obj.data = {};
    var i = 0;
    stream.on('data', function (chunk) {
        i = i + 1;
        console.log(i);
        // console.log(chunk);
        // let fileContentSplited = chunk.split('\n');
        // fileContentSplited.forEach((currentLine, ind) => {
        //     if (currentLine.match(new RegExp(searchText, 'g'))) {
        //         obj.data[(ind + 1).toString()] = currentLine;
        //     }
        // });
    });

    stream.on('end', () => {
        response.set('Content-Type', 'text/json');
        // response.json(obj);
        response.json({ndfv: 'dfv'});
    })

    // console.log(searchText);
    // response.status(200);
    // response.set('Content-Type', 'text/json');
    // response.json(obj);
}