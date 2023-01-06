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

    // 문의하기 버튼 이벤트
    $btn_submit.on('click',({target}) => {
        const formData = $form.serializeObject();
        console.log(formData)

        // 값 검증

        // 문의하기
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
                alert('답변은 이메일로 보내드립니다.');
                window.location = '/main/Main.do';
            } else {
                console.log(data)
            }
        })
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
                    <label for="solution-${ele.solution_id}">기타</label>
                </div>`
            );
        }
    })

});