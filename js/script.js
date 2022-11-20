import tabs from './modules/tabs';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slides from './modules/slides';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const timerModal = setTimeout(() => openModal('.modal', timerModal, showModalScroll), 30000);
  const showModalScroll = function() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal('.modal', timerModal, showModalScroll);
    }
  };
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  calc();
  cards();
  forms('form', timerModal);
  modal('[data-modal]', '.modal', timerModal, showModalScroll);
  slides();
  timer('.timer', '2022-12-01');
});