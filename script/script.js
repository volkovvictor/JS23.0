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
      mainTotalButtons = document.querySelector('.main-total__buttons');

let screens = document.querySelectorAll('.screen');


const appData = {
   title: '', 
   screens: [],
   screenCount: 0,
   screenPrice: 0,
   servicePricesPersent: 0,
   servicePricesNumber: 0,
   adaptive: true,
   servicesPersent: {},
   servicesNumber: {},
   rollback: 0,
   fullPrice: 0,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },
   init: function() {
      appData.addtitle();

      startBtn.addEventListener('click', appData.checkValue);
      screenBtn.addEventListener('click', appData.addScreenBlock);
      rollbackRange.addEventListener('input', appData.addRollback);
      rollbackRange.addEventListener('input', appData.addPrices);
      rollbackRange.addEventListener('input', function() {
         totalCountRollback.value = appData.servicePercentPrice;
      });
   },
   addtitle: function() {
      document.title = title.textContent;
   },
   start: function () {
      appData.addScreens();
      appData.addServices();
      appData.addPrices();
      appData.showResult();
      appData.logger();
   },
   showResult: function() {
      total.value = appData.screenPrice;
      totalCount.value = appData.screenCount;
      totalCountOther.value = appData.servicePricesPersent + appData.servicePricesNumber;
      totalCountRollback.value = appData.servicePercentPrice;
      totalFullCount.value = appData.fullPrice;
   },
   checkValue: function() {
      if(appData.addScreens() !== true) {
         alert('Ошибка');
      } else {
         appData.start();
      }
   },
   addScreens: function() {
      appData.screens.length = 0;
      screens = document.querySelectorAll('.screen');

      screens.forEach(function(screen, index) {
         const select = screen.querySelector('select'),
         input = screen.querySelector('input'),
         currentOption = select.options[select.selectedIndex],
         selectName = currentOption.textContent;

         appData.screens.push({
            id: index, 
            name: selectName, 
            price: +select.value * +input.value,
            count: input.value
         });
      });

      if(appData.screens.find(item => item.price === 0)) {
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

      appData.screenPrice = appData.screens.reduce(function(sum, item){
         return sum + +item.price;
      }, 0);

      appData.screenCount = appData.screens.reduce(function(sum, item){
         return sum + +item.count;
      }, 0);

      for (let key in appData.servicesNumber) {
         appData.servicePricesNumber += appData.servicesNumber[key];
      }

      for (let key in appData.servicesPersent) {
         appData.servicePricesPersent += appData.screenPrice * (appData.servicesPersent[key] / 100);
      }

      appData.fullPrice = appData.screenPrice + 
      appData.servicePricesPersent + appData.servicePricesNumber;

      appData.servicePercentPrice = Math.ceil(appData.screenPrice - (appData.screenPrice * (appData.rollback / 100)));
   },
   addServices: function() {
      persentItems.forEach(function(item) {
         const check = item.querySelector('input[type=checkbox]'),
         label = item.querySelector('label'),
         input = item.querySelector('input[type=text]');

         if(check.checked) {
            appData.servicesPersent[label.textContent] = +input.value;
         }
      });

      numberItems.forEach(function(item) {
         const check = item.querySelector('input[type=checkbox]'),
         label = item.querySelector('label'),
         input = item.querySelector('input[type=text]');

         if(check.checked) {
            appData.servicesNumber[label.textContent] = +input.value;
         }
      });
   },
   addRollback: function() {
      const value = rollbackRange.value;

      rangeValue.textContent = value + '%';
      appData.rollback = +value;
      console.log(appData.rollback);
   },
   showTypeOf: function(variable) {
      return typeof variable;
   },

   logger: function() {
      console.log(appData.title);
      console.log(`Стоимость разработки сайта ${appData.servicePercentPrice} рублей`);
      console.log(appData.getRollbackMessage(appData.fullPrice));
      console.log(appData.showTypeOf(appData.title));
      console.log(appData.showTypeOf(appData.fullPrice));
      console.log(appData.showTypeOf(appData.adaptive));

      for(let key in appData) {
         console.log(`
         Свойсто/метод: ${key}
         Значение: ${appData[key]}
         `)
      }
   }
};
////////////////////

appData.init();