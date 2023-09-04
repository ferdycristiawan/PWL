const demo = document.getElementById("demo");

const testLet = () => {
    let num = 100;
    {
        let num = 200;
    }
    return num;
};
document.getElementById("demo").innerHTML = testLet();

demo.innerHTML = testLet();

const testVar = () => {
    var num = 100;
    {
        var num = 200;
    }
    return num;
};
document.getElementById("demo1").innerHTML = testVar();

try {
    const PI = 3.141592653589793;
    PI = 3.14;
    document.getElementById("demo2").innerHTML = PI;
}
    catch (err) {
        document.getElementById("demo2").innerHTML = err;
}

function calculateBill(meal, taxRate = 0.05) {
    const total = meal * (1 + taxRate);
    return total;
}
const myTotal = calculateBill(100, 0.13);
document.getElementById("taxtBill").innerHTML = myTotal;

// ES5
var car = {
    name: "Honda",
    products: ["jazz", "civic", "hrv"],
    showProduct: function () {
        this.products.map(
            function (product) {
                console.log(`${this.name} has launched ${product}`);
            }.bind(this)
        );
    },
};
car.showProduct();

// ES6
var car = {
    name: "Honda",
    products: ["jazz", "civic", "hrv"],
    showProduct: function () {
        this.products.map(() => {
            console.log('${this.name} has launched ${product}');
        });
    },
};
car.showProduct();

let firstName = "John";
let lastName = "Doe";
let text = `Welcome ${firstName}, ${lastName}!`;
document.getElementById("demo").innerHTML = text;

const formatMessage = (name, id, avatar) => {
    return {
        name,
        id,
        avatar,
        timestamp: Date.now(),
        save () {
            //save message
        }
    }
}
const message = formatMessage("Belajar Programming", 1, "https://i.pravatar.cc/300");

console.log("message", message);

const {avatar} = message;
message.name;
message.id;
message.avatar;

// opsi 1
const q1 = ["Jan", "Feb", "Mar"];
const q2 = ["Apr", "May", "Jun"];
const q3 = ["Jul", "Aug", "Sep"];
const q4 = ["Oct", "Nov", "May"];
const year = [...q1, ...q2, ...q3, ...q4];
// opsi 2
const numbers = [23,55,21,87,56];
let maxValue = Math.max(...numbers);
document.getElementById("demo").innerHTML = year;

import person from "./person.js";
const {nama} = person 