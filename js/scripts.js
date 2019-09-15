'use strict';

const menuBtn = document.querySelector('.nav-menu__toggle');

menuBtn.addEventListener('click', menuToggle);

function menuToggle() {
    const menuItems = document.querySelector('.nav-menu__items');

    menuItems.classList.toggle("nav-menu__items--closed");
}