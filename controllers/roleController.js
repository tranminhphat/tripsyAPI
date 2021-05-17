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

/* Controller for GET: /api/roles/:id */
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleService.getRoleById(id);
    return res.status(200).json({ role });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};

/* Controller for POST: /api/roles */
exports.createRole = async (req, res) => {
  const { model } = req.body;
  try {
    const role = await roleService.createRole(model);
    return res.status(200).json({ role });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};

/* Controller for PUT: /api/roles/:id */
exports.updateRoleById = async (req, res) => {
  const { updatedProperties } = req.body;
  const { id } = req.params;
  try {
    const role = await roleService.updateRoleById(id, updatedProperties);
    return res.status(200).json({ role });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};

/* Controller for DELETE: /api/roles/:id */
exports.deleteRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleService.deleteRoleById(id);
    if (!role) {
      console.error(err);
      return res.status(400).json();
    }
    return res.status(200).json({ role });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};
