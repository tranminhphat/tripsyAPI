const themeService = require("../services/themeService");

/* Controller for GET: /api/themes/id */
exports.getThemeById = async (req, res) => {
  const { id } = req.params;
  try {
    const theme = await themeService.getThemeById(id);
    return res.status(200).json({ theme });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};

/* Controller for GET: /api/themes */
exports.getThemes = async (req, res) => {
  try {
    const themes = await themeService.getThemes();
    return res.status(200).json({ themes });
  } catch (err) {
    console.error(err);
    return res.status(400).json({});
  }
};

/* Controller for POST: /api/themes */
exports.createTheme = async (req, res) => {
  const { model } = req.body;
  try {
    const theme = await themeService.createTheme(model);
    return res.status(200).json({ theme });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};

/* Controller for PUT: /api/themes/:id */
exports.updateThemeById = async (req, res) => {
  const { updatedProperties } = req.body;
  const { id } = req.params;
  try {
    const theme = await themeService.updateThemeById(id, updatedProperties);
    return res.status(200).json({ theme });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};

/* Controller for DELETE: /api/themes/:id */
exports.deleteThemeById = async (req, res) => {
  const { id } = req.params;
  try {
    const theme = await themeService.deleteThemeById(id);
    if (!theme) {
      console.error(err);
      return res.status(400).json();
    }
    return res.status(200).json({ theme });
  } catch (err) {
    console.error(err);
    return res.status(400).json();
  }
};
