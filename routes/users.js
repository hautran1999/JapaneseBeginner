exports.login = function (req, res) {
   var sess = req.session;
   if (req.method == "POST") {
      var post = req.body;
      var name = post.username_login;

      var pass = post.password_login;


      var sql = "SELECT * FROM `user` WHERE `user_name`='" + name + "' and password = '" + pass + "'";
      var query = db.query(sql, function (err, results) {
         if (results.length) {
            sess.userId = results[0].id;
            sess.user = results[0];
            console.log(results[0].id);
            message = "Wellcome, " + results[0].user_name;
            member = results[0].user_name;

            res.render('home.ejs');

            message = '';
         }
         else {
            message = 'Wrong Credentials.';
            res.render('index.ejs');

            message = '';
         }

      });
   } else {
      res.render('index.ejs');
   }

};

exports.signup = function (req, res) {
   if (req.method == "POST") {
      var post = req.body;
      var name = post.username_signup;
      var email = post.email_signup;
      var pass = post.password_signup;
      var sql = "SELECT user_name FROM `user` WHERE `user_name`='" + name + "'";
      db.query(sql, function (err, results) {
         if (results.length) {

            message = "User name is already used. Please try another name"
            res.render('index.ejs');

            message = '';
         } else {
            sql = "INSERT INTO `user`(`user_name`,`email`, `password`) VALUES ('" + name + "','" + email + "','" + pass + "')";

            db.query(sql, function (err, result) {

               message = "Succesfully! Your account has been created.";
               res.render('index.ejs');

               message = '';

            });
         }
      })

   } else {
      res.render('index.ejs');
   }
};
exports.user = function (req, res) {
   var sess = req.session;
   if (member.length == 0) {
      message = "You need to login to perform the function";
      res.render('index.ejs');

      message = '';
   } else {
      sql = "SELECT * FROM `user` WHERE `user_name`='" + member + "'";
      db.query(sql, function (err, results) {
         if (results.length) {
            sess.userId = results[0].id;
            sess.user = results[0];

            hiragana = results[0].hiragana;

            subhiragana = [];
            for (let i = 0; i < hiragana.length; i++) {
               for (let j = i + 1; j < hiragana.length; j++) {
                   if (hiragana[j] == ' ') {
                       subhiragana.push(hiragana.slice(i, j));
                       i = j; break;
                   }
               }
           }
            wordhiragana = [];
            for (let i = 0; i < subhiragana.length; i++) {
               for (let j = 0; j < data.length; j++) {
                  if (subhiragana[i] == data[j].sub) {
                     wordhiragana.push({ word: data[j].word, sub: data[j].sub });
                     break;
                  }
               }
            }
            res.render('user.ejs')
            console.log('user');

            message = '';
         }
      });


   }
}

