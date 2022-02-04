'use strict';

const appData = {
   title: '', 
   screens: '',
   screenPrice: 0,
   adaptive: true,
   service1: '',
   service2: '',
   rollback: 20,

   isNumber: function(num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
   },
   
   getTitle: function(title) {
      return title[0].toUpperCase() + title.slice(1).toLowerCase();
   },
   
   asking: function() {
      appData.title = appData.getTitle(prompt('Как называется ваш проект?', 'Калькулятор вёрстки').trim());
      appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');
   
      do {
         appData.screenPrice = prompt('Сколько будет стоить данная работа?').trim();
      } while(!appData.isNumber(appData.screenPrice));
   
      appData.adaptive = confirm('Нужен ли адаптив на сайте?');
   },
   
   getAllServicePrices: function() {
      let sum = 0,
      servicePrice;
   
      for(let i = 0; i < 2; i++) {
         if(i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
         }
         if(i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
         }
   
         servicePrice = prompt('Сколько это будет стоить?').trim();
   
         while(!appData.isNumber(servicePrice)) {
            servicePrice = prompt('Сколько это будет стоить?').trim();
         }
         
         sum += +servicePrice;
      }
   
      return sum;
   },
   
   getServicePercentPrices: function(price, rollback) {
      return Math.ceil(price - (price * (rollback / 100)));
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
      return price + servicesPrice;
   },

   logger: function() {
      console.log(`Стоимость разработки сайта ${appData.servicePercentPrice} рублей`);
      console.log(appData.screens.toLocaleLowerCase().split(', '));
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
   },

   start: function () {
      appData.asking();
      appData.allServicePrices = appData.getAllServicePrices();
      appData.fullPrice = appData.getFullPrice(+appData.screenPrice, appData.allServicePrices);
      appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
      appData.logger();
   }
};
////////////////////

appData.start();