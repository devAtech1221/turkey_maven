const errors = [
    {id: 'title', msg: MessageSource['error.title'], success:false },
    {id: 'contents', msg: MessageSource['error.contents'], success:false },
    {id: 'agree', msg: MessageSource['error.agree'], success:false },
]

const licenseInfo = [
    {id: "trial", name: MessageSource['main.trial.name'], desc: MessageSource['main.trial.desc'], btn: MessageSource['btn.main.license-info1'], license: {}},
    {id: "basic", name: MessageSource['main.basic.name'], desc: MessageSource['main.basic.desc'], btn: MessageSource['btn.main.license-info2'], license: {}},
    {id: "premium", name: MessageSource['main.premium.name'], desc: MessageSource['main.premium.desc'], btn: MessageSource['btn.main.license-info2'], license: {}},
    {id: "custom", name: MessageSource['main.custom.name'], desc: MessageSource['main.custom.desc'], btn: MessageSource['btn.main.license-info2'], license: {}}
];

const solutionInfo = {
    1: MessageSource['main.solution1-info'],
    2: MessageSource['main.solution2-info'],
    3: MessageSource['main.solution3-info'],
};

// 라이선스 정보 포맷 함수
const License = (licenseInfo, solution) => {
    licenseInfo.forEach(m => {
        let obj2 = {};
        solution.license.forEach(k => {
            obj2[k.type] = k[m.id];
        })
        m.license = obj2;
    });
}

// DB에 솔루션 정보 조회
const solutionInit = () => {
    const promise = $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "list",
        }
    });

    return promise;
}

let modal = new CommonFrame({
    frame_position: $('.area_modal'),
    frame_url: '/common/include/frame/areaModal2_lg.jsp',
    contents_url: [
        {
            target_position: '[data-content-body]',
            url: '/view/main/main/contentsModal.jsp',
        },
        {
            target_position: '[data-content-footer]',
            url: '/view/main/main/contentsModalFooter.jsp',
        }
    ],
    ready: function(props){
        // title
        props.frame_position.find('header').prepend(MessageSource['main.modal.header']);
    }
});

Promise.all([solutionInit(),modal.init()]).then(function(params) {
    let solutions = [];
    let selectedSolution = {};
    const $modal = modal.props.frame_position.find('.modal');
    const $form = $modal.find('form');
    const $input = $form.find('input,textarea');
    const $imageModal = $('.image_modal .modal');
    const $submit_btn = $modal.find('.btn');
    const $top_nav = $('.top-nav');
    const $solution_contents = $('.solution-contents');
    const $sec_title = $('.sec_title');
    const $solution_detail = $('.solution-detail');
    const $license_info = $('.license-info');

    const submit = (formData) => {
        $.ajax({
            type : "POST",
            url  : "/management/License.do",
            dataType: "json",
            data : {
                task: "proc",
                mode: "insert",
                data: {...formData, user_id: LOGIN_USER.user_id, solution_id:selectedSolution.solution_id}
            }
        }).done(data => {
            if(data.resultCode === '00') {
                alert(MessageSource['alert.success.question']);
                window.location.reload();
            }
        })
    }

    // 기존 페이지 리셋
    const pageReset = () => {
        $sec_title.children().remove();
        $solution_detail.children().remove();
        $license_info.children().remove();
        if($('.custom-slider').length > 0) {
            $('.custom-slider').remove();
        }
    }

    // 페이지 변경 함수 (솔루션 선택)
    const changePage = (solution) => {

        // 디테일 타이틀 변경
        $sec_title.append(`<span>${solutionInfo[solution.solution_id]}</span>`)

        // 디테일 변경
        solution.detail.forEach(ele => $solution_detail.append(`<li>${ele.contents}</li>`));

        // 라이선스 정보 변경
        License(licenseInfo,solution);
        licenseInfo.forEach(m => {
            $license_info.append(
                `<li id="${m.id}">
                    <div class="card">
                        <div class="card_header">
                            <h6>${m.name}</h6>
                            <p>${m.desc}</p>
                        </div>
                        <div class="card_body">
                            <dl>
                                <dd>
                                    <span class="cost">${m.license[MessageSource['main.license-info.year']] == undefined ? '　' : m.license[MessageSource['main.license-info.year']]}</span>
                                    ${m.license[MessageSource['main.license-info.everlasting']] == undefined ? '' : ` / ${MessageSource['main.license-info.year']}`}
                                </dd>
                                <dd>
                                    <span class="cost">${m.license[MessageSource['main.license-info.everlasting']] == undefined ? '0$' : m.license[MessageSource['main.license-info.everlasting']]}</span>
                                    ${m.license[MessageSource['main.license-info.year']] == undefined ? ' / 15day' : ` / ${MessageSource['main.license-info.everlasting']}`}
                                </dd>
                            </dl>
                            <div class="question-wrap">
                                <button
                                    data-name="${m.name}"
                                    class="btn-question"
                                    type="button"
                                >${m.btn}</button>
                            </div>
                        </div>
                    </div>
                </li>`
            )

        });

        // 솔루션 이미지 변경
        const imageList = getSolutionImage(selectedSolution.solution_id);

        const html = imageList.map(ele => {
            return (`<div class="img-box">
                        <div class="title">${ele.tag}</div>
                        <img src="${ele.path}" data-name="${ele.tag}"/>
                    </div>`);
        })

        $solution_contents.prepend(
            `<div class="custom-slider">${html.join('')}</div>`
        )

        $('.custom-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
        });

        // 솔루션 이미지 확대
        $('.custom-slider').on('click','.img-box',(ele) => {
            $imageModal.find('main img').attr('src',ele.target.src);
            openModal($imageModal)
        })

        // 모달창 라이선스 변경 이벤트
        const changeLicenseInput = (target,selectedLicenseInfo) => {
            target.children().remove();
            target.append(
                `<dd>
                        <span class="cost">${selectedLicenseInfo.license[MessageSource['main.license-info.year']] == undefined ? '　' :selectedLicenseInfo.license[MessageSource['main.license-info.year']]}</span>
                        ${selectedLicenseInfo.license[MessageSource['main.license-info.year']] == undefined ? '' : ` / ${MessageSource['main.license-info.year']}`}
                    </dd>
                    <dd>
                        <span class="cost">${selectedLicenseInfo.license[MessageSource['main.license-info.everlasting']] == undefined ? '0$' : selectedLicenseInfo.license[MessageSource['main.license-info.everlasting']]}</span>
                        ${selectedLicenseInfo.license[MessageSource['main.license-info.year']] == undefined ? ' / 15day' : ` / ${MessageSource['main.license-info.everlasting']}`}
                    </dd>`
            )
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

        // 라이선스 모달 오픈 이벤트
       $license_info.find('.question-wrap button').on('click',({target}) => {
           if(!LOGIN_USER) {
               alert(MessageSource['alert.request.login']);
               window.location = '/login/Login.do';
           } else {
               const $h5 = $modal.find('h5');
               const $type_list_input = $modal.find('.type_list input');
               const $cost_info_dl = $modal.find('.cost_info dl');
               const selectedLicenseInfo = licenseInfo.find(ele => ele.name === target.dataset.name);

               // 솔루션 네임
               $h5.text(selectedSolution.solution_name);

               // 라이선스 radio
               $type_list_input.each((idx,ele) => {
                   if(ele.dataset.name === target.dataset.name) {
                       ele.checked = true;
                   } else {
                       ele.checked = null;
                   }
               })

               // 라이선스 변경 이벤트
               $type_list_input.on('click',({target}) => {
                       const selectedLicenseInfo = licenseInfo.find(ele => {
                           return ele.name === target.dataset.name;
                       });
                       changeLicenseInput($cost_info_dl,selectedLicenseInfo)
               });

               // 라이선스 cost
               changeLicenseInput($cost_info_dl,selectedLicenseInfo)
               openModal($modal);
           }
       })
    }

    // 라이선스 신청 이벤트
    $submit_btn.on('click',(e) => {
        const formData = $form.serializeObject();

        // 검증
        if(!nullValid(formData, errors)) {
            return;
        }

        // 전송
        submit(formData);
    })

    // top nav 클릭 이벤트
    $top_nav.on('click','li',({target}) => {

        //클래스이름 selected 추가
        $top_nav.children('.selected').removeClass('selected');
        target.className = 'selected';

        //페이지 change
        const solutionInfo = solutions.find(ele => target.dataset.name === ele.solution_name);
        selectedSolution = solutionInfo;
        pageReset();
        changePage(solutionInfo);
    })

    // solutions init
    params.forEach((ele,idx) => {
        if(idx === 0) solutions = ele.monthly
    })

    // top nav init
    solutions.forEach(ele => {
        $top_nav.append(
            `<li 
                data-name="${ele.solution_name}"
             >${ele.solution_name}</li>`
        )
    })

    // top nav 기본 클릭
    $top_nav.children('li:eq(0)').trigger('click');
});