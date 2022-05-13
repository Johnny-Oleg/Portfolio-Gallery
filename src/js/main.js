'use strict';

const $grid = document.querySelector('.cases__grid');

const cases = [
    {
        case: 1,
        title: "John's Blog",
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

const renderElem = elem => {
	const { title, desc, img, src } = elem;

	const $card = `
			<div class="cases__grid-item">
				<a class="case__item-link" href="${src}">
					<div class="case__item-img">
						<img src="images/portfolio/${img}" alt=" case image">
					</div>
					<h4 class="case__item-title">${title}</h4>
					<p class="case__item-text">${desc}</p>
				</a>
			</div>`;
			
	$grid.insertAdjacentHTML('beforeend', $card);
}

const renderGrid = () => cases.forEach(item => renderElem(item));

window.addEventListener('load', renderGrid());