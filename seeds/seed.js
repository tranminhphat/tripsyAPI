const _ = require("lodash");
const User = require("../models/User");
const Role = require("../models/Role");
const userService = require("../services/userService");
const usersData = require("./users.json");
const rolesData = require("./roles.json");

(function seedUsers() {
  usersData.forEach(async (userData) => {
    const user = await User.findOne({
      username: userData.username,
    });

    if (!user) {
      userService.createUser({ ...userData });
    }
  });
})();

(function seedRoles() {
  rolesData.forEach(async (roleData) => {
    const role = await Role.findOne({
      roleName: roleData.roleName,
    });

    if (!role) {
      await Role.create({ ...roleData });
    }
  });
})();
