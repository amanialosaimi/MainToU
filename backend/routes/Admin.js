const express = require("express");
const mongoose = require("mongoose");
// Instantiate a Router (mini app that only handles routes)
const router = express.Router();
const {
  Admin,
  TechMan,
  Appointment,
  MaintenanceCompany,
} = require("../models/models");
//******** Login Admin */
// to can see the body from req instead of undefined
router.use(express.json());

// view all techMan
router.get("/TechMan", (req, res) => {
  console.log("GET /TechMan");
  TechMan.find({}, function (err, data) {
    res.json(data);
  });
});

// add new techMan
router.post("/TechMan", (req, res) => {
  console.log("POST /TechMan");
  console.log("BODY: ", req.body);
  TechMan.create(req.body, function (err, newTechMan) {
    if (err) {
      console.log(err);
    }
    console.log(newTechMan);
    res.json(newTechMan);
  });
});

// Edit TechMan 
router.put('/TechMan/:TechManId',(req, res) => {
  TechMan.findByIdAndUpdate(req.params.TechManId, req.body,
    (err, updateTechMan) => {
      if (err) {
        console.log('ERR: ', err);
        res.json(err)
      }
      else {
        console.log("Updated TechMan : ", updateTechMan);
        res.json(updateTechMan)
      }
    });
});

// delete a TechMan
router.delete("/TechMan/:TechManId", (req, res) => {
  console.log("PARAMS:", req.params);
  TechMan.findOneAndDelete(
    { _id: req.params.TechManId },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// add new company
router.post("/company", (req, res) => {
  console.log("POST /company");
  console.log("BODY: ", req.body);
  MaintenanceCompany.create(req.body, function (err, newCompany) {
    if (err) {
      console.log(err);
    }
    console.log(newCompany);
    res.json(newCompany);
  });
});

// views all companies
router.get("/company", (req, res) => {
  console.log("GET /company");
  MaintenanceCompany.find({}, function (err, data) {
    res.json(data);
  });
});

// Edit company 
router.put('/company/:companyId',(req, res) => {
    MaintenanceCompany.findByIdAndUpdate(req.params.companyId, req.body,
      (err, updateCompany) => {
        if (err) {
          console.log('ERR: ', err);
          res.json(err)
        }
        else {
          console.log("Updated Company : ", updateCompany);
          res.json(updateCompany)
        }
      });
});


// delete a company
router.delete("/company/:companyId", (req, res) => {
  console.log("PARAMS:", req.params);
  MaintenanceCompany.findOneAndDelete(
    { _id: req.params.companyId },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

// add appointment to a company
// by Body
router.post("/company/:companyId/appointment", (req, res) => {
  const newAppointment = new Appointment(req.body);
  MaintenanceCompany.findById(req.params.companyId, (error, foundCompany) => {
    foundCompany.app_id.push(newAppointment);
    foundCompany.save((err, savedTechMan) => {
      res.json(newAppointment);
    });
  });
});
// by params
router.post("/company/:companyId/:appointmentId", (req, res) => {
  MaintenanceCompany.findById(req.params.companyId, (error, foundCompany) => {
    foundCompany.app_id.push(req.params.appointmentId);
    foundCompany.save((err, savedTechMan) => {
      res.json(" added a appointment !!!!!! ");
    });
  });
});

// add techMan to a company
// by Body
router.post("/company/:companyId/techMan", (req, res) => {
  const newTechMan = new TechMan(req.body);
  MaintenanceCompany.findById(req.params.companyId, (error, foundCompany) => {
    foundCompany.techMan.push(newTechMan);
    foundCompany.save((err, savedTechMan) => {
      res.json(newTechMan);
    });
  });
});

// by params
router.post("/company/:companyId/:techManId", (req, res) => {
  MaintenanceCompany.findById(req.params.companyId, (error, foundCompany) => {
    foundCompany.techMan.push(req.params.techManId);
    foundCompany.save((err, savedTechMan) => {
      res.json(" added a techMan!!!!!! ");
    });
  });
});


const newAdmin =   [
  { 
    name: "Admin",
    email: "as@gmail.com",
    phoneNumber: "0633821265",
    password: "Admin@251"
  },
]
Admin.insertMany(newAdmin, (err, newAdmin) => {
  if (err) {
    console.log(err);
  }
  console.log('added provided admin data', newAdmin);
  });
module.exports = router;
