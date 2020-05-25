const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                staus: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us18.api.mailchimp.com/3.0/lists/86b7d16e15",
        method: "POST",
        headers: {
            "Authorization": "arpit 94c4e5809d1a760e91a6ad3c5cd90458-us18",
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error) {
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure.html", function(req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
});

// d60ad9212bd7af6b979c65be47b6854a-us18

// 86b7d16e15