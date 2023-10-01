// 4. Import dog env dari env.js
import { dog_env } from './env.js';

// Deklarasi
// 5. Deklarasi variable savedPetList dengan getItem dari localStorage
// Referensi : https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
const savedPetList = localStorage.getItem('petList');
// 6. JSON parse savedPetList karena local storage menyimpan value string
const petList = JSON.parse(savedPetList || '[]');

// 7. Buat instance untuk suatu search param (untuk pagination)
const searchParams = new URLSearchParams(window.location.search);
// Referensi:  https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams dengan parameter window location search saat ini
// const searchParams =...;
// 8. Ambil nilai dari suatu search param key bernama "page", default nilai = 1. Untuk pengesetan dilakukan dibawah dipoin 18
const currentPage = searchParams.get('page') || 1;


// API Call
// 9. Buat suatu fungsi bernama getBreedsImage untuk melakukan pemanggilan API 
// menggunakan async await
// API URL : {dog_env.endpoint}/v1/images/search
// Query param : 
// a. include_categories = true, 
// b. include_breeds = true,
// c. has_breeds = true, 
// d. order=sesuaikan nilai sortBy dari parameter fungsi
// e. page = sesuaikan nilai dari currentPage
// f. limit = 10
// Method : GET
// headers : menyesuaikan dengan documentasi yang disediakan
// 9a. set sortBy dengan nilai default ascending (check di API docs bagaimana nilai ascending dan descending di definisikan pada query parameter order)
const getBreedsImage = async (sortBy = 'ascending') => {
  const response = await fetch(`${dog_env.endpoint}/v1/images/search?include_categories=true&include_breeds=true&has_breeds=true&order=${sortBy}&page=${currentPage}&limit=10`, {
    method: 'GET',
    headers: dog_env.headers,
  });
  return response.json();
};

// 10. Buat fungsi fetchImage untuk melakukan pemanggilan fungsi getBreedsImage sesuai sortBy yang dikirim
// supaya nilainya lebih dinamis
const fetchImage = (sortBy) =>{
  getBreedsImage(sortBy)
  .then((data) => {
    localStorage.setItem('petList', JSON.stringify(data));
    renderComponent(data);
  })
  .catch((error) => {
    console.error(error);
  });
  // 10a. panggil fungsi getBreedsImage berisi parameter sortBy dengan menggunakan promise then. 
  // ketika resolve, maka set nilai ke localstorage dengan pasangan key: petList dan value: hasil nilai yang diresolve (jangan lupa valuenya di JSON.stringify)
  // 10b. panggil fungsi render component (seperti pertemuan sebelumnya) dengan parameter value
}

fetchImage('ascending');

// 11. Definisikan selector untuk dropdown menu, search form dan search input element
const dropdownElement = document.getElementById('sortDropdown');
const formElement = document.getElementById('searchForm');
const searchInputElement = document.getElementById('searchInput');

// pagination
// 12. Definisikan selector untuk pagination
const prevPage = document.getElementById('prevPage');
const pageOne = document.getElementById('pageOne');
const pageTwo = document.getElementById('pageTwo');
const pageThree = document.getElementById('pageThree');
const nextPage = document.getElementById('nextPage');


// 13. Buat fungsi bernama petCardComponent untuk me render nilai dari hasil fetch data di endpoint
const PetCardComponent = (pet) => {
  const breed = pet.breeds[0] || {};
  // 13a. tampilkan nilai dari breeds dari array ke 0
  // 13b. tampilkan hasil nilai dibawah ini sesuai dengan response yang didapatkan
  return `<div class="card my-3 mx-2" style="width: 20%">
    <img height="300" style="object-fit: cover" class="card-img-top" src=${pet.url} alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title d-inline">${breed.name}</h5>
      <p class="card-text">
        ${breed.description}
      </p>
      <p>${breed.temperament}</p>
      <span class="badge badge-pill badge-info">${breed.category.name}</span>
      <span class="badge badge-pill badge-warning">Weight: ${breed.weight.metric}</span>
      <span class="badge badge-pill badge-danger">Height: ${breed.height.metric}</span>
    </div>
  </div>`;
};

const renderComponent = (filteredPet) => {
  document.querySelector(".petInfo").innerHTML = filteredPet
    .map((pet) => PetCardComponent(pet))
    .join("");
};

// 14. buat fungsi sortPetById sesuai dengan key yang dipilih
const sortPetById = (key) => {
  if (key === "ascending") {
    fetchImage("ascending");
  }
  if (key === "descending") {
    fetchImage("descending");
  }
};

// 15. searchPetByKey digunakan untuk melakukan search tanpa memanggil API, tetapi langsung
// dari nilai petList
const searchPetByKey = (key) => {
  // 15a. mengembalikan filter dari petList sesuai dengan key yang diketikkan
  return petList.filter((pet) => pet.breeds[0].name.toLowerCase().includes(key.toLowerCase()));
};

dropdownElement.addEventListener("change", (event) => {
  // 16. Buat fungsi untuk sorting
  event.preventDefault();
  const value = event.target.value;
  // 16a. Panggil fungsi sort dengan parameter value diatas
  sortPetById(value);
});

formElement.addEventListener("submit", (event) => {
  // 17. Buat fungsi untuk melakukan search
  event.preventDefault();
  const value = searchInputElement.value;
  const filteredPet = searchPetByKey(value);
  // 17a. panggil fungsi untuk merender komponen dengan parameter:
  // - filteredPet : ketika length filteredPet lebih dari 0
  // - petList: ketika length filteredPet = 0
  renderComponent(filteredPet.length > 0 ? filteredPet : petList);
});

// 18. FUngsi redirectTo untuk pagination
const redirectTo = (page) => {
  // 18a. set searchparam "page" dengan nilai parameter page diatas
  searchParams.set('page', page);
  // 18b. redirect dengan search param yang sudah didefinisikan
  window.location.search = searchParams.toString();
};

prevPage.addEventListener("click", (event) => {
  event.preventDefault();
// 19. jika currentPage > 1 redirect ke current page - 1 (jangan lupa parameter di parse ke number)
// dengan memanggil fungsi redirect To, else redirect ke halaman 1
if (currentPage > 1) {
  redirectTo(parseInt(currentPage) - 1);
} else {
  redirectTo(1);
}
});

pageOne.addEventListener("click", (event) => {
  event.preventDefault();
  // 20. memanggil fungsi redirectTo ke halaman 1
  redirectTo(1);
});

pageTwo.addEventListener("click", (event) => {
  event.preventDefault();
  // 21. memanggil fungsi redirectTo ke halaman 2
  redirectTo(2);
});

pageThree.addEventListener("click", (event) => {
  event.preventDefault();
  // 22. memanggil fungsi redirectTo ke halaman 3
  redirectTo(3);
});

nextPage.addEventListener("click", (event) => {
  event.preventDefault();
  // 23. memanggil redirectTo ke page currentPage + 1 (jangan lupa diparse jadi number)
  redirectTo(parseInt(currentPage) + 1);
});
