import { categories, courses } from "./constants.js";


const filter = document.querySelector(".filter");
const button = document.querySelector(".search-form__button");
let filteredCourses = courses;

// Добавляем элементы в фильтр
filter.innerHTML = categories
  .map(
    (category, index) => `
      <li class="filter__item${index === 0 ? " active" : ""}">
        <span  class="filter__title">${category.title}
          <span class="filter__counter">${category.count}</span>
        </span>
      </li>
    `
  )
  .join("");

//Добавляем карточки
const renderCourses = (list) => {
  const coursesList = document.querySelector(".courses-list");

  coursesList.innerHTML = list
    .map(course => `
  <li class="courses-list__item course">
    <img src=${course.image} alt=${course.title} class="course__image">
    <div class="course__info-block">
      <span class="course__badge" style="background-color:${categories.find(category => category.title === course.category)["bg-color"]}">${course.category}</span>
      <h3 class="course__title">${course.title}</h3>
    <div class="course__info">
      <span  class="course__price">$${course.price}</span>
      <span  class="course__author">by ${course.author}</span>
     </div>
    </div> 
  </li>
  `
    ).join("");
}

renderCourses(filteredCourses);

const addActiveClass = (event, el) => {
  const filterItem = event.target.closest(el);
  if (!filterItem) {
    return;
  }
  document.querySelectorAll(el).forEach((item) => {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  });

  filterItem.classList.add("active");
};

const filterByCategory = (event) => {
  const category = event.target.textContent;

  if (category.includes("All")) {
    filteredCourses = courses;
  } else {
    filteredCourses = courses.filter((course) => category.includes(course.category));
  }

  renderCourses(filteredCourses);
}

filter.addEventListener("click", (event) => {
  addActiveClass(event, ".filter__item");
  filterByCategory(event);
});

// Ищем курс
const searchCourse = (str) => {
  filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(str.toLowerCase()));
  renderCourses(filteredCourses);
}


button.addEventListener("click", (event) => {
  event.preventDefault();
  const value = document.querySelector(".search-form__input").value;

  if (value) {
    searchCourse(value);
  }
})




