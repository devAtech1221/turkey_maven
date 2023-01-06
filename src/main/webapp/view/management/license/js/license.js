const defaultMail = {
    mail_title: '안녕하세요 에이테크입니다.',
    message: '신청하신 라이선스 계정정보입니다.'
}

let areaListTable = new CommonFrame({
    frame_position: $('.table_area'),
    frame_url: '/common/include/frame/areaTable.jsp',
    contents_url:
        [{
            target_position: '[data-content]',
            url: '/common/include/contents/contentsTable.jsp'
        }]
});

let modal = new CommonFrame({
    frame_position: $('.area_modal'),
    frame_url: '/common/include/frame/areaModal2_lg.jsp',
    contents_url: [
        {
            target_position: '[data-content-body]',
            url: '/view/management/license/contentsModal.jsp',
        },
        {
            target_position: '[data-content-inner1]',
            url: '/view/management/license/createLicense.jsp',
        },
        {
            target_position: '[data-content-footer]',
            url: '/view/management/license/contentsModalFooter.jsp',
        }
    ],
    ready: function(props){
        // title
        props.frame_position.find('header').prepend('상세 정보 (라이선스)');
    }
});

Promise.all([areaListTable.init(),modal.init()]).then(function(params) {
    const submitInfo = {};
    const eGridDiv = $('.table_area .grid-wrap .ag-theme-alpine');
    const $modal = modal.props.frame_position.find('.modal');
    const $selected_solution = $modal.find('.selected-solution');
    const $form = $modal.find('form.form-box.form-box2');
    const $status_option = $('.status-option');
    const $create_form = $modal.find('form.create-form');
    const $submit_wrap = $modal.find('.btn-modal-submit')
    const $btn_submit = $modal.find('.btn-modal-submit .license-submit');
    const $btn_close = $modal.find('.btn-modal-submit .close');

    // grit 테이블 설정
    const gridOptions = {
        columnDefs: [
            { field: "belong", headerName: "소속", flex: 1, filter: false },
            { field: "name", headerName: "성함", flex: 1, filter: false },
            { field: "position", headerName: "직책", flex: 1, filter: false },
            { field: "tel", headerName: "전화번호", flex: 1, filter: false },
            { field: "solution_name", headerName: "신청 솔루션", flex: 1, filter: false },
            { field: "license_type", headerName: "신청 라이선스", flex: 1, filter: false },
            { field: "res_yn", headerName: "상태", flex: 1, filter: false },
            // { field: "CREATE_DTM", headerName: "생성일", flex: 1, filter: false },
        ],
        pagination:true,
        paginationPageSize:25,
        overlayNoRowsTemplate: "문의글이 없습니다.",
        onCellClicked:(e) => {
            const row = e.data;

            // 모달창 값 세팅
            $selected_solution.text(row.solution_name);
            $form.find('input,textarea').each((idx,ele) => {
                ele.value = row[ele.name];
            })

            submitInfo.to = row["email"];
            submitInfo.license_question_id = row["license_question_id"];
            submitInfo.solution_id = row["solution_id"];
            submitInfo.user_id = row["user_id"];
            submitInfo.license_type = row["license_type"];

            if(row['res_yn'] !== '신규') {
                $create_form.css('display','none');
                $submit_wrap.css('display','none');
            } else {
                $create_form.css('display','block');
                $submit_wrap.css('display','block');
            }
            openModal($modal);
        },
    };

    new agGrid.Grid(eGridDiv[0], gridOptions);

    // 라이선스 신청글 조회
    const getLicense = (value) => {
        $.ajax({
            type : "POST",
            url  : window.location.pathname,
            dataType: "json",
            data : {
                task: "select",
                mode: "list",
                res_yn: value
            }
        }).done(json => {
            const dataFormat = json.data.map(ele => {
                let tmpData = {...ele,...ele.user}
                delete tmpData.user;
                return tmpData;
            })

            const tmpMap = dataFormat.map(ele => {
                return {
                    ...ele,
                    res_yn  : ele.res_yn == 'SUCCESS' ? {txt:'완료', order: 2}
                            : ele.res_yn == 'DELETE' ? {txt:'보류', order: 3}
                            : {txt:'신규', order: 1}
                }
            });

            tmpMap.sort((a,b) => {
                if(a.res_yn.txt !== b.res_yn.txt) {
                    return a.res_yn.order - b.res_yn.order
                } else {
                    const a_date = new Date(a.CREATE_DTM);
                    const b_date = new Date(b.CREATE_DTM);

                    if(a_date > b_date) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });

            const sortedMap = tmpMap.map(ele => {
                return {...ele, res_yn: ele.res_yn.txt};
            })

            gridOptions.api.setRowData(sortedMap);
        })
    }

    // 문의글 상태 선택 이벤트
    $status_option.on('click','li',e => {
        $status_option.find('li').each((idx,ele) => ele.className = '');
        e.target.className = 'selected';
        getLicense(e.target.dataset.value);
    })

    // 라이선스 지급 이벤트
    $btn_submit.on('click', () => {
        const formData = $create_form.serializeObject();

        // 검증
        if(!formData.site_id) {
            alert('아이디는 필수 입력입니다.');
            return;
        }

        if(!formData.site_pass) {
            alert('비밀번호는 필수 입력입니다.');
            return;
        }

        if(!formData.site_url) {
            alert('주소는 필수 입력입니다.');
            return;
        }

        // 메일/라이선스 formData 설정
        const files = $create_form.find('.input.file input')[0].files;
        const submitData = new FormData();

        [...files].forEach(file => {
            submitData.append('attach_file_list', file);
        })

        const mylicense_json = {
            site_id : formData["site_id"],
            site_pass : formData["site_pass"],
            site_url : formData["site_url"],
            solution_id : submitInfo.solution_id,
            user_id : submitInfo.user_id,
            license_type : submitInfo.license_type,
        }

        submitData.append('task','proc');
        submitData.append('mode','createLicense');
        submitData.append('to',submitInfo.to);
        submitData.append('license_question_id',submitInfo.license_question_id);
        submitData.append('mail_title',formData["mail_title"]);
        submitData.append('message',formData["message"]);
        submitData.append('mylicense_json',JSON.stringify(mylicense_json));

        // 전송
        $.ajax({
            type : "POST",
            enctype:'multipart/form-data',
            url  : window.location.pathname,
            dataType: 'json',
            processData: false,
            contentType: false,
            data : submitData
        }).done(json => {
            if(json.resultCode == '00') {
                alert('성공적으로 지급되었습니다.');
                window.location.reload();
            } else if(json.resultCode == '08') {
                alert('메일 주소를 찾을 수 없습니다.');
            }
        }).error(error => console.log(error))
    })

    // 닫기 버튼 이벤트
    $btn_close.on('click',() => {
        closeModal($modal);
    })

    // init
    $status_option.children('li:eq(0)').click();
});