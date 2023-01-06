const errors = [
    {id: 'user_id', msg: "아이디는 필수 입력입니다.", success:false },
    {id: 'user_pass', msg: "비밀번호는 필수 입력입니다.", success:false },
    {id: 'user_pass2', msg: "비밀번호가 일치하지 않습니다.", success:false },
    {id: 'belong', msg: "회사명을 입력해주세요.", success:false },
    {id: 'name', msg: "이름을 입력해주세요.", success:false },
    {id: 'position', msg: "직책을 입력해주세요.", success:false },
    {id: 'tel', msg: "전화번호를 입력해주세요.", success:false },
    {id: 'email', msg: "메일을 입력해주세요.", success:false },
    {id: 'agree', msg: '개인정보 수집 및 이용에 동의해주세요.', success:false}
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
                alert('가입이 완료되었습니다.');
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
            alert('아이디를 입력해주세요.');
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
                alert('사용가능한 아이디입니다.');
                checkId = true;
                ele.target.style.backgroundColor = checkingColor;
            } else {
                alert('이미 사용중인 아이디입니다.');
            }
        })
    })

    // 인증메일 전송 이벤트
    $btn_mail_chk.on('click',ele => {
        const formData = $form.serializeObject();
        if(checkEmail) return;
        if(!formData.email) {
            alert('이메일을 입력해주세요.');
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
                alert('인증코드를 메일로 전송했습니다.');
                sendEmail = true;
            } else if(data.resultCode == '02') {
                alert('이미 가입한 이메일입니다.');
            }
        })
    })

    // 인증코드 확인 이벤트
    $btn_code_chk.on('click',ele => {
        const formData = $form.serializeObject();
        console.log(checkEmail)
        console.log(sendEmail)
        console.log(formData)
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
                alert('인증을 성공했습니다.');
                checkEmail = true;
                ele.target.style.backgroundColor = checkingColor;
            } else {
                alert('인증코드가 올바르지 않습니다.');
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
            alert('아이디 중복체크를 진행해주세요.');
            return;
        }

        if(!checkEmail) {
            alert('메일을 인증해주세요.');
            return;
        }

        // 회원가입
        join(formData)
    })

});