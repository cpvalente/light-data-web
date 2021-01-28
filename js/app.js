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

/**
 * Define Global Variables
 *
*/

/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// better scroll event handling
// https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/

// some helper stuff
const titleSelect = 'h2.landing__title';
const sectionSelect = 'section';
const navSelect = 'navbar__list';
const activeCSS = 'is__active';
const navLinkSelect = 'menu__link';
const navPrefix = 'nav-'
const showScroll = 'showScrollbar'

// intersection API
let options = {
  threshold: 0.8, // 0.7?
}

let observer = new IntersectionObserver(observerHandler, options);


// get all sections
const sections = document.querySelectorAll(sectionSelect);

// get all titles under #landing__container
const titles = document.querySelectorAll(titleSelect);

// get nav element
let navEl = document.getElementById(navSelect);

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
  navEl.appendChild(item);

  // add to intersection API observer
  observer.observe(sections[i]);
}

let scrolling = false;

window.onscroll = () => {
  scrolling = true;
};

setInterval(() => {
  const b = document.querySelector('body');
  if (scrolling) {
    b.classList.add(showScroll);
  } else {
    b.classList.remove(showScroll);
  }
  // scrolling = false;
}, 400);

function clearActiveNav() {
  const navEls = document.getElementsByClassName(navLinkSelect);
  for (let i = 0; i < navEls.length; i++) {
    navEls[i].classList.remove(activeCSS);
  }
}

// add active CSS to intersecting object
function observerHandler(entries) {
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


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active