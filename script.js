document.querySelector("#butt").addEventListener('click', function () {
    let val = document.querySelector("#input").value;
    alert(`Your e-mail ${val} just has sent!`)
    document.querySelector("#input").value = ""
})

// let e = document.querySelector("#i")

function showItem1(e) {
    console.log(e)
    let content_1 = e.querySelector("#content_1")
    console.log(content_1.style)
    if (content_1.style.display === 'none') {
        content_1.style.display = 'block'

    } else {
        content_1.style.display = 'none'
    }
}

function showItem2(e) {
    let content_2 = e.querySelector("#content_2")
    console.log(content_2.style)
    if (content_2.style.display === 'none') {
        content_2.style.display = 'block'

    } else {
        content_2.style.display = 'none'
    }
}

function showItem3(e, idx) {
    let content_3 = e.querySelector("#content_3")
    console.log(content_2.style)
    if (content_3.style.display === 'none') {
        content_3.style.display = 'block'
        document.documentElement.style.setProperty(`--transformArrow_${idx}`, "225deg")
    } else {
        content_3.style.display = 'none'
        document.documentElement.style.setProperty(`--transformArrow_${idx}`, "135deg")
    }

}

document.querySelector("#item_1").addEventListener("click", function (e) {
    showItem1(this, 1)
})
document.querySelector("#item_2").addEventListener("click", function (e) {
    showItem2(this, 2)
})
document.querySelector("#item_3").addEventListener("click", function (e) {
    showItem3(this, 3)
})


function Sim(sldrId) {

    let id = document.getElementById(sldrId);
    if (id) {
        this.sldrRoot = id
    }
    else {
        this.sldrRoot = document.querySelector('.sim_slider')
    }
    this.sldrList = this.sldrRoot.querySelector('.sim_slider_list');
    this.sldrElements = this.sldrList.querySelectorAll('.sim_slider_element');
    this.sldrElemFirst = this.sldrList.querySelector('.sim_slider_element');
    this.leftArrow = this.sldrRoot.querySelector('.sim-slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('.sim-slider-arrow-right');

    // Initialization
    this.options = Sim.defaults;
    Sim.initialize(this)
}

Sim.defaults = {

    // Default options for the carousel
    loop: true,     // Бесконечное зацикливание слайдера
    auto: true,     // Автоматическое пролистывание
    interval: 5000, // Интервал между пролистыванием элементов (мс)
    arrows: true,   // Пролистывание стрелками
}

Sim.prototype.elemPrev = function (num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement -= num;
    if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

    if (!this.options.loop) {
        if (this.currentElement == 0) {
            this.leftArrow.style.display = 'none'
        };
        this.rightArrow.style.display = 'block'
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';
}

Sim.prototype.elemNext = function (num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement += num;
    if (this.currentElement >= this.elemCount) this.currentElement = 0;

    if (!this.options.loop) {
        if (this.currentElement == this.elemCount - 1) {
            this.rightArrow.style.display = 'none'
        };
        this.leftArrow.style.display = 'block'
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';
}

Sim.initialize = function (that) {

    // Constants
    that.elemCount = that.sldrElements.length; // Количество элементов

    // Variables
    that.currentElement = 0;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };

    function setAutoScroll() {
        that.autoScroll = setInterval(function () {
            let fnTime = getTime();
            if (fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    }
}

if (that.elemCount <= 1) {   // Отключить навигацию
    that.options.auto = false;
    that.options.arrows = false;
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none'
};
if (that.elemCount >= 1) {   // показать первый элемент
    that.sldrElemFirst.style.opacity = '1';
};

if (!that.options.loop) {
    that.leftArrow.style.display = 'none';  // отключить левую стрелку
    that.options.auto = false; // отключить автопркрутку
}
else if (that.options.auto) {   // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.sldrList.addEventListener('mouseenter', function () { clearInterval(that.autoScroll) }, false);
    that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
};

if (that.options.arrows) {  // инициализация стрелок
    that.leftArrow.addEventListener('click', function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
            bgTime = fnTime;
            that.elemPrev()
        }
    }, false);
    that.rightArrow.addEventListener('click', function () {
        let fnTime = getTime();
        if (fnTime - bgTime > 1000) {
            bgTime = fnTime;
            that.elemNext()
        }
    }, false)
}
else {
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none'
}

new Sim();


