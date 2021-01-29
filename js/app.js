/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/


// better scroll event handling
// https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/

/**
 * Define Global Variables
 *
*/
const titleSelect = 'h2.landing__title';
const sectionSelect = 'section';
const navSelect = 'navbar__list';
const navBarSelect = '.navbar__menu';
const activeCSS = 'is__active';
const navLinkSelect = 'menu__link';
const navPrefix = 'nav-'
const showScroll = 'showScrollbar'
const intersectThresh = 0.75;

// get all sections
const sections = document.querySelectorAll(sectionSelect);

// get all titles under #landing__container
const titles = document.querySelectorAll(titleSelect);

// get nav element
let navEl = document.getElementById(navSelect);

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// intersection API
let options = {
  threshold: intersectThresh,
}

let observer = new IntersectionObserver(observerHandler, options);

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

function clearScroll() {
  // add opacity to navbar
  document.querySelector(navBarSelect).classList.add('opacityDown');
}

function onScroll() {
  // remove opacity override from navbar
  document.querySelector(navBarSelect).classList.remove('opacityDown');
  // call clearScroll with timeout
  setTimeout(clearScroll, 10000);
}

function clearActiveNav() {
  // clears active class from all navigation elements
  const navEls = document.getElementsByClassName(navLinkSelect);
  for (let i = 0; i < navEls.length; i++) {
    navEls[i].classList.remove(activeCSS);
  }
}

function observerHandler(entries) {
  // add active CSS to intersecting object


  // clear active class
  clearActiveNav();

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      // add active CSS to section
      entry.target.classList.add(activeCSS);

      // add active CSS to corresponding nav title
      let navItem = document.getElementById(`${navPrefix}${entry.target.id}`);
      navItem.classList.add(activeCSS);

    } else {
      entry.target.classList.remove(activeCSS);
    }

  });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// add listener to scroller events
document.addEventListener('scroll', onScroll)

/* ========================================================== */
/* ================== BUILD NAVIGATION BAR ================== */
/* ========================================================== */

const fragment  = document.createDocumentFragment();

// for every title we append an in nav
for (let i = 0; i < titles.length; i++) {

  // create a list element
  let item = document.createElement('li');

  // create a menu link
  let menuLink = document.createElement('a');

  // inject title as text and sectionID as ref
  menuLink.innerText = titles[i].innerText;
  menuLink.href = `#${sections[i].id}`;
  menuLink.classList.add(navLinkSelect);
  menuLink.setAttribute('id', `${navPrefix}${sections[i].id}`);

  // append link to list item
  item.appendChild(menuLink);

  // append to navbar
  fragment.appendChild(item);

  // add to intersection API observer
  observer.observe(sections[i]);
}

navList.appendChild(fragment);