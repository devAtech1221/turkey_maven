const errors_info = [
    {id: 'belong', msg: MessageSource['error.belong'], success:false },
    {id: 'name', msg: MessageSource['error.name'], success:false },
    {id: 'position', msg: "MessageSource['error.position']", success:false },
    {id: 'tel', msg: MessageSource['error.tel'], success:false },
]

const errors_pass = [
    {id: 'user_pass', msg: MessageSource['error.pass'], success:false },
    {id: 'user_pass2', msg: MessageSource['error.pass2'], success:false },
]

// DB에 내 라이선스 정보 조회
const mylicenseListInit = () => {
    const promise = $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "list",
            data: {user_id: LOGIN_USER.user_id}
        }
    });

    return promise;
}

let modal = new CommonFrame({
    frame_position: $('.area_modal'),
    frame_url: '/common/include/frame/areaModal2_md.jsp',
    contents_url: [
        {
            target_position: '[data-content-inner1]',
            url: '/view/mylicense/mylicense/changeUserInfo.jsp',
        },
        {
            target_position: '[data-content-body]',
            url: '/view/mylicense/mylicense/contentsModal.jsp',
        },
        {
            target_position: '[data-content-inner2]',
            url: '/view/mylicense/mylicense/changePass.jsp',
        },
        {
            target_position: '[data-content-footer]',
            url: '/view/mylicense/mylicense/contentsModalFooter.jsp',
        }
    ],
    ready: function(props){
        // title
        props.frame_position.find('header').prepend(MessageSource['mylicense.modal.header']);
    }
});

Promise.all([mylicenseListInit(),modal.init()]).then(function(params) {
    let mylicenseList = [];
    const $modal = modal.props.frame_position.find('.modal');
    const $my_license_contents = $('.my-license-contents');
    const $table_body = $my_license_contents.find('.my-license-table tbody');
    const $edit_info = $my_license_contents.find('.edit-info');
    let selectedMenu = 'info';
    const $edit_form_menu = $modal.find('.edit-form-menu');
    const $user_info_form = $modal.find('.form-box.user-info-form');
    const $user_info_input = $user_info_form.find('input');;
    const $user_pass_form = $modal.find('.form-box.user-pass-form');
    const $user_pass_input = $user_pass_form.find('input');;
    const $btn_submit = $modal.find('.btn-modal-submit .info-submit');
    const $btn_close = $modal.find('.btn-modal-submit .close');

    // jsp MessageSource init
    $("[data-msg_src]").each((idx,ele) => {
        ele.prepend(MessageSource[ele.dataset.msg_src]);
    })

    const editInfo = (formData) => {
        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: 'json',
            data : {
                task: "proc",
                mode: "editInfo",
                data : {...formData, user_id: LOGIN_USER.user_id}
            }
        }).done(json => {
            if(json.resultCode == '00') {
                alert(MessageSource['alert.update.success.infoOrpass']);
                window.location.reload();
            }
        }).error(error => console.log(error))
    }

    const editPass = (formData) => {
        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: 'json',
            data : {
                task: "proc",
                mode: "editPass",
                data : {...formData, user_id: LOGIN_USER.user_id}
            }
        }).done(json => {
            if(json.resultCode == '00') {
                alert(MessageSource['alert.update.success.infoOrpass']);
                window.location.reload();
            }
        }).error(error => console.log(error))
    }

    // input 값 변경 감지 (info)
    $user_info_input.on('keyup change',({target}) => {
        const formData = $user_info_form.serializeObject();

        const msg_div = $(`.error-box[data-key="${target.name}"]`)
            .find('.error-msg');

        if(target.value) {
            msg_div.text('');
        }
    })

    // input 값 변경 감지 (pass)
    $user_pass_input.on('keyup change',({target}) => {
        const formData = $user_pass_form.serializeObject();

        const msg_div = $(`.error-box[data-key="${target.name}"]`)
            .find('.error-msg');

        if(target.name === 'user_pass2') {
            if(formData.user_pass === formData.user_pass2) {
                msg_div.text('');
            }

        } else if(target.value) {
            msg_div.text('');
        }

    })

    // 내 정보 변경 클릭 이벤트
    $edit_info.on('click',({target}) => {
        $edit_form_menu.children('li:eq(0)').trigger('click');
        openModal($modal);
    })

    // 모달창 메뉴 클릭 이벤트
    $edit_form_menu.on('click','li',(e) => {

        // 선택된 메뉴 클래스 추가
        $edit_form_menu.find('li').each((idx,ele) => ele.className = '');
        e.target.className = 'selected';
        selectedMenu = e.target.dataset.menu;

        // 메뉴에 맞는 body 보이게 변경
        $modal.find('form').each((idx,ele) => {
            ele.style.display = 'none'
        });
        if(e.target.dataset.menu === 'info') {
            $user_info_form.css('display','block');
            $user_info_form.find('input').each((idx,ele) => {
                ele.value = LOGIN_USER[ele.name];
            });

        } else if(e.target.dataset.menu === 'pass') {
            $user_pass_form.css('display','block');
            $user_pass_form.find('input').each((idx,ele) => ele.value = '');
        }
    })

    // 내 정보 변경버튼 클릭 이벤트
    $btn_submit.on('click', () => {
        if(selectedMenu === 'info') {
            const formData = $user_info_form.serializeObject();

            // 검증
            if(!nullValid(formData, errors_info)) {
                return;
            }

            // 전송
            editInfo(formData);
        }

        if(selectedMenu === 'pass') {
            const formData = $user_pass_form.serializeObject();

            // 검증
            if(!nullValid(formData, errors_pass)) {
                return;
            }

            // 전송
            editPass(formData);
        }
    })

    // 닫기 버튼 이벤트
    $btn_close.on('click',() => {
        closeModal($modal);
    })

    // mylicense init
    params.forEach((ele,idx) => {
        if(idx === 0) mylicenseList = ele.data
    })

    // 내 정보 init
    $my_license_contents.find('.user-info .name').text(LOGIN_USER.name);
    $my_license_contents.find('.user-info .belong').text(LOGIN_USER.belong);

    // 테이블 init
    mylicenseList.forEach((ele,idx) => {
        $table_body.append(
            `<tr>
                <td>${idx + 1}</td>
                <td>${ele.solution.solution_name}</td>
                <td>${ele.site_id} / ${ele.site_pass}</td>
                <td>${ele.start_date}</td>
                <td>${ele.end_date}</td>
                <td>${ele.status ?`<button class="btn-solution-link" data-url=${ele.site_url}>
                ${MessageSource["mylicense.link.on"]}</button>` : `<div>${MessageSource["mylicense.link.off"]}</div>`}</td>
            </tr>`
        )
    })

    // 바로가기 클릭 이벤트
    $table_body.on('click','.btn-solution-link',ele => {
        window.open(ele.target.dataset.url, "_blank");
    })

});