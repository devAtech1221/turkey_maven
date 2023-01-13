




Promise.all([]).then(function(params) {
    const $form = $('.login_wrap form');
    const $btn_submit = $('.btn-submit button');

    // 로그인 버튼 이벤트
    $btn_submit.on('click',({target}) => {
        const formData = $form.serializeObject();

        // 값 검증

        // 로그인
        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: "json",
            data : {
                task: "proc",
                mode: "login",
                data: formData
            }
        }).done(data => {
            if(data.resultCode === 'OK') {
                window.location = '/main/Main.do';
            } else if(data.resultCode === 'NotFound') {
                alert(MessageSource['alert.check.fail.idOrpass']);
            }
        })
    })

});