let incomes = document.querySelector('.income_list div');
let outcomes = document.querySelector('.expenses_list div');
let submitBtn = document.querySelector('.fa-check-circle');
let exp = 0;
let inc = 0;
let total = 0;
const getData = (route) => {
    incomes.innerHTML = '';
    outcomes.innerHTML = '';
    axios.get(`/${route}`)
        .then(function (response) {
            // handle success
            if (route == 'incomes') {
                response.data.incomes.forEach(item => {
                    incomes.innerHTML +=
                        `<div class="income-row" id="${route}-${item.id}">
                        <span class="income_dis"> ${item.description} </span>    
                        <span class="income_value" > + ${item.amount} </span >     
                        <i class="far fa-times-circle" onclick="delteItem(this.parentElement.id)"></i>      
                    </div>`
                });
                total = response.data.totalIncome;
            }
            if (route == 'outcomes') {
                response.data.outcomes.forEach(item => {
                    outcomes.innerHTML +=
                        `<div class="income-row" id="${route}-${item.id}">
                        <span class="income_dis"> ${item.description} </span>    
                        <span class="income_value" > + ${item.amount} </span>
                        <span> ${item.percentage}% </span>     
                        <i class="far fa-times-circle" onclick="delteItem(this.parentElement.id)"></i>      
                    </div>`
                });
                total = response.data.totalexpense
            }
            updateBudget(route, total);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

getData('incomes');
getData('outcomes');

//! delete Item
const delteItem = (id) => {
    let server = id.split('-');
    axios.delete(`/${server[0]}/${server[1]}`)
        .then(response => {
            if (response.status === 200) {
                document.getElementById(id).remove();
                getData('incomes');
                getData('outcomes');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// add the item to the server
const addItem = () => {
    let description = document.getElementById('description').value;
    let amount = Number(document.getElementById('amount').value);
    let type = document.getElementById('type').value;
    //--- make axios post request
    if (description.trim() == '' || description == 'null' || amount == 'null' || amount == 0) {
        let alert = document.querySelector('.error');
        alert.style.display = 'block';
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    }
    else {
        axios.post(`/${type}`, { description: description, amount: amount })
            .then((response) => {
                if (response.status == 200) {
                    getData('incomes')
                    getData('outcomes')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

const updateBudget = (type, sum) => {
    let totalIncomeelm = document.querySelector('.totalInc');
    let totalexpenseelm = document.querySelector('.totalExp');
    let total = document.querySelector('#total_budget');
    if (type == 'incomes') {
        totalIncomeelm.innerText = sum;
        inc = sum
    }
    if (type == 'outcomes') {
        totalexpenseelm.innerHTML = sum;
        exp = sum
    }
    total.innerHTML = inc - exp
    let totalPercentage = Math.floor((exp * 100) / inc)
    document.querySelector('#totalPercentage').innerText = totalPercentage
}

//! Change color of the inputs
(() => {
    let description = document.querySelector("#description");
    let value = document.querySelector("#amount");
    let type = document.querySelector("#type");
    description.addEventListener("focusout", (e) => { colorize(e) })
    description.addEventListener("focus", (e) => { colorize(e) });
    value.addEventListener("focusout", (e) => { colorize(e) });
    value.addEventListener("focus", (e) => { colorize(e) });
})()

const colorize = (e) => {
    if (e.type == "focus") {
        if (type.value == "outcomes") {
            e.target.style.outline = "1px solid rgb(226, 66, 66)"
            submitBtn.style.color = "rgb(226, 66, 66)"
        } else if (type.value == "incomes") {
            e.target.style.outline = "1px solid #99ECFC"
            submitBtn.style.color = "#99EfFC"
        }
    }

    else if (e.type == "focusout") {
        e.target.style.outline = ""
        if (type.value == "outcomes") {
            submitBtn.style.color = "rgb(226, 66, 66)"
        } else {
            submitBtn.style.color = "#99EfFC"
        }
    }
}

//* submit form on enter KeyBoard
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        addItem();
    }
});

let months = ["January", "February", "March", "April", "May", "june", "July", "August"
    , "September", "october", "Novmber", "December"];

let month = months[new Date().getMonth()] + " "
let year = new Date().getFullYear();
document.querySelector(".date").innerText = `${month} ${year}`;