// 2) Используя синтаксис ES6 в отдельном документе:

// Создать класс options

// Он должен содержать свойства: height, width, bg, fontSize, textAlign

// Он должен содержать метод, создающий новый div на странице, записывающий в него любой текст и при помощи cssText изменять свой стиль из переданных параметров

// Создать новый объект через класс

// Вызвать его метод и получить элемент на странице

class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    createDiv() {
        let elem = document.createElement('div');
        document.body.append(elem);
        elem.textContent = 'vdervedrvev';
        elem.style.cssText = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;

    }
}

let cool = new Options(300, 350, "red", 14, "center");

cool.createDiv();

// let arr = ['apple', 'banana', 'orange'];

// let breakfast = arr.map(fruit => fruit + 's');

// alert(breakfast);




// let sum = 0;

// function solution(number){
//     if(number >= 0){
//     for (let i = 0; i<number; i++){


//       if(i%3 == 0 || i%5 == 0){
//         sum = sum+i;
//             }          
//     }
//     return sum;}
//     else {return 0}
//   }

// console.log(solution(10));

// function validatePIN (pin) {
//     return typeof pin === 'string' &&            // verify that the pin is a string
//       Number.isInteger(+pin) &&                 // make sure that the string is an integer when converted into a number
//       [4, 6].includes(pin.length)               // only accepts 4 and 6 character pins
//   }
//   console.log(validatePIN('12343'))

//   function findShort(str){
//         let arr = [];
//         arr = str.split(' ');
//         let arr2 = [];
//     for(let i = 0; i<arr.length; i++){
//         arr2.push(arr[i].length);

//     }
//     return Math.min(...arr2);
// }
// console.log(findShort('hello where are your'))



// function findShort(s) {
//     return Math.min(...s.split(' ').map(word => word.length));
//   }

//   console.log(findShort("hello my dear friend!"));




//   function findShort(s) {
//     let res = s.split(' ');
//     let a = Infinity;

//     for (let i = 0; i < res.length; i++) {
//       a = Math.min(res[i].length, a);
//     }
//     return a;
//   }

//   console.log(findShort("Hello my dear friend"));


//   persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
//   // and 4 has only one digit

function persistence(num) {
    let arr = num.toString().split('');
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum = sum + (+(arr[i]));
    }
    return sum;
}

console.log(persistence(134))