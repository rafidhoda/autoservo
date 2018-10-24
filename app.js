var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    Order                 = require("./models/order"),
    Mechanic              = require("./models/mechanic"),
    Review                = require("./models/review"),
    passport              = require("passport"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    flash                 = require("connect-flash"),
    sendgrid              = require('sendgrid')('mobilservice','755guaux');

//requiring routes
var orderRoutes = require("./routes/orders"),
    mechanicRoutes = require("./routes/mechanics"),
    reviewRoutes = require("./routes/reviews"),
    indexRoutes = require("./routes/index"),
    authRoutes  = require("./routes/index");

//mongoose.connect("mongodb://localhost/mobil_service");
mongoose.connect("mongodb://rafid:25dIf!52Ra@ds011452.mlab.com:11452/mobilservice");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());

app.use(require("express-session")({
    secret: "Rafid is a web developer",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.post("/new", function(req, res){
    // get data from form and add to orders array
    var num = req.body.num;
    var name = req.body.name;
    var service = req.body.service;
    var extra = req.body.extra;
    var price = req.body.price;
    var date = req.body.date;
    var time = req.body.time;
    var reg = req.body.reg;
    var email = req.body.email;
    var tel = req.body.tel;
    var address = req.body.address;
    var postal = req.body.postal;
    var region = req.body.region;
    var subscribe = req.body.subscribe;
    var timestamp = new Date();
    var newOrder = {num: num, name: name, service: service, extra: extra, price: price, date: date, time: time, reg: reg, email: email, tel: tel, address: address, postal: postal, region: region, subscribe: subscribe, timestamp: timestamp}
    // Create a new order and save to DB
    Order.create(newOrder, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect to done page
            res.redirect("/done");
        }
    });
});

// ROUTES
app.get("/new", function(req, res){
    //Get all orders from DB
    Order.find({}, function(err, allOrders){
        if(err){
            console.log(err);
        } else {
            res.render("new",{orders:allOrders});
        }
    });
});

app.get("/gratis-vask", function(req, res){
    res.render("gratis-vask");
});

app.get("/done", function(req, res){
    sendgrid.send({
        to:       'rafidhoda@gmail.com',
        from:     'post@autoservo.no',
        subject:  'Ny bestilling',
        text:     'Det har kommet inn en ny bestilling.'
        
    }, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
        
    res.render("done");
});
    
});

app.get("/apply", function(req, res){
    res.render("apply");
});

app.get("/join", function(req, res){
    res.render("join");
});

app.get("/slik", function(req, res){
    res.render("slik");
});

app.use(indexRoutes);
app.use("/mechanics", mechanicRoutes);
app.use("/mechanics/:id/reviews", reviewRoutes);
app.use("/orders", orderRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Autoservo Server Has Started!");
});

