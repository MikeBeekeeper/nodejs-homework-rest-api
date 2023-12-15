const fs = require('fs/promises')
const path = require('path')
const nanoid = require('nanoid')

const contactsPath = path.join(__dirname, 'contacts.json');

const getContactslist = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList);
}

const getContactById = async (contactId) => {
  const contactList = await getContactslist();
  const contact = contactList.find((item) => item.id === contactId);
  return contact || null;
}

const removeContact = async (contactId) => {
  const contactList = await getContactslist();
  const contactIndex = contactList.findIndex((item) => item.id === contactId);

  if (contactIndex !== -1) {
    contactList.splice(contactIndex, 1);
    fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    return contactList;
  }
}

const addContact = async (body) => {
    const { name, email, phone } = body;
    const contactList = await getContactslist();
    const newContact = {id: nanoid(), name, email, phone}
    contactList.push(newContact)
    fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2))

    return newContact
}

const updateContact = async (contactId, body) => {
  const contactList = await getContactslist();
  const index = contactList.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  contactList[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2))
  return contactList[index]
}

module.exports = {
  getContactslist,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
