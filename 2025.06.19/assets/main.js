function setFilter(val) {
    if (val == "F1") {
        document.getElementById("filter1").style.display = "block";
        document.getElementById("filter2").style.display = "none";
        document.getElementById("filter3").style.display = "none";
        document.getElementById("filter4").style.display = "none";
        var F1 = "F1_enrollment" + "|" + "F1_month";
    }
    else if (val == "F2") {
        document.getElementById("filter1").style.display = "none";
        document.getElementById("filter2").style.display = "block";
        document.getElementById("filter3").style.display = "none";
        document.getElementById("filter4").style.display = "none";
    }
    else if (val == "F3") {
        document.getElementById("filter1").style.display = "none";
        document.getElementById("filter2").style.display = "none";
        document.getElementById("filter3").style.display = "block";
        document.getElementById("filter4").style.display = "none";
    }
    else {
        document.getElementById("filter1").style.display = "none";
        document.getElementById("filter2").style.display = "none";
        document.getElementById("filter3").style.display = "none";
        document.getElementById("filter4").style.display = "block";
    }
}