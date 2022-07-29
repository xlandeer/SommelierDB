namespace Utils {
  export function appendElements(parent: Element, ...nodes: HTMLElement[]) {
    for (const node of nodes) {
      parent.appendChild(node);
    }
  }
  export function createElementWithAttributes(
    name: string,
    ...attributes: [string, string][]
  ) {
    let element = document.createElement(name);
    for (const attribute of attributes) {
      element.setAttribute(attribute[0], attribute[1]);
    }
    return element;
  }

  export async function uploadFile() {
    let formData = new FormData();
    let files = imageUpload.files;

    if (files) {
      formData.append("file", files[0]);

      const response = await fetch("php/upload.php", {
        method: "POST",
        body: formData,
      });
      //console.log(await response);
    }
  }
}

interface WhiskeyInfo {
  [key: string]: string | number

}

class Whiskey {
  private whiskeyInfos: WhiskeyInfo;
  private noseNotes: string[];
  private tasteNotes: string[];

  constructor(
    private imgPath: string,
    private name: string,
    private distillery: string,
    private originCountry: string,
    private yearsAged: number,
    private type: string,
    private alcPerc: number,
    private author: string,
    noseNotes: string[],
    tasteNotes: string[],
    private id?: number
  ) {
    this.whiskeyInfos = {
      "Whiskey Name": name,
      "Whiskey Distillery": distillery,
      "Origin Country": originCountry,
      "Years Aged": yearsAged,
      "Whiskey Type": type,
      "Alcohol Percentage": alcPerc + "%"
    }
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
    let deleteBtn = Utils.createElementWithAttributes(
      "input",
      ["type", "image"],
      ["src", "images/x_btn.svg"]
    );

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
    Utils.appendElements(
      whiskeyWrapper,
      image,
      nameLabel,
      document.createElement("hr"),
      infoWrapper,
      document.createElement("hr"),
      noseWrapper,
      tasteWrapper,
      deleteBtn
    );
    Utils.appendElements(parentDOMElement, whiskeyWrapper);
  }

  static loadFromStorage(attr: string = "name", searchFilter: string = "") {
    $.ajax({
      url: "php/get.php",
      type: "GET",
      data: { attribute: attr, searchFilter: searchFilter },
      success: function (returnData) {
        parentDOMElement.innerHTML = "";

        if (returnData) {
          for (const whiskey of JSON.parse(returnData)) {
            const newWhiskey: Whiskey = new Whiskey(
              whiskey.imageUrl,
              whiskey.name,
              whiskey.distillery,
              whiskey.originCountry,
              whiskey.yearsAged,
              whiskey.type,
              whiskey.alcPerc,
              whiskey.author,
              whiskey.noseNotes,
              whiskey.tasteNotes,
              whiskey.id
            );
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

  static deleteFromStorage(whiskey: Whiskey) {
    $.ajax({
      url: "php/post.php", // url where the data should be sent
      type: "POST", // http method

      // all data || notation in JSON
      data: { intention: "delete", id: whiskey.id, imgPath: "../"+whiskey.imgPath },
      success: function (data, status, xhr) {
        console.log(xhr.responseText);
        
        Whiskey.loadFromStorage();
      },
    });
  }

  static saveToStorage(whiskey: Whiskey) {
    // $.ajax({
    //     method: "POST",
    //     url: "index.php",
    //     data: {name: Whiskey.name, imageUrl: Whiskey.imgPath}
    // }).catch(function(response) {
    //     console.log(response);
    // });
    $.ajax({
      url: "php/post.php", // url where the data should be sent
      type: "POST", // http method

      // all data || notation in JSON
      data: {
        intention: "save",
        imageUrl: whiskey.imgPath,
        name: whiskey.name,
        distillery: whiskey.distillery,
        origin_country: whiskey.originCountry,
        years_aged: whiskey.yearsAged,
        type: whiskey.type,
        alc_perc: whiskey.alcPerc,
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
const parentDOMElement = document.querySelector(
  ".whiskey-section"
) as HTMLDivElement;

//Inputs
const inputWhiskeyName = document.querySelector(
  ".input-wrapper .whiskey-data-wrapper .name"
) as HTMLInputElement;
const inputWhiskeyDistillery = document.querySelector(
  ".input-wrapper .whiskey-data-wrapper .distillery"
) as HTMLInputElement;
const inputOriginCountry = document.querySelector(
  ".input-wrapper .whiskey-data-wrapper .origin_country"
) as HTMLInputElement;
const inputYearsAged = document.querySelector(
  ".input-wrapper .whiskey-data-wrapper .years_aged"
) as HTMLInputElement;
const inputType = document.querySelector(
  ".input-wrapper .whiskey-data-wrapper .type"
) as HTMLInputElement;
const inputAlcPerc = document.querySelector(
  ".input-wrapper .whiskey-data-wrapper .alc_perc"
) as HTMLInputElement;
const inputNoseNote = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .add-nose-note"
) as HTMLInputElement;
const inputTasteNote = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .add-taste-note"
) as HTMLInputElement;
const inputAuthor = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .author"
) as HTMLInputElement;

//Divs
const noseNoteWrapper = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .nose-note-wrapper"
) as HTMLDivElement;
const tasteNoteWrapper = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .taste-note-wrapper"
) as HTMLDivElement;

//Buttons
const addNoseNoteBtn = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .add-nose-note-btn"
) as HTMLButtonElement;
const addTasteNoteBtn = document.querySelector(
  ".input-wrapper .whiskey-note-wrapper .add-taste-note-btn"
) as HTMLButtonElement;

let currentNoseNotes: string[] = new Array();
let currentTasteNotes: string[] = new Array();

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

document
  .querySelector(".input-wrapper .add-whiskey-btn")
  ?.addEventListener("click", async () => {
    Utils.uploadFile().then(() => {
      let imagePath = "ERROR";
      if (imageUpload.files) {
        imagePath = "images/" + imageUpload.files[0].name;
      }
      if (inputWhiskeyName.value && imagePath) {
        const newWhiskey: Whiskey = new Whiskey(
          imagePath,
          inputWhiskeyName.value,
          inputWhiskeyDistillery.value,
          inputOriginCountry.value,
          parseInt(inputYearsAged.value),
          inputType.value,
          parseInt(inputAlcPerc.value),
          inputAuthor.value,
          currentNoseNotes,
          currentTasteNotes
        );

        Whiskey.saveToStorage(newWhiskey);
        inputWhiskeyName.value = "";
        inputWhiskeyDistillery.value = "";
        inputOriginCountry.value = "";
        inputYearsAged.value = "";
        inputType.value = "";
        inputAlcPerc.value = "";
        inputAuthor.value = "";
        tasteNoteWrapper.innerHTML = "";
        noseNoteWrapper.innerHTML = "";
        imageUpload.value = "";
        currentNoseNotes = new Array();
        currentTasteNotes = new Array();
      }
    });
  });

const whiskeyFilter = document.querySelector(
  ".search-wrapper .whiskey-filter"
) as HTMLInputElement;

const attributeToSearch = document.querySelector(
  ".search-wrapper .search-for-select"
) as HTMLSelectElement;

const imageUpload = document.querySelector(
  ".input-wrapper #image-upload"
) as HTMLInputElement;

whiskeyFilter.addEventListener("input", (event: any) => {
  Whiskey.loadFromStorage(attributeToSearch.value, whiskeyFilter.value);
});
attributeToSearch.addEventListener("change", () => {
  Whiskey.loadFromStorage(attributeToSearch.value, whiskeyFilter.value);
});

document.addEventListener("DOMContentLoaded", () => {
  Whiskey.loadFromStorage();
});
