var Firebase = require("firebase");
var userRef = new Firebase('https://crackling-inferno-7919.firebaseio.com/users/');

function addUser(req, res) {
    var id = req.param('id');
    var email = req.param('email');
    var nickName = req.param('nickName');


    userRef.orderByChild('id').equalTo(id).on('value', function(snapshot) {
        var user = snapshot.val();

        // 유저 없으면 생성
        if (user == null) {
            console.log('유저 없으니 생성');
            userRef.push({
                id: id,
                email: email,
                nickName: nickName
            });
        } else { // 유저 존재하면 메인 페이지로 이동
            console.log('유저 이미 존재함');
            res.redirect("/");
        }
    });
}

function login(req, res) {
    var id = req.param('id');

    userRef.orderByChild('id').equalTo(id).on('value', function(snapshot) {
        var user = snapshot.val();
        if (user == null) {
            console.log('유저 없음');
            res.redirect("/notFound");
        } else {
            console.log('유저존재');
            res.redirect("/");
        }
    });
}

exports.addUser = addUser;
exports.login = login;