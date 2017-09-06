"use strict";
// 08 alert後にnext
var bit = 8; // ビット数
var num = Math.pow(2, bit); // bit桁の数の最大値+1 (bit=8のとき2進数で100000000 = 256)、すなわち組み合わせの総数
var limitNum = Math.pow(2, bit)-3 // 3足してもオーバーフローしない最大値+1
var img_width = 64;
var img_height = 64;
var currentN;
var n;

init();
next();

function init() {
	// 元の数のフィールド
	var field = document.getElementById("field0");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = document.createElement("span");
		field.appendChild(digit);
		digit.setAttribute("class", "digit");
	}
	
	// 現在値のフィールド
	var field = document.getElementById("fieldCurrent");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = document.createElement("span");
		field.appendChild(digit);
		digit.setAttribute("class", "digit");
		digit.onmouseover = function() {invert(this);};
	}
	
	// 3足した数のフィールド
	var field = document.getElementById("field3");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = document.createElement("span");
		field.appendChild(digit);
		digit.setAttribute("class", "digit");
	}
	
	// 排他的論理和のフィールド
	var field = document.getElementById("fieldXor");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = document.createElement("span");
		field.appendChild(digit);
		digit.setAttribute("class", "digit");
	}
}

function next() {
	n = Math.floor(Math.random()*limitNum);
	var arr = [];
	var p3arr = [];
	currentN = n;
	//arr = n.toString(2).split("").reverse();
	arr = n2arr(n);
	p3arr = n2arr(n+3);
	
	// 元の数のフィールド
	var field = document.getElementById("field0");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = field.getElementsByClassName("digit")[i];
		digit.classList.remove(class01(0));
		digit.classList.remove(class01(1));
		digit.classList.add(class01(arr[bit-i-1]));
	}
	document.getElementById("number0").innerHTML = String(n);
	
	// 現在値のフィールド
	var field = document.getElementById("fieldCurrent");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = field.getElementsByClassName("digit")[i];
		digit.classList.remove(class01(0));
		digit.classList.remove(class01(1));
		digit.classList.add(class01(arr[bit-i-1]));
	}
	
	// 3足した数のフィールド
	var field = document.getElementById("field3");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = field.getElementsByClassName("digit")[i];
		digit.classList.remove(class01(0));
		digit.classList.remove(class01(1));
		digit.classList.add(class01(p3arr[bit-i-1]));
	}
	document.getElementById("number3").innerHTML = String(n+3);
	
	// 排他的論理和のフィールド
	var field = document.getElementById("fieldXor");
	var i;
	for(i=bit-1; i>=0; i--) {
		var digit = field.getElementsByClassName("digit")[i];
		digit.classList.remove(class01(0));
		digit.classList.remove(class01(1));
		digit.classList.add(class01(arr[i]^p3arr[i]));
	}
	
	check();
}

function class01(num) {
	if(num===1) {
		return "one"
	} else if(num===0) {
		return "zero";
	} else {
		return "";
	}
}

function n2arr(n) {
	var arr = []
	var tmp = n;
	var i;
	for(i=0; i < bit; i++) {
		arr.push(tmp&1);
		var tmp = tmp>>1;
	}
	return arr
}

function invert(elem) {
	elem.classList.toggle("zero");
	elem.classList.toggle("one");
	check();
}

function check() {
	var i;
	var wrongBits = (dom2n(document.getElementById("field0"))+3) ^ dom2n(document.getElementById("fieldCurrent"));
	var wrongBitArray = n2arr(wrongBits);
	for(i=0; i<bit; i++) {
		var cl = document.getElementById("fieldXor").getElementsByClassName("digit")[bit-i-1].classList;
		if(wrongBitArray[i] == 1) {
			// ビットが間違いのとき
			cl.add(class01(1));
			cl.remove(class01(0));
			cl.add("wrong");
		} else {
			// ビットが正解のとき
			cl.add(class01(0));
			cl.remove(class01(1));
			cl.remove("wrong");
		}
;
	}
	
	currentN = dom2n(document.getElementById("fieldCurrent"));
	document.getElementById("numberCurrent").innerHTML = String(currentN);
	
	if(currentN==(n+3)) {
		alert("3足した！");
		next();
	/*
		document.getElementById("cleared").innerHTML = "3足した！";
	*/
	} else {
	/*
		document.getElementById("cleared").innerHTML = "";
	*/
	}
}

function dom2n(elem) {
	var tmp = 0;
	var digits = elem.getElementsByClassName("digit");
	var l=digits.length;
	var i;
	for(i=0; i<l; i++) {
		tmp = tmp<<1;
		tmp += Number((digits[i].classList.contains("one"))?1:(digits[i].classList.contains("zero")?0:NaN));
	}
	return tmp;
}

function toggle0() {
	var elm = document.getElementById("field0Check");
	if(elm.checked) {
		document.getElementById("fieldWithNum0").style.display = "block";
	} else {
		document.getElementById("fieldWithNum0").style.display = "none";
	}
}

function toggle3() {
	var elm = document.getElementById("field3Check");
	if(elm.checked) {
		document.getElementById("fieldWithNum3").style.display = "block";
	} else {
		document.getElementById("fieldWithNum3").style.display = "none";
	}
}

function toggleStar() {
	var elm = document.getElementById("fieldXorCheck");
	if(elm.checked) {
		document.getElementById("fieldXor").style.display = "inline-block";
	} else {
		document.getElementById("fieldXor").style.display = "none";
	}
}

function toggleNumberStyle() {
	var elm = document.getElementById("numberStyleCheck");
	if(elm.checked) {
		document.getElementById("field").classList.add("numberStyle");
	} else {
		document.getElementById("field").classList.remove("numberStyle");
	}
}