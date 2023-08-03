const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const p = path.join(rootDir, "data", "data.json");

function readAllFile(cb) {
  fs.readFile(p, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    readAllFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  // save() {
  //   readAllFile((cb) => {});
  //   fs.readFile(p, (err, data) => {
  //     if (!err) {
  //       let products = [];
  //       if (data.length == 0) {
  //         products.push(this);
  //         fs.writeFile(p, JSON.stringify(products), (err) => {
  //           console.log(err);
  //         });
  //       } else {
  //         products = Array.from(JSON.parse(data));
  //         products.push(this);
  //         fs.writeFile(p, JSON.stringify(products), (err) => {
  //           console.log(err);
  //         });
  //       }
  //     }
  //   });
  // }

  static fetchAll(cb) {
    readAllFile(cb);
  }
};
