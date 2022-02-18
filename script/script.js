'use strict';

const title = document.getElementsByTagName('h1')[0],
      startBtn = document.getElementsByClassName('handler_btn')[0],
      resetBtn = document.getElementsByClassName('handler_btn')[1],
      screenBtn = document.querySelector('.screen-btn'),
      persentItems = document.querySelectorAll('.other-items.percent'),
      numberItems = document.querySelectorAll('.other-items.number'),
      rollbackRange = document.querySelector('.rollback input[type=range]'),
      rangeValue = document.querySelector('.rollback .range-value'),
      total = document.getElementsByClassName('total-input')[0],
      totalCount= document.getElementsByClassName('total-input')[1],
      totalCountOther = document.getElementsByClassName('total-input')[2],
      totalFullCount = document.getElementsByClassName('total-input')[3],
      totalCountRollback = document.getElementsByClassName('total-input')[4],
      mainTotalButtons = document.querySelector('.main-total__buttons'),
      cmsOpen = document.querySelector('#cms-open'),
      hiddenCmsVariants = document.querySelector('.hidden-cms-variants');

let screens = document.querySelectorAll('.screen');


const appData = {
   title: '', 
   screens: [],
   screenCount: 0,
   screenPrice: 0,
   servicePricesPersent: 0,
   servicePricesNumber: 0,
   servicePercentPrice: 0,
   adaptive: true,
   servicesPersent: {},
   servicesNumber: {},
   rollback: 0,
   fullPrice: 0,
   cmsPercent: 0,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },
   init: function() {
      this.addtitle();

      startBtn.addEventListener('click', this.checkValue.bind(this));
      resetBtn.addEventListener('click', this.reset.bind(this));
      screenBtn.addEventListener('click', this.addScreenBlock.bind(this));
      rollbackRange.addEventListener('input', this.addRollback.bind(this));
      rollbackRange.addEventListener('input', this.addPrices.bind(this));
      rollbackRange.addEventListener('input', () => {
         totalCountRollback.value = this.servicePercentPrice;
      });
      cmsOpen.addEventListener('click', () => {
         const select = hiddenCmsVariants.querySelector('#cms-select');
         if(cmsOpen.checked) {
            hiddenCmsVariants.style.display = 'flex';
            select.addEventListener('change', () => {
               const value = select.options[select.selectedIndex].value;
               const mainControlsInput = hiddenCmsVariants.querySelector('.main-controls__input');
               if (value === 'other') {
                  mainControlsInput.style.display = 'block';
               } else {
                  mainControlsInput.style.display = 'none';
               }
               if (this.isNumber(value)) {
                  this.cmsPercent += +value;
               }
            });
         } else {
            hiddenCmsVariants.style.display = 'none';
         }
      });
   },
   addtitle: function() {
      document.title = title.textContent;
   },
   start: function () {
      this.addScreens();
      this.addServices();
      this.addPrices();
      this.showResult();
      this.logger();
      this.block();
   },
   showResult: function() {
      total.value = this.screenPrice;
      totalCount.value = this.screenCount;
      totalCountOther.value = this.servicePricesPersent + this.servicePricesNumber;
      totalCountRollback.value = this.servicePercentPrice;
      totalFullCount.value = this.fullPrice;
   },
   checkValue: function() {
      if(this.addScreens() !== true) {
         alert('Ошибка');
      } else {
         this.start();
      }
   },
   addScreens: function() {
      this.screens.length = 0;
      screens = document.querySelectorAll('.screen');

      screens.forEach((screen, index) => {
         const select = screen.querySelector('select'),
         input = screen.querySelector('input'),
         currentOption = select.options[select.selectedIndex],
         selectName = currentOption.textContent;

         this.screens.push({
            id: index, 
            name: selectName, 
            price: +select.value * +input.value,
            count: input.value
         });
      });

      if(this.screens.find(item => item.price === 0)) {
         return false;
      }
      else {
         return true;
      }
   },
   addScreenBlock: function() {
      const screenClone = screens[0].cloneNode(true);
      screenClone.querySelector('input').value = '';

      screens[screens.length - 1].after(screenClone);
   },
   addPrices: function() {

      this.screenPrice = this.screens.reduce((sum, item) => {
         return sum + +item.price;
      }, 0);

      this.screenCount = this.screens.reduce((sum, item) => {
         return sum + +item.count;
      }, 0);

      for (let key in this.servicesNumber) {
         this.servicePricesNumber += this.servicesNumber[key];
      }

      for (let key in this.servicesPersent) {
         this.servicePricesPersent += this.screenPrice * (this.servicesPersent[key] / 100);
      }

      const fullPrice = this.screenPrice + 
      this.servicePricesPersent + this.servicePricesNumber;

      this.fullPrice = fullPrice + (this.cmsPercent / 100 * fullPrice);

      this.servicePercentPrice = Math.ceil(this.screenPrice - (this.screenPrice * (this.rollback / 100)));
   },
   addServices: function() {
      persentItems.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]'),
         label = item.querySelector('label'),
         input = item.querySelector('input[type=text]');

         if(check.checked) {
            this.servicesPersent[label.textContent] = +input.value;
         }
      });

      numberItems.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]'),
         label = item.querySelector('label'),
         input = item.querySelector('input[type=text]');

         if(check.checked) {
            this.servicesNumber[label.textContent] = +input.value;
         }
      });
   },
   addRollback: function() {
      const value = rollbackRange.value;

      rangeValue.textContent = value + '%';
      this.rollback = +value;
   },
   showTypeOf: function(variable) {
      return typeof variable;
   },
   block: function() {
      const elements = document.querySelector('.elements');
      const inputs = elements.querySelectorAll('input:not([type="range"])');
      
      inputs.forEach((input) => {
         input.disabled = true;
      });

      screens.forEach((screen) => {
         screens = document.querySelectorAll('.screen');
         const select = screen.querySelector('select');

         select.disabled = true;
      });

      hiddenCmsVariants.querySelector('select').disabled = true;

      screenBtn.disabled = true;

      startBtn.style.display = 'none';
      resetBtn.style.display = 'flex';
   },
   reset: function() {
      const elements = document.querySelector('.elements');
      const inputs = elements.querySelectorAll('input:not([type="range"])');

      this.screens = [];
      this.screenCount = 0;
      this.screenPrice = 0;
      this.servicePricesPersent = 0;
      this.servicePricesNumber = 0;
      this.adaptive = true;
      this.servicesPersent = {};
      this.servicesNumber = {};
      this.rollback = 0;
      this.fullPrice = 0;
      this.cmsPercent = 0;
      this.servicePercentPrice = 0;
      
      inputs.forEach((input) => {
         input.disabled = false;

         if(input.getAttribute('type') === 'checkbox') {
            input.checked = false;
         }

         if(input.getAttribute('type') === 'text') {
            input.value = '';
         }
      });

      screens.forEach((screen) => {
         screens = document.querySelectorAll('.screen');
         const select = screen.querySelector('select');
         if(screens.length === 1) {
            select.disabled = false;
            select.selectedIndex = 0;
            return;
         } else {
            screen.remove();
         }
      });

      hiddenCmsVariants.querySelector('select').disabled = false;
      hiddenCmsVariants.style.display = 'none';

      rollbackRange.value = 0;
      rangeValue.textContent = rollbackRange.value + '%';
      

      screenBtn.disabled = false;

      total.value = 0;
      totalCount.value = 0;
      totalCountOther.value = 0;
      totalCountRollback.value = 0;
      totalFullCount.value = 0;

      startBtn.style.display = 'flex';
      resetBtn.style.display = 'none';
   },
   logger: function() {
      console.log(this.title);
      console.log(`Стоимость разработки сайта ${this.servicePercentPrice} рублей`);
      console.log(this.showTypeOf(this.title));
      console.log(this.showTypeOf(this.fullPrice));
      console.log(this.showTypeOf(this.adaptive));

      for(let key in this) {
         console.log(`
         Свойсто/метод: ${key}
         Значение: ${this[key]}
         `)
      }
   }
};
////////////////////

appData.init();