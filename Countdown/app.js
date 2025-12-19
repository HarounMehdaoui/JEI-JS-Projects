document.getElementById("btn").addEventListener("click", function() {
    var input = document.getElementById("selector").value;
    if (!input) {
        document.getElementById("countdown").innerHTML = "Please select a date and time.";
        return;
    }
    var countdown = new Date(input).getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countdown - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "x-x";
        }
    }, 1000);
});