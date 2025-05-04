document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("startBtn");
    const inputField = document.getElementById("datetime");
    const countdownElements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds"),
    };
    const message = document.getElementById("message");
    
    let countdownInterval;

    startBtn.addEventListener("click", function () {
        if (countdownInterval) clearInterval(countdownInterval);

        const userDate = inputField.value;
        if (!userDate) {
            alert("🚨 Please select a valid date and time!");
            return;
        }

        const targetTime = new Date(userDate).getTime();
        startCountdown(targetTime);
    });

    function startCountdown(targetTime) {
        countdownInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeLeft = targetTime - currentTime;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                message.innerHTML = "🎉 Time's Up!";
                resetCountdown();
                return;
            }

            updateDisplay(timeLeft);
        }, 1000);
    }

    function updateDisplay(timeLeft) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElements.days.textContent = formatNumber(days);
        countdownElements.hours.textContent = formatNumber(hours);
        countdownElements.minutes.textContent = formatNumber(minutes);
        countdownElements.seconds.textContent = formatNumber(seconds);
    }

    function resetCountdown() {
        countdownElements.days.textContent = "00";
        countdownElements.hours.textContent = "00";
        countdownElements.minutes.textContent = "00";
        countdownElements.seconds.textContent = "00";
    }

    function formatNumber(num) {
        return num.toString().padStart(2, "0");
    }
});
