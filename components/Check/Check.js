const form = document.getElementById('form');

async function help() {
    alert("Введите в поле код подтверждения из письма, которое пришло на указанную почту");
}

async function getData() {
    let code = (form.querySelector('[name="code"]')).value
    console.log(sessionStorage['verifCode']);
    console.log(sessionStorage['orderNumber']);
    if (code === "") {
        alert('Пустое поле, введите код подтверждения');
        console.log('Code is false');
        document.location = 'check.html';
    }
    else if (sessionStorage['verifCode'] === code) {
        // для localhost: https://localhost:7252/api/Booking
        const responsePOST = await fetch('http://www.slavacheck.somee.com/api/Booking', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: parseInt(sessionStorage['itemID']), 
                count: sessionStorage['countValue'], 
                name: sessionStorage['nameValue'], 
                email: sessionStorage['emailValue'],
                odredNumber: sessionStorage['orderNumber']
            })
        });

        alert('Заказ подтверждён')
        console.log('Code is true');
        console.log(responsePOST);
        sessionStorage.removeItem('verifCode');
        sessionStorage.removeItem('orderNumber');
        sessionStorage.removeItem('itemID');
        sessionStorage.removeItem('countValue');
        sessionStorage.removeItem('nameValue');
        sessionStorage.removeItem('emailValue');
        document.location = 'index.html';
    }
    else {
        alert('Неверный код подтверждения')
        console.log('Code is false');
        document.location = 'check.html';
    }

}

function formCallback(event) {
    event.preventDefault();

    getData();
}

form.addEventListener('submit', formCallback);
