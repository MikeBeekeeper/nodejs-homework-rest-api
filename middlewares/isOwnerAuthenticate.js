const Contact = require("../models/contact");

const isOwnerAuthenticate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    const owner = contact.owner.toString();
    const user = req.user._id.toString();
    const isOwner = owner === user;

    if (!isOwner) {
      HttpError(404, "Not found");
    }

    next();
  } catch {
    HttpError(404, "Not found");
  }
};

module.exports = isOwnerAuthenticate;
