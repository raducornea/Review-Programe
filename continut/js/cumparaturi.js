// pentru Cumparaturi / Shopping
function checkShoppingInputs(){
    var nume_produs = document.getElementById("nume_produs").value;
    var cantitate = document.getElementById("cantitate").value;
    var add_shopping = document.getElementById("ADD_BUTTON");

    if(cantitate === "" || nume_produs === "")
        add_shopping.disabled = true;
    else
        add_shopping.disabled = false;
}

function onloadShoppingPage(){
    document.getElementById("outer_login").style.height = 150;

    var tableContent = 
    `<tr class="bold_row">
        <td>Numar:</td>
        <td>Produs:</td>
        <td>Cantitate:</td>
    </tr>`;

    var count = 0;
    if (typeof(Storage) !== "undefined") {
        if (localStorage.products) {
            // json as string from localStorage
            var json_file = localStorage.getItem('products');

            // aka raw json - just the JSON file - used to work with push operations
            const raw_json = JSON.parse(json_file);

            for(const element of raw_json){
                ++count;

                tableContent +=
                `<tr>
                    <td>${element["id"]}</td>
                    <td>${element["name"]}</td>
                    <td>${element["quantity"]}</td>
                </tr>`
            }
        }

        document.getElementById("lista_cumparaturi").innerHTML = tableContent;

        var new_div_height = document.getElementById("container_shopping").clientHeight + 30*count;
        document.getElementById("container_shopping").style.height = new_div_height;

        new_div_height = document.getElementById("outer_login").clientHeight + 30*count;
        document.getElementById("outer_login").style.height = new_div_height;
    } 
    else {
        document.getElementById("lista_cumparaturi").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

// partea de worker =====================================================
// https://medium.com/young-coder/a-simple-introduction-to-web-workers-in-javascript-b3504f9d9d1c
function receivedWorkerMessage(event) {
    console.log('Worker said : ' + event.data);
}

var worker;
function addProduct(){
    worker = new Worker("js/worker.js");
    worker.onmessage = receivedWorkerMessage;

    worker.postMessage(
        {
            from: "cumparaturi",
            to: "worker"
        }
    )


    var tableContent = 
    `<tr class="bold_row">
        <td>Numar:</td>
        <td>Produs:</td>
        <td>Cantitate:</td>
    </tr>`;

    var id = 1;
    var name = document.getElementById("nume_produs").value;
    var quantity = document.getElementById("cantitate").value;
    const myProduct = new Produs(id, name, quantity);

    if (typeof(Storage) !== "undefined") {
        // trebuie luat mai intai din local storage, apoi adaugat continutul
        if (localStorage.products) {
            // json as string from localStorage
            var json_file = localStorage.getItem('products');

            // aka raw json - just the JSON file - used to work with push operations
            const raw_json = JSON.parse(json_file);

            for(const element of raw_json){
                ++id;
                tableContent +=
                `<tr>
                    <td>${element["id"]}</td>
                    <td>${element["name"]}</td>
                    <td>${element["quantity"]}</td>
                </tr>`
            }
            myProduct.setId(id);

            raw_json.push({
                "id": myProduct.id,
                "name": myProduct.name,
                "quantity": myProduct.quantity,
            });
            tableContent +=
            `<tr>
                <td>${myProduct.id}</td>
                <td>${myProduct.name}</td>
                <td>${myProduct.quantity}</td>
            </tr>`

            parsed_json = JSON.stringify(raw_json);
            localStorage.setItem("products", `${parsed_json}`);
        }
        // cazul in care trebuie pus pentru prima data
        else {
            var jsonLine = JSON.stringify({
                id: myProduct.id,
                name: myProduct.name,
                quantity: myProduct.quantity
            });

            tableContent += 
            `<tr>
                <td>${myProduct.id}</td>
                <td>${myProduct.name}</td>
                <td>${myProduct.quantity}</td>
            </tr>`;
            localStorage.setItem("products", `[${jsonLine}]`);
        }
        
        var new_div_height = document.getElementById("container_shopping").clientHeight + 30;
        document.getElementById("container_shopping").style.height = new_div_height;

        new_div_height = document.getElementById("outer_login").clientHeight + 30;
        document.getElementById("outer_login").style.height = new_div_height;
        
        // trebuie actualizat si tabelul
        document.getElementById("lista_cumparaturi").innerHTML = tableContent;
    } 
    else {
        document.getElementById("lista_cumparaturi").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

function clearProducts(){
    document.getElementById("container_shopping").style.height = 100;
    document.getElementById("outer_login").style.height = 150;

    var tableContent = 
    `<tr class="bold_row">
        <td>Numar:</td>
        <td>Produs:</td>
        <td>Cantitate:</td>
    </tr>`;

    if (typeof(Storage) !== "undefined") {
        if (localStorage.products) {
            delete localStorage.products;
            // delete localStorage.clickcount;
        }
        document.getElementById("lista_cumparaturi").innerHTML = tableContent;
    } 
    else {
        document.getElementById("lista_cumparaturi").innerHTML = "Sorry, your browser does not support web storage...";
    }
}

class Produs{
    constructor(id, name, quantity){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    setId(id) {
        this.id = id;
    }
}