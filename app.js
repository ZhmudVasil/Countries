const appRoot = document.getElementById('app-root');

/*
write your code here */
const myForm = document.createElement('form');
myForm.setAttribute('method', 'post');
myForm.setAttribute('class', 'mainForm');
const headerText = document.createElement('h1');
headerText.innerText = 'Countries Search';
myForm.appendChild(headerText);

const fieldSet = document.createElement('fieldset');
const legendTitle = document.createElement('legend');
legendTitle.innerText = 'Type of Search';
fieldSet.appendChild(legendTitle);

const descriptionForRadioSelect = document.createElement('p');
descriptionForRadioSelect.innerText = 'Please choose the type of search:';
fieldSet.appendChild(descriptionForRadioSelect);

const box = document.createElement('div');
box.setAttribute('class', 'boxForRadio');

const radioRegion = document.createElement('input');
radioRegion.setAttribute('type', 'radio');
radioRegion.setAttribute('id', 'region');
radioRegion.setAttribute('class', 'radio');
radioRegion.setAttribute('name', 'search');
radioRegion.setAttribute('value', 'region');
const labelForRadioRegion = document.createElement('label');
labelForRadioRegion.innerText = 'By Region';
labelForRadioRegion.setAttribute('for', 'region');

const radioLanguage = document.createElement('input');
radioLanguage.setAttribute('type', 'radio');
radioLanguage.setAttribute('id', 'language');
radioLanguage.setAttribute('class', 'radio');
radioLanguage.setAttribute('name', 'search');
radioLanguage.setAttribute('value', 'language');
const labelForRadioLanguage = document.createElement('label');
labelForRadioLanguage.innerText = 'By Language';
labelForRadioLanguage.setAttribute('for', 'language');

box.appendChild(radioRegion);
box.appendChild(labelForRadioRegion);
box.appendChild(radioLanguage);
box.appendChild(labelForRadioLanguage);
fieldSet.appendChild(box);
myForm.appendChild(fieldSet);

const fieldSetSelect = document.createElement('fieldset');
const legendTitleSelect = document.createElement('legend');
legendTitleSelect.innerText = 'Search query';
fieldSetSelect.appendChild(legendTitleSelect);

const descriptionForSearch = document.createElement('p');
descriptionForSearch.innerText = 'Please choose search query:';

const selectBy = document.createElement('select');
selectBy.setAttribute('id', 'search');
selectBy.setAttribute('class', 'search');
selectBy.setAttribute('disabled', '');
const optionByselect = document.createElement('option');
optionByselect.innerText = 'Select value';
selectBy.appendChild(optionByselect);

myForm.appendChild(descriptionForSearch);
myForm.appendChild(selectBy);

fieldSetSelect.appendChild(descriptionForSearch);
fieldSetSelect.appendChild(selectBy);
myForm.appendChild(fieldSetSelect);

const headerDescription = document.createElement('h3');
headerDescription.setAttribute('id', 'headerDescription');
headerDescription.innerText = 'No items, please choose search query';
myForm.appendChild(headerDescription);
appRoot.appendChild(myForm);

const regionsList = externalService.getRegionsList();
const languagesList = externalService.getLanguagesList();

let searchCountrys = document.querySelectorAll('.radio');
searchCountrys.forEach((box) => {
  box.addEventListener('change', function (e) {
    let target = e.target;
    selectBy.removeAttribute('disabled');
    const headerDescriptionClear = document.getElementById('headerDescription');
    headerDescriptionClear && headerDescriptionClear.remove();
    let optionAll = selectBy.querySelectorAll('option');
    for (let i = 0; i < optionAll.length; i++) {
      selectBy.removeChild(optionAll[i]);
    }
    if (target.id === 'region') {
      regionsList.forEach((region) => {
        let optionList = document.createElement('option');
        optionList.innerText = region;
        selectBy.appendChild(optionList);
      });
    } else {
      languagesList.forEach((region) => {
        let optionList = document.createElement('option');
        optionList.innerText = region;
        selectBy.appendChild(optionList);
      });
    }
    createTable(search());
    let sortTableName = document.getElementById('sortName');
    let sortTableArea = document.getElementById('sortArea');
    sortTableArea.innerText = '⇕';
    sortTableName.innerText = '⇕';
  });
});

let searchCountry = document.getElementById('search');
searchCountry.addEventListener('change', function () {
  createTable(search());
  let sortTableName = document.getElementById('sortName');
  let sortTableArea = document.getElementById('sortArea');
  sortTableArea.innerText = '⇕';
  sortTableName.innerText = '⇕';
});

// Functions for search countries in file
// ->Start
function search() {
  let valueForTable;
  radioRegion.checked
    ? valueForTable = externalService.getCountryListByRegion(regionsList[selectBy.selectedIndex])
    : valueForTable = externalService.getCountryListByLanguage(languagesList[selectBy.selectedIndex]);
  return valueForTable;
}
// ->End

// Functions for sorting countries in table
// ->Start
let negative = -1;
function sortUpCountryName(countryNameFirst, countryNameSecond) {
  if (countryNameFirst.name > countryNameSecond.name) {
    return 1;
  }
  if (countryNameFirst.name < countryNameSecond.name) {
    return negative;
  }
  return 0;
}
function sortDownCountryName(countryNameFirst, countryNameSecond) {
  if (countryNameFirst.name < countryNameSecond.name) {
    return 1;
  }
  if (countryNameFirst.name > countryNameSecond.name) {
    return negative;
  }
  return 0;
}
function sortUpArea(areaFirst, areaSecond) {
  if (areaFirst.area > areaSecond.area) {
    return 1;
  }
  if (areaFirst.area < areaSecond.area) {
    return negative;
  }
  return 0;
}
function sortDownArea(areaFirst, areaSecond) {
  if (areaFirst.area < areaSecond.area) {
    return 1;
  }
  if (areaFirst.area > areaSecond.area) {
    return negative;
  }
  return 0;
}
function sortName(sortTableText, arrayCountrys) {
  if (sortTableText.innerText === '⇕') {
    sortTableText.innerText = '⇩';
    arrayCountrys.sort(sortUpCountryName);
  } else if (sortTableText.innerText === '⇩') {
    sortTableText.innerText = '⇧';
    arrayCountrys.sort(sortDownCountryName);
  } else {
    sortTableText.innerText = '⇩';
    arrayCountrys.sort(sortUpCountryName);
  }
  return arrayCountrys;
}
function sortArea(sortTableText, arrayCountrys) {
  if (sortTableText.innerText === '⇕') {
    sortTableText.innerText = '⇩';
    arrayCountrys.sort(sortUpArea);
  } else if (sortTableText.innerText === '⇩') {
    sortTableText.innerText = '⇧';
    arrayCountrys.sort(sortDownArea);
  } else {
    sortTableText.innerText = '⇩';
    arrayCountrys.sort(sortUpArea);
  }
  return arrayCountrys;
}
// ->End

// Functions for highlighted row in table
// ->Start
function rowElementActive() {
  let lightRows = document.querySelectorAll('.tableBodyCountrys tr');
  if (lightRows) {
    lightRows.forEach((lightRow) => {
      lightRow.addEventListener('mouseenter', () => {
        reset();
        lightRow.classList.add('active');
      });
      lightRow.addEventListener('mouseleave', () => {
        reset();
      });
    });
    function reset() {
      lightRows.forEach((lightRow) => {
        lightRow.classList.remove('active');
      });
    }
  }
}
// ->End

// Functions for create table
// ->Start
function createTable(valueForTable) {
  const getTable = document.getElementById('table-id');
  if (!getTable) {
    //Create table
    const tableCountrys = document.createElement('table');
    tableCountrys.setAttribute('class', 'tableCountrys');
    tableCountrys.setAttribute('id', 'table-id');
    const theadTable = document.createElement('thead');
    const tbodyTable = document.createElement('tbody');
    tbodyTable.setAttribute('class', 'tableBodyCountrys');
    tbodyTable.setAttribute('id', 'tableBody-id');

    // Header of table
    const headerTable = `<th>Country name<span class="btn" id="sortName">⇕</span></th>
<th>Capital</th><th>World Region</th><th>Languages</th>
<th>Area<span class="btn" id="sortArea">⇕</span></th><th>Flag</th>`;
    theadTable.innerHTML = headerTable;
    tableCountrys.appendChild(theadTable);

    // Body of table
    valueForTable.forEach((country) => {
      const trTable = document.createElement('tr');
      let trTableInclude = `<td>${country.name}</td> 
  <td>${country.capital}</td>
  <td>${country.region}</td>
  <td>${Object.values(country.languages).join(', ')}</td>
  <td>${country.area}</td>
  <td><img src="https://flagcdn.com/32x24/${country.flagURL.slice(28, 30)}.png"></td>`;
      trTable.innerHTML = trTableInclude;
      tbodyTable.appendChild(trTable);
    });
    tableCountrys.appendChild(tbodyTable);

    // Add table to form
    myForm.appendChild(tableCountrys);
    let sortTableName = document.getElementById('sortName');
    sortTableName.addEventListener('click', () => {
      createTable(sortName(sortTableName, search()));
      sortTableArea.innerText = '⇕';
    });
    let sortTableArea = document.getElementById('sortArea');
    sortTableArea.addEventListener('click', () => {
      createTable(sortArea(sortTableArea, search()));
      sortTableName.innerText = '⇕';
    });
    rowElementActive();
  } else {
    const tableBodyClear = document.getElementById('tableBody-id');
    tableBodyClear && tableBodyClear.remove();
    const tbodyTable = document.createElement('tbody');
    tbodyTable.setAttribute('class', 'tableBodyCountrys');
    tbodyTable.setAttribute('id', 'tableBody-id');

    // Body of table
    valueForTable.forEach((country) => {
      const trTable = document.createElement('tr');
      let trTableInclude = `<td>${country.name}</td> 
  <td>${country.capital}</td>
  <td>${country.region}</td>
  <td>${Object.values(country.languages).join(', ')}</td>
  <td>${country.area}</td>
  <td><img src="https://flagcdn.com/32x24/${country.flagURL.slice(28, 30)}.png"></td>`;
      trTable.innerHTML = trTableInclude;
      tbodyTable.appendChild(trTable);
    });
    getTable.appendChild(tbodyTable);

    // Add table to form
    myForm.appendChild(getTable);

    rowElementActive();
  }
}
// ->Start

// ⇕ ⇕ &#8661
// ⇧ ⇧ &#8679
// ⇩ ⇩ &#8681

/*
list of all regions
externalService.getRegionsList();
list of all languages
externalService.getLanguagesList();
get countries list by language
externalService.getCountryListByLanguage()
get countries list by region
externalService.getCountryListByRegion()
*/
