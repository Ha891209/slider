import {
    slides,
    slideTexts
} from './images.js';

'use strict';

const stepTime = 2000;
const slideHeight = 300;

const imageContainer = document.querySelector('.image-container');
const serialNumber = document.querySelector('.serial-number');
const left = document.querySelector('.fa.fa-angle-left');
const right = document.querySelector('.fa.fa-angle-right');
const circles = document.querySelector('.circles');

slides.forEach(item => {
    circles.insertAdjacentHTML('afterbegin', `<span class="dot"></span>`);
});

const circleArray = document.querySelectorAll('.dot');

let currentSlide = 1;
let insertedImage;
let insertedText;

function setHeight(element, height) {
    element.style.height = `${height}px`;
};

setHeight(imageContainer, slideHeight);

function slideSettings(slide) {
    insertedText = imageContainer.insertAdjacentHTML('afterbegin', `<div class="image-text">${slideTexts[slide]}</div>`);
    insertedImage = imageContainer.insertAdjacentHTML('afterbegin', `<img class="image" src="${slides[slide]}" alt="${slideTexts[slide]}">`);
    circleArray[slide].classList.add('active');
    setHeight(document.querySelector('.image'), slideHeight);
};

(function setInitialSlide() {
    slideSettings(0);
    serialNumber.textContent = `1 / ${slides.length}`;
})();

function setCurrentSlide(slide, imgOut = 'image-left-out', imgIn = 'image-right-in') {
    const image = document.querySelector('.image');
    image.classList.add(imgOut);
    document.querySelector('.image-text').remove();
    setTimeout(() => {
        image.remove();
        clearTimeout();
    }, stepTime);
    
    circleArray.forEach(item => item.classList.remove('active'));
    slideSettings(slide);
    document.querySelector('.image').classList.add(imgIn);
    
    setTimeout(() => {
        serialNumber.textContent = `${slide + 1} / ${slides.length}`;
        clearTimeout();
    }, stepTime/3);
};

let interval;
function autoStep() {
    interval = setInterval(() => {
        currentSlide += 1;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        };
        setCurrentSlide(currentSlide);
    }, stepTime);
};

function rightStep() {
    clearInterval(interval);
    currentSlide += 1;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    };
    setCurrentSlide(currentSlide);
    autoStep();
};

function leftStep() {
    clearInterval(interval);
    currentSlide -= 1;
    if (currentSlide <= -1) {
        currentSlide = slides.length - 1;
    };
    setCurrentSlide(currentSlide, 'image-right-out', 'image-left-in');
    autoStep();
};

function manualStep() {
    currentSlide -= 1;
    left.addEventListener('click', () => leftStep());
    right.addEventListener('click', () => rightStep());
};

function jumpToSlide() {
    circleArray.forEach((item, index) => item.addEventListener('click', () => {
        clearInterval(interval);
        setCurrentSlide(index);
        autoStep();
        index === 3 ? currentSlide = 0 : currentSlide = index + 1;
        return currentSlide;
    }));
};

autoStep();
manualStep();
jumpToSlide();