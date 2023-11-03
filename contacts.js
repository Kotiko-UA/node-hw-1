import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';
const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = async (contactList) =>
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

export async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

export async function getContactById(contactId) {
  const contactsList = await listContacts();
  const result = contactsList.find((contact) => contact.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const contactList = await listContacts();
  const filmIdx = contactList.findIndex((contact) => contact.id === contactId);
  if (filmIdx === -1) {
    return null;
  }
  const [result] = contactList.splice(filmIdx, 1);
  await updateContacts(contactList);
  return result;
}

export async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactList.push(newContact);
  await updateContacts(contactList);
  return newContact;
}
