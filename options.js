var Lifescript = Lifescript || {};

window.addEventListener("load", function () {
    document.getElementById("showPubDate").addEventListener("change", Lifescript.Options.allowDisplayPubDate, false);

    if (localStorage.getItem("show_publication_date")) {
        document.getElementById("showPubDate").checked = false;
    }
    else {
        document.getElementById("showPubDate").checked = true;
    }
}, false);

(function (module) {
    var allowDisplayPubDate = function (e) {
        var pubDateChkBox = e.currentTarget;
        if (!pubDateChkBox.checked) {
            localStorage.setItem("show_publication_date", "default");
            return;
        }
        
        localStorage.removeItem("show_publication_date");
    };

    module.allowDisplayPubDate = allowDisplayPubDate;

})(Lifescript.Options = Lifescript.Options || {});