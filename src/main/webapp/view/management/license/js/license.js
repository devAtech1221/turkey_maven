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
    let listTable;
    let page = null;
    const submitInfo = {};
    const $modal = modal.props.frame_position.find('.modal');
    const $selected_solution = $modal.find('.selected-solution');
    const $form = $modal.find('form.form-box.form-box2');
    const $status_option = $('.status-option');
    const $create_form = $modal.find('form.create-form');
    const $submit_wrap = $modal.find('.btn-modal-submit')
    const $btn_submit = $modal.find('.btn-modal-submit .license-submit');
    const $btn_close = $modal.find('.btn-modal-submit .close');

    listTable = new Tabulator ('.table_area .list_table', {
        height:700,
        layout:'fitColumns',
        pagination: "remote",
        paginationSize:25,
        ajaxSorting: true,
        placeholder:"조회된 데이터가 없습니다.",
        index: "USER_ID",
        cellHozAlign: 'center',

        columns: [
            { title: "소속", field:"belong", headerSort:false,filter: false},
            { title: "성함", field: "name", headerSort:false,filter: false},
            { title: "직책", field: "position", headerSort:false,filter: false},
            { title: "전화번호", field: "tel", headerSort:false,filter: false},
            { title: "신청 솔루션", field: "solution_name", headerSort:false,filter: false},
            { title: "신청 라이선스", field: "license_type", headerSort:false,filter: false},
            { title: "상태", field: "res_yn", headerSort:false,filter: false},
        ],

        footerElement: makeTabulatorCounterElem(),

        dataLoaded:function(data){
            if(data.length == 0) return;

            let s_seq, e_seq;
            if(page.currentPageNo == page.finalPageNo){
                s_seq = 1;
                e_seq = page.startNumPerPage;
            }else{
                s_seq = page.startNumPerPage - page.recordsPerPage + 1;
                e_seq = page.startNumPerPage;
            }

            $('#listTablePageCount').text(`${s_seq} ~ ${e_seq}`);
            $('#listTableTotalCount').text(page.numberOfRecords);
        },

        rowDblClick: function(e, row){
            e.preventDefault();

            // 모달창 값 세팅
            $selected_solution.text(row.getData().solution_name);
            $form.find('input,textarea').each((idx,ele) => {
                ele.value = row.getData()[ele.name];
            })

            submitInfo.to = row.getData()["email"];
            submitInfo.license_question_id = row.getData()["license_question_id"];
            submitInfo.solution_id = row.getData()["solution_id"];
            submitInfo.user_id = row.getData()["user_id"];
            submitInfo.license_type = row.getData()["license_type"];

            if(row.getData()['res_yn'] !== 'NEW') {
                $create_form.css('display','none');
                $submit_wrap.css('display','none');
            } else {
                $create_form.css('display','block');
                $submit_wrap.css('display','block');
            }
            openModal($modal);
        },
    });

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
            page = json.page;
            const dataFormat = json.data.map(ele => {
                let tmpData = {...ele,...ele.user}
                delete tmpData.user;
                return tmpData;
            })

            listTable.setData(dataFormat);
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
        const files = $create_form.find('.input.file input')[0].files;
        const submitData = new FormData();

        // 메일/라이선스 formData 설정
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

        // 검증

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