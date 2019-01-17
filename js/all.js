var submit = document.querySelector('.submit');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('bmiData')) || [];
//監聽

update(data);

function CountBMI(e){
	let input_H = document.querySelector('.input_height').value;
	let input_W = document.querySelector('.input_weight').value;
	e.preventDefault();
	//計算BMI
	update(data);

	let meter = input_H / 100;
	let kilogram = input_W;
	let BMI = (kilogram/(meter*meter)).toFixed(2);



	//判斷
	let message = document.querySelector('#message');
	if (BMI == 'NaN') {
		alert('請輸入正確的數字');
		return;
	}else if (input_H == '') {
		alert('請輸入正確的身高');
		return;
	}else if (input_W == '') {
		alert('請輸入正確的體重');
		return;
	}else if (input_H > 300) {
		alert('輸入身高過大，請重新輸入');
		return;
	}else if (input_W > 400) {
		alert('輸入體重過大，請重新輸入');
		return;
	}

	//時間日期
	let date = new Date(); // 時間物件
    let MM = (date.getMonth()+1);  // 從0開始
    let DD = date.getDate();
    let YY = date.getFullYear();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let time = YY+'-'+MM+'-'+DD+' '+hours+':'+ min+':'+sec;


	let BMI_value1 = document.querySelector('#bmi_value');
 	let weight_value1 = document.querySelector('#weight_value');
 	let height_value1 = document.querySelector('#height_value');

 	let Status_color = document.querySelector('#Status_color');
	

	//判斷體型
	if (BMI < 18.5) {
		Status = '過輕';
        lightBar = 'blue';
	}else if(18.5<=BMI && BMI<24) {
		Status = '理想';
        lightBar = 'green';
    }else if(24<=BMI && BMI<27) {
    	Status = '過重';
        lightBar = 'orange_small';
    }else if(27<=BMI && BMI<30) {
    	Status = '輕度肥胖';
        lightBar = 'orange_mid';
    }else if(30<=BMI && BMI<35) {
    	Status = '中度肥胖';
        lightBar = 'orange_large';
    }else if(BMI>=35) {
    	Status = '重度肥胖';
        lightBar = 'red';
    }


//陣列
	var BMI_Obj = {
		lightBar: lightBar,
		status: Status,
		bmi: BMI,
		weight: input_W,
		height: input_H,
		time: time,
	};

	data.push(BMI_Obj);

	update(data);

	localStorage.setItem('bmiData', JSON.stringify(data));

	



}
function update(items){
	let str = '';
	for (let i = 0; i < items.length; i++) {

		str += `<li data-num="${i}">
					<div id="Status_color" class="${items[i].lightBar}"></div>

					<h5 id="Status" style="font-size: 15px;">${items[i].status}</h5>

					<p>BMI
						<em id="bmi_value" class="text_class">${items[i].bmi}</em>
					</p>

					<p>weight
						<em id="weight_value" class="text_class">${items[i].weight}kg</em>
					</p>

					<p>height
						<em id="height_value" class="text_class">${items[i].height}cm</em>
					</p>
					<a href="#"><img src="images/cancel.png" alt=""></a>
					<h4 id="time">${items[i].time}</h4>
					
				</li>`

	}

	list.innerHTML = str;
}



function DeleteList(e){
	e.preventDefault();
	let num = e.target.dataset.num;
	if (e.target.nodeName !== 'IMG') {return};
	data.splice(num, 1);
	
	localStorage.setItem('bmiData',JSON.stringify(data));
	update(data);
}



submit.addEventListener('click', CountBMI, false);
list.addEventListener('click', DeleteList, false);