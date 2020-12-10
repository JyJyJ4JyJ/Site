function AlignTable (){
	if (localStorage.getItem("checked3") == "true"){
		document.getElementsByClassName("work")[0].style.alignItems = "flex-star";
		document.getElementsByClassName("check")[0].setAttribute("checked", true);
	}
	if (localStorage.getItem("checked4") == "true"){
		document.getElementsByClassName("menu")[0].style.alignItems = "flex-star";
		document.getElementsByClassName("menu")[0].style.textAlign = "left";
		document.getElementsByClassName("check")[1].setAttribute("checked", true);
	}
	if (localStorage.getItem("checked5") == "true"){
		document.getElementsByClassName("sidebaright")[0].style.alignItems = "flex-star";
		document.getElementsByClassName("check")[2].setAttribute("checked", true);
	}
	document.addEventListener("dblclick", function (e) {
  		var form = document.getElementsByClassName("hidden-checkbox")[0];
  		form.removeAttribute("hidden");
		function handleForm(event) { 
			event.preventDefault(); 
		} 
		form.addEventListener("submit", handleForm);
		var submit = document.getElementById("submit");
  		var checks = document.getElementsByClassName("check");
		submit.addEventListener("click", function (e) {
			if (checks[0].checked){
				document.getElementsByClassName("work")[0].style.alignItems = "flex-star";
				localStorage.setItem("checked3", true);
			}
			else{
				document.getElementsByClassName("work")[0].style.alignItems = "center";
				localStorage.setItem("checked3", false);
				document.getElementsByClassName("check")[0].removeAttribute("checked");
			}
			if (checks[1].checked){
				document.getElementsByClassName("menu")[0].style.alignItems = "flex-star";
				document.getElementsByClassName("menu")[0].style.textAlign = "left";
				localStorage.setItem("checked4", true);
			}
			else{
				document.getElementsByClassName("menu")[0].style.alignItems = "center";
				document.getElementsByClassName("menu")[0].style.textAlign = "center";
				localStorage.setItem("checked4", false);
				document.getElementsByClassName("check")[1].removeAttribute("checked");
			}
			if (checks[2].checked){
				document.getElementsByClassName("sidebaright")[0].style.alignItems = "flex-star";
				localStorage.setItem("checked5", true);
			}
			else{
				document.getElementsByClassName("sidebaright")[0].style.alignItems = "center";
				localStorage.setItem("checked5", false);
				document.getElementsByClassName("check")[2].removeAttribute("checked");
			}
		});
	});
}

function showText() {
	document.getElementsByClassName("text")[0].innerHTML = pravka.value;
	localStorage.setItem("text", pravka.value);
}

function EditArea() {
	var reset = document.getElementById("reset");
	var pravka = document.getElementById("pravka");
	var backup = "\
						<p class=\"paragraph\">Заповіт — програмний вірш Тараса Шевченка у формі послання, написаний 25 грудня 1845 року в Переяславі.\
						<br>Вірш є закликом до визвольної боротьби українського народу від поневолення Російською імперією, мав і має великий вплив на українську культуру, зокрема був покладений на музику багатьма композиторами. Перекладений близько 150 мовами народів світу.\
						<br>Джерело: <a href=\"https://uk.wikipedia.org\">https://uk.wikipedia.org</a></p>\
					";
	if (localStorage.getItem("text") != null)
		document.getElementsByClassName("text")[0].innerHTML = localStorage.getItem("text");
	pravka.value = document.getElementsByClassName("text")[0].innerHTML;
	reset.addEventListener("click", function(e) {
		pravka.value = backup;
		showText();
	});
	pravka.onkeyup = pravka.oninput = showText;
  	pravka.onproperychange = function() {
    	if (event.properyName == "value") showText();
  	}
  	pravka.oncut = function() {
    	setTimeout(showText, 0);
    }
}

function Task1() {
	var play = document.getElementById("reset");
	var start = document.getElementsByClassName("button")[0];
	var close = document.getElementsByClassName("button")[1];
	var log = document.getElementsByClassName("log")[0]; //Панель повідомлень
	var interval; //Інтервал
	var r = document.getElementsByClassName("red")[0]; //Червоний квадрат
	var g = document.getElementsByClassName("green")[0]; //Зелений квадрат
	var now; //Час
	var events = []; //Події, що підуть у local storage
	play.addEventListener("click", function(e) { //кнопка play
		document.getElementsByClassName("work")[0].style.visibility = 'visible'; //work з'являється
		now = new Date().toLocaleTimeString();
		events.push("Поява 'work': " + now);
		log.innerHTML = "Почалось.";
		r.style.top = Math.floor(Math.random() * 750).toString() + "px"; //Випадкові координати квадратів
		r.style.left = Math.floor(Math.random() * 730).toString() + "px";
		g.style.top = Math.floor(Math.random() * 750).toString() + "px";
		g.style.left = Math.floor(Math.random() * 730).toString() + "px";
		start.disabled = false;
	});
	start.addEventListener("click", function(e) {
		if (start.innerHTML == "Start"){ //кнопка start
			log.innerHTML = "Анімація почалась.";
			now = new Date().toLocaleTimeString();
			events.push("Анімація почалась: " + now);
			start.disabled = true; //Робимо кнопку start неактивною
			if (interval) //Якщо один таймер вже запущено, скидаємо його
				clearInterval(interval);
			var i = 0;
			var flag = false;
			var t = 0;
			interval = setInterval(function (e) { //Старт таймера
				t += 100;
				i++;
				if (i % 2 != 0) //Рух по горизонталі
					if (flag == false){ //Рух наліво
						if (parseInt(r.style.left) - i < 0){ //
							r.style.left = (parseInt(r.style.left) + i).toString() + "px";
							log.innerHTML = "Червоний не пробив стіну на заході.";
							now = new Date().toLocaleTimeString();
							events.push("Червоний не пробив стіну на заході: " + now);
						}
						else
							r.style.left = (parseInt(r.style.left) - i).toString() + "px";
						if (parseInt(g.style.left) - i < 0){
							g.style.left = (parseInt(g.style.left) + i).toString() + "px";
							log.innerHTML = "Зелений не пробив стіну на заході.";
							now = new Date().toLocaleTimeString();
							events.push("Зелений не пробив стіну на заході: " + now );
						}
						else
							g.style.left = (parseInt(g.style.left) - i).toString() + "px";
					}
					else{ //Рух направо
						if (parseInt(r.style.left) + i > 730){
							r.style.left = (parseInt(r.style.left) - i).toString() + "px";
							log.innerHTML = "Червоний не пробив стіну на сході.";
							now = new Date().toLocaleTimeString();
							events.push("Червоний не пробив стіну на сході: " + now);
						}
						else
							r.style.left = (parseInt(r.style.left) + i).toString() + "px";
						if (parseInt(g.style.left) + i > 730){
							g.style.left = (parseInt(g.style.left) - i).toString() + "px";
							log.innerHTML = "Зелений не пробив стіну на сході.";
							now = new Date().toLocaleTimeString();
							events.push("Зелений не пробив стіну на сході: " + now );
						}
						else
							g.style.left = (parseInt(g.style.left) + i).toString() + "px";
					}
				else //Рух по вертикалі
					if (flag == false){ //Рух уверх
						if (parseInt(r.style.top) - i < 0){
							r.style.top = (parseInt(r.style.top) + i).toString() + "px";
							log.innerHTML = "Червоний не пробив стіну на півночі.";
							now = new Date().toLocaleTimeString();
							events.push("Червоний не пробив стіну на півночі: " + now);
						}
						else
							r.style.top = (parseInt(r.style.top) - i).toString() + "px";
						if (parseInt(g.style.top) - i < 0){
							log.innerHTML = "Зелений не пробив стіну на півночі.";
							now = new Date().toLocaleTimeString();
							events.push("Зелений не пробив стіну на півночі: " + now);
							g.style.top = (parseInt(g.style.top) + i).toString() + "px";
						}
						else
							g.style.top = (parseInt(g.style.top) - i).toString() + "px";
						flag = true;
					}
					else{ // Рух вниз
						if (parseInt(r.style.top) + i > 750){
							log.innerHTML = "Червоний не пробив стіну на півдні.";
							now = new Date().toLocaleTimeString();
							events.push("Червоний не пробив стіну на півдні: " + now);
							r.style.top = (parseInt(r.style.top) - i).toString() + "px";
						}
						else
							r.style.top = (parseInt(r.style.top) + i).toString() + "px";
						if (parseInt(g.style.top) + i > 750){
							log.innerHTML = "Зелений не пробив стіну на півдні.";
							now = new Date().toLocaleTimeString();
							events.push("Зелений не пробив стіну на півдні: " + now);
							g.style.top = (parseInt(g.style.top) - i).toString() + "px";
						}
						else
							g.style.top = (parseInt(g.style.top) + i).toString() + "px";
						flag = false;
					}
				if (Math.abs(parseInt(r.style.left) - parseInt(g.style.left)) < 10 && Math.abs(parseInt(r.style.top) - parseInt(g.style.top)) < 10){ //зіткнення квадратів
					log.innerHTML = "Аварія.";
					now = new Date().toLocaleTimeString();
					events.push("Аварія: " + now);
					clearInterval(interval); //Зупинення таймера
					start.innerHTML = "Reload"; //Зміна кнопки на reload
					start.disabled = false;
				}
				if (t >= 20000){ //час анімації - 20 секунд
					clearInterval(interval); //Зупинення таймера
					start.innerHTML = "Reload"; //Зміна кнопки на reload
					start.disabled = false;
				}
			}, 100);
		}
		else{ //кнопка reload
			log.innerHTML = "Перезапуск.";
			now = new Date().toLocaleTimeString();
			events.push("Перезапуск: " + now);
			r.style.top = Math.floor(Math.random() * 750).toString() + "px"; //Випадкові координати квадратів
			r.style.left = Math.floor(Math.random() * 730).toString() + "px";
			g.style.top = Math.floor(Math.random() * 750).toString() + "px";
			g.style.left = Math.floor(Math.random() * 730).toString() + "px";
			start.innerHTML = "Start"; //Зміна кнопки на start
		}
	});
	close.addEventListener("click", function(e) { //кнопка close
		document.getElementsByClassName("work")[0].style.visibility = 'hidden'; //work зникає
		now = new Date().toLocaleTimeString();
		events.push("Зникнення 'work': " + now); 
		localStorage.setItem("events", JSON.stringify(events)); //Додавання у local storage всіх логів
		events = []; //Очищення масиву
		clearInterval(interval); //Зупинення таймера
		menu = document.getElementsByClassName("menu")[0];
		menu.innerHTML = JSON.parse(localStorage.getItem("events")).join("<br>").split(","); //Виведення усіх логів у блоці №5
	});
}

function Task2() {
	
}


AlignTable();
EditArea();
Task1();
Task2();