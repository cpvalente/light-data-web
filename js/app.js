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
const navListSelect = 'navbar__list';
const navBarSelect = '.navbar__menu';
const activeCSS = 'is__active';
const navLinkSelect = 'menu__link';
const navPrefix = 'nav-'
const fadeDownCSS = 'opacityDown'
const intersectThresh = 0.75;
const NavToTop = 'navToTop'

// get all sections
const sections = document.querySelectorAll(sectionSelect);

// get all titles under #landing__container
const titles = document.querySelectorAll(titleSelect);

// get nav list element
const navList = document.getElementById(navListSelect);

// intersection API
let options = {
  threshold: intersectThresh,
}

let observer = new IntersectionObserver(observerHandler, options);


/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
* @description Sets opacity of nav element down
* @param none
* @returns none
*/
let setNavbarOpacityDown = () => {
  document.querySelector(navBarSelect).classList.add(fadeDownCSS);
}

/**
* @description When user scrolls, fade up navbar and add navigate to top
* @param none
* @returns none
*/
let onScroll = () => {
  document.querySelector(navBarSelect).classList.remove(fadeDownCSS);

  if (scrollY < 100) {
    activateScrollToTopEl(false);
  } else {
    activateScrollToTopEl(true);
  }

  // call clearScroll with timeout
  setTimeout(setNavbarOpacityDown, 10000);
}

/**
* @description Toggles navigate to top element
* @param {boolean} toggle
* @returns none
*/
let activateScrollToTopEl = (toggle) => {
  const el = document.getElementById(NavToTop);
  toggle
    ?
    el.classList.add(activeCSS)
    :
    el.classList.remove(activeCSS);
}

/**
* @description Sets window to given Y position
* @param {number} posY
* @returns none
*/
let navigateTo = (posY) => {
  window.scrollTo({
    top: posY,
    behavior: 'smooth'
  });
}
/**
 * @description Sets window to given element position
 * @param {HTMLElement} element
 * @returns none
 */
let scrollTo = (element) => {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};

/**
 * @description Event handler for clicks, calls scrollTo on target
 * @param {Event} event
 * @returns none
 */
let clickEventHandler = (event) => {
  // prevent degault action
  event.preventDefault();

  // filter undefined
  if (event.target?.id) {
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      if (s.dataset.nav === event.target.id) {
        scrollTo(s);
        break;
      }
    }
  }
};

/**
* @description Clears active class from all navigation elements
* @param none
* @returns none
*/
let clearActiveNav = () => {
  const navEls = document.getElementsByClassName(navLinkSelect);
  for (e of navEls) {
    e.classList.remove(activeCSS);
  };
}

/**
* @description Observer handler function, adds active class to intersecting object
* @param {HTMLAllCollection} entries
* @returns none
*/
function observerHandler(entries) {

  // clear active class
  clearActiveNav();

  for (entry of entries) {

    if (entry.isIntersecting) {
      let t = entry.target;
      // add active CSS to section
      t.classList.add(activeCSS);

      // add active CSS to corresponding nav title
      let navItem = document.getElementById(t.dataset.nav);
      navItem.classList.add(activeCSS);
    } else {
      entry.target.classList.remove(activeCSS);
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/**
* @description Build navigation bar
* @param none
* @returns none
*/
let buildNav = () => {
  // create utility framgment
  const fragment = document.createDocumentFragment();

  // for every title we append an in nav
  for (let i = 0; i < titles.length; i++) {

    // create a list element
    const item = document.createElement('li');

    // create a menu link
    const menuLink = document.createElement('a');

    // inject title as text and sectionID as ref
    menuLink.innerText = titles[i].innerText;
    menuLink.href = '#';
    menuLink.classList.add(navLinkSelect);

    // match data attribute to section
    menuLink.id = sections[i].dataset.nav;

    // append link to list item
    item.appendChild(menuLink);

    // append to navbar
    fragment.appendChild(item);

    // add to intersection API observer
    observer.observe(sections[i]);
  }

  navList.appendChild(fragment);
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// add listener to scroller events
document.addEventListener('scroll', onScroll)
// add event listener to clicks on navbar
navList.addEventListener('click', clickEventHandler);

// build navigation
buildNav();