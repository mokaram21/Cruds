let title = document.getElementById('title');  
let price = document.getElementById('price');  
let taxes = document.getElementById('taxes');  
let ads = document.getElementById('ads');  
let discount = document.getElementById('discount');  
let total = document.getElementById('total');  
let count = document.getElementById('count');  
let category = document.getElementById('category');  
let submit = document.getElementById('submit');  
let mood = "create";
let tem;

// get total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}
// create product



let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}


//save local storge

submit.onclick = function () {
    let newpro = {
        title:title.value.toLowerCase(),
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total: total.innerHtml,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != ''
    && newpro.count < 150) {
            if (mood === 'create') {
            if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
            dataPro.push(newpro);
        }
    } else {
        dataPro.push(newpro);
    }
    } else {
        dataPro[tem] = newpro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
        }
            clearData()
    } 


    dataPro.push(newpro);
    localStorage.setItem('product', JSON.stringify(dataPro));

    clearData()
    showData()
}





// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//read
function showData() {
    gettotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick= "updateData(${i})" id="update">update</button></td>
        <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()"  >delete All(${dataPro.length})</button>`
    } else {
        btnDelete.innerHTML = '';
    }
}

showData() 


//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData() 
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData() 
} 


//count

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    gettotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
    behavior:"smooth"})
}
//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
            search.placeholder = 'Serarch By ' + searchMood;

    search.focus();
    search.value = '';
    showData();
}
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick= "updateData(${i})" id="update">update</button></td>
        <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
        
            }
            
        
        }
        else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick= "updateData(${i})" id="update">update</button></td>
        <td><button onclick= "deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
        
            }
            
        
        }
    }
        document.getElementById('tbody').innerHTML = table;

}



//clean data
