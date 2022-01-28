////////////////////

let title = 'Какой-то проект',
screens = "Простой, Сложный, Интерактивный",
screenPrice = 3000,
rollback = 20,
fullPrice = 60000,
adaptive = true;

////////////////////


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);

console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

console.log(screens.toLocaleLowerCase().split(', '));

console.log(`Процент отката посреднику за работу ${fullPrice * (rollback/100)}`);
