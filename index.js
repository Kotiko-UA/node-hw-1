import * as contactFunc from './contacts.js';
import { Command } from 'commander';
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contactFunc.listContacts();
      return console.log(allContacts);
    case 'get':
      const getContact = await contactFunc.getContactById(id);
      return console.log(getContact);
    case 'add':
      const addContact = await contactFunc.addContact(name, email, phone);
      return console.log(addContact);
    case 'remove':
      const removeContact = await contactFunc.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}
invokeAction(argv);
