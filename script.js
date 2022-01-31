////////////////////

const title = prompt('Как называется ваш проект?'),
screens = prompt('Какие типы экранов нужно разработать?'),
screenPrice = +prompt('Сколько будет стоить данная работа?'),
adaptive = confirm('Нужен ли адаптив на сайте?'),
service1 = prompt('Какой дополнительный тип услуги нужен?'),
servicePrice1 = +prompt('Сколько это будет стоить?'),
service2 = prompt('Какой дополнительный тип услуги нужен?'),
servicePrice2 = +prompt('Сколько это будет стоить?'),
fullPrice = screenPrice + servicePrice1 + servicePrice2,
rollback = fullPrice * (20 / 100),
servicePercentPrice = fullPrice - rollback;
//servicePercentPrice = Math.ceil(fullPrice - rollback);


//////////////////////

console.log(servicePercentPrice);

console.log(Math.ceil(servicePercentPrice));


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.toLocaleLowerCase().split(', '));

console.log(`Процент отката посреднику за работу ${rollback}`);

////////////////////



if( fullPrice  <= 0 ) console.log('Что-то пошло не так');
if( fullPrice >= 30000) console.log('Даем скидку в 10%');
if( fullPrice >= 15000 && fullPrice < 30000) console.log('Даем скидку в 5%');
if( fullPrice < 15000 && fullPrice > 0) console.log('Скидка не предусмотрена');
