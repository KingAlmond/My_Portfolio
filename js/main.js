// Select DOM Items (UI...)
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleteing = false;
};
//Type Method
TypeWriter.prototype.type = function() {
  //debugging dev - console.log("Hello");
  //Current index of words
  const current = this.wordIndex % this.words.length;
  //Get full text of current words
  const fullTxt = this.words[current];

  //Check if deleting
  if (this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  //debugging dev test 2 console.log(fullTxt);

  //Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; //ES6 for template literal

  //  Intial Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //if word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    //Pause at end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    //move to next word
    this.wordIndex++;
    //pause again before we type
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};
//Init on dom load
document.addEventListener("DOMContentLoaded", init);
//Init Add
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Set intial state of the menu , overlay
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //reset menu state
    showMenu = false;
  }
}

/*
##########################################
#####################
NOT FINISHED  NOT FINISHED NOT FINISHED
##########################################
#####################

ES6 class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleteing = false;

  }

  type() {

  }
}*/
