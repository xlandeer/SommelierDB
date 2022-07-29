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
var _a;
var Utils;
(function (Utils) {
    function appendElements(parent, ...nodes) {
        for (const node of nodes) {
            parent.appendChild(node);
        }
    }
    Utils.appendElements = appendElements;
    function createElementWithAttributes(name, ...attributes) {
        let element = document.createElement(name);
        for (const attribute of attributes) {
            element.setAttribute(attribute[0], attribute[1]);
        }
        return element;
    }
    Utils.createElementWithAttributes = createElementWithAttributes;
    function uploadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let formData = new FormData();
            let files = imageUpload.files;
            if (files) {
                formData.append("file", files[0]);
                const response = yield fetch("php/upload.php", {
                    method: "POST",
                    body: formData,
                });
                //console.log(await response);
            }
        });
    }
    Utils.uploadFile = uploadFile;
})(Utils || (Utils = {}));
class Whiskey {
    constructor(imgPath, name, distillery, originCountry, yearsAged, type, additionalTraits, author, noseNotes, tasteNotes, id) {
        this.imgPath = imgPath;
        this.name = name;
        this.distillery = distillery;
        this.originCountry = originCountry;
        this.yearsAged = yearsAged;
        this.type = type;
        this.additionalTraits = additionalTraits;
        this.author = author;
        this.id = id;
        this.whiskeyInfos = {
            "Whiskey Name": name,
            "Whiskey Distillery": distillery,
            "Origin Country": originCountry,
            "Years Aged": yearsAged,
            "Whiskey Type": type,
            "Additional Traits": additionalTraits
        };
        this.noseNotes = [...new Set(noseNotes)];
        this.tasteNotes = [...new Set(tasteNotes)];
    }
    addRepresentation() {
        //Create every Element with Attributes
        let whiskeyWrapper = Utils.createElementWithAttributes("div", [
            "class",
            "whiskey-wrapper",
        ]);
        let image = Utils.createElementWithAttributes("img", ["src", this.imgPath]);
        let nameLabel = Utils.createElementWithAttributes("h2");
        nameLabel.textContent = this.name;
        let deleteBtn = Utils.createElementWithAttributes("input", ["type", "image"], ["src", "images/x_btn.svg"]);
        let infoWrapper = Utils.createElementWithAttributes("ul", [
            "class",
            "info-wrapper",
        ]);
        let infoHeader = document.createElement('h3');
        infoHeader.textContent = "Info: ";
        infoWrapper.append(infoHeader);
        for (const info in this.whiskeyInfos) {
            let noteElement = document.createElement("li");
            noteElement.textContent = info + ": " + this.whiskeyInfos[info];
            infoWrapper.appendChild(noteElement);
        }
        //Add DeleteBtn Event Listener
        const copy = this;
        deleteBtn.addEventListener("click", () => {
            Whiskey.deleteFromStorage(copy);
        });
        //generate NoseNoteList
        let noseWrapper = Utils.createElementWithAttributes("ul", [
            "class",
            "info-wrapper",
        ]);
        infoHeader = document.createElement('h3');
        infoHeader.textContent = "Nose: ";
        noseWrapper.append(infoHeader);
        for (const noseNote of this.noseNotes) {
            let noteElement = document.createElement("li");
            noteElement.textContent = noseNote;
            noseWrapper.appendChild(noteElement);
        }
        let tasteWrapper = Utils.createElementWithAttributes("ul", [
            "class",
            "info-wrapper",
        ]);
        infoHeader = document.createElement('h3');
        infoHeader.textContent = "Taste: ";
        tasteWrapper.append(infoHeader);
        for (const tasteNote of this.tasteNotes) {
            let noteElement = document.createElement("li");
            noteElement.textContent = tasteNote;
            tasteWrapper.appendChild(noteElement);
        }
        //Append Elements to their corresponding Parent
        Utils.appendElements(whiskeyWrapper, image, nameLabel, document.createElement("hr"), infoWrapper, document.createElement("hr"), noseWrapper, tasteWrapper, deleteBtn);
        Utils.appendElements(parentDOMElement, whiskeyWrapper);
    }
    static loadFromStorage(attr = "name", searchFilter = "") {
        $.ajax({
            url: "php/get.php",
            type: "GET",
            data: { attribute: attr, searchFilter: searchFilter },
            success: function (returnData) {
                parentDOMElement.innerHTML = "";
                if (returnData) {
                    for (const whiskey of JSON.parse(returnData)) {
                        const newWhiskey = new Whiskey(whiskey.imageUrl, whiskey.name, whiskey.distillery, whiskey.originCountry, whiskey.yearsAged, whiskey.type, whiskey.additionalTraits, whiskey.author, whiskey.noseNotes, whiskey.tasteNotes, whiskey.id);
                        newWhiskey.addRepresentation();
                    }
                }
            },
            error: function (xhr, status, error) {
                let errorMessage = xhr.responseText;
                console.log("Error - " + errorMessage);
            },
        });
    }
    static deleteFromStorage(whiskey) {
        $.ajax({
            url: "php/post.php",
            type: "POST",
            // all data || notation in JSON
            data: { intention: "delete", id: whiskey.id, imgPath: "../" + whiskey.imgPath },
            success: function (data, status, xhr) {
                console.log(xhr.responseText);
                Whiskey.loadFromStorage();
            },
        });
    }
    static saveToStorage(whiskey) {
        // $.ajax({
        //     method: "POST",
        //     url: "index.php",
        //     data: {name: Whiskey.name, imageUrl: Whiskey.imgPath}
        // }).catch(function(response) {
        //     console.log(response);
        // });
        $.ajax({
            url: "php/post.php",
            type: "POST",
            // all data || notation in JSON
            data: {
                intention: "save",
                imageUrl: whiskey.imgPath,
                name: whiskey.name,
                distillery: whiskey.distillery,
                origin_country: whiskey.originCountry,
                years_aged: whiskey.yearsAged,
                type: whiskey.type,
                additional_traits: whiskey.additionalTraits,
                nose_notes: whiskey.noseNotes,
                taste_notes: whiskey.tasteNotes,
                author: whiskey.author,
            },
            success: function (data, status, xhr) {
                Whiskey.loadFromStorage();
            },
            error: function (xhr, status, error) {
                let errorMessage = xhr.responseText;
                console.log("Error - " + errorMessage);
            },
        });
    }
}
//Parent Element
const parentDOMElement = document.querySelector(".whiskey-section");
//Inputs
const inputWhiskeyName = document.querySelector(".input-wrapper .whiskey-data-wrapper .name");
const inputWhiskeyDistillery = document.querySelector(".input-wrapper .whiskey-data-wrapper .distillery");
const inputOriginCountry = document.querySelector(".input-wrapper .whiskey-data-wrapper .origin_country");
const inputYearsAged = document.querySelector(".input-wrapper .whiskey-data-wrapper .years_aged");
const inputType = document.querySelector(".input-wrapper .whiskey-data-wrapper .type");
const inputAdditionalTraits = document.querySelector(".input-wrapper .whiskey-data-wrapper .additional_traits");
const inputNoseNote = document.querySelector(".input-wrapper .whiskey-note-wrapper .add-nose-note");
const inputTasteNote = document.querySelector(".input-wrapper .whiskey-note-wrapper .add-taste-note");
const inputAuthor = document.querySelector(".input-wrapper .whiskey-note-wrapper .author");
//Divs
const noseNoteWrapper = document.querySelector(".input-wrapper .whiskey-note-wrapper .nose-note-wrapper");
const tasteNoteWrapper = document.querySelector(".input-wrapper .whiskey-note-wrapper .taste-note-wrapper");
//Buttons
const addNoseNoteBtn = document.querySelector(".input-wrapper .whiskey-note-wrapper .add-nose-note-btn");
const addTasteNoteBtn = document.querySelector(".input-wrapper .whiskey-note-wrapper .add-taste-note-btn");
let currentNoseNotes = new Array();
let currentTasteNotes = new Array();
//Button action listeners
addNoseNoteBtn.addEventListener("click", () => {
    let note = inputNoseNote.value;
    currentNoseNotes.push(note);
    noseNoteWrapper.innerHTML += `<div>${note}</div>`;
    inputNoseNote.value = "";
});
addTasteNoteBtn.addEventListener("click", () => {
    let note = inputTasteNote.value;
    currentTasteNotes.push(note);
    tasteNoteWrapper.innerHTML += `<div>${note}</div>`;
    inputTasteNote.value = "";
});
(_a = document
    .querySelector(".input-wrapper .add-whiskey-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    Utils.uploadFile().then(() => {
        let imagePath = "ERROR";
        if (imageUpload.files) {
            imagePath = "images/" + imageUpload.files[0].name;
        }
        if (inputWhiskeyName.value && imagePath) {
            const newWhiskey = new Whiskey(imagePath, inputWhiskeyName.value, inputWhiskeyDistillery.value, inputOriginCountry.value, parseInt(inputYearsAged.value), inputType.value, inputAdditionalTraits.value, inputAuthor.value, currentNoseNotes, currentTasteNotes);
            Whiskey.saveToStorage(newWhiskey);
            inputWhiskeyName.value = "";
            inputWhiskeyDistillery.value = "";
            inputOriginCountry.value = "";
            inputYearsAged.value = "";
            inputType.value = "";
            inputAdditionalTraits.value = "";
            inputAuthor.value = "";
            tasteNoteWrapper.innerHTML = "";
            noseNoteWrapper.innerHTML = "";
            imageUpload.value = "";
            currentNoseNotes = new Array();
            currentTasteNotes = new Array();
        }
    });
}));
const whiskeyFilter = document.querySelector(".search-wrapper .whiskey-filter");
const attributeToSearch = document.querySelector(".search-wrapper .search-for-select");
const imageUpload = document.querySelector(".input-wrapper #image-upload");
whiskeyFilter.addEventListener("input", (event) => {
    Whiskey.loadFromStorage(attributeToSearch.value, whiskeyFilter.value);
});
attributeToSearch.addEventListener("change", () => {
    Whiskey.loadFromStorage(attributeToSearch.value, whiskeyFilter.value);
});
document.addEventListener("DOMContentLoaded", () => {
    Whiskey.loadFromStorage();
});
//# sourceMappingURL=index.js.map