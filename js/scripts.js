'use strict';

const menuBtn = document.querySelector('.nav-menu__toggle');

menuBtn.addEventListener('click', menuToggle);

function menuToggle() {
    const navMenu = document.querySelector('.nav-menu');

    navMenu.classList.toggle("nav-menu--closed");
}