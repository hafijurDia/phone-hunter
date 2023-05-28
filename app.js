
//load function for phones
const phoneLoad = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
    console.log(data);
}

//display phone in Ui
const displayPhone = (phones) => {
    const phoneWrap = document.getElementById('phone-wrap');
    phoneWrap.innerHTML = '';
    //show 9 phones
    if (phones.length > 9) {
        const showDiv = document.getElementById('show-more');
        phones = phones.slice(0,9);
        showDiv.classList.remove('d-none');
    }else{
        showDiv.classList.add('d-none');
    }
    const warningText = document.getElementById('not-found');
    if (phones.length === 0) {
        warningText.classList.remove('d-none');
    }else{
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
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary">Details</button>
        </div>
        </div>
        `;

        phoneWrap.appendChild(colWrap);
        
    });
    //stop loader
    toggleSpinner(false);
}

//search function
document.getElementById('search-btn').addEventListener('click',function(){
    //start loader
    toggleSpinner(true);
    const inputValue = document.getElementById('search-field').value;
    phoneLoad(inputValue);

})

//loader function
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        const loader = document.getElementById('loader');
        loader.classList.remove('d-none');
    }else{
        loader.classList.add('d-none'); 
    }
}

