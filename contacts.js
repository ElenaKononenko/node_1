import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
// let contactsPath = path.join(path.resolve(), "db", "contacts.json");
let contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (err) {
    console.log("err :", err);
  }
}

async function getContactById(id) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const arrData = JSON.parse(data);
    const contact = arrData.find((el) => el.id === +id);
    console.table(contact);
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const arrData = JSON.parse(data);
    const contacts = arrData.filter((el) => el.id != contactId);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.table(contacts);
    console.log("Без удаленного контакта");
  } catch (err) {
    console.log(err);
  }

  //   const arrData = JSON.parse(data);
  //   const contact = arrData.find((el, i) => {
  //     if (el.id === +contactId) {
  //       console.log(i);
  //       arrData.splice(i, 1);
  //       return el;
  //     }
  //   });

  //   fs.writeFile(contactsPath, JSON.stringify(arrData), (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.table(contact);
  //     console.log("Удаленный контакт");
  //   });
}

async function addContact(name, email, phone) {
  try {
    const contact = { id: uuid(), name, email, phone };

    const data = await fs.readFile(contactsPath);
    const arrData = JSON.parse(data);

    const contactsList = JSON.stringify([...arrData, contact], null, "\t");
    const add = await fs.writeFile(contactsPath, contactsList);

    console.table(contact);
  } catch (err) {
    console.log(err);
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
