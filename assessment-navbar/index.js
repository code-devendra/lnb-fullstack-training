"use strict";

const showBtn = document.querySelector(".show-btn");
const hideBtn = document.querySelector(".hide-btn");
const navigation = document.querySelector(".navigation-items");
const navItems = document.querySelectorAll(".nav-link");


const showNavigation = () => {
    showBtn.classList.add("hidden");
    hideBtn.classList.remove("hidden");
    navigation.classList.add("show");
}

const hideNavigation = () => {
    hideBtn.classList.add("hidden");
    showBtn.classList.remove("hidden");
    navigation.classList.remove("show");
}

showBtn.addEventListener("click", showNavigation);
hideBtn.addEventListener("click", hideNavigation);
for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", hideNavigation);
}
