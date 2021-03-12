const mongoose = require('mongoose')
const express = require('express')
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
const { Appointment, Client , Admin ,TechMan } = require("../models/models");
const { Router } = require('express');

// to can see the body from req instead of undefined
router.use(express.json());

// sign-up new clint
router.post("/Clint", (req, res) => {
  console.log("POST /Clint");
  console.log("BODY: ", req.body);
  if (!req.isAuthenticated()) {
  Client.create(req.body, function (err, newClint) {
    if (err) {
      console.log(err);
    }
    console.log(newClint);
    
    res.json(newClint);
    
  });}
});
// read all cilnt
router.get("/Clint", (req, res) => {
  console.log("GET /Clint");
  Client.find({}, function (err, data) {
    res.json(data);
  });
});
router.get("/C", (req, res) => {
  console.log("GET /Clint");
  Admin.find({}, function (err, data) {
    res.json(data);
  });
});

// get one client
router.get("/Clint/:clientId", (req, res) => {
  Client.findById(req.params.clientId, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});



//Edit profile
router.put("/profile/:id", (req, res) => {
  Client.findOneAndUpdate({ _id: req.params.id }, req.body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// show all available Appointment
router.get("/AvaAppointments", (req, res) => {
  console.log("GET /user");
  Appointment.find({ available: true }, function (err, data) {
    res.json(data);
  });
});

// booked a new  Appointment
router.post("/clint/:clintId/:appointmentId", (req, res) => {
  Client.findById(req.params.clintId, (error, foundClint) => {
    foundClint.app_id.push(req.params.appointmentId);
    foundClint.save((err, savedTechMan) => {
      res.json(" added an Appointment!!!!!! ");
    });
  });
});

// {available:false}
// Edit Appointment
router.put("/clint/:appointmentId/", (req, res) => {
  Appointment.findOneAndUpdate(
    { _id: req.params.appointmentId },
    { isComplate: true },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// read up coming Appointment
router.get("/:clintId/NewAppointments", (req, res) => {
  console.log("GET /clint/NewAppointments");
  Client.findById(req.params.clintId)
    .populate({ path: "app_id", match: { isComplate: false } })
    .exec(function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json(result);
    });
});

// read all booked Appointment
router.get("/:clintId/appointments", (req, res) => {
  console.log("GET /clintId/appointment");
  Client.findById(req.params.clintId, function (err, data) {
    res.json(data);
  });
});

// delete booked Appointment
router.delete("/delete/:clintId/:appointmentId", (req, res) => {
  console.log("PARAMS:", req.params.clintId);
  console.log("PARAMS:", req.params.appointmentId);
  Client.findById(req.params.clintId, (error, foundClint) => {
    let i = foundClint.app_id.indexOf(req.params.appointmentId)
    foundClint.app_id.splice(i,1);
    foundClint.save((err, savedTechMan) => {
      res.json(" Deleted an Appointment!!!!!! ");
    });
  });

});

// rate an Appointment
router.put("/clint/rate/:appointmentId", (req, res) => {
  console.log("PARAMS:", req.params.appointmentId);
  Appointment.findOneAndUpdate({ _id: req.params.appointmentId}, req.body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});




passport.use(new LocalStrategy(
  function(companyName, password, done) {
    Client.findOne({companyName : companyName }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      return done(null, user);
    });
  }
));


router.get("/login/failed", (req, res) => {
  res.status(401).json({
      success: false,
      message: "Authentication Failed"
  });
});

// Trash Appointments
router.get("/:clintId/ComplateAppointments", (req, res) => {
  console.log("GET /clint/NewAppointments");
  Client.findById(req.params.clintId)
    .populate({ path: "app_id", match: { isComplate: true } })
    .exec(function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json(result);
    });
});
router.post("/login",(req, res) => {
  console.log("Login")
  console.log("Body: ", req.body);
  
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!password) {
    errors.push({ passowrd: "required" });
  }
  if (errors.length > 0) {
   return res.status(422).json({ errors: errors });
  }
  Admin.findOne({ email: email , password : password}).then(admin => {
    if (!admin) {
      Client.findOne({ email: email , password : password}).then(clint => {
       if(!clint){
        TechMan.findOne({ email: email }).then(techMen => {
          if(!techMen){
           return res.status(404).json({
             errors: [{ admin: "not found" }],
           });}
          else{
            res.json(techMen)
            return techMen;
          }})
       
       }
       else{
        res.json(clint)
        return clint;
      }})}
    
      else{        
        res.json(admin)
        return admin;
      }
    } ) 
}
  
  )

  router.get("/checkLogin", (req, res,next) => {
    if (req.isAuthenticated()) {
      res.status(401).json({
          authenticated: false,
          message: "User Login Required"
      });
  } else {
      next();
  }
  });
  router.get("/logout", (req, res) => {
    console.log('User Id', req.body.email);
   
     Client.deleteOne({ email:  req.body.email }, function (err) {
      if (err) return handleError(err);
      else
      res.json("de")})

});
  
module.exports = router;
