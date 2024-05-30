function convertTemperature() {
    const temp = document.getElementById('temp').value;
    const scale = document.getElementById('scale').value;
    let result;

    if (scale === 'celsius') {
        result = (temp * 9/5) + 32 + ' °F';
    } else {
        result = (temp - 32) * 5/9 + ' °C';
    }

    document.getElementById('result').textContent = 'Converted Temperature: ' + result;
    document.getElementById('result').classList.add('animate__animated', 'animate__fadeIn');
}

function checkQuiz() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    let score = 0;

    if (q1 && q1.value === 'Celsius') {
        score++;
    }

    const quizResult = document.getElementById('quiz-result');
    quizResult.textContent = 'You scored: ' + score + '/1';
    quizResult.classList.add('animate__animated', 'animate__fadeIn');
}

function share() {
    alert('Share functionality coming soon!');
}


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
