'use strict';

let title, 
screens,
screenPrice,
adaptive,
service1,
service2,
rollback = 20;

////////////////////

const isNumber = function(num) {
   return !isNaN(parseFloat(num)) && isFinite(num);
};

const getTitle = function(title) {
   return title[0].toUpperCase() + title.slice(1).toLowerCase();
};

const asking = function() {
   title = getTitle(prompt('Как называется ваш проект?').trim());
   screens = prompt('Какие типы экранов нужно разработать?');

   do {
      screenPrice = prompt('Сколько будет стоить данная работа?').trim();
   } while(!isNumber(screenPrice));

   adaptive = confirm('Нужен ли адаптив на сайте?');
};

const getAllServicePrices = function() {
   let sum = 0,
   servicePrice;

   for(let i = 0; i < 2; i++) {
      if(i === 0) {
         service1 = prompt('Какой дополнительный тип услуги нужен?');
      }
      if(i === 1) {
         service2 = prompt('Какой дополнительный тип услуги нужен?');
      }

      servicePrice = prompt('Сколько это будет стоить?').trim();

      while(!isNumber(servicePrice)) {
         servicePrice = prompt('Сколько это будет стоить?').trim();
      }
      
      sum += +servicePrice;
   }

   return sum;
};

const getServicePercentPrices = function(price, rollback) {
   return Math.ceil(price - (price * (rollback / 100)));
};

const getRollbackMessage = function(price) {
   if( price <= 0 ) return 'Что-то пошло не так';
   if( price >= 30000 ) return 'Даем скидку в 10%';
   if( price >= 15000 && fullPrice < 30000 ) return 'Даем скидку в 5%';
   if( price < 15000 && fullPrice > 0 ) return 'Скидка не предусмотрена';
};

const showTypeOf = function(variable) {
   return typeof variable;
}

function getFullPrice(price, servicesPrice) {
   return price + servicesPrice;
}

////////////////////

asking();
const allServicePrices = getAllServicePrices(),
fullPrice = getFullPrice(+screenPrice, allServicePrices),
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

//////////////////////

console.log(`Стоимость разработки сайта ${servicePercentPrice} рублей`);
console.log(screens.toLocaleLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));