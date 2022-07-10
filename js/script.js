window.addEventListener('DOMContentLoaded', function () {

	'use strict';

	// Табы
	let tab = document.querySelectorAll('.info-header-tab'), //присваеваем элементам HTML переменные
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) { //скрываем все табы кроме первого (c индексом "0") добавляя класс hide и убирая класс show
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	};
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) { //если таб содержит класс hide добавляем класс show и убираем класс hide
			tabContent[b].classList.add('show');
			tabContent[b].classList.remove('hide');
		}
	};

	info.addEventListener('click', function (event) { //навешиваем обработчик событий
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) { //проверяем содержит ли target определенный класс
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0); //скрываем все табы начиная с 0
					showTabContent(i); //показываем таб который соответствует target
					break;
				}
			}
		}
	});

	//Timer

	let deadLine = '2022-12-31';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()), //функция отнимает от дедлайна текущую дату
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60), //разделяет ее на часы-минуты-секунды
			hours = Math.floor((t / (1000 * 60 * 60)));
		//	hours = Math.floor((t/(1000*60*60)) % 24)
		//	days = Math.floor(t/(1000*60*60*24))    			Если нужны часы и дни

		return {
			'total': t,
			'seconds': seconds, //записывает значения в объект
			'minutes': minutes,
			'hours': hours
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'), //присваеваем элементам HTML переменные
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000); // запускаем таймер

		function updateClock() {
			let t = getTimeRemaining(endtime); //берем текущую дату разеленную на часы-минуты-секунды и записанную в объект и присваеваем ее переменной t

			function addZero(num) { //функция добавляет нолики там где значения меньше 10
				if (num <= 9) {
					return '0' + num;
				} else return num;
			}

			hours.textContent = addZero(t.hours); // берем свойства объекта t, применяем к ним addZero и записываем в переменные элементов HTML
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);


			if (t.total <= 0) { // останавливаем таймер
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}

	}

	setClock('timer', deadLine);

	//Modal

	let more = document.querySelector('.more'), //кнопка
		overlay = document.querySelector('.overlay'), //модальное окно
		close = document.querySelector('.popup-close'); //крестик закрытия

	more.addEventListener('click', function () {
		overlay.style.display = 'block';
		this.classList.add('more-splash') //добавление анимации
		document.body.style.overflow = 'hidden' //запрет на прокрутку страницы пока модальное окно активно
	});
	close.addEventListener('click', function () {
		overlay.style.display = 'none';
		more.classList.remove('more-splash') //убрать анимацию
		document.body.style.overflow = '' //убрать запрет на прокрутку страницы после закрытия модального окна
	})

	// Form

	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо. Скоро мы с вами свяжемся',
		failury: 'Похоже произошла ошибка...'
	};

	let form = document.querySelector('.main-form'), // получаем саму форму
		input = document.querySelectorAll('input'), // получаем все инпуты с этой формы
		statusMessage = document.createElement('div'); //создаем див в котором пользователь увидит статус

	statusMessage.classList.add('status');

	form.addEventListener('submit', function (event) { //назначаем именно сабмит и именно на всю форму, а не на кнопку
		event.preventDefault(); //убираем стандартное поведение, чтобы страница не перезагружалась при отправке формы
		form.append(statusMessage);

		let formData = new FormData(form); //создаем новый объект формдата, и записываем в него все что передано в форму пользователем

		function postData(data) {
			return new Promise(function (resolve, reject) {

				let request = new XMLHttpRequest();
				request.open('POST', '..//server.php');
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

				// request.setRequestHeader('Content-Type', 'application/json; charset=utf-8'); //если в формате JSON
				request.addEventListener('readystatechange', function () {
					if (request.readyState < 4) {
						resolve()
					} else if (request.readyState === 4 && request.status == 200) {
						resolve()
					} else {
						reject()
					}
				});

				// let obj = {};  
				// formData.forEach(function(value, key){	//делаем из формдаты простой объект
				// 	obj[key] = value;
				// });
				// let json = JSON.stringify(obj); // делаем из простого объекта JSON
				// request.send(json);


				request.send(data); //отправляем запрос
			})
		};


		postData(formData)
			.then(function () {
				statusMessage.innerHTML = message.loading;
			})
			.then(function () {
				statusMessage.innerHTML = message.success;
			})
			.catch(function () {
				statusMessage.innerHTML = message.failury
			})
			.finally(function () {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}

			});
	})

	//Slider

	let sliderIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides(sliderIndex);

	function showSlides(n) {

		if (n > slides.length) {
			sliderIndex = 1;
		}
		if (n < 1) {
			sliderIndex = slides.length;
		}

		slides.forEach((item) => item.style.display = 'none');

		dots.forEach((item) => item.classList.remove('dot-active'))

		slides[sliderIndex - 1].style.display = 'block';
		dots[sliderIndex - 1].classList.add('dot-active');
	}

	function plusSlides(n) {
		showSlides(sliderIndex += n);
	}

	function currentSlide(n) {
		showSlides(sliderIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlides(-1);
	});
	next.addEventListener('click', function () {
		plusSlides(1);
	});

	dotsWrap.addEventListener('click', function (event) {
		let target = event.target;

		for (let i = 0; i < dots.length + 1; i++) {
			if (target.classList.contains('dot') && target == dots[i - 1]) {
				currentSlide(i);
			}

		}
	});

	// Calc
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

		totalValue.innerHTML = 0;

		persons.addEventListener('change', function(){
			personsSum = +this.value;
			total = (personsSum + daysSum)*4000;

			if(restDays.value == ''){
				totalValue.innerHTML = 0;
			} else{
				totalValue.innerHTML = total;
			};
		});

		restDays.addEventListener('change', function(){
			daysSum = +this.value;
			total = (personsSum + daysSum)*4000;

			if(persons.value == ''){
				totalValue.innerHTML = 0;
			} else{
				totalValue.innerHTML = total;
			};
		});

		place.addEventListener('change', function(){
			if(persons.value == '' || restDays.value == ''){
				totalValue.innerHTML = 0;
			} else{
				let a = total;
				totalValue.innerHTML = a * this.options[this.selectedIndex].value;
			}
		});





});