//Slider
let sliderImages = document.querySelectorAll(".slider__slide"),
    arrowLeft = document.querySelector(".slider__arrow--left"),
    arrowRight = document.querySelector(".slider__arrow--right"),
    current = 0;

// Clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
    }
}

// Init slider
function startSlide() {
    reset();
    sliderImages[0].style.display = "block";
}

// Show prev
function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = "block";
    current--;
}

// Show next
function slideRight() {
    reset();
    sliderImages[current + 1].style.display = "block";
    current++;
}

// Left arrow click
arrowLeft.addEventListener("click", function () {
    if (current === 0) {
        current = sliderImages.length;
    }
    slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});

startSlide();


// Carousel ----------------------------------------------------------------------------------
const Slider = function (elemSelector, opts) {
    const defaultOpts = {
        pauseTime: 0,
        prevText: "Poprzedni slide",
        nextText: "Następny slide",
        generateDots: true,
        generatePrevNext: true
    };
    this.options = Object.assign({}, defaultOpts, opts);
    this.sliderSelector = elemSelector;
    this.currentSlide = 0; //aktualny slide
    this.time = null; //tutaj będziemy podczepiać setTimeout
    this.slider = null;
    this.elem = null;
    this.slides = null;

    this.prev = null; //przycisk prev
    this.next = null; //przucisl next
    this.dots = [];

    this.generateSlider();
    this.changeSlide(this.currentSlide);
}

Slider.prototype.generateSlider = function () {
    //pobieramy element który zamienimy na slider
    this.slider = document.querySelector(this.sliderSelector);
    this.slider.classList.add('slider');

    //tworzymy kontener dla slajdow
    const slidesCnt = document.createElement('div');
    slidesCnt.classList.add('slider-slides-cnt');

    //pobieramy element slajdów
    this.slides = this.slider.children;

    //to jest zywa kolekcja, więc przy przeniesieniu kazdego slajda
    //jej dlugosc maleje
    while (this.slides.length) {
        this.slides[0].classList.add('slider-slide');
        slidesCnt.appendChild(this.slides[0]);
    }
    this.slides = slidesCnt.children;
    this.slider.appendChild(slidesCnt);

    if (this.options.generatePrevNext) this.createPrevNext();
    if (this.options.generateDots) this.createDots();
}

Slider.prototype.slidePrev = function () {
    this.currentSlide--;
    if (this.currentSlide < 0) {
        this.currentSlide = this.slides.length - 1;
    }
    this.changeSlide(this.currentSlide);
}

Slider.prototype.slideNext = function () {
    this.currentSlide++;
    if (this.currentSlide > this.slides.length - 1) {
        this.currentSlide = 0;
    }
    this.changeSlide(this.currentSlide);
}

Slider.prototype.changeSlide = function (index) {
    [].forEach.call(this.slides, function (slide) {
        slide.classList.remove('slider-slide-active');
        slide.setAttribute('aria-hidden', true);
    });

    //dodajemy ją tylko wybranemu
    this.slides[index].classList.add('slider-slide-active');
    this.slides[index].setAttribute('aria-hidden', false);

    //podobny manewr robimy dla kropek
    if (this.options.generateDots) {
        this.dots.forEach(function (dot) {
            dot.classList.remove('slider-dots-element-active');
        });
        this.dots[index].classList.add('slider-dots-element-active');
    }

    //aktualny slide przestawiamy na wybrany
    this.currentSlide = index;

    if (this.options.pauseTime !== 0) {
        clearInterval(this.time);
        this.time = setTimeout(function () {
            this.slideNext();
        }.bind(this), this.options.pauseTime)
    }
}

Slider.prototype.createPrevNext = function () {
    this.prev = document.createElement('button');
    this.prev.type = "button";
    this.prev.innerText = this.options.prevText;
    this.prev.classList.add('slider-button');
    this.prev.classList.add('slider-button-prev');
    this.prev.addEventListener('click', this.slidePrev.bind(this));

    this.next = document.createElement('button');
    this.next.type = "button";
    this.next.innerText = this.options.nextText;
    this.next.classList.add('slider-button');
    this.next.classList.add('slider-button-next');
    this.next.addEventListener('click', this.slideNext.bind(this));

    const nav = document.createElement('div');
    nav.classList.add('slider-nav');
    nav.setAttribute('aria-label', 'Slider prev next');
    nav.appendChild(this.prev);
    nav.appendChild(this.next);
    this.slider.appendChild(nav);
}

Slider.prototype.createDots = function () {
    const ulDots = document.createElement('ul');
    ulDots.classList.add('slider-dots');
    ulDots.setAttribute('aria-label', 'Slider pagination');

    //tworzymy pętlę w ilości liczby slajów
    for (let i = 0; i < this.slides.length; i++) {
        //każdorazowo tworzymy LI wraz z buttonem
        //każdy button po kliknięciu zmieni slajd
        //za pomocą metody changeSlide()

        const li = document.createElement('li');
        li.classList.add('slider-dots-element');

        const btn = document.createElement('button');
        btn.classList.add('slider-dots-button');
        btn.type = "button";
        btn.innerText = i + 1;
        btn.setAttribute('aria-label', 'Set slide ' + (i + 1));

        btn.addEventListener('click', function () {
            this.changeSlide(i);
        }.bind(this));

        li.appendChild(btn);

        ulDots.appendChild(li);
        this.dots.push(li);
    }

    this.slider.appendChild(ulDots);
}

//wywołanie z opcjami
/*const slide = new Slider('#slider', {
    pauseTime: 10000,
    generateDots: true,
    generatePrevNext: true,
    prevText: "Poprzedni",
    nextText: "Następny"
});*/
const slide2 = new Slider('#slider2', {
    pauseTime: 10000,
    generateDots: true,
    generatePrevNext: true,
    prevText: "Poprzedni",
    nextText: "Następny"
});
const slide3 = new Slider('#slider3', {
    pauseTime: 10000,
    generateDots: true,
    generatePrevNext: true,
    prevText: "Poprzedni",
    nextText: "Następny"
});

// Initialize and add the map
function initMap() {
    // The location of Kolejowa 57 Katowice
    var greenFrog = {
        lat: 50.222085,
        lng: 18.990388
    };
    // The map, centered at Kolejowa 57 Katowice
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 14,
            center: greenFrog
        });
    // The marker, positioned at Kolejowa 57 Katowice
    var marker = new google.maps.Marker({
        position: greenFrog,
        map: map,
        title: "Agencja Interaktywna Green Frog"
    });

    var contentString = 'Elo';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}
