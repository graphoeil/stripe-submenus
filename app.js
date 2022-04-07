// Imports
import sublinks from './data.js';

// Variables
const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sideWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [ ...document.querySelectorAll('.link-btn') ];
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

// Show / hide sidebar
toggleBtn.addEventListener('click', () => {
	sideWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
	sideWrapper.classList.remove('show');
});

// Sidebar links
sidebar.innerHTML = sublinks.map((sublink) => {
	const { links, page } = sublink;
	return(
		`<article>
			<h4>${ page }</h4>
			<div class="sidebar-sublinks">
				${
					links.map((link) => {
						return `<a href="${ link.url }" title="${ link.label }">
							<i class="${ link.icon }"></i>${ link.label }
						</a>`;
					}).join('')
				}
			</div>
		</article>`
	);
}).join('');

// Submenu => big screens
linkBtns.forEach((btn) => {
	btn.addEventListener('mouseover', function(){
		const btnCoord = this.getBoundingClientRect();
		const bottom = btnCoord.bottom - 3;
		const center = (btnCoord.left + btnCoord.right) / 2;
		// Liens du submenu pour CE bouton
		const text = this.textContent;
		const tempPage = sublinks.find((sublink) => {
			return sublink.page === text;
		});
		if (tempPage){
			submenu.classList.add('show');
			/* Comme nous avons un translateX(-50%) nous alignons 
			le submenu sur son left via la variable center ,-) */
			submenu.style.left = center + 'px';
			submenu.style.top = bottom + 'px';
			// Optionnal, number of colums depends on number of items
			let colums = 'col-2';
			// Les liens ,-)
			const { page, links } = tempPage;
			if (links.length === 3){ colums = 'col-3'; }
			if (links.length >= 4){ colums = 'col-4'; }
			submenu.innerHTML = `<section>
				<h4>${ page }</h4>
				<div class="submenu-center ${ colums }">
					${
						links.map((link) => {
							return(
								`<a href="${ link.url }">
									<i class="${ link.icon }"></i>${ link.label }
								</a>`
							);
						}).join('')
					}
				</div>
			</section>`;
		}
	});
});

// Hide submenu when overing on hero, very clever ,-)
hero.addEventListener('mouseover', () => {
	submenu.classList.remove('show');
});
nav.addEventListener('mouseover', (e) => {
	if (!e.target.classList.contains('link-btn')){
		submenu.classList.remove('show');
	}
});