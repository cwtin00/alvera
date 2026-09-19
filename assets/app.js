const pages=[['Ana Sayfa','index.html'],['Ürünler','urunler.html'],['Hakkımızda','hakkimizda.html'],['İletişim','iletisim.html']];
const file=location.pathname.split('/').pop()||'index.html';
document.getElementById('site-header').innerHTML=`<header class="nav"><a class="brand" href="index.html" aria-label="Alveram Ahşap ana sayfa"><span>ALVERAM</span><small>AHŞAP · GEDİZ</small></a><button class="menu-toggle" aria-label="Menüyü aç" aria-expanded="false"><i></i><i></i></button><nav>${pages.map(([n,u])=>`<a class="${file===u?'active':''}" href="${u}">${n}</a>`).join('')}<a class="nav-cta" href="https://www.instagram.com/alveram.tr/" target="_blank" rel="noopener">Instagram ↗</a></nav></header>`;
document.getElementById('site-footer').innerHTML=`<footer><div class="brand footer-brand"><span>ALVERAM</span><small>AHŞAP · GEDİZ</small></div><p>Kişiye özel ahşap hediyeler,<br>lazer kesim tasarımlar ve dekoratif mumlar.</p><div><a href="tel:+905304452210">0530 445 22 10</a><a href="https://wa.me/905304452210" target="_blank" rel="noopener">WhatsApp ↗</a><a href="https://www.instagram.com/alveram.tr/" target="_blank" rel="noopener">Instagram ↗</a></div><small>© ${new Date().getFullYear()} Alveram Ahşap</small></footer>`;
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open');document.body.classList.toggle('menu-open');});
const closeMenu=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('menu-open');};
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();});
document.querySelectorAll('.category-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector(a.hash)?.scrollIntoView({behavior:'smooth'})));
const locationCard=document.querySelector('.contact-card.location');
if(locationCard)locationCard.insertAdjacentHTML('beforeend',`<div class="contact-actions"><a href="tel:+905304452210">Ara: 0530 445 22 10</a><a href="https://wa.me/905304452210" target="_blank" rel="noopener">WhatsApp'tan yaz ↗</a></div>`);

const productCards=document.querySelectorAll('.visual-catalog-grid article');
if(productCards.length){
  document.body.insertAdjacentHTML('beforeend',`<div class="product-modal" aria-hidden="true"><div class="product-modal-backdrop" data-close-modal></div><section class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><button class="product-modal-close" type="button" aria-label="Ürün penceresini kapat" data-close-modal>×</button><div class="product-modal-image"><img src="" alt=""></div><div class="product-modal-content"><span class="product-modal-no"></span><h2 id="product-modal-title"></h2><p></p><a class="button primary" href="https://wa.me/905304452210" target="_blank" rel="noopener">WhatsApp'tan bilgi al ↗</a></div></section></div>`);
  const modal=document.querySelector('.product-modal');
  const modalImage=modal.querySelector('.product-modal-image img');
  const modalNo=modal.querySelector('.product-modal-no');
  const modalTitle=modal.querySelector('h2');
  const modalText=modal.querySelector('.product-modal-content p');
  const closeButton=modal.querySelector('.product-modal-close');
  let lastCard=null;
  const openProduct=card=>{
    const image=card.querySelector('img'),number=card.querySelector('span'),title=card.querySelector('h3'),description=card.querySelector('p');
    modalImage.src=image.src;modalImage.alt=image.alt;modalNo.textContent=number?.textContent||'';modalTitle.textContent=title?.textContent||'';modalText.textContent=description?.textContent||'';
    lastCard=card;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');closeButton.focus();
  };
  const closeProduct=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');lastCard?.focus();};
  productCards.forEach(card=>{card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',`${card.querySelector('h3')?.textContent||'Ürün'} detayını aç`);card.addEventListener('click',()=>openProduct(card));card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openProduct(card);}});});
  modal.querySelectorAll('[data-close-modal]').forEach(element=>element.addEventListener('click',closeProduct));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))closeProduct();});
}
