const getTemplale = (data = [], placeholder, selectedId, stat) => {
    let text = placeholder ?? 'не задан';
    const items = data.map(item => {
        let cls = '';
        if (item.id == selectedId) {
            text = item.value;
            cls = 'selected';
        }
        return `
          <li class="select__item ${cls} btn" data-type="item" data-id="${item.id}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#333333" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.11719 9.62813C9.99406 9.62813 10.835 9.27979 11.4551 8.65975C12.0751 8.0397 12.4234 7.19875 12.4234 6.32188C12.4234 5.445 12.0751 4.60405 11.4551 3.984C10.835 3.36396 9.99406 3.01563 9.11719 3.01562H4.25V4.01562H5.49822V8.62813H4.25V9.62813H5.49822V11H4.25V12H5.49822V13.75H6.49822V12H9.5V11H6.49822V9.62813H9.11719ZM6.49822 4.01562H9.11719C9.72884 4.01562 10.3154 4.2586 10.748 4.69111C11.1805 5.12362 11.4234 5.71022 11.4234 6.32188C11.4234 6.93353 11.1805 7.52013 10.748 7.95264C10.3154 8.38515 9.72884 8.62813 9.11719 8.62813H6.49822V4.01562Z"/>
          </svg>${item.value}</li>
        `
    });
    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input btn" data-type="input">
            <span data-type="value">${text}</span>
        <svg width="24" height="24" class="sl-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.41 9L12 13.59L16.59 9L18 10.42L12 16.42L6 10.42L7.41 9Z" fill="#BEBEBE"/>
        </svg>
        </div>
            <div class="select__dropdown">
            <div class="select__controller">
                <input type="text" name="minprice" data-type="min" value="" class="form-control focus" placeholder="мин">
                <input type="text" name="maxprice" data-type="max" value="" class="form-control" placeholder="макс">
            </div>
            <div class="select__ten">
                <ul class="select__list">
                        <li class="select__noMinMax btn" data-type="noMinMax">${stat}</li>
                </ul>
            </div>
               <ul class="select__list">
                   ${items.join('')}
               </ul>
            </div>
    `
}

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.priceSelector = false;
        this.stat = 'без минимума';
        this.render();
        this.setup();
    }
    open() {
        this.$el.classList.add('open');
    }
    close(isMinMax) {
        let maxSelect = this.$el.querySelector('[data-type="max"]');
        let minSelect = this.$el.querySelector('[data-type="min"]');
        this.$el.classList.remove('open');
        if ( maxSelect.value == '' && minSelect.value == ''){
            return
        }
        if (maxSelect.value != '' && minSelect.value != '') {
            this.$el.querySelector('[data-type="value"]').innerHTML = minSelect.value + " - " + maxSelect.value
        }else  if (!isMinMax) {
            if (this.priceSelector) {
                this.$el.querySelector('[data-type="value"]').innerHTML = maxSelect.value;
            } else {
                this.$el.querySelector('[data-type="value"]').innerHTML = minSelect.value;
            }
        }
    }
    render () {
        const { placeholder, data } = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplale(data, placeholder, this.selectedId, this.stat);
    }
    setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$el.addEventListener('click', this.clickHandler);
        this.$value = this.$el.querySelector('[data-type="value"]');
    }
    clickHandler(event) {
        const {type} = event.target.dataset;

        if(type === 'input') {
            this.toggle()
        } else if(type === 'item'){
            const id =  event.target.dataset.id;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        } else if (type === 'min') {
            this.isState(false);
            this.stat = 'без минимума';
            this.$el.querySelector('[data-type="noMinMax"]').innerHTML = this.stat;
        } else if (type === 'max') {
            this.isState(true);
            this.stat = 'без максимума';
            this.$el.querySelector('[data-type="noMinMax"]').innerHTML = this.stat;
        } else if (type === 'noMinMax') {
            if (this.stat == 'без минимума') {
                let st = this.$el.querySelector('[data-type="max"]').value;
                this.$el.querySelector('[data-type="min"]').value = '';
                this.$el.querySelector(`[data-type="value"]`).innerHTML = st;
                console.log(this.$el.querySelector(`[data-type="value"]`));
                console.log(this.$el.querySelector('[data-type="max"]').value)
            } else if (this.stat == 'без максимума') {
                this.$el.querySelector('[data-type="max"]').value = '';
                this.$el.querySelector(`[data-type="value"]`).innerHTML = this.$el.querySelector('[data-type="min"]').value;
            }
            this.close(true)
        }
    }
    isState(isMax) {
        this.priceSelector = isMax;
    }
    get isOpen() {
        return this.$el.classList.contains('open')
    }
    get current() {
        return this.options.data.find(item => item.id == this.selectedId)
    }
    select(id) {
        if (this.priceSelector) {
            this.$el.querySelector('[data-type="max"]').value = this.current.value;
        }
        else
            this.$el.querySelector('[data-type="min"]').value = this.current.value;
        this.selectedId = id;
        this.$el.querySelector(`[data-type="value"]`).innerHTML = this.current.value
        this.$el.querySelectorAll(`[data-type="item"]`).forEach(el => {
            el.classList.remove('selected');
        });
        this.$el.querySelector('[data-id="'+ id +'"]').classList.add('selected');
        this.options.onSelect ? this.options.onSelect(this.current) : null
        this.close()
    }
    toggle() {
        this.isOpen ? this.close() : this.open()
    }
}