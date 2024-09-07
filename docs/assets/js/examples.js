

(function() {
    "use strict";
    document.addEventListener('DOMContentLoaded', function () {

        javascriptConfirm(document.getElementById("example_1"), {
            onConfirm: function() {
                console.log('01 Confirmed!');
                document.getElementById("results_1").innerText = "Confirmed!";
            },
        });

        javascriptConfirm(document.getElementById("example_2"), {
            onConfirm: function() {
                console.log('02 Confirmed!');
                document.getElementById("results_2").innerText = "Confirmed!";
            },
            onCancel: function() {
                console.log('02 Cancelled!');
                document.getElementById("results_2").innerText = "Cancelled!";
            },
        });

        javascriptConfirm(document.getElementById("example_3"), {
            title: "Delete User",
            message: "Do you want to delete this user?",
            onConfirm: function() {
                console.log('03 Confirmed!');
                document.getElementById("results_3").innerText = "Confirmed! delete user";
            },
            onCancel: function() {
                console.log('03 Cancelled!');
                document.getElementById("results_3").innerText = "Cancelled! do nothing";
            },
        });

        javascriptConfirm(document.getElementById("example_4"), {
            title: "Delete User",
            message: "Do you want to delete this user?",
            confirmText: "Delete",
            confirmClass: "btn btn-sm btn-primary",
            cancelText: "Cancel",
            cancelClass: "btn btn-sm btn-danger",
            cancelOnBackdropClick: true,
            width: '400px',
            onConfirm: function() {
                console.log('03 Confirmed!');
                document.getElementById("results_4").innerText = "Confirmed! delete user";
            },
            onCancel: function() {
                console.log('03 Cancelled!');
                document.getElementById("results_4").innerText = "Cancelled! do nothing";
            },
        });

    });

})();