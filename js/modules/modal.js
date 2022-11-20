function openModal(modalSelector, timerModal, showModalScroll) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  if (timerModal) {
    clearTimeout(timerModal);
  }

  window.removeEventListener('scroll', showModalScroll);
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none';
  document.body.style.overflow = ''; 
}

function modal(triggerSelector, modalSelector, timerModal, showModalScroll) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);

  modalTrigger.forEach(item => {
    item.addEventListener('click', () => openModal(modalSelector, timerModal, showModalScroll));
  } );

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      closeModal(modalSelector);
    }
  });
  
  window.addEventListener('scroll', showModalScroll);

}

export default modal;
export {closeModal};
export {openModal};