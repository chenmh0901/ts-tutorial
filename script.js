"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = 'https://api.thecatapi.com/v1/images/search';
const button = document.querySelector('button');
const tableBody = document.querySelector('#table-body');
class Cat {
    constructor(id, url, width, height) {
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}
class WebDispaly {
    static addDate(date) {
        const cat = new Cat(date.id, date.url, date.width, date.height);
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
      <td>${cat.id}</td>
      <td><img src="${cat.url}" /></td>
      <td>${cat.width.toString()}</td>
      <td>${cat.height.toString()}</td>
      <td>${cat.url}</td>
      <td><a href=#>X</a></td>
    `;
        tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tableRow);
    }
    static deleteDate(deleteButton) {
        const td = deleteButton.parentElement;
        const tr = td === null || td === void 0 ? void 0 : td.parentElement;
        tr === null || tr === void 0 ? void 0 : tr.remove();
    }
}
function getJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(url).then((response) => response.json());
    });
}
function getCat() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const json = yield getJson(url);
            const data = json[0];
            WebDispaly.addDate(data);
        }
        catch (e) {
            console.log(e);
        }
    });
}
button === null || button === void 0 ? void 0 : button.addEventListener('click', getCat);
tableBody === null || tableBody === void 0 ? void 0 : tableBody.addEventListener('click', (e) => {
    WebDispaly.deleteDate(e.target);
});
