const roleService = require("../services/roleService");

/* Controller for GET: /api/roles */
exports.getRoles = async (_, res) => {
  try {
    const roles = await roleService.getRoles();
    return res.status(200).json({ roles });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};
