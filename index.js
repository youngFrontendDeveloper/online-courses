import { categories, courses } from "./constants.js";

const filter = document.querySelector( ".filter" );
const searchButton = document.querySelector( ".search-form__button" );
const coursesList = document.querySelector( ".courses-list" );
let filteredCourses = [ ...courses ];

// Добавляем элементы в фильтр
filter.innerHTML = categories
  .map(
    (category, index) => `
      <li class="filter__item${ index === 0 ? " active" : "" }" data-category="${ category.title }">
        <span  class="filter__title">${ category.title }
          <span class="filter__counter">${ category.count }</span>
        </span>
      </li>
    `
  )
  .join( "" );

//Добавляем карточки
const renderCourses = (list) => {
  coursesList.innerHTML = list
    .map(
      (course) => `
        <li class="courses-list__item course">
          <img src=${ course.image } alt=${ course.title } class="course__image">
          <div class="course__info-block">
            <span class="course__badge" style="background-color:${
        categories.find( (category) => category.title === course.category )[
          "bg-color"
          ]
      }">${ course.category }</span>
            <h3 class="course__title">${ course.title }</h3>
          <div class="course__info">
            <span  class="course__price">$${ course.price }</span>
            <span  class="course__author">by ${ course.author }</span>
           </div>
          </div> 
        </li>
  `
    )
    .join( "" );
};

renderCourses( filteredCourses );

const addActiveClass = (clickedItem, selector) => {
  document.querySelector( `${ selector }.active` )?.classList.remove( "active" );
  clickedItem.classList.add( "active" );
};

// фильтрация курсов по категориям
const filterByCategory = (category) => {

  if( category === "All" ) {
    filteredCourses = courses;
  } else {
    filteredCourses = courses.filter( (course) => course.category === category );
  }

  renderCourses( filteredCourses );
};

filter.addEventListener( "click", (event) => {
  const filterItem = event.target.closest( ".filter__item" );

  if( !filterItem ) return;

  addActiveClass( filterItem, ".filter__item" );
  filterByCategory( filterItem.dataset.category );
} );

// Ищем курс
const searchCourse = (str) => {
  filteredCourses = courses.filter( (course) =>
    course.title.toLowerCase().includes( str.toLowerCase() )
  );

  if( filteredCourses.length ) {
    renderCourses( filteredCourses );
  } else {
    coursesList.innerHTML = `
      <p>Такие курсы не найдены</p>
    `;
  }

};

searchButton.addEventListener( "click", (event) => {
  event.preventDefault();
  const value = document.querySelector( ".search-form__input" ).value;

  if( value ) {
    searchCourse( value );
  }
} );
