
const allMeals = (mealName) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(res=>res.json())
            .then(data=>{
                displayProducts(data)
                removeMinHeight()

            })
}


const displayProducts = (data) => {
    const mealContainer = document.getElementById('meal-container');

    mealContainer.innerHTML = ''; // Clear previous results

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.classList.add("col")
            mealDiv.innerHTML = `
                <div class="card bg-success-subtle">
                    <img src="${meal.strMealThumb}" class="card-img-top  alt="${meal.strMeal}" >
                    <div class="card-body">
                        <h3 class="card-title">${meal.strMeal}</h3>
                        <h6 class="text-danger">Category: ${meal.strCategory}</h6>
                        <h6 class="text-danger" >Origin: ${meal.strArea}</h6>
                        
                        <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                    </div>
                    <div class="card-footer">
                        <button  onclick="singleMeal('${meal.idMeal}')"  class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
                    </div>
                </div>
               
            `;
            mealContainer.appendChild(mealDiv);
        });
    } else {
        mealContainer.innerHTML = `<h4 class="text-danger ">No meals found.</h4> `;
    }
};


const handleSearch = (event) => {
    event.preventDefault(); 
    const mealName = document.getElementById('searchInput').value;
    if (mealName) {
        allMeals(mealName);
    } else {
        document.getElementById('meal-container').innerHTML = ''; 
    }
    document.getElementById('searchInput').value = '';
};


document.getElementById('searchInput').addEventListener('input', function(event) {
    const mealName = event.target.value;
    if (mealName) {
        allMeals(mealName); 
       
    } else {
        document.getElementById('meal-container').innerHTML = ''; 
    }
});
document.getElementById('searchForm').addEventListener('submit', handleSearch);
    

const removeMinHeight = () => {
    const searchSection = document.getElementById('search-section');
    searchSection.style.minHeight = 'auto';
};



const singleMeal = (idMeal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
            .then(res=>res.json())
            .then(data=>{
                viewSingleMeal(data.meals[0])
                console.log(data.meals[0])
            })
}


const viewSingleMeal = (meal) => {
    const title = document.getElementById("single-meal-title")
    const body = document.getElementById("single-meal-body")
    console.log(meal.strMeal)
    title.innerText = meal.strMeal

    

    body.innerHTML = `
    <div class="card mb-3" ">
        <div class="row g-0">
            <div class="col-md-4 d-flex justify-content-center align-items-center">
                <img src=${meal.strMealThumb} class="img-fluid rounded-start" alt="...">
            </div>
            
            <div class="col-md-8">
                <div class="card-body">
                    
                    <h5 class="card-title text-success">Category: ${meal.strCategory} </h5>
                    <h5 class="card-title text-success">Origin: ${meal.strArea} </h5>
                    <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                </div>
            </div>
        </div>
    </div>
    `
}