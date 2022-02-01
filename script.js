'use strict';

let title = prompt('Как называется ваш проект?').trim(),
screens = prompt('Какие типы экранов нужно разработать?'),
screenPrice = +prompt('Сколько будет стоить данная работа?'),
adaptive = confirm('Нужен ли адаптив на сайте?'),
service1 = prompt('Какой дополнительный тип услуги нужен?'),
servicePrice1 = +prompt('Сколько это будет стоить?'),
service2 = prompt('Какой дополнительный тип услуги нужен?'),
servicePrice2 = +prompt('Сколько это будет стоить?'),
allServicePrices = 0,
fullPrice = 0,
rollback = 20,
servicePercentPrice = 0;

////////////////////

const getAllServicePrices = function(price1, price2) {
   return price1 + price2;
};

const getTitle = function(title) {
   return title[0].toUpperCase() + title.slice(1).toLowerCase();
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

title = getTitle(title);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

//////////////////////

console.log(`Стоимость разработки сайта ${servicePercentPrice} рублей`);
console.log(screens.toLocaleLowerCase().split(', '));
console.log(getRollbackMessage(fullPrice));
console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));