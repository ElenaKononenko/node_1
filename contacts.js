import fs from "fs";
import path from "path";
// const __dirname = path.resolve();
let contactsPath = path.join(path.resolve(), "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error");
    } else {
      console.table(JSON.parse(data));
    }
  });
}

function getContactById(id) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error");
    } else {
      const arrData = JSON.parse(data);
      const contact = arrData.find((el) => el.id === +id);
      console.table(contact);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error");
    } else {
      const arrData = JSON.parse(data);
      const contacts = arrData.filter((el) => el.id !== +contactId);

      fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
          throw err;
        }
        console.table(contacts);
        console.log("Без удаленного контакта");
      });
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
  });
}

function addContact(name, email, phone) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const contact = { id: getRandomInt(11, 98), name, email, phone };
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error");
    } else {
      const arrData = JSON.parse(data);
      arrData.push(contact);

      fs.writeFile(contactsPath, JSON.stringify(arrData), (err) => {
        if (err) {
          throw err;
        }
        console.table(arrData);
        console.table(contact);
        console.log("Добавленый контакт");
      });
    }
  });
}
export default { listContacts, getContactById, removeContact, addContact };
