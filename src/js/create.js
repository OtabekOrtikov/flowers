let obj;

fetch('json/articles.json')
.then(response => response.json())
.then(data => {
    obj = data;
    changePage(1);

})
.catch(error => {
    console.error('Error fetching data:', error);
});

let i = 1;
let s = 10;

function prevPage() {
    if(i > 1) {
        i--;
        changePage(i);
    }
}

function nextPage() {
    if (i < numPages(obj.articles)) {
        i++;
        changePage(i);
    }
}

const contBtn = document.querySelectorAll('.cat-btn');
const allBtn = document.querySelector('#all');
const momBtn = document.querySelector('#mom');
const childrenBtn = document.querySelector('#children');
const marryBtn = document.querySelector('#marry');
const classicBtn = document.querySelector('#classic');

for (let g = 0; g < contBtn.length; g++) {
    contBtn[g].addEventListener('click', (event) => {
        let current = document.querySelector('.collect-filter__category-list .active');
        if (current) {
            current.classList.remove('active');
        }
        event.target.classList.add('active');
        changePage(1);
    });
}

function changePage(page) {
    var btn_next = document.querySelector('#next-page');
    var btn_prev = document.querySelector('#prev-page');
    var list_cont = document.querySelector('#list-cont');
    var page_span = document.querySelector('#page');
    var data = obj.flowers;

    if (page < 1) page = 1;
    if (page > numPages(data)) page = numPages(data);

    list_cont.innerHTML = '';

    function checkActivity() {
        let check = document.querySelector('.collect-filter__category-list .active').id;
        if (check == 'all') {
            data = data;
        } else if (check == 'white') {
            data = data.filter(item => item.category == 'white');
        } else if (check == 'pink') {
            data = data.filter(item => item.category == 'pink');
        } else if (check == 'red') {
            data = data.filter(item => item.category == 'red');
        } else {
            data = 'data';
        }
        return data;
    }
    console.log(checkActivity());
    
    
    for (var j = (page-1) * s; j < (page * s) && j < checkActivity().length; j++) {    
        list_cont.innerHTML += `<article class="flower-card"><img src="${data[j].image}" alt="${data[j].name}" loading="lazy"><div class="flower-card-desc"><h4>${data[j].name}</h4><div class="card-price"><span class="card-price__cost"><span id="cost-sum">${Math.round(data[j].cost)}</span> USD</span><button class="card-price__btn"><span class="icon-minus card-price__btn-minus"></span><span class="card-price__btn-amount">1</span><span class="icon-plus card-price__btn-plus"></span><span class="icon-basket card-price__btn-basket"></span></button></div></div></article>`;
    }
    page_span.innerText = `Page: ${page}`;

    if (page == 1) {
        btn_prev.style.display = "none";
    } else {
        btn_prev.style.display = "block";
    }

    if (page == numPages(data)) {
        btn_next.style.display = "none";
    } else {
        btn_next.style.display = "block";
    }
    addToBasket();

}

function numPages(data) {
    return Math.ceil(data.length / s);
}

function addToBasket() {
    const btns = document.querySelectorAll(".card-price__btn");
    
    btns.forEach(button => {
        let count = 1;
        let minus = button.querySelector('.card-price__btn-minus');
        let amount = button.querySelector('.card-price__btn-amount');
        let plus = button.querySelector('.card-price__btn-plus');
        let basket = button.querySelector('.card-price__btn-basket');
        let cost_sum = button.parentNode.querySelector('.card-price__cost');
        let sum = Number(cost_sum.querySelector('span').textContent);
        let price = sum;

        

        basket.addEventListener('click', () => {
            basket.style.display = "none";
            minus.style.display = "block";
            amount.style.display = "block";
            plus.style.display = "block";
            button.style.padding = "10px";
        });
        plus.addEventListener('click', () => {
            count += 1;
            amount.innerText = `${count}`;
            sum = count * price;
            cost_sum.querySelector('span').innerText = sum;
        });
        minus.addEventListener('click', () => {
            count -= 1;
            sum -= price;
            if (count == 0) {
                sum = price;
                count = 1;
                basket.style.display = "block";
                minus.style.display = "none";
                amount.style.display = "none";
                plus.style.display = "none";
                button.style.padding = "0";
                
            }
            amount.innerText = `${count}`;
            cost_sum.querySelector('span').innerText = sum;
        });
    });
}