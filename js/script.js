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
          days.textContent = 0;
          hours.textContent = 0;
          minutes.textContent = 0;
          seconds.textContent = 0;
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

    //Class
    class MenuCard {
      constructor(src, alt, title, descr, price, parent, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parent);
        this.class = classes;
      }

      addInfo() {
        const element = document.createElement('div');
        if (this.class.length === 0) {
          element.classList.add('menu__item');
        } else {this.class.forEach(item => element.classList.add(item));}
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element); 
      }
    }
    new MenuCard('img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container').addInfo();

    new MenuCard('img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container').addInfo();

    new MenuCard(
      'img/tabs/post.jpg',
      'post',
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      430,
      '.menu .container'
    ).addInfo();

});