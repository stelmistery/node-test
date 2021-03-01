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

exports.search = function(request, response) {

    let searchText = request.query.text;
    try {
        var fileContent = fs.readFileSync('testFile.txt', 'utf8');
    } catch (err) {
        console.log('Write file error');
        throw err;
    }
    console.log(searchText);
    let fileContentSplited = fileContent.split('\n');
    var obj = {};
    obj.data = {};
    fileContentSplited.forEach((currentLine, ind) => {
        if (currentLine.match(new RegExp(searchText, 'g'))) {
            obj.data[(ind + 1).toString()] = currentLine;
        }
    });
    response.status(200);
    response.set('Content-Type', 'text/json');
    response.json(obj);
}