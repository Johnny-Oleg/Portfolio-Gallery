'use strict';

import botVoice from './bot.js';

const $decors = document.querySelectorAll('.decor');
const $switches = document.querySelectorAll('.header__top-wrapper');
const $bot = document.querySelector('.bot__img');
const $grid = document.querySelector('.cases__grid');
const $date = document.querySelector('.contacts-social__date');

let click = 0;
const colors = ['react', 'redux', 'angular', 'vue'];

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const isDark = () => localStorage.getItem('dark');

const toggleClass = () => document.querySelector('body').classList.toggle('dark');

const toggleLocalStorageItem = () => {
    isDark()
        ? localStorage.removeItem('dark')
        : localStorage.setItem('dark', 'set');
}

isDark() && toggleClass();

$decors.forEach(item => item.classList.add(random(colors)));

const cases = [
    {
        case: 1,
        title: 'John\'s Blog',
        desc: 'Blog with 4 pages',
        img: "john's-blog.jpg",
        src: 'https://johnny-oleg.github.io/John-s-Blog/',
    },
    {
        case: 2,	
        title: 'Moon River',
        desc: 'Jewelry landing page',
        img: 'moon-river.jpg',
        src: 'https://johnny-oleg.github.io/Moon-River/',
    },
    {
        case: 3,
        title: 'Coffee Serve',
        desc: 'Coffee serve landing page',
        img: 'coffee-serve.jpg',
        src: 'https://johnny-oleg.github.io/Coffee-Serve/',
    },
    {
        case: 4,
        title: 'Test tz',
        desc: 'Small landing page test',
        img: 'test-tz.jpg',
        src: 'https://johnny-oleg.github.io/Test-tz/',
    },
    {
        case: 5,
        title: 'E Mentor',
        desc: 'Landing page, 2 pages',
        img: 'e-mentor.jpg',
        src: 'https://johnny-oleg.github.io/E-Mentor/',
    },
    {
        case: 6,
        title: 'Solar',
        desc: ' Solar power plant landing page',
        img: 'solar.jpg',
        src: 'https://johnny-oleg.github.io/Solar/',
    },
    {
        case: 7,
        title: 'Safari',
        desc: 'Safari tours landing page',
        img: 'safari.jpg',
        src: 'https://johnny-oleg.github.io/Safari/',
    },
    {
        case: 8,
        title: 'Portfolio Gallery',
        desc: 'My portfolio gallery',
        img: 'portfolio-gallery.jpg',
        src: 'https://johnny-oleg.github.io/Portfolio-Gallery/',
    },
]

const renderElem = ({ title, desc, img, src }) => {
    const $card = `
			<div class="cases__grid-item">
				<a 
                    class="case__item-link" 
                    href="${src}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
					<div class="case__item-img">
						<img loading="lazy" src="images/portfolio/${img}" alt="case image">
					</div>
					<h4 class="case__item-title">${title}</h4>
					<p class="case__item-text">${desc}</p>
				</a>
			</div>`;

    $grid.insertAdjacentHTML('beforeend', $card);
}

const renderGrid = () => cases.forEach(item => renderElem(item));

const yearDate = new Date().getFullYear().toString();

$date.textContent = yearDate;

$switches.forEach(item => {
    item.addEventListener('click', () => {     
        toggleLocalStorageItem();
        toggleClass();
    })
})

$bot.addEventListener('click', () => {
    click++;

    if (click >= 6) return;

    if (click >= 5) {
        botVoice({ type: 'ANGRY' });

        return;
    }

    botVoice({ type: 'INTRODUCE' });
})

const observer = new IntersectionObserver(function(elems, observer) {
	elems.forEach(elem => {
		if (!elem.isIntersecting) return;
		
		elem.target.classList.add('slide-in-bottom');
		observer.unobserve(elem.target);
	})
}, {
	root: null,
	threshold: 0.5,
	rootMargin: ''
})

window.addEventListener('DOMContentLoaded', renderGrid);

window.addEventListener('load', () => {
    const $gridItems = document.querySelectorAll('.cases__grid-item');

    $gridItems.forEach(item => observer.observe(item));
})