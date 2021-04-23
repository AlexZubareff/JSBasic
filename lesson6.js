'use strict'

/* Объект КАТАЛОГ */
const catalog = {
    catalogBlock: null,
    basket: null,
    list: [
        {
            prod_id: 789,
            prod_name:'Пиджак',
            prod_price: 200,
        },
        {
            prod_id: 569,
            prod_name:'Рубашка',
            prod_price: 300,
        },
        {
            prod_id: 597,
            prod_name:'Свитер',
            prod_price: 500,
        },
        {
            prod_id: 236,
            prod_name:'Кепка',
            prod_price: 600,
        },
    ],

    init(catalogBlockClass, basket) {
        this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
        this.basket = basket;
        this.render();
        this.addEventHandlers();
    },

    render(){
        if (this.getCatalogListLength() > 0) {
            this.renderCatalogList();
        } else {
            this.renderEmptyCatalog();
        }
    },

    addEventHandlers() {
        this.catalogBlock.addEventListener('click', event => this.addToBasket(event));
    },

    addToBasket(event) {
        if (!event.target.classList.contains('prod__add-to-basket')) return;
        const prod_id = +event.target.dataset.prod_id;
        const prodToAdd = this.list.find((prod) => prod.prod_id === prod_id);
        this.basket.addToBasket(prodToAdd);
    },

    getCatalogListLength() {
        return this.list.length;
    },

    renderCatalogList() {
        this.catalogBlock.innerHTML = '';
        this.list.forEach(item => {
            this.catalogBlock.insertAdjacentHTML('beforeend', this.renderCatalogItem(item));
        });
    },

    renderCatalogItem(item) {
        return `<div class = "prod">
                <h3>${item.prod_name}</h3>
                <p>${item.prod_price} руб.</p>
                <button class = "prod__add-to-basket" data-prod_id = "${item.prod_id}">В корзину</button>
        </div>`;
    },

    renderEmptyCatalog() {
        this.catalogBlock.innerHTML = '';
        this.catalogBlock.textContent = 'Каталог товаров пуст';
    },
};

/* Объект КОРЗИНА */
const basket = {
    basketBlock: null,
    clearBasketButton: null,
    goods:[],

    init(basketBlockClass, clearBasketButton){
        this.basketBlock = document.querySelector(`.${basketBlockClass}`);
        this.clearBasketButton = document.querySelector(`.${clearBasketButton}`);
        this.addEventHandlers();
        this.render();
    },



    addEventHandlers() {
        this.clearBasketButton.addEventListener('click', this.clearBasket.bind(this));
    },

    
    clearBasket() {
        this.goods = [];
        this.render();
    },

    render() {
        if (this.getBasketListLength() > 0) {
            this.renderBasketList();
            this.basketBlock.insertAdjacentHTML('beforeend', `В корзине позиций: ${this.goods.length}. Общая стоимость товаров: ${this.sumBasketPrice()} руб.`);
        } else {
            this.renderEmptyBasket();
        }
    },

    sumBasketPrice() {
        return this.goods.reduce((sumCostItem,basketItem) => sumCostItem + basketItem.prod_price * basketItem.quantity,0);
    },

addToBasket(prod){
    if (prod) {
        const findeInBasket = this.goods.find((item) => prod.prod_id === item.prod_id);
        if (findeInBasket) {
            findeInBasket.quantity++;
        } else {
            this.goods.push({...prod, quantity: 1});
        }
        this.render();
    } else {
        alert('Ошибка добавления!')
    }
},


    getBasketListLength() {
        return this.goods.length;
    },


    renderEmptyBasket() {
        this.basketBlock.innerHTML = '';
        this.basketBlock.textContent = 'Корзина пуста';
    },

    renderBasketList() {
        this.basketBlock.innerHTML = '';
        this.goods.forEach(item => {
            this.basketBlock.insertAdjacentHTML('beforeend', this.renderBasketItem(item));
        });
    },

    renderBasketItem(item) {
        return `<div>
                <h3>${item.prod_name}</h3>
                <p>${item.prod_price} руб.</p>
                <p>${item.quantity} шт.</p>
        </div>`;
    },


};

/* Подключение каталога и корзины */

catalog.init('catalog', basket);
basket.init('basket', 'clear-basket');