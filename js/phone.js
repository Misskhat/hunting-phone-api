const loadPhone = async (serachText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${serachText}`);
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    const showAllContainer = document.getElementById('show-all-container')
    // show all button hidded and show accordig search result
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    console.log('is show all', isShowAll)

    // show only 12 result, if found more then show all 
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    else {

    }

    phoneContainer.textContent = "";
    phones.forEach(phone => {
        // console.log(phone)
        const phoneSection = document.createElement('div');
        phoneSection.classList = `card bg-base-100 p-4 shadow-xl`
        phoneSection.innerHTML = `
        <figure>
            <img
            src="${phone.image}"
            alt="phone-image" />
        </figure>
            <div class="card-body items-center">
                <h2 class="card-title">${phone["phone_name"]}</h2>
                <p>There are many variations of passages of available, but the majority have suffered.</p>
                <div class="card-actions justify-end">
                    <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Detailes</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneSection)
    });
    toggleSpenner(false)
}

// handle show detailes 
const handleShowDetails = async (id) => {
    // console.log(id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phoneData = data.data
    // console.log(phoneData)
    showPhoneDetails(phoneData)
}

const showPhoneDetails = (phone) => {
    // show the modal
    console.log(phone)
    const phoneName = document.getElementById('show-detaile-phone-name');
    phoneName.innerText = phone.name;
    const showDetaileContainer = document.getElementById('show-detaile-container')
    showDetaileContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage} </p>
    <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize} </p>
    <p><span class="font-bold">Chip Set: </span>${phone?.mainFeatures?.chipSet} </p>
    <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory} </p>
    `
    show_details_modal.showModal()
}

// handle search button
const searchButton = (isShowAll) => {
    const searField = document.getElementById('search-field');
    const searFieldText = searField.value;
    toggleSpenner(true)
    loadPhone(searFieldText, isShowAll)
}

const toggleSpenner = (isSearch) => {
    const loadingSpenner = document.getElementById('loading-spenning');
    if (isSearch) {
        loadingSpenner.classList.remove('hidden')
    }
    else {
        loadingSpenner.classList.add('hidden')
    }
}

const showAllFunction = () => {
    searchButton(true)
}
