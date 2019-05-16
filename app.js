var express = require('express')
    , routes = require('./routes')
    , users = require('./routes/users')
    , func = require('./routes/function')
    , http = require('http')
    , path = require('path');


var session = require('express-session');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'data'
});


connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

global.data = [
    { word: "あ", kata: "ア", sub: "a", id: "aa" }, { word: "い", kata: "イ", sub: "i", id: "ii" }, { word: "う", kata: "ウ", sub: "u", id: "uu" }, { word: "え", kata: "エ", sub: "e", id: "ee" }, { word: "お", kata: "オ", sub: "o", id: "oo" },
    { word: "か", kata: "カ", sub: "ka", id: "ka" }, { word: "き", kata: "キ", sub: "ki", id: "ki" }, { word: "く", kata: "ク", sub: "ku", id: "ku" }, { word: "け", kata: "ケ", sub: "ke", id: "ke" }, { word: "こ", kata: "コ", sub: "ko", id: "ko" },
    { word: "さ", kata: "サ", sub: "sa", id: "sa" }, { word: "し", kata: "シ", sub: "shi", id: "si" }, { word: "す", kata: "ス", sub: "su", id: "su" }, { word: "せ", kata: "セ", sub: "se", id: "se" }, { word: "そ", kata: "ソ", sub: "so", id: "so" },
    { word: "た", kata: "タ", sub: "ta", id: "ta" }, { word: "ち", kata: "チ", sub: "chi", id: "ti" }, { word: "つ", kata: "ツ", sub: "tsu", id: "tu" }, { word: "て", kata: "テ", sub: "te", id: "te" }, { word: "と", kata: "ト", sub: "to", id: "to" },
    { word: "な", kata: "ナ", sub: "na", id: "na" }, { word: "に", kata: "二", sub: "ni", id: "ni" }, { word: "ぬ", kata: "ヌ", sub: "nu", id: "nu" }, { word: "ね", kata: "ネ", sub: "ne", id: "ne" }, { word: "の", kata: "ノ", sub: "no", id: "no" },
    { word: "は", kata: "ハ", sub: "ha", id: "ha" }, { word: "ひ", kata: "ヒ", sub: "hi", id: "hi" }, { word: "ふ", kata: "フ", sub: "fu", id: "fu" }, { word: "へ", kata: "ヘ", sub: "he", id: "he" }, { word: "ほ", kata: "ホ", sub: "ho", id: "ho" },
    { word: "ま", kata: "マ", sub: "ma", id: "ma" }, { word: "み", kata: "ミ", sub: "mi", id: "mi" }, { word: "む", kata: "ム", sub: "mu", id: "mu" }, { word: "め", kata: "メ", sub: "me", id: "me" }, { word: "も", kata: "モ", sub: "mo", id: "mo" },
    { word: "や", kata: "ヤ", sub: "ya", id: "ya" }, { word: "ゆ", kata: "ユ", sub: "yu", id: "yu" }, { word: "よ", kata: "ユ", sub: "yo", id: "yo" },
    { word: "ら", kata: "ラ", sub: "ra", id: "ra" }, { word: "り", kata: "リ", sub: "ri", id: "ri" }, { word: "る", kata: "ル", sub: "ru", id: "ru" }, { word: "れ", kata: "レ", sub: "re", id: "re" }, { word: "ろ", kata: "ロ", sub: "ro", id: "ro" },
    { word: "わ", kata: "ワ", sub: "wa", id: "wa" }, { word: "を", kata: "ヲ", sub: "wo", id: "wo" },
    { word: "ん", kata: "ン", sub: "nn", id: "nn" },
    { word: "が", kata: "ガ", sub: "ga", id: "ga" }, { word: "ぎ", kata: "ギ", sub: "gi", id: "gi" }, { word: "ぐ", kata: "グ", sub: "gu", id: "gu" }, { word: "げ", kata: "ゲ", sub: "ge", id: "ge" }, { word: "ご", kata: "ゴ", sub: "go", id: "go" },
    { word: "ざ", kata: "ザ", sub: "za", id: "za" }, { word: "じ", kata: "ジ", sub: "ji", id: "ji" }, { word: "ず", kata: "ズ", sub: "zu", id: "zu" }, { word: "ぜ", kata: "ゼ", sub: "ze", id: "ze" }, { word: "ぞ", kata: "ゾ", sub: "zo", id: "zo" },
    { word: "だ", kata: "ダ", sub: "da", id: "da" }, { word: "ぢ", kata: "ヂ", sub: "ji2", id: "ji2" }, { word: "づ", kata: "ヅ", sub: "zu", id: "zu" }, { word: "で", kata: "デ", sub: "de", id: "de" }, { word: "ど", kata: "ド", sub: "do", id: "do" },
    { word: "ば", kata: "バ", sub: "ba", id: "ba" }, { word: "び", kata: "ビ", sub: "bi", id: "bi" }, { word: "ぶ", kata: "ブ", sub: "bu", id: "bu" }, { word: "べ", kata: "ベ", sub: "be", id: "be" }, { word: "ぼ", kata: "ボ", sub: "bo", id: "bo" },
    { word: "ぱ", kata: "パ", sub: "pa", id: "pa" }, { word: "ぴ", kata: "ピ", sub: "pi", id: "pi" }, { word: "ぷ", kata: "プ", sub: "pu", id: "pu" }, { word: "ぺ", kata: "ペ", sub: "pe", id: "pe" }, { word: "ぽ", kata: "ポ", sub: "po", id: "po" },
    { word: "きゃ", kata: "キャ", sub: "kya", id: "kya" }, { word: "きゅ", kata: "キュ", sub: "kyu", id: "kyu" }, { word: "きょ", kata: "キョ", sub: "kyo", id: "kyo" }, 
    { word: "しゃ", kata: "シャ", sub: "sha", id: "sha" }, { word: "しゅ", kata: "シュ", sub: "shu", id: "shu" }, { word: "しょ", kata: "ショ", sub: "sho", id: "sho" }, 
    { word: "ちゃ", kata: "チャ", sub: "cha", id: "cha" }, { word: "ちゅ", kata: "チュ", sub: "chu", id: "chu" }, { word: "ちょ", kata: "チョ", sub: "cho", id: "cho" }, 
    { word: "にゃ", kata: "ニャ", sub: "nya", id: "nya" }, { word: "にゅ", kata: "ニュ", sub: "nyu", id: "nyu" }, { word: "にょ", kata: "ニョ", sub: "nyo", id: "nyo" }, 
    { word: "ひゃ", kata: "ヒャ", sub: "hya", id: "hya" }, { word: "ひゅ", kata: "ヒュ", sub: "hyu", id: "hyu" }, { word: "ひょ", kata: "ヒョ", sub: "hyo", id: "hyo" }, 
    { word: "みゃ", kata: "ミャ", sub: "mya", id: "mya" }, { word: "みゅ", kata: "ミュ", sub: "myu", id: "myu" }, { word: "みょ", kata: "ミョ", sub: "myo", id: "myo" }, 
    { word: "りゃ", kata: "リャ", sub: "rya", id: "rya" }, { word: "りゅ", kata: "リュ", sub: "ryu", id: "ryu" }, { word: "りょ", kata: "リョ", sub: "ryo", id: "ryo" }, 
    { word: "ぎゃ", kata: "ギャ", sub: "gya", id: "gya" }, { word: "ぎゅ", kata: "ギュ", sub: "gyu", id: "gyu" }, { word: "ぎょ", kata: "ギョ", sub: "gyo", id: "gyo" },
    { word: "じゃ", kata: "ジャ", sub: "ja", id: "ja" }, { word: "じゅ", kata: "ジュ", sub: "ju", id: "ju" }, { word: "じょ", kata: "ジョ", sub: "jo", id: "jo" },
    { word: "びゃ", kata: "ビャ", sub: "bya", id: "bya" }, { word: "びゅ", kata: "ビュ", sub: "byu", id: "byu" }, { word: "びょ", kata: "ビョ", sub: "byo", id: "byo" },
    { word: "ぴゃ", kata: "ピャ", sub: "pya", id: "pya" }, { word: "ぴゅ", kata: "ピュ", sub: "pyu", id: "pyu" }, { word: "ぴょ", kata: "ピョ", sub: "pyo", id: "pyo" }
];

global.db = connection;
global.message = '';
global.member = '';
global.subhiragana = [];
global.wordhiragana = [];
global.hiragana = '';
//app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 }
}))

app.get('/', routes.index);
app.post('/', users.signup);
app.get('/home', func.home);
app.post('/home', users.login);


app.get('/learnhiragana', func.learnhiragana);
app.post('/learnhiragana', func.learnhiragana);
app.get('/learnkatakana', func.learnkatakana);
app.get('/test', func.test);
app.get('/user', users.user)

app.listen(process.env.PORT || 8080);

