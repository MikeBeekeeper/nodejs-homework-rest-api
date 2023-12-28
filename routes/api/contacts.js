const express = require("express");
const router = express.Router();

const { isValidId, authenticate } = require("../../middlewares");
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContactById,
  updateFavoritefield,
} = require("../../controllers/contacts");

router.get("/", authenticate, getAllContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, addContact);

router.delete("/:id", authenticate, isValidId, deleteContact);

router.put("/:id", authenticate, isValidId, updateContactById);

router.patch("/:id/favorite", authenticate, isValidId, updateFavoritefield);

module.exports = router;
