'use strict';

import botVoice from './bot.js';

const $decors = document.querySelectorAll('.decor');
const $switches = document.querySelectorAll('.header__top-wrapper');
const $bot = document.querySelector('.bot__img');
const $grid = document.querySelector('.cases__grid');
const $date = document.querySelector('.contacts-social__date');

let click = 0;
const colors = ['react', 'redux', 'angular', 'vue'];
// const colors = ['#61daf9', '#764abc', '#de3433', '#53b883'];

// function randomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }

const random = arr => arr[Math.floor(Math.random() * arr.length)];

const isDark = () => localStorage.getItem('dark');

const toggleClass = () =>
    document.querySelector('body').classList.toggle('dark');

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
        img: "john's-blog.png",
        src: 'https://johnny-oleg.github.io/John-s-Blog/',
    },
    {
        case: 2,	
        title: 'Moon-River',
        desc: 'Jewelry landing page',
        img: 'moon-river.png',
        src: 'https://johnny-oleg.github.io/Moon-River/',
    },
    {
        case: 3,
        title: 'Coffee-Serve',
        desc: 'Coffee serve landing page',
        img: 'coffee-serve.png',
        src: 'https://johnny-oleg.github.io/Coffee-Serve/',
    },
    {
        case: 4,
        title: 'Test-tz',
        desc: 'Small landing page test',
        img: 'test-tz.png',
        src: 'https://johnny-oleg.github.io/Test-tz/',
    },
    {
        case: 5,
        title: 'E-Mentor',
        desc: 'Landing page, 2 pages',
        img: 'e-mentor.png',
        src: 'https://johnny-oleg.github.io/E-Mentor/',
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
						<img src="images/portfolio/${img}" alt="case image">
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

    if (click >= 6) return; //TODO

    if (click >= 5) {
        botVoice({ type: 'ANGRY' });

        return;
    }

    botVoice({ type: 'INTRODUCE' });
})

window.addEventListener('load', renderGrid());