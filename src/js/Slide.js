const getTemplale = (data = []) => {
    const imgItems = data.map(item => {
        return `
          <img src="${item.src}" id="${item.id}" alt="" >
        `
    });
    const listItems = data.map(item => {
        return `
            <div class="itemHouse__picture">
                <img src="${item.src}" id="${item.id}" alt="" >
            </div>
        `
    });
    return `
        <div class="itemHouse__box">
            <div class="itemHouse__content">
                <div class="itemHouse__carousel">
                    <div class="itemHouse__image" onselectstart="return false" onmousedown="return false">
                        ${imgItems.join('')}
                    </div>
                    <div class="itemHouse__prev btn" onselectstart="return false" onmousedown="return false">
                        <button type="button" class="btn">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="#BABABA" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.1551 10.4883L12.6434 20L22.1551 29.5117L24.5118 27.155L17.3568 20L24.5118 12.845L22.1551 10.4883Z" />
                        </svg>
                        </button>
                    </div>
                    <div class="itemHouse__next btn" onselectstart="return false" onmousedown="return false">
                        <button type="button" class="btn">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="#BABABA" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3167 27.6333L21.95 20L14.3167 12.35L16.6666 10L26.6666 20L16.6666 30L14.3167 27.6333Z" />
                        </svg>
                        </button>
                    </div>
                    
                </div>
                <div class="itemHouse__line">
                     <div class="itemHouse__line-bg"></div>
                </div>
            </div>
            <ul class="itemHouse__list">
                 ${listItems.join('')}
            </ul>
        </div>
    `
};

export class Slider {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.elemWidth = document.querySelector('.itemHouse__image');
        this.position = 0;
        this.fullWidth = options.data.length * 556;
        this.render();
        this.setup();
    }
    render () {
        const { data } = this.options;
        this.$el.innerHTML = getTemplale(data);
    }
    setup() {
        let $next = document.querySelector('.itemHouse__next');
        let $prev = document.querySelector('.itemHouse__prev');
        let $dots = document.querySelector('.itemHouse__list'   );

        this.clickHandlerNext = this.clickHandlerNext.bind(this);
        this.clickHandlerPrev = this.clickHandlerPrev.bind(this);
        this.clickHandlerDots = this.clickHandlerDots.bind(this);
        $next.addEventListener('click', this.clickHandlerNext);
        $prev.addEventListener('click', this.clickHandlerPrev);
        $dots.addEventListener('click', this.clickHandlerDots);

        let $dote = document.querySelectorAll(".itemHouse__picture");
        for( let image of $dote ) {
            if ( document.querySelector(".itemHouse__picture") === image ) {
                image.classList.add('active')
            }
        }

    }
    clickHandlerDots( event ) {
        let $container = document.querySelector('.itemHouse__image');
        let $dots = document.querySelectorAll(".itemHouse__picture");
        let i = 0;
        if ( event.target.className === 'itemHouse__picture' ) {
            for( let image of $dots ) {
                i++;
                if ( image.classList.contains('active') ) {
                    image.classList.remove('active')
                }
                if ( event.target === image ) {
                    $container.style.marginLeft = '-' + ((i * 556) - 556) + "px";
                    image.classList.add('active');
                }
            }
        }
    }
    clickHandlerNext( event ) {
        let $container = document.querySelector( '.itemHouse__image' );
        let $dots = document.querySelectorAll(".itemHouse__picture");
        this.position += $container.offsetWidth;
        $container.style.marginLeft = '-' + this.position + "px";
        console.log(this.fullWidth);
        console.log(this.position);
        if( this.position >= this.fullWidth ) {
            this.position = 0;
            $container.style.marginLeft = this.position + "px";
        }
    }
    clickHandlerPrev( event ) {
        let $container = document.querySelector( '.itemHouse__image' );
        if( this.position < 556 ) {
            this.position = this.fullWidth - 556;
            $container.style.marginLeft = '-' + this.position + "px";
        } else {
            this.position -= 556;
            $container.style.marginLeft = '-' + this.position + "px";
        }
    }
}

const templaleTerra = (data = []) => {
    const imgItems = data.map(item => {
        return `
          <img src="${item.src}" id="${item.id}" alt="" >
        `
    });
    return `
        <div class="terrain__carousel-box">
            <div class="terrain__carousel-container">
                <div class="terrain__carousel-content">
                    <div class="terrain__carousel-image" onselectstart="return false" onmousedown="return false">
                        ${imgItems.join('')}
                    </div>
                    <div class="terrain__carousel-controller">
                     <div class="terrain__carousel-prev" onselectstart="return false" onmousedown="return false">
                        <button type="button" class="btn">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.6834 12.3667L18.05 20L25.6833 27.65L23.3334 30L13.3334 20L23.3334 10L25.6834 12.3667Z" fill="#BABABA"/>
                        </svg>
                        </button>
                     </div>
                     <div class="terrain__carousel-next" onselectstart="return false" onmousedown="return false">
                        <button type="button" class="btn">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3167 27.6333L21.95 20L14.3167 12.35L16.6666 10L26.6666 20L16.6666 30L14.3167 27.6333Z" fill="#BABABA"/>
                        </svg>
                        </button>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    `
};

export class Terrain {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.elemWidth = document.querySelector('.itemHouse__image');
        this.position = 0;
        this.fullWidth = options.data.length * 556;
        this.render();
        // this.setup();
    }
    render () {
        const { data } = this.options;

    }
}