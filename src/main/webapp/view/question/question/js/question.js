const errors = [
    {id: 'belong', msg: MessageSource['error.belong'], success:false },
    {id: 'name', msg: MessageSource['error.name'], success:false },
    {id: 'title', msg: MessageSource['error.title'], success:false },
    {id: 'position', msg: MessageSource['error.position'], success:false },
    {id: 'tel', msg: MessageSource['error.tel'], success:false },
    {id: 'email', msg: MessageSource['error.email'], success:false },
    {id: 'title', msg: MessageSource['error.title'], success:false },
    {id: 'contents', msg: MessageSource['error.contents'], success:false },
    {id: 'agree', msg: MessageSource['error.agree'], success:false}
]

// DB에 솔루션 정보 조회
const solutionInit = () => {
    const promise = $.ajax({
        type : "POST",
        url  : '/main/Main.do',
        dataType: "json",
        data : {
            task: "select",
            mode: "list",
        }
    });

    return promise;
}

let areaform = new CommonFrame({
    frame_position: $('.form-area'),
    frame_url: '/common/include/frame/areaContentsWrapper.jsp',
    contents_url:
        [{
            target_position: '[data-content]',
            url: '/view/question/question/form.jsp'
        }]
});

Promise.all([solutionInit(),areaform.init()]).then(function(params) {
    let solutions = [];
    const $category_inner_input = $('.input-box.category .inner-input');
    const $btn_submit = $('.btn-group button');
    const $form = $('form');
    const $input = $form.find('input,textarea');

    const submit = (formData) => {
        $.ajax({
            type : "POST",
            url  : '/management/Question.do',
            dataType: "json",
            data : {
                task: "proc",
                mode: "insert",
                data: formData
            }
        }).done(data => {
            if(data.resultCode === '00') {
                alert(MessageSource['alert.success.question']);
                window.location = '/main/Main.do';
            } else {
                return;
            }
        })
    }

    // input 값 변경 감지
    $input.on('keyup change',({target}) => {
        const formData = $form.serializeObject();

        const msg_div = $(`.error-box[data-key="${target.name}"]`)
            .find('.error-msg');

        if(target.value) {
            msg_div.text('');
        }
    })

    // 문의하기 버튼 이벤트
    $btn_submit.on('click',({target}) => {
        const formData = $form.serializeObject();

        // 검증
        if(!nullValid(formData, errors)) {
            return;
        }

        // 문의하기
        submit(formData);
    })

    // solutions init
    params.forEach((ele,idx) => {
        if(idx === 0) solutions = ele.monthly
    })

    // solution category init
    solutions.forEach((ele,idx) => {
        $category_inner_input.append(
            `<div class="input">
                <input
                    id="solution-${ele.solution_id}"
                    type="radio"
                    name="solution_id"
                    value=${ele.solution_id}
                    ${idx === 0 ? "checked" : ""}
                />
                <label for="solution-${ele.solution_id}">${ele.solution_name}</label>
            </div>`
        );
        if(idx+1 === solutions.length) {
            $category_inner_input.append(
                `<div class="input">
                    <input
                        type="radio"
                        name="solution_id"
                        value="-1"
                    />
                    <label for="solution-${ele.solution_id}">${MessageSource['grid.order']}</label>
                </div>`
            );
        }
    })

    // input default value init
    if(LOGIN_USER) {
        $form.find('input').each((idx,ele) => {
            if(LOGIN_USER[ele.name]) {
                ele.value = LOGIN_USER[ele.name];
            }
        })
    }

});