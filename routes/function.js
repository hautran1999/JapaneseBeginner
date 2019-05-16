
exports.home = function (req, res) {
    res.render('home.ejs');
    console.log("home");
}
exports.learnkatakana = function (req, res) {

    res.render('learnkatakana.ejs');
    console.log("learnkatakana");


}

exports.test = function (req, res) {
    res.render('test.ejs');
    console.log("test");
}

exports.learnhiragana = function (req, res) {
    if (req.method == "POST") {
        var post = req.body;
        word = post.word_remember;

        if (member.length == 0) {
            message = "You need to login to perform the function";
            res.render('learnhiragana.ejs');

            message = '';
            
        } else {
            hiragana = hiragana + word + " ";
            sql = "UPDATE `user` SET `hiragana` = '" + hiragana + "' WHERE `user_name` = '" + member + "'";
            db.query(sql);
            res.render('learnhiragana.ejs');
            console.log("learnhiragana");
        }
    } else {
        res.render('learnhiragana.ejs');
        console.log("learnhiragana");
    }
}




