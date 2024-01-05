// slide show
let slideIndex = 0;
showSlide();

function showSlide() {
    let i;
    let slides = document.querySelectorAll(".header-container__bg img");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlide, 6000);
}

// article data
fetch('json/articles.json')
.then(response => response.json())
.then(data => {
    renderArticles(data.articles);
    addToBasket();
  })

const cardsContainer = document.querySelector('.catalog-container__articles');
let i = 0;

function renderArticles(datas) {
    datas.every(data => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const h4 = document.createElement('h4');
        const card_price = document.createElement('div');
        const cost = document.createElement('span');
        const btn = document.createElement('button')
        const minus = document.createElement('span');
        const amount = document.createElement('span');
        const plus = document.createElement('span');
        const basket = document.createElement('span');

        article.classList = 'catalog-container__articles-card';
        div.classList = 'catalog-container__articles-card-desc';
        card_price.classList = 'card-price';
        cost.classList = 'card-price__cost';
        btn.classList = 'card-price__btn';
        minus.classList = 'icon-minus card-price__btn-minus';
        amount.classList = 'card-price__btn-amount';
        plus.classList = 'icon-plus card-price__btn-plus';
        basket.classList = 'icon-basket card-price__btn-basket';

        img.src = data.image;
        img.alt = data.name;
        h4.innerText = data.name;
        cost.innerHTML += `<span id="cost-sum">${data.cost}</span> USB`;
        amount.innerText = 1;
        
        article.appendChild(img);
        article.appendChild(div);
        div.appendChild(h4);
        div.appendChild(card_price);
        card_price.appendChild(cost);
        card_price.appendChild(btn);
        btn.appendChild(minus);
        btn.appendChild(amount);
        btn.appendChild(plus);
        btn.appendChild(basket);
        cardsContainer.appendChild(article);

        i += 1;
        
        if (i == 8) {
            return false;
        } else {
            return true;
        }
    });
};

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