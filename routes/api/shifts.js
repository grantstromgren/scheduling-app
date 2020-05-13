const express = require("express");
const request = require("request");
const config = require("config");
const moment = require("moment");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// Middleware
const auth = require("middleware/auth");

// Schemas
const Shift = require("models/Shift");
const User = require("models/User");
const Role = require("models/Role");

// @route    GET api/shifts
// @desc     Get all shifts for user, or all shifts across all users for admin
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    // Check role
    let user = await User.findById(req.user.id).populate("role");

    let clause = user.role.name == "admin" ? {} : { user: req.user.id };
    const shifts = await Shift.find(clause)
      .populate("user")
      .sort({ from: "asc" });

    if (shifts.length == 0) {
      res.json({ message: "No shifts exist" });
    } else {
      res.json(shifts);
    }

    res.json(shifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/shifts/{id}
// @desc     Get specific shift by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id).sort({ from: "asc" });

    if (!shift) {
      res.status(404).json({ message: "This shift does not exist" });
    } else {
      res.json(shift);
    }

    res.json(shift);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/shifts/{from}/{to}
// @desc     Get all shifts within the defined parameters.
// @access   Public
router.get("/:from/:to", auth, async (req, res) => {
  try {
    // If a value isn't filled in for From, choose today. If a value isn't filled in for To, choose tomorrow.
    var from =
      req.params.from === ""
        ? moment().format("YYYY/MM/DD HH:mm:ssz")
        : req.params.from;
    var to =
      req.params.to === ""
        ? moment()
            .add(1)
            .format("YYYY/MM/DD HH:mm:ssz")
        : req.params.to;

    let clause = user.role.name == "admin" ? {} : { user: req.user.id };
    const shifts = await Shift.find(clause)
      .where("from")
      .lte(to)
      .where("to")
      .gte(from)
      .populate("user", ["email"])
      .sort({ from: "asc" });

    if (shifts.length == 0) {
      res.json({ message: "No shifts exist in time range" });
    } else {
      res.json(shifts);
    }

    res.json(shifts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/shifts
// @desc     Create a new shift, or update an existing one
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("from", "From is required")
        .not()
        .isEmpty(),
      check("to", "To is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.id).populate("role");
    let assignedUserId = req.user.id;

    // If param email passed, validate user is of role admin
    if (req.body.email !== undefined) {
      if (user.role.name !== "admin") {
        res
          .status(401)
          .json({ message: "Only admins can create shifts for other users." });
      } else {
        assignedUserId = await User.find({ email: req.body.email });
      }
    }

    // Build shift object
    const shiftFields = {};
    shiftFields.user = assignedUserId;
    shiftFields.to = req.body.to;
    shiftFields.from = req.body.from;

    try {
      let shift;

      // Check for id being passed in body to identify update vs create
      if (req.body.id !== undefined) {
        // Find shift by id
        shift = await Shift.findById(req.body.id);

        if (shift) {
          // Validate privileges to update shift
          if (user.role.name !== "admin") {
            if (shift.user != req.user.id) {
              // Not authorized
              return res.status(400).send("Not authorized.");
            }
          }

          shift.to = req.body.to;
          shift.from = req.body.from;
        } else {
          // No shift found, return 404
          return res.json({ message: "Shift not found." });
        }
      } else {
        // No id passed, create new shift
        shift = new Shift(shiftFields);
      }

      /**
       * To validate this shift does not overlap an existing shift, we will run a query to look for shifts where the time of either the from or to is within the range.
       * We will also check for a shift completely overlapping another shift to catch that too.
       *
       */
      overlappingShift = await Shift.find({
        $and: [
          { user: assignedUserId },
          {
            $or: [
              {
                $and: [
                  {
                    from: { $lte: shift.from },
                    to: { $gt: shift.from }
                  }
                ]
              },
              {
                $and: [
                  {
                    from: { $lt: shift.to },
                    to: { $gte: shift.to }
                  }
                ]
              },
              {
                $and: [
                  {
                    from: { $gt: shift.from },
                    to: { $lt: shift.to }
                  }
                ]
              }
            ]
          }
        ]
      });

      // If an id is passed in the body, we'll ignore that result in the overlappingShifts return
      if (req.body.id !== undefined && overlappingShift.length > 0) {
        overlappingShift = overlappingShift.filter(
          shift => shift.id !== req.body.id
        );
      }

      if (overlappingShift.length > 0) {
        // Shift overlaps with an existing shift
        return res.status(400).json({
          errors: [{ message: "Shift cannot overlap with an existing shift." }]
        });
      }

      // Create/update
      await shift.save();
      res.json(shift);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/shifts/{id}
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Remove profile
    let shift = await Shift.findByIdAndRemove(req.params.id);

    if (shift) {
      res.json({ message: "Shift deleted" });
    } else {
      res.json({ message: "Shift does not exist." });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
