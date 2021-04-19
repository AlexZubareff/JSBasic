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
        this.catalogBlock.addEventListener('click', Event => this.addToBasket(Event));
    },

    addToBasket(Event) {
        if (!Event.target.classList.contains('prod_add-to-basket')) return;
        const prod_id = +Event.target.dataset.prod_id;
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
                <button class = "prod_add-to-basket" data-prod_id="${item.id_prod}">В корзину</button>
        </div>`;
    },

    renderEmptyCatalog() {
        this.catalogBlock.innerHTML = '';
        this.catalogBlock.textContent = 'Каталог товаров пуст';
    },
};

const basket = {
    basketBlock: null,
    clearBasketButton: null,
    goods:[],

    init(basketBlockClass, clearBasketButton){
        this.basketBlock = document.querySelector('.$basketBlockClass');
        this.clearBasketButton = document.querySelector('.$clearBasketButton');
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
        
    },
};




catalog.init('catalog', basket);
basket.init('basket', 'clear-basket');