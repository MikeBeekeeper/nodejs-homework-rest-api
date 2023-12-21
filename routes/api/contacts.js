const express = require("express");
const router = express.Router();

const { isValidId } = require("../../middlewares");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContactById,
  updateFavoritefield,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:id", isValidId, deleteContact);

router.put("/:id", isValidId, updateContactById);

router.patch("/:id/favorite", isValidId, updateFavoritefield);

module.exports = router;
