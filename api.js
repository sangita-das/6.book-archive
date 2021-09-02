const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookOverview = document.getElementById("book-overview");
const errorDiv = document.getElementById("error");
const totalResult = document.getElementById('totalResult');


//Spinner
function spinnerToggle(displayValue) {
  if (displayValue === 'block') {
    document.getElementById('spinner').classList.remove('d-none');
  } else {
    document.getElementById('spinner').classList.add('d-none');
  }
}

//Checking properties undefined or not
const checkProperties = property => {
  if (property !== undefined && property.length !== 0) {
    if (typeof property != 'object') {
      return property;
    }
    return property[0];
  } else {
    return "Not Found";
  }
}

//   Clear data
const clearData = () => {
  errorDiv.innerText = "";
  totalResult.innerText = "";
  bookOverview.innerText = "";
}

searchBtn.addEventListener('click', function () {
  clearData();
  // console.log(searchInput)
  spinnerToggle('block');
  const search = searchInput.value;
  if (search === "") {
    spinnerToggle('none');
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }

  // books url & fetching it
  const url = `https://openlibrary.org/search.json?q=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showResult(data.docs, data.numFound))
  searchInput.value = "";
});

function showResult(booksArray, totalBooks) {
  // console.log(data.docs)

  // Error Handing
  if (booksArray.length === 0) {
    spinnerToggle('none');
    errorDiv.innerText = "Sorry, NO Result Found";
    return;
  }
  totalResult.innerHTML = `Showing <strong>${booksArray.length}</strong> results of <strong>${totalBooks}</strong>`;

  booksArray.forEach(docs => {
    // console.log(docs);
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.classList.add('mb-4');

    div.innerHTML = `
    <!-- Image -->
    <div class=" h-100 rounded overflow-hidden border mx-auto w-9/12">
    <div class = 'img text-center'>
      <img class = 'img-fluid p-2'
        src="https://covers.openlibrary.org/b/id/${docs.cover_i}-M.jpg"
        alt=""
      />
    </div>

        <div class="col-md-12 text-center p-4 ">
        <h5 class = 'fw-bold'>${docs.title}</h5>
        <p class= "fw-bold ">Author: ${docs.author_name}</p>
        <p>First Published Year: <strong>${docs.first_publish_year}</strong></p>   
        
        <p class="text-secondary">Publisher: ${docs.publisher ? docs.publisher[0] : 'publisher are not avilable'}</p>
    </div>
    </div> 
        `;
    bookOverview.appendChild(div);
    spinnerToggle('none');
  });
}