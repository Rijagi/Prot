// minimal accessible lightbox
(function(){
  const cards = document.querySelectorAll('.card[data-src]');
  const modal = document.getElementById('lightbox');
  const modalImg = document.getElementById('lbImage');
  const modalTitle = document.getElementById('lbTitle');
  const download = document.getElementById('lbDownload');
  const close = document.getElementById('lbClose');
  let lastFocused = null;

  function open(src, alt, title) {
    lastFocused = document.activeElement;
    modalImg.src = src;
    modalImg.alt = alt || title || '';
    modalTitle.textContent = title || '';
    download.href = src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    close.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    modalImg.src = '';
    document.body.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  }

  cards.forEach(card=>{
    card.addEventListener('click', ()=>{
      open(card.dataset.src, card.dataset.alt, card.querySelector('h3')?.textContent);
    });
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  close.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
})();
