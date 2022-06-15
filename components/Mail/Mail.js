const form = document.getElementById('form');

async function help() {
    alert("Для бронирования товара необходимо заполнить форму. Введите количество товара, имя и адрес электронной почты.\
    Затем нажмите кнопку \"отправить\" для получения номера бронирования и кода подтверждения.");
}

async function postData(countValue, nameValue, emailValue) {
    console.log(JSON.stringify({
        itemId: parseInt(sessionStorage['itemID']), 
        count: parseInt(countValue), 
        name: nameValue, 
        email: emailValue
    }));

    if (countValue === "" || nameValue === "" || emailValue === "") {
        alert('Перед тем, как нажимать кнопку "отправить", убедитесь, что все поля заполнены');
        document.location = 'mail.html';
    }

    let countInt = parseInt(countValue);
    if (countInt === 0) {
        countInt = 1;
    }
    // для localhost: https://localhost:7252/api/Booking/SendEmail
    const response = await fetch('http://www.slavacheck.somee.com/api/Booking/SendEmail', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            itemId: parseInt(sessionStorage['itemID']), 
            count: countInt, 
            name: nameValue, 
            email: emailValue
        })
    })
    // для сайта
    .catch(err => {
        alert('Несуществующий email, повторите попытку');
        document.location = 'mail.html';
    });
    // #
    // для localhost
    if (response['status'] === 500) {
        alert('Несуществующий email, повторите попытку');
        document.location = 'mail.html';
    }
    // #

    if (response['status'] === 400) {
        alert('В поле "Количество" введено число, превышающее количество товаров данного типа на складе магазина. Пожалуйста, введите другое число');
        document.location = 'mail.html';
    }

    let res = await response.json();
    sessionStorage.setItem('verifCode', res['verifCode']);
    sessionStorage.setItem('orderNumber', res['orderNumber']);

    console.log(res['orderNumber']);
    console.log(res);
    console.log(JSON.stringify({
        itemId: parseInt(sessionStorage['itemID']), 
        count: countInt, 
        name: nameValue, 
        email: emailValue
    }));
    sessionStorage.setItem('countValue', countInt);
    sessionStorage.setItem('nameValue', nameValue);
    sessionStorage.setItem('emailValue', emailValue);
    document.location = 'check.html';
}

function formCallback(event) {
    event.preventDefault();
    
    count = form.querySelector('[name="count"]');
    fio = form.querySelector('[name="fio"]');
    email = form.querySelector('[name="email"]');

    postData(count.value, fio.value, email.value);
}

form.addEventListener('submit', formCallback);
