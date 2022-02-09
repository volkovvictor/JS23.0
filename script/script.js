'use strict';

const title = document.getElementsByTagName('h1')[0],
      startBtn = document.getElementsByClassName('handler_btn')[0],
      resetBtn = document.getElementsByClassName('handler_btn')[1],
      screenBtn = document.querySelector('.screen-btn'),
      persentItems = document.querySelectorAll('.other-items.percent'),
      numberItmes = document.querySelectorAll('.other-items.number'),
      rollbackRange = document.querySelector('.rollback input[type=range]'),
      rangeValue = document.querySelector('.rollback .range-value'),
      total = document.getElementsByClassName('total-input')[0],
      totalCount= document.getElementsByClassName('total-input')[1],
      totalCountOther = document.getElementsByClassName('total-input')[2],
      totalFullCount = document.getElementsByClassName('total-input')[3],
      totalCountRollback = document.getElementsByClassName('total-input')[4];

let screen = document.querySelectorAll('.screen');


const appData = {
   title: '', 
   screens: [],
   screenPrice: 0,
   allServicePrices: 0,
   adaptive: true,
   services: {},
   rollback: 20,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },

   start: function () {
      appData.asking();
      appData.addPrices();
      appData.getFullPrice(+appData.screenPrice, appData.allServicePrices);
      appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
      appData.logger();
   },
   
   getTitle: function(title) {
      return title[0].toUpperCase() + title.slice(1).toLowerCase();
   },
   
   asking: function() {
      do {
         appData.title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки').trim();
      } while(appData.isNumber(appData.title) || appData.title === '');

      for(let i = 0; i < 2; i++) {
         let name = '',
            price = 0;

         do {
            name = prompt('Какие типы экранов нужно разработать?').trim();
         } while(appData.isNumber(name) || name === '');

         do {
            price = prompt('Сколько будет стоить данная работа?').trim();
         } while(!appData.isNumber(price));

         appData.screens.push({id: i, name: name, price: price});
      }

      for(let i = 0; i < 2; i++) {
         let name = '',
            price = 0;

         do {
            name = prompt('Какой дополнительный тип услуги нужен?').trim();
         } while(appData.isNumber(name) || name === '');

         price = prompt('Сколько это будет стоить?').trim();
   
         while(!appData.isNumber(price)) {
            price = prompt('Сколько это будет стоить?').trim();
         }
         
         for (let key in appData.services) {
            if (appData.services.hasOwnProperty(name)) {
               appData.services[name + '_' + i] = +price;
               return;
            }
         }

         appData.services[name] = +price;
      }
   
      appData.adaptive = confirm('Нужен ли адаптив на сайте?');
   },
   addPrices: function() {

      appData.screenPrice = appData.screens.reduce(function(sum, item){
         return sum + +item.price;
      }, 0);

      for (let key in appData.services) {
         appData.allServicePrices += appData.services[key];
      }
   },
   
   getServicePercentPrices: function(price, rollback) {
      appData.servicePercentPrice = Math.ceil(price - (price * (rollback / 100)));
   },
   
   getRollbackMessage: function(price) {
      if( price <= 0 ) return 'Что-то пошло не так';
      if( price >= 30000 ) return 'Даем скидку в 10%';
      if( price >= 15000 && appData.fullPrice < 30000 ) return 'Даем скидку в 5%';
      if( price < 15000 && appData.fullPrice > 0 ) return 'Скидка не предусмотрена';
   },
   
   showTypeOf: function(variable) {
      return typeof variable;
   },
   
   getFullPrice(price, servicesPrice) {
      appData.fullPrice = price + servicesPrice;
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

appData.start();