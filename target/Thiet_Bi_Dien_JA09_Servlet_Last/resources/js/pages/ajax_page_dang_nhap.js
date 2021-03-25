let textUsername, textPassword, btnLogIn, formLI;
$(async function () {
    formLI = $("#form-post-log-in");
    textUsername = $("#username");
    textPassword = $("#password");
    btnLogIn = $("#btn-login");

    postLogIn();

});

function postLogIn() {
    btnLogIn.click(function () {
        let {val: valUsername, check: checkUserName} = checkData(textUsername, /./, "Username Error!");
        let {val: valPassword, check: checkPassword} = checkData(textPassword, /./, "Password Error!");

        if (checkUserName && checkPassword) {
            formLI.submit();
        }
    })

}
