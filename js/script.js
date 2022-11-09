document.addEventListener('DOMContentLoaded', () => {
  const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent');

  //Tabs
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.style.display = 'none';
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
    });

    //Timer
    const endtime = '2022-11-9';

    function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }
    
    function setZero(num) {
      if(num >=0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
        const t = getTimeRemaining(endtime);

        days.textContent = setZero(t.days);
        hours.textContent = setZero(t.hours);
        minutes.textContent = setZero(t.minutes);
        seconds.textContent = setZero(t.seconds);

        if (t.total <= 0) {
          clearInterval(timeInterval);
        }

      }
    }

    setClock('.timer', endtime);

    //Modal
    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]'),
          modalCloseBtn = document.querySelector('.modal__close');

    modalTrigger.forEach(item => {
      item.addEventListener('click', openModal);
    } );

    const timerModal = setTimeout(openModal, 3000);

    function openModal() {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      clearTimeout(timerModal);
    }

    modalCloseBtn.addEventListener('click', closeModal);

    function closeModal() {
      modal.style.display = '';
      document.body.style.overflow = '';
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.code === 'Escape') {
          closeModal();
        }
    });

    function showModalScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalScroll);
      }
    }
  
    window.addEventListener('scroll', showModalScroll);
});