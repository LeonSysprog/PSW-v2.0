CATALOG = [];

async function help() {
    alert("Для поиска товара введите его полное наименование и нажмите \"искать\".\
    Для получения информации о товаре нажмите кнопку \"описание\".\
    Для бронирования товара нажмите кнопку \"забронировать\"");
}

async function toItem(item) {   
    let out = '';
    CATALOG.forEach(({  amountAll, amountAvailable, id, itemDescription, name, picture, price, subCathegoryID  }) => {
      
        if (item === id) {
            out = '';
            out += `
            <li class="products-element">
                <span class="products-element__name">${name}</span>
                <span class="products-element__name">${amountAvailable + " в наличии"}</span>
                <span class="card-text">${itemDescription}</span>
                <img class="products-element__img" src="${picture}" />
                <span class="products-element__price">
                    ⚡️ ${price} РУБ
                </span>
                <button class="products-element__btn" onclick="prepareMailRequest(${id})"">забронировать</button>
            </li>`;} 
    });

    const res = `
        <ul class="products-container">
            ${out}
        </ul>`;

    ROOT_PRODUCTS.innerHTML = res;
  
}

async function prepareMailRequest(item) {
    sessionStorage.setItem('itemID', item);
    console.log(sessionStorage['itemID']);
    document.location = 'mail.html';
}

function myClick() {
    let findCatalog = '';
    let inputValue = document.querySelector('.searchtext').value.toLowerCase();

    if (inputValue === "") {
        findCatalog = `
        <li class="products-element">
            <span class = "card-text">${"Пустое поле, введите данные для поиска"}</span>
        </li>`;

        const resFind = `
        <ul class="products-container">
            ${findCatalog}
        </ul>`;

        ROOT_PRODUCTS.innerHTML = resFind;
        return;
    }

    let IsFind = true;
    CATALOG.forEach(({  amountAll, amountAvailable, id, itemDescription, name, picture, price, subCathegoryID  }) => {
        comp = name.toLowerCase();
        console.log(comp);
        console.log(inputValue);
        if (comp.includes(inputValue)) {
            //console.log(comp);
            findCatalog += `
                <li class="products-element">
                <span class="products-element__name">${name}</span>
                <span class="products-element__name">${amountAvailable + " в наличии"}</span>
                <img class="products-element__img" src="${picture}" />
                <span class="products-element__price">
                    ⚡️ ${price} РУБ
                </span>
                <button class="products-element__btn" onclick="prepareMailRequest(${id})"">забронировать</button>
                <button class="products-element__btn" onclick="toItem(${id})"">описание</button>
            </li>`;
            IsFind = false;
        } 
    });

    if (IsFind) {
        findCatalog = `
        <li class="products-element">
            <span class = "card-text">${"Товаров, удовлетворяющих условию поиска, нет"}</span>
            
        </li>`;
    }

    const resFind = `
    <ul class="products-container">
        ${findCatalog}
    </ul>`;

    ROOT_PRODUCTS.innerHTML = resFind;
};

async function render() {
    let htmlCatalog = '';
      
    const response = await fetch('http://www.slavacheck.somee.com/api/Items', {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
    });
  
    CATALOG = await response.json();
    console.log(CATALOG);
    document.querySelector('.search-button').onclick = myClick;
        
    CATALOG.forEach(({ amountAll, amountAvailable, id, itemDescription, name, picture, price, subCathegoryID }) => {
        htmlCatalog += `
            <li class="products-element">
                <span class="products-element__name">${name}</span>
                <span class="products-element__name">${amountAvailable + " в наличии"}</span>
                <img class="products-element__img" src="${picture}" />
                <span class="products-element__price">
                    ⚡️ ${price} РУБ
                </span>
                <button class="products-element__btn" onclick="prepareMailRequest(${id})"">забронировать</button>
                <button class="products-element__btn" onclick="toItem(${id})"">описание</button>
            </li>`;
        }
    );

    const res = `
        <ul class="products-container">
            ${htmlCatalog}
        </ul>`;

    ROOT_PRODUCTS.innerHTML = res;
};

render();
