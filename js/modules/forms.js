import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, timerModal) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: './img/form/spinner.svg',
    succes: 'Мы скоро с Вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  
  forms.forEach(item => bindPostData(item));


  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form),
            json = JSON.stringify(Object.fromEntries(formData.entries()));


      postData('http://localhost:3000/requests', json)
      .then(data => {
        showThanksModal(message.succes);
        statusMessage.remove();
        })
      .catch(() => showThanksModal(message.failure))
      .finally(() => {
        form.reset();
      });

    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.style.display = 'none';
    openModal('.modal', timerModal);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.style.display = 'block';
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;