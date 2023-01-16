const errors = [
    {id: 'user_id', msg: MessageSource['error.id'], success:false },
    {id: 'user_pass', msg: MessageSource['error.pass'], success:false },
    {id: 'user_pass2', msg: MessageSource['error.pass2'], success:false },
    {id: 'belong', msg: MessageSource['error.belong'], success:false },
    {id: 'name', msg: MessageSource['error.name'], success:false },
    {id: 'position', msg: MessageSource['error.position'], success:false },
    {id: 'tel', msg: MessageSource['error.tel'], success:false },
    {id: 'email', msg: MessageSource['error.email'], success:false },
    {id: 'agree', msg: MessageSource['error.agree'], success:false}
]

const checkingColor = 'rgb(84, 180, 53)';
const notCheckingColor = 'rgba(131, 142, 128, 0.54)';

Promise.all([]).then(function(params) {
    const $form = $('.form-box');
    const $input = $form.find('input');
    const $btn_submit = $('.btn-submit button');
    const $btn_dupl_chk = $('button.dupl_chk');
    const $btn_mail_chk = $('button.mail_chk');
    const $btn_code_chk = $('button.code_chk');
    let checkId = false;
    let sendEmail = false;
    let checkEmail = false;

    // 화원가입 함수
    const join = (formData) => {
        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: "json",
            data : {
                task: "proc",
                mode: "join",
                data: formData
            }
        }).done(data => {
            if(data.resultCode === '00') {
                alert(MessageSource['alert.success.join']);
                window.location.href = '/login/Login.do';
            }
        })
    }

    // input 값 변경 감지
    $input.on('keyup change',({target}) => {
        const formData = $form.serializeObject();

        const msg_div = $(`.error-box[data-key="${target.name}"]`)
            .find('.error-msg');

        if(target.name === 'user_pass2') {
            if(formData.user_pass === formData.user_pass2) {
                msg_div.text('');
            }

        } else if(target.value) {
            msg_div.text('');
        }

        if(target.name === 'user_id') {
            checkId = false;
            $btn_dupl_chk.css('background-color',notCheckingColor);
        }

        if(target.name === 'email') {
            checkEmail = false;
            sendEmail = false;
            $btn_code_chk.css('background-color',notCheckingColor);
        }
    })

    // 아이디 중복 확인 이벤트
    $btn_dupl_chk.on('click',(ele) => {
        const formData = $form.serializeObject();
        if(checkId) return;
        if(!formData.user_id) {
            alert(MessageSource['alert.request.id']);
            return;
        }

        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: "json",
            data : {
                task: "proc",
                mode: "idDuplChk",
                data: formData
            }
        }).done(data => {
            if(data.resultCode === '00') {
                alert(MessageSource['alert.check.success.id']);
                checkId = true;
                ele.target.style.backgroundColor = checkingColor;
            } else {
                alert(MessageSource['alert.check.dupl.id']);
            }
        })
    })

    // 인증메일 전송 이벤트
    $btn_mail_chk.on('click',ele => {
        const formData = $form.serializeObject();
        if(checkEmail) return;
        if(!formData.email) {
            alert(MessageSource['alert.request.email']);
            return;
        }

        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: "json",
            data : {
                task: "proc",
                mode: "sendAuthCode",
                data: formData
            }
        }).done(data => {
            if(data.resultCode === '00') {
                alert(MessageSource['alert.check.send.email']);
                sendEmail = true;
            } else if(data.resultCode == '02') {
                alert(MessageSource['alert.check.dupl.email']);
            }
        })
    })

    // 인증코드 확인 이벤트
    $btn_code_chk.on('click',ele => {
        const formData = $form.serializeObject();
        if(checkEmail) return;
        if(!sendEmail) return;

        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: "json",
            data : {
                task: "proc",
                mode: "ChkAuthCode",
                code: formData.code
            }
        }).done(data => {
            if(data.resultCode === '00') {
                alert(MessageSource['alert.check.success.authcode']);
                checkEmail = true;
                ele.target.style.backgroundColor = checkingColor;
            } else {
                alert(MessageSource['alert.check.fail.authcode']);
            }
        })
    })

    // 회원가입 버튼 클릭 이벤트
    $btn_submit.on('click',({target}) => {
        const formData = $form.serializeObject();

        // 검증
        if(!nullValid(formData, errors)) {
            return;
        }

        if(!checkId) {
            alert(MessageSource['alert.request.check-dupl.email']);
            return;
        }

        if(!checkEmail) {
            alert(MessageSource['alert.request.check-auth.email']);
            return;
        }

        // 회원가입
        join(formData)
    })

});