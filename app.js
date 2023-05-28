
//load function for phones
const phoneLoad = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
    console.log(data.data)

}
const showDiv = document.getElementById('show-more');
//display phone in Ui
const displayPhone = (phones, dataLimit) => {
    const phoneWrap = document.getElementById('phone-wrap');
    phoneWrap.innerHTML = '';
    //show 9 phones
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showDiv.classList.remove('d-none');
    } else {
        showDiv.classList.add('d-none');
    }
    //show warning message
    const warningText = document.getElementById('not-found');
    if (phones.length === 0) {
        warningText.classList.remove('d-none');
    } else {
        warningText.classList.add('d-none');
    }
    phones.forEach(phone => {
        const colWrap = document.createElement('div');
        colWrap.classList.add('col-md-4');
        colWrap.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text"><b>Brand: </b> ${phone.brand}</p>
            <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
        </div>
        `;

        phoneWrap.appendChild(colWrap);

    });
    //stop loader
    toggleSpinner(false);
}


//search process
const searchProcess = (dataLimit) => {
    //start loader
    toggleSpinner(true);
    const inputValue = document.getElementById('search-field').value;
    phoneLoad(inputValue, dataLimit);
}

//search function
document.getElementById('search-btn').addEventListener('click', function () {
    searchProcess(9);

})

//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    console.log(e.key);
    if (e.key === 'Enter') {
        searchProcess(9);
    }
})

//loader function
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        const loader = document.getElementById('loader');
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

//load all phones but its not a best solution
document.getElementById('btn-show-more').addEventListener('click', function () {
    searchProcess();
});

//show more details button handler
const loadPhoneDetails = async phoneSlug => {
    const phoneUrl = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
    const res = await fetch(phoneUrl);
    const data = await res.json();
    showdetails(data);
    console.log(data);
}

const showdetails = data => {
    const modalWrap = document.getElementById('modalWrap');
    const productTitle = document.getElementById('product-title');
    productTitle.innerText = data.data.name;
    modalWrap.innerHTML = `
    <p class="pt-3"><b>Brand: </b>${data.data.brand}</p>
    <p><b>Chip Set: </b>${data.data.mainFeatures.chipSet}</p>
    <p><b>Display Size: </b>${data.data.mainFeatures.displaySize}</p>
    <p><b>Memory: </b>${data.data.mainFeatures.memory}</p>
    <p class="pb-3"><b>Release Data: </b>${data.data.releaseDate ? data.data.releaseDate: 'No release date found'}</p>
    `;

}
