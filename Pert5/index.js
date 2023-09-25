const demo = document.getElementById("demo");

// const getDay = () => {
//     if (new Date().getDay() === 0) {
//         return "Sunday";
//     }
//     if (new Date().getDay() === 1) {
//         return "Monday";
//     }
//     if (new Date().getDay() === 2) {
//         return "Tuesday";
//     }
//     if (new Date().getDay() === 3) {
//         return "Wednesday";
//     }
//     if (new Date().getDay() === 4) {
//         return "Thursday";
//     }
//     if (new Date().getDay() === 5) {
//         return "Friday";
//     }
//     if (new Date().getDay() === 6) {
//         return "Saturday";
//     }
// };
// const today = getDay();
// demo.innerHTML = 'Today is ${today}';

const today2 = {
    day: 1,
    name: "Monday",
};

// Single Condition
new Date().getDay() === today2.day
    ? (demo.innerHTML = 'Today is ${today2.name}')
    : (demo.innerHTML = 'Today is not ${today2.name}');

const anotherDay = {
    day: 5,
    name: "Friday",
};

// Multiple Condition
new Date().getDay() === today2.day
    ? (demo.innerHTML = 'Today is ${today2.name}')
    : new Date().getDay() === anotherDay.day
    ? (demo.innerHTML = 'Today is ${today2.anotherDay.day}')
    : (demo.innerHTML = 'Today is neither ${today2.name} nor ${anotherDay.name}');

const getDay = () => {
    switch (new Date().getDay()) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
    }
}
const today3 = getDay();
demo.innerHTML = 'Today is ${today3}';

const myNumbers = [4, 1, -20, -7, 5, 9, -6];

// Call removeNeg with a Callback
const posNumbers = removeNeg(myNumbers, (x) => x >= 0);

// Display Result
document.getElementById("demo").innerHTML = posNumbers;

// Remove negative numbers
function removeNeg(numbers, callback) {
    const myArray = [];
    for (const x of numbers) {
        if (callback(x)) {
            myArray.push(x);
        }
    }
    return myArray;
}

// Synstax Promise
// let promise = new Promise((resolve, reject) => {
//     resolve();
//     reject();
// });

// // Consumer
// promise.then(
//     (value) => {}, // kode yang sukses
//     (error) => {} // kode yang error
// );
const Displayer = (value) => {
    demo.innerHTML =value;
}

let promise = new Promise((myResolve, myReject)=>{
    let x = 1;
    if(x==0){
        myResolve("OK");
    } else  {
        myReject("Error");
    }
});

promise.then(
    (value) => {
        Displayer(value);
    },
    (error) => {
        Displayer(error);
    }
)

// Async Await
// Syntax
const myFunction = async() => {
    const myPromise = new Promise((resolve, reject) => {
        // konidis true atau resolved
        if (promiseTrue === true) {
        setTimeout(() => {
            resolve("I live you!");

        }, 3000);
    }
        // kondisi false atau rejected
    if (promiseTrue === false) {
        reject("Rejected")
    }
    });
    const result = await myPromise;
        Displayer(result);
};

const getUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const users = await response.json();
    return users
};

const userList = getUsers().then(value) => {
    console.log("Value", value);
    demo.innerHTML = value.map((user) => {
        return `
        <h3>${user.name}<h3/>
        <ul>
            <li>${user.username}<li/>
            <li>${user.email}<li/>
            <li>${user.company.name}<li/>
            <li>${user.phone}<li/>
            <li>${user.website}<li/>
            <li>${user.address.street}<li/>
        <ul/>
        `;
    });
};