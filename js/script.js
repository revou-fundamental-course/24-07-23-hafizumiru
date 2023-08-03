// AUTO SLIDER

var slideIndex = 1;
var slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");

function nextSlides(x) {
    showSlides(slideIndex += x);
}

function showSlides(x) {
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (x > slides.length) { slideIndex = 1; }
    if (x < 1) { slideIndex = slides.length; }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

function nextSlidesAuto() {
    nextSlides(1);
}

setInterval(nextSlidesAuto, 4000); // Change image every 5 seconds

// FORM VALIDATION

function validateForm() {
    const arrLabel = Array.from(document.querySelectorAll('.errorMessage'));

    var name = document.forms["form"]["name"];
    var email = document.forms["form"]["email"];
    var pNumber = document.forms["form"]["pNumber"];
    var interest = document.forms["form"]["interest"];

    var textName = name.value;
    var textEmail = email.value;
    var textPNumber = pNumber.value
    var textInterest = interest.value;

    const arrInput = [textName, textEmail, textPNumber, textInterest];

    if (textName.trim() === '') {
        setFormError(name, arrLabel, 0, true, 'Please input your name!');
    }

    if (textEmail.trim() === '') {
        setFormError(email, arrLabel, 1, true, 'Please input your email address!');
    }

    if (textPNumber.trim() === '') {
        setFormError(pNumber, arrLabel, 2, true, 'Please input your phone number!');
    }

    if (textInterest.trim() === '') {
        setFormError(interest, arrLabel, 3, true, 'Please input your destination place!');
    } else {
        setFormError(interest, arrLabel, 3, false, '');
    }

    if (!isNameValid(textName)) {
        setFormError(inputName, arrLabel, 0, true, 'Ilegal character found. Please input only letters and number!');
        return false;
    }

    if (!isEmailValid(textEmail)) {
        setFormError(inputEmail, arrLabel, 1, true, 'Invalid email address. Please input your valid email address!');
        return false;
    }

    if (!isPNumberValid(textPNumber)) {
        setFormError(inputPNumber, arrLabel, 1, true, 'Invalid phone number. Please input your valid phone number!');
        return false;
    }

    for (let i = 0; i < arrInput.length; i++) {
        if (arrInput[i].trim() === '') {
            return false;
        }
    }

    modalSuccess(textName, textEmail, textPNumber, textInterest);
}

function isNameValid(nameValue) {
    const isNameValid = /^[a-zA-Z0-9\s'-]+$/;
    return isNameValid.test(nameValue);
}

function isEmailValid(emailValue) {
    const isEmailValid = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/;
    return isEmailValid.test(emailValue);
}

function isPNumberValid(pNumberValue) {
    const isPNumberValid = /(62|\+62|08).{8,15}/;
    return isPNumberValid.test(pNumberValue);
}

document.addEventListener('DOMContentLoaded', function () {
    const arrLabel = Array.from(document.querySelectorAll('.errorMessage'));
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    const inputPNumber = document.getElementById('pNumber');

    inputName.addEventListener('input', function () {
        const nameValue = inputName.value.trim();
        if (nameValue.length > 30 || !isNameValid(nameValue)) {
            if (nameValue.length > 30) {
                setFormError(inputName, arrLabel, 0, true, 'Too many character. Please input less than 30 character of name!');
            } else {
                setFormError(inputName, arrLabel, 0, true, 'Ilegal character found. Please input only letters and number!');
            }
        } else {
            setFormError(inputName, arrLabel, 0, false, '');
        }
    });

    inputEmail.addEventListener('input', function () {
        const emailValue = inputEmail.value.trim();
        if (!isEmailValid(emailValue)) {
            setFormError(inputEmail, arrLabel, 1, true, 'Invalid email address. Please input your valid email address!');
        } else {
            setFormError(inputEmail, arrLabel, 1, false, '');
        }
    });

    inputPNumber.addEventListener('input', function () {
        const pNumberValue = inputPNumber.value.trim();
        if (!isPNumberValid(pNumberValue)) {
            setFormError(inputPNumber, arrLabel, 2, true, 'Invalid phone number. Please input your valid phone number!');
        } else {
            setFormError(inputPNumber, arrLabel, 2, false, '');
        }
    });
});

function setFormError(input, arrLabel, index, condition, msg) {
    if (condition) {
        input.style.border = '1px solid rgb(237, 16, 16)';
        input.style.borderRadius ='0.5rem';
        arrLabel[index].textContent = msg;
        arrLabel[index].style.display = 'block';
    } else {
        input.style.border = '1px solid #29323d';
        input.style.borderRadius ='0.5rem';
        arrLabel[index].style.display = 'none';
    }
}

function modalSuccess(name, email, pNumber, interest) {
    var modal = document.getElementById('modalHidden');
    modal.style.display = 'block';
}

function closeModalSuccess() {
    var modal = document.getElementById('modalHidden');
    modal.style.display = 'none';

    document.getElementById("form").reset();
}