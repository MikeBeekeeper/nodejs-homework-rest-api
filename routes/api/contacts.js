const express = require("express");
const router = express.Router();
const { validateBody, isOwnerAuthenticate } = require("../../middlewares");
const { schemas } = require("../../helpers");
const { addSchema, updateFavoriteSchema } = schemas;

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
router.post("/", authenticate, validateBody(addSchema), addContact);
router.delete(
  "/:id",
  authenticate,
  isValidId,
  isOwnerAuthenticate,
  deleteContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(addSchema),
  updateContactById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateFavoritefield
);

module.exports = router;
