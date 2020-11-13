const getTemplale = (data = []) => {
    return `
        <div class="itemHouse__box">
            aggas
        </div>
    `
};

export class Terrain {
    constructor(selector) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.render();
    }
    render () {
        this.$el.innerHTML = getTemplale(data);
    }
}