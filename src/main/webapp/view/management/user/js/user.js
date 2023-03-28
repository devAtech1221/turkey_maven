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
            url: '/view/management/user/contentsModal.jsp',
        },
        {
            target_position: '[data-content-inner1]',
            url: '/view/management/user/licenseList.jsp',
        },
        {
            target_position: '[data-content-footer]',
            url: '/view/management/user/contentsModalFooter.jsp',
        }
    ],
    ready: function(props){
        // title
        props.frame_position.find('header').prepend(MessageSource['management.license.modal.header']);
    }
});

Promise.all([areaListTable.init(),modal.init()]).then(function(params) {
    const eGridDiv = $('.table_area .grid-wrap .ag-theme-alpine');
    const $modal = modal.props.frame_position.find('.modal');
    const $form = $modal.find('form.form-box.form-box2');
    const $table_body = $modal.find('.my-license-table tbody');

    // jsp MessageSource init
    $("[data-msg_src]").each((idx,ele) => {
        ele.prepend(MessageSource[ele.dataset.msg_src]);
    })

    $("[data-placeholder]").each((idx,ele) => {
        ele.placeholder = MessageSource[ele.dataset.placeholder];
    })

    // grit 테이블 설정
    const gridOptions = {
        columnDefs: [
            { field: "user_id", headerName: MessageSource['grid.columnDefs.userId'], flex: 1, filter: false },
            { field: "belong", headerName: MessageSource['grid.columnDefs.belong'], flex: 1, filter: false },
            { field: "name", headerName: MessageSource['grid.columnDefs.name'], flex: 1, filter: false },
            { field: "position", headerName: MessageSource['grid.columnDefs.position'], flex: 1, filter: false },
            { field: "tel", headerName: MessageSource['grid.columnDefs.tel'], flex: 1, filter: false },
            { field: "email", headerName: MessageSource['grid.columnDefs.email'], flex: 1, filter: false },
        ],

        pagination:true,
        paginationPageSize:25,
        overlayNoRowsTemplate: MessageSource['grid.overlayNoRowsTemplate'],

        onCellClicked:(e) => {
            const row = e.data;

            $.ajax({
                type : "POST",
                url  : '/management/License.do',
                dataType: "json",
                data : {
                    task: "select",
                    mode: "mylist",
                    data: {user_id: row.user_id}
                }
            }).done(json => {

                $form.find('input,textarea').each((idx,ele) => {
                    ele.value = row[ele.name];
                })

                $table_body.empty();

                json.data.forEach((ele,idx) => {

                    $table_body.append(
                        `<tr>
                            <td>${idx + 1}</td>
                            <td>${ele.solution_name}</td>
                            <td>${ele.site_id && ele.site_pass ? ele.site_id + '/' + ele.site_pass : ''}</td>
                            <td>${ele.start_date || ''}</td>
                            <td>${ele.end_date || ''}</td>
                            <td>${ele.res_yn === 'APPROVAL' ?`<button class="btn-solution-link" data-url=${ele.site_url}>
                            ${MessageSource["mylicense.link.on"]}</button>` : `<div>${MessageSource[`grid.${ele.res_yn}`]}</div>`}</td>
                        </tr>`
                    )
                })

                openModal($modal);
            })
        },
    };

    new agGrid.Grid(eGridDiv[0], gridOptions);

    // 라이선스 신청글 조회
    const getUsers = (value) => {
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

            gridOptions.api.setRowData(json.data);
        })
    }

    getUsers();
});