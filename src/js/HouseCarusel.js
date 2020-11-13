const getTemplale = (data = []) => {
    const imgItems = data.map(item => {
        return `
        <div class="col-3 house-slider__item-box" data-id="${item.id}">
            <div class="row">
                <img src="${item.src}" id="${item.id}" alt="" >
            </div>
         </div>
        `
    });
    return `
        <div class="house-slider__container">
            <div class="house-slider__item" onselectstart="return false" onmousedown="return false">
                 ${imgItems.join('')}
            </div>
            <div class="d-flex justify-content-center itemHouse__container">
            <div class="house-slider__content col-7">
                 <div class="house-slider__prev btn" onselectstart="return false" onmousedown="return false">
                       <button type="button" class="btn">
                       <svg width="40" height="40" viewBox="0 0 40 40" fill="#BABABA" xmlns="http://www.w3.org/2000/svg">
                           <path d="M22.1551 10.4883L12.6434 20L22.1551 29.5117L24.5118 27.155L17.3568 20L24.5118 12.845L22.1551 10.4883Z" />
                       </svg>
                       </button>
                   </div>
                   <div class="house-slider__next btn" onselectstart="return false" onmousedown="return false">
                       <button type="button" class="btn">
                       <svg width="40" height="40" viewBox="0 0 40 40" fill="#BABABA" xmlns="http://www.w3.org/2000/svg">
                           <path d="M14.3167 27.6333L21.95 20L14.3167 12.35L16.6666 10L26.6666 20L16.6666 30L14.3167 27.6333Z" />
                       </svg>
                       </button>
                   </div>  
            </div>
            </div>
        </div>
    `
};


export class HouseCarusel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this.elemWidth = document.querySelector('.house-slider__item-box');
        this.position = 0;

        this.flag = false;
        this.isNull =false;
        this.fullWidth = options.data.length * 556;
        this.render();
        this.setup(this.selectedId);
    }
    render () {
        const { data } = this.options;
        this.$el.innerHTML = getTemplale(data);
    }
    setup(id) {
        let $next = document.querySelector('.house-slider__next');
        let $prev = document.querySelector('.house-slider__prev');

        this.clickHandlerNext = this.clickHandlerNext.bind(this);
        this.clickHandlerPrev = this.clickHandlerPrev.bind(this);

        $next.addEventListener('click', this.clickHandlerNext);
        $prev.addEventListener('click', this.clickHandlerPrev);

        this.$el.querySelector('[data-id="' + id + '"]').classList.add('active', 'col-6');
    }


    clickHandlerNext( event ) {
        let $container = document.querySelector( '.house-slider__item-box' );
        this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.remove('active', 'col-6');
        console.log(this.selectedId);
        if (this.flag) {
            if (this.selectedId == this.options.data.length - 1) {
                this.selectedId = 1;
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.add('active', 'col-6');
                this.options.data.splice(-1,1);
                let arrLength = this.options.data.length;
                this.options.data.unshift(this.options.data[arrLength-1]);
                this.render();
                this.isNull = true;
                this.setup(this.selectedId);
                this.flag = false;
            }
        } else {
            if (this.selectedId == this.options.data.length - 1) {
                this.options.data.push(this.options.data[0])
                this.render();
                this.setup(this.selectedId + 1);
                this.flag = true;
            }
            if(this.isNull) {
                this.options.data.splice(0,1);
                this.render();
                this.setup(this.selectedId+1);
                this.isNull = false;
            }
            this.selectedId = this.selectedId + 1;

            this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.add('active', 'col-6');
        }
        switch (this.selectedId) {
            case 1:{
                this.position = $container.offsetWidth;
                $container.style.marginLeft = 0 + "px";
                break;
            }
            case 2:{
                this.position = $container.offsetWidth;
                $container.style.marginLeft = "-" + ($container.offsetWidth * 0) + "px";
                break;
            }
            case 3:{
                this.position = $container.offsetWidth;
                $container.style.marginLeft = "-" + ($container.offsetWidth * 1) + "px";
                break;
            }
            case 4:{
                this.$el.querySelector('[data-id="1"]').style.marginLeft = "-" + 480 + "px";
                break;
            }
        }
    }
    clickHandlerPrev( event ) {
        let $container = document.querySelector( '.house-slider__item-box' );
        switch (this.selectedId) {
            case 1:{


                this.position = $container.offsetWidth;
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.remove('active', 'col-6');
                this.selectedId = 4;
                $container.style.marginLeft = "-" + ($container.offsetWidth * 2) + "px";
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.add('active', 'col-6');
                break;
            }
            case 2:{
                this.position = $container.offsetWidth;
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.remove('active', 'col-6');
                this.selectedId = 1;
                $container.style.marginLeft = 0 + "px";
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.add('active', 'col-6');
                break;
            }
            case 3:{
                this.options.data.push(this.options.data[0])
                this.render();
                this.setup(this.selectedId + 1);
                this.flag = true;

                this.position = $container.offsetWidth;
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.remove('active', 'col-6');
                this.selectedId = 2;
                $container.style.marginLeft = 0 + "px";
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.add('active', 'col-6');
                break;
            }
            case 4:{
                this.position = $container.offsetWidth;
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.remove('active', 'col-6');
                this.selectedId = 3;
                $container.style.marginLeft = "-" + ($container.offsetWidth * 1) + "px";
                this.$el.querySelector('[data-id="'+ this.selectedId +'"]').classList.add('active', 'col-6');
                break;
            }
        }
    }
}
