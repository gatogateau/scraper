// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


// Initialize Express
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// initiate methodOverride
app.use(methodOverride('_method'));

// intiate body-parser and parse to JSON
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");




// Database configuration
// named database
var databaseUrl = "NYTscraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});



// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.redirect("/allScraped");
});

// get call to capture all saved articles
// app.get("/saved", function req, res) {
//     db.scrapedData.find(function (error, found) {

//     }
// } 

app.get("/allScraped", function (req, res) {
    // console.log(req.params, req.body);
    db.scrapedData.find(function (error, found) {
        
        var hbsObject = {
            scrapedData: found
        };
        if (error) {
            console.log(error);
        } else {
            var pg= parseInt(req.query.pg) || 1;
            hbsObject.scrapedData = hbsObject.scrapedData.slice((pg*10)+((pg-2)*10), (((pg*10)+((pg-2)*10)))+20)
            hbsObject=
            res.render("index", hbsObject);

        }
        // console.log ("working?");
    });
});


// Retrieve data from the db
app.get("/all", function (req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function (req, res) {
    // Make a request for the news section of `ycombinator`
    request("https://www.nytimes.com/", function (error, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        // For each element with a "title" class
        $(".story-heading").each(function (i, element) {
            // $(".title").each(function(i, element) {

            // Save the text and href of each link enclosed in the current element
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");

            // If this found element had both a title and a link
            if (title && link) {
                // Insert the data in the scrapedData db
                db.scrapedData.insert({
                        title: title,
                        link: link
                    },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        } else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
    });

    // Send a "Scrape Complete" message to the browser
    // res.send("Scrape Complete");
    res.redirect("/allScraped");
});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});





// // initialize the npm request
// request ('https://www.ksl.com', function (req, res, body) {
//     console.log (body);
// });