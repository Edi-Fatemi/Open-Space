console.clear();
let password = "TrustNo1";
let confirmBtn = document.querySelector(".confirm-btn");
let checkboxBtn = document.querySelectorAll(".checkbox-button");
let rangeBtn = document.querySelectorAll(".range-button");
let launchBtn = document.querySelector(".launch-btn");
let rocket = document.querySelector(".rocket");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
let refreshBtn = document.querySelector(".refresh-btn");
let style = getComputedStyle(rocket)

function disableInputs() {
    checkboxBtn.forEach(checkbox => checkbox.setAttribute("disabled", "true"));

    rangeBtn.forEach(range => range.setAttribute("disabled", "true"));

    launchBtn.setAttribute("disabled", "true");
}

// The launch button should be locked until all the checkboxes are checked and all the input ranges are set to maximum
function launchPreparation() {
    let isCheckboxChecked = true;
    let isRangeChecked = true;
    for (let i = 0; i < checkboxBtn.length; i++) {
        if (!checkboxBtn[i].checked) {
            isCheckboxChecked = false;
        }
    }

    for (let j = 0; j < rangeBtn.length; j++) {
        if (rangeBtn[j].value < 100) {
            isRangeChecked = false;
        }
    }

    if (isCheckboxChecked && isRangeChecked) {
        launchBtn.removeAttribute("disabled");

        checkboxBtn.forEach(checkbox => checkbox.setAttribute("disabled", "true"));
        rangeBtn.forEach(range => range.setAttribute("disabled", "true"));
    } else {
        launchBtn.setAttribute("disabled", "true");
    }
}

function enableInputs() {
    checkboxBtn.forEach(checkbox => checkbox.removeAttribute("disabled"));
    rangeBtn.forEach(range => range.removeAttribute("disabled"));

    checkboxBtn.forEach(checkbox => checkbox.onchange = launchPreparation);
    rangeBtn.forEach(range => range.onchange = launchPreparation);
}

function passwordValidator() {
    let passwordInputValue = document.querySelector(".password-input");

    if (password === passwordInputValue.value) {
        enableInputs();
        confirmBtn.setAttribute("disabled", "true");
        passwordInputValue.setAttribute("disabled", "true");
    } else {
        alert("Incorrect password try again!");
        passwordInputValue.value = '';
    }
}



let rocketAnimationHandler;
function rocketLauncher() {
    rocketAnimationHandler = setTimeout(() => {
        rocketLauncher();
        modal.style.display = "block";
    }, 7000);
    rocket.animate([
        {transform: "rotate(90deg)"},
        {left: "30%"},
        {left: "40%"},
        {left: "50%"},
        {left: "60%"},
        {left: "70%"},
        {left: "80%"},
        {left: "85%"},
        {transform: "rotate(135deg)"},
        {bottom: "85%"},
        {bottom: "80%"},
        {bottom: "70%"},
        {bottom: "60%"},
        {bottom: "50%"},
        {bottom: "40%"},
        {bottom: "30%"},
        {bottom: "20%"},
        {bottom: "10%"},
        {transform: "rotate(270deg)"},
        {left: "85%"},
        {left: "80%"},
        {left: "70%"},
        {left: "60%"},
        {left: "50%"},
        {left: "40%"},
        {left: "30%"},
        {left: "20%"},
        {transform: "rotate(360deg)"},
        {bottom: "10%"},
        {bottom: "20%"},
        {bottom: "30%"},
        {bottom: "40%"},

    ], {
        duration: 5000,
        easing: "linear",
        delay: 100,
        iterations: 1,
    })


}

// Event Handler
function controlPanelHandler() {
    disableInputs();
    // password validator handler
    confirmBtn.addEventListener("click", passwordValidator);


    launchBtn.addEventListener("click", () => {
        rocketLauncher();
        launchBtn.setAttribute("disabled", "true")
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        clearTimeout(rocketAnimationHandler);
    });

    refreshBtn.addEventListener("click", () => location.reload())

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            clearTimeout(rocketAnimationHandler);
        }
    })

}

controlPanelHandler();