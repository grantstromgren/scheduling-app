const path = require("path");
const config = require("config");
const bcrypt = require("bcryptjs");
const progress = require("progress");

// Progress bar for better visualization
var bar = new progress(":message - :bar (:current / :total)", { total: 4 });

// Connect to database
const connectDB = require("./config/db");

// Import schemas
const Role = require("./models/Role");
const User = require("./models/User");

const seedRoles = async () => {
  console.log("Starting seed, this should be really quick...");
  const db = await connectDB();

  // We will create both roles
  // First, create the admin role
  let role = await Role.findOne({ name: "admin" });

  if (role) {
    bar.tick({ message: "Role exists, skipping" });
  } else {
    role = new Role({
      name: "admin"
    });
    await role.save();
    bar.tick({ message: "Admin role created." });
  }

  // Second, create the user role
  role = await Role.findOne({ name: "user" });

  if (role) {
    bar.tick({ message: "Role exists, skipping" });
  } else {
    role = new Role({
      name: "user"
    });
    await role.save();
    bar.tick({ message: "User role created." });
  }

  // Next, we will create two example users
  // First, the admin@schedulingapp.com user
  let user = await User.findOne({ email: "admin@schedulingapp.com" });

  if (user) {
    bar.tick({ message: "User exists, skipping" });
  } else {
    user = new User({
      email: "admin@schedulingapp.com"
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash("admin1234", salt);
    role = await Role.findOne({ name: "admin" });
    user.role = role.id;

    await user.save();
    bar.tick({ message: "User admin@schedulingapp.com created." });
  }

  // Second, the user@schedulingapp.com user
  user = await User.findOne({ email: "user@schedulingapp.com" });

  if (user) {
    bar.tick({ message: "User exists, skipping" });
  } else {
    user = new User({
      email: "user@schedulingapp.com"
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash("user1234", salt);
    role = await Role.findOne({ name: "user" });
    user.role = role.id;

    await user.save();
    bar.tick({ message: "User user@schedulingapp.com created." });
  }

  // All done
  console.log("Finished!");
  process.exit();
};

seedRoles();
