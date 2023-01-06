'use strict';
if (typeof jQuery === "undefined") {
    throw new Error("jQuery undefined.");
}



/* dhtmlx gantt */
// column resizing == pro version
let scaleConfig = {
    levels: [
        {
            name:"day",
            scale_height: 3 * 25,
            min_column_width:30,
            row_height:25,
            scales:[
                {unit: "month", step: 1, format: "%Y-%m"},
                // {unit: "month", step: 1, format: "%m"},
                {unit: "week", step: 1, format: "W%W"},
                {unit: "day", format: "%d",
                    css:function(date){
                        let classes = '';
                        if(date.getDay() === 0 || date.getDay() === 6){classes += "weekend ";}
                        // if(strToday4Gantt == date.toDateString()) {classes += "today ";}
                        return classes;
                    }
                }
            ]
        },
        {
            name:"week",
            scale_height: 2 * 25,
            min_column_width:50,
            scales:[
                {unit: "month", step: 1, format: "%Y-%m"},
                {unit: "week", step: 1, format: "W%W"},
            ]
        },
        {
            name:"month",
            scale_height: 2 * 25,
            min_column_width:120,
            scales:[
                {unit: "year", step: 1, format: "%Y"},
                {unit: "month", step: 1, format: "%Y-%m"},
            ]
        },
        {
            name:"quarter",
            scale_height: 2 * 25,
            // height: 50,
            min_column_width:90,
            scales:[
                {unit: "year", step: 1, format: "%Y"},
                {
                    unit: "quarter", step: 1, format: function (date) {
                        let year =  moment(date).format('YYYY');
                        var dateToStr = gantt.date.date_to_str("%m");
                        var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                        return `${((Number(dateToStr(date)) / 3) + 1).toFixed(0)}분기`;
                    }
                },
            ]
        },
        // {
        //     name:"year",
        //     scale_height: 50,
        //     min_column_width: 30,
        //     scales:[
        //         {unit: "year", step: 1, format: "%Y"}
        //     ]
        // },
    ]
}; 



let columnConfig = {
    "업무": {name: "text", label:'업무', tree:true, min_width:320, width:'*', resize:true, sort:false,},
    
    "승인대상": {name:"approval", label:'승인대상', align:"center", max_width:66, template:
    function(task){return itemApprovalBadge(task.approval).outerHTML;}, sort:false, },
    "승인상태": {name:"importance", label:'승인상태', align:"center", max_width:66, template:
    function(task){return itemImportanceBadge(task.importance).outerHTML;}, sort:false,},
    
    "담당자": {name: "manager_id", label:'담당자', align:"center", max_width:65, sort:false, template:
        function(task){
            let manager_list = (task.manager_id || '').split(',');
            return page_prop.commonGantt.usermap[manager_list[0]];
        }  
    },
    "부서": {name: "dept_nm", label:'부서', align:"center", max_width:45, template: function(task){return (isNullOrBlank(task.dept_cd) ? null : makeBizGroupBadge(task.dept_cd, task.dept_short_nm).outerHTML)}},
    "시작일": {name: "start_date", label:'시작일', align:"center", max_width:66, sort:false, template: (task) => (moment(task.start_date).format('YY-MM-DD'))},
    "종료일": {name: "end_date", label:'종료일', align:"center", max_width:66, sort:false, template: (task) => (moment(task.end_date).format('YY-MM-DD'))},
    "기간": {name: "duration", label:'기간', align:"center", max_width:40, sort:false, },
    "진행률": {name: "progress",  label:'진행률', align:"center", max_width:50, template: 
    function(task){return `${(task.progress * 100).toFixed((0))}%`},
    
     sort:false},
     
 
     
   

    "진행상태": {name: "status", label:'진행상태', align:"center", max_width:72, template: function(task){return itemStatusBadge(task.status).outerHTML;}, sort:false,},
    "등록삭제버튼": {name: "buttons", label:'', max_width:74, min_width:74, sort:false,
        template: function(task){
            let buttons = ''
            buttons += '<div role="button" class="material-icons gantt-btn-output gantt-btn-f-l" data-action="output">attachment</div>';

            if(task.gubun != 'B'){
                buttons += '<div role="button" class="material-icons gantt-btn-add gantt-btn-f-l" data-action="add">add</div>';
                // buttons += '<div role="button" class="gantt-btn-add gantt-btn-f-l" data-action="add"></div>'
            }
            if(task.gubun != 'B' && task.gubun != 'P'){
                buttons += '<div role="button" class="material-icons gantt-btn-delete gantt-btn-f-l" data-action="delete">delete</div>';
                // buttons += '<div role="button" class="gantt-btn-delete gantt-btn-f-l" data-action="delete"></div>';
            }
            return buttons;
        }
    },
};

gantt.config.date_format = '%Y-%m-%d %H:%i';
gantt.config.order_branch = 'marker';
gantt.config.order_branch_free = true;

gantt.config.show_errors = false;

gantt.config.keep_grid_width = false;
gantt.config.grid_resize = true;
gantt.config.autofit = true;

gantt.config.drag_links = false;
gantt.config.sort = true;

// gantt.templates.rightside_text = function(start, end, task){
//     return (task.manager_id ? `<b>담당자: </b>${task.manager_id}` : null);
// };

// timeline
let today4Gantt = new Date();
let strToday4Gantt = today4Gantt.toDateString();
// gantt.templates.timeline_cell_class = function(task,date){
//     let classes = '';
//     if(date.getDay()==0||date.getDay()==6){
//         classes += "weekend ";
//     }
//
//     if(strToday4Gantt == date.toDateString()) {
//         classes += "today ";
//     }
//
//     return classes;
// };

// grid
gantt.templates.grid_folder = function(task){
    let onModifySpan = '<span class="on_modifying">수정중...</span>';
    if(task.gubun == 'B'){return onModifySpan + '<span class="material-icons gantt_grid_icon biz">work</span>';}
    if(task.gubun == 'P'){return onModifySpan + '<span class="material-icons gantt_grid_icon process">tag</span>';}
    if(task.gubun == 'T'){return onModifySpan + '<span class="material-icons gantt_grid_icon task">article</span>';}
    // if(task.gubun == 'T'){return '＊'}
}
gantt.templates.grid_file = gantt.templates.grid_folder;
gantt.templates.grid_row_class = function(param1, param2, task){
    let classes = '';

    if(task.gubun == 'B'){classes += 'biz ';}
    else if(task.gubun == 'P'){classes += 'process ';}
    else if(task.gubun == 'T'){classes += 'task ';}

    if(task.on_modifying == true){classes += 'on_modifying '}

    return classes;
}
gantt.templates.task_class = function(param1, param2, task){
    if(task.gubun == 'B'){return 'biz';}
    if(task.gubun == 'P'){return 'process';}
    if(task.gubun == 'T'){return 'task';}
};

gantt.ext.zoom.init(scaleConfig);
// gantt.ext.zoom.setLevel("day");
gantt.plugins({
    marker: true
});


/* dhtmlx gantt */
// 1개 이상 인스턴스 생성 불가(pro 버전에서 가능.. https://docs.dhtmlx.com/gantt/desktop__multiple_gantts.html)

class CommonGantt {
    constructor(props) {
        this.is_ready = false;
        this.selector_id = props.selector_id || null;
        this.ajax_url = props.ajax_url || null;
        this.time_unit = props.time_unit || 'day';
        this.display_task_status = props.display_task_status || 'all';
        this.display_task_unit = props.display_task_unit || 'all';
        this.display_users = props.display_users || null;
        this.display_user_list = (this.display_users == null ? [] : this.display_users.split(','));
        this.columns = props.columns;
        this.keyboard_navigation = props.keyboard_navigation || 'N';
        this.page_prop = props.page_prop;

        if(isNull(this.selector_id)){throw new Error("no selector.(id needed - without hash#)");}

        // this.init(this.selector_id);
    }

    init(){
        let this_instance = this;

        return new Promise(function(resolve, reject){
            let selector_id = this_instance.selector_id;
            if ($(`#${selector_id}`).length == 0) {
                throw new Error(`not exist node. - selector_id: '${selector_id}'.`);
            }
            if ($(`#${selector_id}`).length > 1) {
                throw new Error(`2 or more nodes are found. - selector_id: '${selector_id}'.`);
            }

            // custom columns
            this_instance.setConfig();
            this_instance.changeColumns(this_instance.columns);

            // init
            this_instance.getUserListAll()
                .then(function(userlist){
                    let usermap = {}
                    let userlist_new = userlist.map(user => {
                        user.value = user.USER_ID;
                        delete user.UPDATE_DTM;
                        delete user.UPDATE_ID;
                        delete user.CREATE_DTM;
                        delete user.CREATE_ID;
                        usermap[user.USER_ID] = user.USER_NM;
                        return user;
                    })
                    this_instance.userlist = userlist_new;
                    this_instance.usermap = usermap;
                })
                .then(function(){
                    return this_instance.initTaskModal();
                })
                .then(function(){
                    this_instance.commonBizOutput = new CommonBizOutput();
                    return this_instance.initTaskOutputModal();
                })
                .then(function() {
                    gantt.init(selector_id);
                    this_instance.initDefaultCallback();
                    this_instance.initWsMsgHandler();
                    this_instance.is_ready = true;

                    sendJson({
                        handle: 'BizGantt',
                        task: 'select',
                        mode: 'connect',
                    });

                    resolve();
                }).catch(function(e){
                    console.log(e);
                    throw Error('init Error');
                    reject();
                });
        });
    }

    setConfig(){
        let this_instance = this;

        // shortcut
        /*
        * modifier keys: shift, alt, ctrl, meta;
        * non-character keys: backspace, tab, enter, esc, space, up, down, left, right, home, end, pageup, pagedown, delete, insert, plus, f1-f12.
        * */
        if(this_instance.keyboard_navigation == 'Y'){
            gantt.plugins({
                keyboard_navigation: true
            });

            gantt.addShortcut("enter", function(e){
                var id = gantt.locate(e);
                this_instance.onTaskDblClick(id);
            }, "taskRow");

            gantt.addShortcut("ctrl+enter", function(e){
                $(e.target).find('[data-action="add"]').trigger('click');
            }, "taskRow");
            gantt.addShortcut("delete", function(e){
                $(e.target).find('[data-action="delete"]').trigger('click');
            }, "taskRow");
            gantt.removeShortcut("ctrl+r","taskRow");
            gantt.removeShortcut("ctrl+z","taskRow");
            gantt.removeShortcut("shift+left","taskRow");
            gantt.removeShortcut("shift+right","taskRow");
        }else{
            gantt.plugins({
                keyboard_navigation: false
            });
        }

        // level
        this.setLevel(this.time_unit);
    }

    initDefaultCallback(){
        let this_instance = this;

        gantt.attachEvent("onAfterTaskAdd", function(id, item){
            return this_instance.onAfterTaskAdd(id, item);
        });
        gantt.attachEvent("onBeforeTaskUpdate", function(id, item){
            return this_instance.onBeforeTaskUpdate(id, item);
        });
        gantt.attachEvent("onAfterTaskUpdate", function(id, item){
            return this_instance.onAfterTaskUpdate(id, item);
        });
        gantt.attachEvent("onBeforeTaskDelete", function(id, item){
            return this_instance.onBeforeTaskDelete(id, item);
        });
        gantt.attachEvent("onAfterTaskDelete", function(id, item){
            return this_instance.onAfterTaskDelete(id, item);
        });
        gantt.attachEvent("onTaskClick", function(id, e){
            return this_instance.onTaskClick(id, e);
        });
        gantt.attachEvent("onTaskDblClick", function(id, e){
            return this_instance.onTaskDblClick(id, e);
        });
        // gantt.attachEvent("onBeforeGanttRender", function(id, e){
        //     return this_instance.onBeforeGanttRender(id, e);
        // });
        // gantt.attachEvent("onGanttScroll", function (left, top){
        //     return this_instance.onGanttScroll(left, top);
        // });
        gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
            return this_instance.onBeforeTaskDisplay(id, task);
        });

        gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
            return this_instance.onBeforeTaskDrag(id, mode, e);
        });

        // gantt.attachEvent("onTaskDrag", function(id, mode, e){
        //     return this_instance.onTaskDrag(id, mode, e);
        // });
        //
        // gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
        //     return this_instance.onAfterTaskDrag(id, mode, e);
        // });

        gantt.attachEvent("onRowDragStart", function(id, target, e) {
            return this_instance.onRowDragStart(id, target, e);
        });

        gantt.attachEvent("onBeforeRowDragMove", function(id, target_parent, target_index){
            return this_instance.onBeforeRowDragMove(id, target_parent, target_index);
        });

        gantt.attachEvent("onBeforeRowDragEnd", function(id, target_parent, target_index) {
            return this_instance.onBeforeRowDragEnd(id, target_parent, target_index);
        });

        gantt.attachEvent("onRowDragEnd", function(id, target_parent) {
            return this_instance.onRowDragEnd(id, target_parent);
        });
    }

    initWsMsgHandler(){
        let this_instance = this;

        if(isFunc(wsMsgTaskHandle)){
            throw Error('can\'t find ws message handler');
            return;
        }

        wsMsgTaskHandle.BizGantt = {};
        wsMsgTaskHandle.BizGantt.proc = function(res){
            let mode = res.mode;
            if(isNull(mode)){throw new Error('invalid socket response data');}

            if(mode == 'batch_update'){
                res.data.forEach(item => {this_instance.formatting4Gantt(item);});
                
            }else{
                this_instance.formatting4Gantt(res.data);
            }

            this_instance.procOnBrowser(res);
        }
        wsMsgTaskHandle.BizOutput = {};
        wsMsgTaskHandle.BizOutput.proc = function(res){
            let mode = res.mode;
            if(isNull(mode)){throw new Error('invalid socket response data');}

            if(mode == 'insert'){
                let outputTable = this_instance.outputTable;
                outputTable.addRow(res.data).then(function(){
                    outputTable.clearSort();
                });
            }

            if(mode == 'update'){
                let outputTable = this_instance.outputTable;

                let targetrow = outputTable.getRow(res.data.SEQ);
                if(!targetrow) {return;}

                targetrow.update(res.data);
            }

            if(mode == 'delete'){
                let outputTable = this_instance.outputTable;
                outputTable.deleteRow(res.data.SEQ);
            }
        }
    }

    load(req_data, page_prop) {
        let this_instance = this;
        this_instance.is_ready = false;

        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "POST",
                url: this_instance.ajax_url,
                dataType: "json",
                data: req_data,
            }).done(function (res) {
                console.log(res)

                if(getAjaxResultCodeType(res) == 'E'){showToastFromAjax(res); return;}
                let itemList = res.data;
                let linkList = res.link;
                let onModifyingList = res.onModifyingList;

                // task status setting before
                this_instance.setDisplayTaskUnit(itemList);

                gantt.clearAll();
                gantt.parse({
                    data: itemList,
                    links: linkList
                });

                // sorting
                gantt.sort(function(a, b){
                    // seq 값이 없으면 후순위로 밀려나도록 합니다.
                    let a_idx = (isNullOrBlank(a.index_in_parent) ? 999999 : Number(a.index_in_parent));
                    let b_idx = (isNullOrBlank(b.index_in_parent) ? 999999 : Number(b.index_in_parent));

                    return (a_idx < b_idx ? -1 : (a_idx > b_idx ? 1 : 0));
                });


                // set on_modifying status
                if(!isNull(onModifyingList) && onModifyingList.length > 0){
                    onModifyingList.forEach(function(onModifyingTaskId){
                        let task = gantt.getTask(onModifyingTaskId);

                        // 필터링으로 인해 수정중인 task가 보이지 않을 수 있습니다.
                        if(isNull(task)){return;}

                        task.remote_proc = 'Y';
                        task.on_modifying = true;
                        gantt.updateTask(onModifyingTaskId, task);
                    });
                }

                // TODAY MARK
                let dateToStr = gantt.date.date_to_str(gantt.config.task_date);
                let markerId = gantt.addMarker({
                    start_date: new Date(), //a Date object that sets the marker's date
                    css: "today", //a CSS class applied to the marker
                    text: "TODAY", //the marker title
                    title: dateToStr( new Date()) // the marker's tooltip
                });

                // TODAY SCROLL
                this_instance.moveToday();

                this_instance.is_ready = true;
                resolve();

                // 만약 다음 요청이 있다면?
                if (page_prop.reqCount) {
                    if (res.reqCount != page_prop.reqCount) {
                        page_prop.$btnSearch.trigger('click');
                    }
                }

            }).fail(function () {
                reject();
            }).always(function () {
                // this_instance.is_ready = true;
            });
        });
    }

    moveToday() {
        gantt.showDate(new Date());
    }

    // server 로 update 내용 보내기~
    procSend2Server(req_data){
        let this_instance = this;
        let req_data_copied = JSON.parse(JSON.stringify(req_data)); // copy obj

        if(Array.isArray(req_data_copied.data)){
            req_data_copied.data.forEach(function(item){
                this_instance.formatting4Server(item);
            });
        }else{
            this_instance.formatting4Server(req_data_copied.data);
        }

        // 1. update task on server (insert || update || delete || onmodifying)
        return new Promise(function (resolve, reject) {
            // 1-1. ws
            try{
                sendJson(req_data_copied);
                resolve();
            }catch (e) {
                reject(e);
            }
        });
    }

    // 상황 1. browser 갱신 (self)
    // 상황 2. browser 갱신 (from server)(서버에서 받은 갱신정보를 browser에 반영)
    // TODO: 현재 자신의 UPDATE는 두번 UPDATE 되는 현상 있음.(SELF UPDATE, SERVER UPDATE)
    procOnBrowser(req){
        let data = req.data;
        if(isNull(data)){throw Error('null updated data.');}
        // if(isNull(data.id)){throw Error('null updated data - id');}

        switch (req.mode){
            case 'insert':
                if(isNull(data.parent)){
                    // 프로젝트 task는 parent가 없습니다. 저희는 프로젝트를 등록할 수 없습니다.
                    throw new Error('null value [parent] detected while insert task on browser');
                    break;
                }
                if(!gantt.isTaskExists(data.biz_itm_cd)){
                    // 프로젝트 단위로 데이터를 불러오기 때문에 프로젝트 task가 없다면 해당 task는 insert시키지 않아도 됩니다.
                    break;
                }
                gantt.addTask(data, data.parent);
                break;
            case 'update':
                if(!gantt.isTaskExists(data.id)){break;}
                gantt.updateTask(data.id, data); // == rerender
                break;  
                
            case 'update_modifying':
                if(!gantt.isTaskExists(data.id)){break;}

                let c_data = gantt.getTask(data.id); 
                c_data.remote_proc = data.remote_proc;
                c_data.on_modifying = data.on_modifying;
                c_data.on_modifying_own = data.on_modifying_own;
                gantt.updateTask(data.id, c_data); // == rerender
                break;

            case 'batch_update': // batch 에대해서는 임시로 생성하여 수정이 필요할듯함
                gantt.batchUpdate(function(){
                    if(isNull(data) || data.length == 0){return;}
                    data.forEach(function(task){
                        if(!gantt.isTaskExists(task.id)){return;}
                        task.batch_proc = 'Y';
                        gantt.updateTask(task.id, task);
                    });
                });
                break;
            case 'delete':
                if(!gantt.isTaskExists(data.id)){break;}
                !data.remote_proc || (gantt.getTask(data.id).remote_proc = data.remote_proc)
                gantt.deleteTask(data.id);
                break;
            case 'change_id':
                // client: task 생성(temp_id) -> server 전송 -> server: 진짜 id 생성 -> client 전송 -> client: id 교체
                if(gantt.isTaskExists(data.temp_id)){
                    gantt.changeTaskId(data.temp_id, data.id);
                }
                break;
        }
    }

    /**
     * @function batchUpdate
     * @description
     * 일괄 작업<br>
     * mode: update, onmodifying(미구현), offmodifying(미구현)
     * @param {Array} procList 문자열
     * @example
     * let updateList = [
     *      gantt.getTask(1),
     *      gantt.getTask(2)
     * ];
     * this_instance.batchProc(updateList);
     */
    batchUpdate(taskList){
        let this_instance = this;

        // 0. validation

        // 1. local browser update
        gantt.batchUpdate(function(){
            this_instance.procOnBrowser({
                mode: 'batch_update',
                data: taskList
            });
        });

        // 2. send to server
        this_instance.procSend2Server({
            handle: 'BizGantt',
            task: "proc",
            mode: "batch_update",
            data: taskList
        }).then(function(){
            // do nothing.
        }).catch(function(){
            // undo create
        });
    }

  Update(taskList){
        let this_instance = this;

        // 0. validation

        // 1. local browser update
        gantt.Update(function(){
            this_instance.procOnBrowser({
                mode: 'update',
                data: taskList
            });
        });

        // 2. send to server
        this_instance.procSend2Server({
            handle: 'BizGantt',
            task: "proc",
            mode: "update",
            data: taskList
        }).then(function(){
            // do nothing.
        }).catch(function(){
            // undo create
        });
    }
    
     
    getAllColumnKeys(){
        return Object.keys(columnConfig);
    }

    changeColumns(colKeys){
        if(isNull(colKeys)){
            gantt.config.columns = Object.values(columnConfig);
        }else{
            let selectedCols = [];
            colKeys.forEach(function(colKey){
                if(isNull(columnConfig[colKey])){throw new Error(`invalid Column key '${colKey}'`);}
                selectedCols.push(columnConfig[colKey]);
            });

            gantt.config.columns = selectedCols;
        }

        if(this.is_ready){
            this.rerender();
        }
    }

    rerender(){
        // trick... column grid size autofit == PRO version only...
        gantt.resetLayout();
        gantt.render();
        this.setLevel(gantt.ext.zoom.getCurrentLevel());
    }

    refreshDisplayTaskUnit(){
        let this_instance = this;
        let taskList = gantt.serialize().data;
        let display_task_unit = this_instance.display_task_unit;

        if(display_task_unit == 'all'){
            taskList.forEach(function(task){
                gantt.getTask(task.id).$open = true;
            });
        }

        if(display_task_unit == 'process'){
            taskList.forEach(function(task){
                if(task.gubun == 'B'){gantt.getTask(task.id).$open = true;}// BIZ
                if(task.gubun == 'P'){gantt.getTask(task.id).$open = false;}// PROCESS
            });
        }

        if(display_task_unit == 'biz'){
            taskList.forEach(function(task){
                if(task.gubun == 'B'){gantt.getTask(task.id).$open = false;}// BIZ
            });
        }

        gantt.render();
    }

    setDisplayTaskUnit(taskList){
        let this_instance = this;
        let display_task_unit = this_instance.display_task_unit;

        if(display_task_unit == 'all'){
            taskList.forEach(function(task){
                task.open = true;
            });
        }

        if(display_task_unit == 'process'){
            taskList.forEach(function(task){
                if(task.gubun == 'B'){task.open = true;}// BIZ
                if(task.gubun == 'P'){task.open = false;}// PROCESS
            });
        }

        if(display_task_unit == 'biz'){
            taskList.forEach(function(task){
                if(task.gubun == 'B'){task.open = false;}// BIZ
            });
        }
    }

    checkDisplay(id, task){
        let this_instance = this;

        // 1. PROJECT - SERVER SIDE 에서 필터링됩니다. 나머진 모두 출력.
        if(task.type == 'project'){
            return true;
        }

        // 2. PROCESS - 무조건 보여주는걸로
        // if(task.parent == task.biz_itm_cd){
        //     return true;
        // }

        // 3. TASK
        // 3-1. 하위항목이 display true일 경우 무조건 display시켜줍니다.
        let children_id = gantt.getChildren(id);
        if(children_id.length > 0){
            let display_child_exist = false;
            children_id.some(function(child_id){
                let child = gantt.getTask(child_id);
                if(!this_instance.checkDisplay(child_id, child)){
                    return false;
                }

                display_child_exist = true;
                return true; // break;
            });

            if(display_child_exist){return true;}
        }

        //////////////////////////////////////////////////////////////////////
        // 4. 필터링에 의한 DISPLAY 조절
        let task_status_ok = false;
        let user_ok = false;

        // display_task_status
        if(this_instance.display_task_status == 'all'){
            task_status_ok = true;

        }else if(this_instance.display_task_status == 'ongoing'){
            if(task.status == '01' || task.status == '02'){task_status_ok = true;}

        }else if(this_instance.display_task_status == 'done'){
            if(task.status != '01' && task.status != '02'){task_status_ok = true;}
        }

        // display_users
        if(!isNullOrBlank(this_instance.display_users)){
            if(this_instance.display_user_list.includes(task.manager_id)){user_ok = true;}
            // if(task.manager_id == this_instance.display_users){user_ok = true;}
        }else{
            user_ok = true;
        }


        return task_status_ok && user_ok;

        // if(this_instance.display_task_status == 'cancle'){
        //
        // }
    }

    onAfterTaskAdd(id, item){
        let this_instance = this;
        gantt.render();

        if(item.remote_proc == 'Y'){
            gantt.getTask(id).remote_proc = 'N';
            return;
        }

        this_instance.procSend2Server({
            handle: 'BizGantt',
            task: "proc",
            mode: "insert",
            data: item
        }).then(function(){
            // do nothing.
        }).catch(function(){
            // undo create
        })
    }

    onBeforeTaskUpdate(id, item) {
        let this_instance = this;
        let task = gantt.getTask(id);

        // 0. null?
        if(isNull(task)){return;}
        // 1. end_date formatting
        // - task dragging => dhtmlx gantt 의 기본 기능에 따라 end_date 가 +1일이 되므로 저희 포맷에 맞게 변경합니다.
        if(task.task_dragged){
            let end_date = task.end_date;
            let minus1Minute = moment(end_date).subtract(1, 'minutes').toDate();
            task.end_date = minus1Minute;
            task.task_dragged = false;
        }

        // 2. status 자동변경
        // - progress 값에 따라 자동으로 update 시켜줍니다.
        // - 중지, 취소 상태일 때는 자동변경기능이 해제됩니다.
        // 2-1. (대기)상태에서 progress 값이 0 이상이 될 경우
        let prev_status = task.status;
        if(prev_status != '04' && prev_status != '05'){
            if(task.progress == 0){
                task.status = '01';
            }else if(task.progress > 0 && task.progress < 1){
                task.status = '02';
            }else{
                task.status = '03';
            }
            // if(prev_status == '01' && task.progress > 0){
            //     task.status = '02';
            // }
            // // 2-2. (any)상태에서 progress 값이 100이 될 경우
            // if(task.progress == 1){
            //     task.status = '03';
            // }
            // // 2-3. (완료)상태에서 progress 값이 1 미만이 되는 경우
            // if(prev_status == '03' && task.progress < 1){
            //     task.status = '02';
            // }
        }

        if(item.remote_proc == 'Y' && item.on_moving == 'Y'){
            gantt.moveTask(id, item.index_in_parent, item.parent);
            gantt.getTask(id).on_moving = 'N';
        }
    }

    onAfterTaskUpdate(id, item){
        let this_instance = this;
        gantt.render();

        if(item.remote_proc == 'Y'){
            gantt.getTask(id).remote_proc = 'N';
            return true;
        }

        if(item.batch_proc == 'Y'){
            gantt.getTask(id).batch_proc = 'N';
            return true;
        }
           
        
 
        this_instance.procSend2Server({
            handle: 'BizGantt',
            task: "proc",
            mode: "update",
            data: item
        }).then(function(){
            // do nothing
            return true;
        }).catch(function(){
            // undo update
        });
    }

    onBeforeTaskDelete(id, item){
        // return false; // prevetn default callback
    }

    onAfterTaskDelete(id, item){
        let this_instance = this;
        gantt.render();

        if(item.remote_proc == 'Y'){
            // 이미 삭제되었기 때문에 task 를 찾을 수 없습니다.
            // gantt.getTask(id).remote_proc = 'N';
            return;
        }

        if(item.batch_proc == 'Y'){
            // 이미 삭제되었기 때문에 task 를 찾을 수 없습니다.
            // gantt.getTask(id).batch_proc = 'N';
            return;
        }

        this_instance.procSend2Server({
            handle: 'BizGantt',
            task: "proc",
            mode: "delete",
            data: item
        }).then(function(){
            // do nothing.
        }).catch(function(){
            // undo remove
        })
    }

    // onBeforeGanttRender(){
    //     let range = gantt.getSubtaskDates();
    //     let scaleUnit = gantt.getState().scale_unit;
    //     if(range.start_date && range.end_date){
    //         gantt.config.start_date = gantt.calculateEndDate(range.start_date, -4, scaleUnit);
    //         gantt.config.end_date = gantt.calculateEndDate(range.end_date, 5, scaleUnit);
    //     }
    // }

    onBeforeTaskDisplay(id, task){
        let this_instance = this;
        return this_instance.checkDisplay(id, task);
        // let this_instance = this;
        //
        // // 1. PROJECT
        // if(task.type == 'project'){
        //     return true;
        // }
        //
        // // 2. PROCESS
        // if(task.parent == task.biz_itm_cd){
        //     return true;
        // }
        //
        // // 3. TASK
        // // 3-1. 하위항목이 display true일 경우 display시켜줍니다.
        // let children = gantt.getChildren(id);
        // if(children.length > 0){
        //     let display_child_exist = false;
        //     children.some(function(child){
        //         if(child.display)
        //     })
        // }
        //
        // if(this_instance.display_task_status == 'all'){
        //     return true;
        // }
        //
        // if(this_instance.display_task_status == 'ongoing'){
        //     if(task.status == '01' || task.status == '02'){return true;}
        //     return false;
        // }
        //
        // if(this_instance.display_task_status == 'done'){
        //     if(task.status != '01' && task.status != '02'){return true;}
        //     return false;
        // }
        //
        // return true;

        // if(this_instance.display_task_status == 'cancle'){
        //
        // }
    }

    onTaskClick(id, e){
        let this_instance = this;
        var button = e.target.closest("[data-action]")
        if(!button){return true;}

        var action = button.getAttribute("data-action");
        switch (action) {
            
            case "add":
				gantt.open(id);
                writeModalOpen(this_instance.$task_modal);
                this_instance.onWriteModalOpen(this_instance.$task_modal, id);
                /*this_instance.$task_modal.find('[name="text"]').eq(0).focus();*/
                break;

            case "delete": {
                let task = gantt.getTask(id);
                let rootTask = this_instance.getRootTask(id);

                if(task.on_modifying == true){
                    showToastW('수정중인 항목은 삭제가 불가능합니다.')
                    break;
                }

                let deleteCallback = function(is_ok){
                    if(!is_ok){return;}

                    // 1. get children
                    let childrenIdList = [];
                    gantt.eachTask(childTask => {childrenIdList.push(childTask.id);}, id);
                    let childrenIdListReversed = childrenIdList.reverse();

                    // 2. delete chilren
                    // reverse 하지 않고 순서대로 delete할 경우 parent task가 먼저 삭제됨
                    // parent가 삭제되면 child 항목이 검색되지 않기 때문에 child 우선 삭제 필요
                    childrenIdListReversed.forEach(function(childTaskId){
                        this_instance.procOnBrowser({
                            handle: 'BizGantt',
                            task: 'proc',
                            mode: 'delete',
                            data: {
                                id: childTaskId
                            }
                        });
                    })

                    // target task
                    this_instance.procOnBrowser({
                        handle: 'BizGantt',
                        task: 'proc',
                        mode: 'delete',
                        data: {
                            id: id
                        }
                    });
                }

                gantt.confirm({
                    text: `
                        삭제하시겠습니까?<br>
                        (하위 항목도 같이 삭제됩니다.)<br><br>
                        
                        업무명: <strong>${task.text}</strong><br>
                        사업: <strong>${rootTask.text}</strong>
                        `,
                    ok: '확인',
                    cancel: '취소',
                    callback: deleteCallback
                });
                break;
            }

            case "output": {

                // gantt.open(id);
                let task = gantt.getTask(id);
                writeModalOpen(this_instance.$taskoutput_modal);
                this_instance.onOutputModalOpen(this_instance.$taskoutput_modal, task);

                this_instance.commonBizOutput.connectOutput();
                // sendJson({
                //     handle: 'BizOutput',
                //     task: 'select',
                //     mode: 'connect',
                // });

                break;
            }
        }
        return false;
    }

    onTaskDblClick(id, e){
        let this_instance = this;
        let task = gantt.getTask(id);
        if(isNullOrBlank(task.type)){
            throw new Error('invalid task.type value');
            return false;
        }
        if(task.type == 'project'){
            showToastW('프로젝트항목은 사업센터에서 수정할 수 있습니다.')
            return false;
        }
        if(task.type == 'task' && task.gubun =='B'){
            showToastW('프로젝트항목은 사업센터에서 수정할 수 있습니다.')
            return false;
        }

        if(task.on_modifying == true){
            showToastW('수정중인 항목입니다.');
            return false;
        }

        // 0. set 'on modifying'
        this_instance.procSend2Server({
            handle: 'BizGantt',
            task: "proc",
            mode: "onmodifying",
            data: task
        }).then(function(){
            // 1. open taskModal
            updateModalOpen(this_instance.$task_modal);
            let $doc = this_instance.$task_modal.find('.doc_info');

            let task_copied = JSON.parse(JSON.stringify(task));

            // 1-1. get biz text
            if(!isNull(task_copied.biz_itm_cd) && !isNull(gantt.getTask(task_copied.biz_itm_cd))){
                let biz_itm_text = gantt.getTask(task_copied.biz_itm_cd).text;
                task_copied.biz_itm_text = biz_itm_text;
            }

            // 1-2. get parent text
            if(!isNull(task_copied.parent) && !isNull(gantt.getTask(task_copied.parent))){
                task_copied.parent_text = gantt.getTask(task_copied.parent).text;
            }

            this_instance.formatting4Server(task_copied);
            obj2elem(task_copied, $doc);

            // 1-4.
            let $manager_id = $('[name="manager_id"]');
            let tagify = this_instance.tagify_in_modal;
            tagify.removeAllTags();
            tagify.addTags($manager_id.val());

            //1-5

            // detail
            // $.ajax({
            //     type : "POST",
            //     url  : window.location.pathname,
            //     dataType: "json",
            //     data : {
            //         task: "select",
            //         mode: "docOutputListWithItemCode",
            //         data:{
            //             ITM_CD: id
            //         }
            //     }
            // }).done(function(res){
            //     // detail
            //     this_instance.outputTable.clearData();
            //     this_instance.outputTable.setData(res.data);
            //     this_instance.outputTable.redraw();
            // }).fail(function(res){
            //     showToastE("서버와의 통신에 실패했습니다.");
            //     this_instance.procSend2Server({
            //         handle: 'BizGantt',
            //         task: "proc",
            //         mode: "offmodifying",
            //         data: task
            //     })
            // });

        }).catch(function(res){
            // console.log(res);
            showToastE("서버와의 통신에 실패했습니다.");
        });

        return false; // return false: cancle the default handler(=opening lightbox)
    }

    onBeforeTaskDrag(id, mode, e){
        let task = gantt.getTask(id);
        if(task.on_modifying == true){
            showToastW('수정중인 항목입니다.');
            return false;
        }
        task.task_dragged = true;

        return true;
    }

    // onTaskDrag(id, mode, e){
    //     let task = gantt.getTask(id);
    //     return true;
    // }
    //
    // onAfterTaskDrag(id, mode, e){
    //     let task = gantt.getTask(id);
    //     return true;
    // }

    onRowDragStart(id, target, e){
        let this_instance = this;

        let task = gantt.getTask(id);
        let start_index = gantt.getTaskIndex(id);

        // 1. 움직여도 되는 녀석인가?
        if(task.gubun == 'B' || task.gubun == 'P') {
            showToastW("프로젝트와 파이프라인은 행 이동이 불가능합니다.")
            return false;
        }
        if(task.on_modifying == true) {
            showToastW("수정중인 항목은 행 이동이 불가능합니다.")
            return false;
        }

        // 2. 하단의 주석처리된 스크립트는 task를 옮기는동안 정렬이 필요한 항목을 on_modifying 상태로 변경시키는 기능입니다.
        // let my_start_brothers = gantt.getChildren(task.parent); // 직속 children 확인
        // let on_modifying_tasks = [];
        // my_start_brothers.forEach(function(brother_id){
        //     // index 이후의 형제들을 업데이트합니다.
        //     let brother_index = gantt.getTaskIndex(brother_id);
        //     if(start_index < brother_index){
        //         let brotherTask = gantt.getTask(brother_id);
        //         on_modifying_tasks.push(brotherTask);
        //     }
        // });
        //
        // this_instance.procSend2Server({
        //     handle: 'BizGantt',
        //     task: "proc",
        //     mode: "batch_onmodifying",
        //     data: [...on_modifying_tasks, task]
        // }).then(function(){
        // }).catch(function(res){
        //     showToastE("서버와의 통신에 실패했습니다.");
        // });
        //
        // task.on_modifying_tasks = on_modifying_tasks;

        return true;
    }

    onBeforeRowDragMove(id, target_parent, target_index){
        let this_instance = this;

        let targetParentTask = gantt.getTask(target_parent);

        // 1. 타겟이 'Biz'거나 부모가 'Biz'면 이동 불가. & marker 표시를 없앱니다.
        if(isNull(targetParentTask) || targetParentTask.gubun == 'B') {return false;}
        return true;
    }

    // 주석 달기 까먹지 말기..
    // (해당 event 에서는 order_branch = 'marker' 에서만 적용되는 상황을 고려하여 코드가 일부 추가되어야함)
    // return false 하게되면 해당 부분에 이동가능한지를 표시해주는 marker를 보여주지 않습니다.
    onBeforeRowDragEnd(id, target_parent, target_index){
        let this_instance = this;

        let task = gantt.getTask(id);
        let start_index = gantt.getTaskIndex(id);
        let targetParentTask = gantt.getTask(target_parent);
        let start_parent = task.parent;

        // 하단의 function은 task가 움직일동안 on_modifying 되어있던 연관항목들의 상태를 다시 되돌려주는 기능입니다.
        function offModifyingBrothers(){
            // let on_modifying_tasks_copy = JSON.parse(JSON.stringify(task.on_modifying_tasks));
            // task.on_modifying_tasks = null;
            // this_instance.procSend2Server({
            //     handle: 'BizGantt',
            //     task: "proc",
            //     mode: "batch_offmodifying",
            //     data: [...on_modifying_tasks_copy, task]
            // }).then(function(){
            //
            // }).catch(function(res){
            //     showToastE("서버와의 통신에 실패했습니다.");
            // });
        }

        // 2. 프로젝트로는 task 가 옮겨지지 않도록 합니다.
        if(targetParentTask.gubun == 'B') {offModifyingBrothers(); return false; }

        // 2. 출발지의 형제들(parent 내 동일 level children) 중 수정중인 작업이 있다면 위치이동을 금지합니다.
        let on_modifying_exist = false;
        {
            let my_start_brothers = gantt.getChildren(start_parent); // 직속 children 확인
            my_start_brothers.some(brother_id => {
                let brotherTask = gantt.getTask(brother_id);
                if(brotherTask.on_modifying && !brotherTask.on_modifying_own){
                    on_modifying_exist = true; return true;
                }
            });
            if(on_modifying_exist){
                showToastW('출발지에 수정중인 항목이 있어 행이동이 불가능합니다.');
                // offModifyingBrothers();
                return false;
            }
        }

        // 2. 목적지의 형제들(parent 내 동일 level children) 중 수정중인 작업이 있다면 위치이동을 금지합니다.
        if(start_parent != target_parent){
            let my_target_brothers = gantt.getChildren(target_parent); // 직속 children 확인
            my_target_brothers.some(brother_id => {
                let brotherTask = gantt.getTask(brother_id);
                if(brotherTask.on_modifying && !brotherTask.on_modifying_own){
                    on_modifying_exist = true; return true;
                }
            });
            if(on_modifying_exist){
                showToastW('목적지에 수정중인 항목이 있어 행이동이 불가능합니다.');
                // offModifyingBrothers();
                return false;
            }
        }

        // 통과. update 시켜줍니다.
        task.start_parent = start_parent;
        task.start_index = start_index;

        // offModifyingBrothers();
        return true;
    }

    onRowDragEnd(id, target_parent){
        let this_instance = this;

        // flow 는 다음과 같습니다.(index: 현재 순번, task.index_in_parent: DB상 순번)
        // 1) 자신의 browser에서 row 이동 진행
        // 2) 자신의 browser에서 row 이동 완료 (index 업데이트됨)
        // 3) browser내 task.index_in_parent 값을 현 index 값으로 업데이트 (index는 현재순차값, seq는 db내 순차값)
        // 4) server 전송(task move)
        // 5) 타 사용자 동일하게 move row(index 업데이트됨)
        // 6) 타 사용자 task list 업데이트(해당 task 및 형제들)

        // 행이 이동된 후, 연관된 모든 형제들을 update 시켜줍니다.
        let task = gantt.getTask(id);
        let start_parent = task.start_parent;
        let target_index = gantt.getTaskIndex(id);
        let start_index = task.start_index;
        let update_tasks = [];

        // 출발지 == 목적지 ?
        if(start_parent == target_parent){
            // 출발지 == 목적지 일 경우 출발 index 와 도착 index 중 작은 index를 기준으로 그 이후의 형제들을 업데이트합니다.
            let less_index = (target_index > start_index ? start_index : target_index);
            let my_start_brothers = gantt.getChildren(start_parent); // 직속 children 확인
            my_start_brothers.some(function(brother_id){
                let brother_index = gantt.getTaskIndex(brother_id);
                if(less_index > brother_index){return false;}
                if(brother_id == id){return false;}

                let brotherTask = gantt.getTask(brother_id);
                brotherTask.index_in_parent = brother_index;
                update_tasks.push(brotherTask);
            });
        }else{
            // 출발지 != 목적지 일 경우 출발지 update 목적지 update 두번이 필요합니다.
            // 1. 출발지
            let my_start_brothers = gantt.getChildren(start_parent); // 직속 children 확인
            my_start_brothers.some(function(brother_id){
                let brother_index = gantt.getTaskIndex(brother_id);
                if(start_index > brother_index){return false;}
                if(brother_id == id){return false;}

                let brotherTask = gantt.getTask(brother_id);
                brotherTask.index_in_parent = brother_index;
                update_tasks.push(brotherTask);
            });

            // 2. 목적지
            let my_target_brothers = gantt.getChildren(target_parent); // 직속 children 확인
            my_target_brothers.some(function(brother_id){
                let brother_index = gantt.getTaskIndex(brother_id);
                if(target_index > brother_index){return false;}
                if(brother_id == id){return false;}

                let brotherTask = gantt.getTask(brother_id);
                brotherTask.index_in_parent = brother_index;
                update_tasks.push(brotherTask);
            });
        }

        // 자신
        task.index_in_parent = gantt.getTaskIndex(id);
        // task.parent는 update되어있음
        task.on_moving = 'Y';
        update_tasks.push(task);

        this_instance.batchUpdate(update_tasks);

        // gantt.moveTask();

        // reset
        task.start_parent = null;
        task.start_index = null;
    }

    onWriteModalOpen($task_modal, parent){
        let this_instance = this;

        console.log("modal this_instance "+ this_instance)


        let $wrapper_doc_info = $task_modal.find('.doc_info');

        // 1. set parent
        let parentTask = gantt.getTask(parent);
        if(isNull(parentTask)){throw new Error('cannot find parentTask');}
        $wrapper_doc_info.find('[name="parent"]').val(parentTask.id);
        $wrapper_doc_info.find('[name="parent_text"]').val(parentTask.text);

        // 2. set biz_info
        let rootTask = this_instance.getRootTask(parent);
        $wrapper_doc_info.find('[name="biz_itm_cd"]').val(rootTask.id);
        $wrapper_doc_info.find('[name="biz_itm_text"]').val(rootTask.text);

        // 3. others
        $wrapper_doc_info.find('[name="rev"]').val(1);
        $wrapper_doc_info.find('[name="progress"]').val(0);
        $wrapper_doc_info.find('[name="progress_per"]').val(0);
        $wrapper_doc_info.find('[name="importance"]').val(2); // == 중요도 '보통'

        // 4. temp id
        let temp_id = `temp_${Math.random().toString(36).substr(2, 9)}`;
        $wrapper_doc_info.find('[name="id"]').val(temp_id);
        $wrapper_doc_info.find('[name="temp_id"]').val(temp_id);

        // 5. 새로 등록되는 task의 type을 확인합니다.(process or task. project는 등록될 수 없음)
        let gubun = (parentTask == rootTask ? 'P' : 'T');
        $wrapper_doc_info.find('[name="gubun"]').val(gubun);
    }

    onOutputModalOpen($task_output_modal, task){
        let this_instance = this;

        $task_output_modal.find('[name="id"]').val(task.id);
        this_instance.outputTable.clearData();
        this_instance.commonBizOutput.getOutputListWithItemCode(task.id)
            .then(function(data){
                this_instance.outputTable.setData(data);
            })
            .catch(function(res){
                showToastE(res)
            })
    }

    initTaskModal(){
        let this_instance = this;
        let $wrapper = $('.page_content');
        if($wrapper.length == 0){ $wrapper = $('html'); }
        $wrapper.append('<div id="area_modal_task"></div>');
        let areaModalTask = new CommonFrame({ // 발주모달 - BOM 불러오기 모달
            frame_position: $('#area_modal_task'),
            frame_url: '/common/include/frame/areaModalWide.jsp',
            contents_url: [
                {
                    target_position: '[data-content-body]',
                    url: '/common/include/contents/bizGantt/contentsModal.jsp',
                },
                {
                    target_position: '[data-content-footer]',
                    url: '/common/include/contents/contentsModalWriteFooter2.jsp',
                }
            ],
            ready: function (props) {
                this_instance.$task_modal = $(areaModalTask.props.frame_position).find('.modal');

                // title
                props.frame_position.find('.modal-title').text('업무 등록');

                // autocomplete off
                this_instance.$task_modal.find('input').attr('autocomplete', 'off');

                // datepicker
                let $form_dates = this_instance.$task_modal.find('.form_date');
                $form_dates.datepicker({
                    format: "yyyy-mm-dd",
                    todayBtn:"linked",
                    language: "kr",
                    orientation: "bottom auto",
                    keyboardNavigation: false,
                    forceParse: false,
                    autoclose: true,
                    todayHighlight: true,
                });
                $form_dates.on('keydown', function(e){
                    if(e.keyCode === 13) {
                        e.stopPropagation();
                        e.preventDefault();

                        return false;
                    }
                });

                // MODAL - DRAGGABLE
                this_instance.$task_modal.each(function(){
                    $(this).attr('data-backdrop', 'static');
                    $(this).attr('data-keyboard', 'false');
                    $(this).find('.modal-content').draggable({
                        handle: ".modal-header"
                    });
                });

                // selectbox, typeahead 등


                // 담당자
                let $manager_id = this_instance.$task_modal.find('[name="manager_id"]');
                let $manager_tag = this_instance.$task_modal.find('[name="manager_tag"]');
                function tagTemplate(tagData){
                    return `
                        <tag title="${tagData.EMAIL}"
                                contenteditable='false'
                                spellcheck='false'
                                tabIndex="-1"
                                class="tagify__tag ${tagData.class ? tagData.class : ""}"
                                ${this.getAttributes(tagData)}>
                            <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
                            <div>
                                <span class='tagify__tag-text'>${tagData.USER_NM}</span>
                            </div>
                        </tag>
                    `

                    //     `
                    //     <tag title="${tagData.EMAIL}"
                    //             contenteditable='false'
                    //             spellcheck='false'
                    //             tabIndex="-1"
                    //             class="tagify__tag ${tagData.class ? tagData.class : ""}"
                    //             ${this.getAttributes(tagData)}>
                    //         <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
                    //         <div>
                    //             <div class='tagify__tag__avatar-wrap'>
                    //                 <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
                    //             </div>
                    //             <span class='tagify__tag-text'>${tagData.USER_NM}</span>
                    //         </div>
                    //     </tag>
                    // `
                }

                function suggestionItemTemplate(tagData){
                    return `
                        <div ${this.getAttributes(tagData)}
                            class='tagify__dropdown__item ${tagData.class ? tagData.class : ""}'
                            tabindex="0"
                            role="option">
                            <div>
                                <strong style="font-size: 12px; font-weight: 600;">${tagData.USER_NM} </strong> <span style="color:#000;"> ${tagData.RANK_NM} </span>
                            </div>
                            <div>
                                <span style="font-size: 11px">${tagData.DEPT_NM}, ${tagData.EMAIL}</span>
                            </div>
                        </div>
                    `
                }

                function dropdownHeaderTemplate(suggestions){
                    return `
                        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
                            <strong>${this.value.length ? `Add remaning ${suggestions.length}` : 'Add All'}</strong>
                            <span>${suggestions.length} members</span>
                        </div>
                    `
                }

                // // initialize Tagify on the above input node reference
                // this_instance.getUserListAll()
                //     .then( userlist => {
                //     })
                //     .catch( msg => {
                //         showToastE("사용자정보를 불러오는 도중 문제가 발생했습니다.")
                //     });

                // let userlist = this_instance.userlist.map(user => {user.value = user.USER_ID; return user;})
                let tagify = new Tagify($manager_tag[0], {
                    tagTextProp: 'USER_NM', // very important since a custom template is used with this property as text
                    enforceWhitelist: true,
                    skipInvalid: true, // do not remporarily add invalid tags
                    maxTags: 5,
                    dropdown: {
                        closeOnSelect: false,
                        enabled: 0,
                        classname: 'users-list',
                        searchKeys: ['USER_NM', 'EMAIL', 'DEPT_NM', 'USER_ID']  // very important to set by which keys to search for suggesttions when typing
                    },
                    templates: {
                        tag: tagTemplate,
                        dropdownItem: suggestionItemTemplate,
                        dropdownHeader: dropdownHeaderTemplate
                    },
                    whitelist: this_instance.userlist
                });
                this_instance.tagify_in_modal = tagify;

                // listen to dropdown suggestion items selection
                tagify.on('dropdown:select', onSelectSuggestion)

                function onSelectSuggestion(e){
                    // console.log(this)
                    // console.log(e.detail.elm.className,  e.detail.elm.classList.contains(`${tagify.settings.classNames.dropdownItem}__addAll`)  )

                    if( e.detail.elm.classList.contains(`${tagify.settings.classNames.dropdownItem}__addAll`) )
                        tagify.dropdown.selectAll();
                }

                // INPUT - PROGRESS_PER
                let $progress_per = this_instance.$task_modal.find('[name="progress_per"]');
                let $progress = this_instance.$task_modal.find('[name="progress"]');
                $progress_per.on('change', function(e){
                    let progress_per = $progress_per.val();
                    let progress = Number(progress_per / 100).toFixed(2);
                    $progress.val(progress);
                });
                
                
				
                // close 시 modifying 상태 해제
                this_instance.$task_modal.on("hide.bs.modal", function (e) {
                    // modal 이외 event 막기
                    if(!e.target.classList.contains('modal')){return;}

                    let mode = this_instance.$task_modal.find('[name="mode"]').val();
                    if(mode == 'insert'){						
						if(this_instance.keyboard_navigation=='Y'){
							gantt.focus();
						}
						return;
					}

                    let $wrapper_doc_info = this_instance.$task_modal.find('.doc_info');
                    let data = elem2Obj($wrapper_doc_info);

                    this_instance.procSend2Server({
                        handle: 'BizGantt',
                        task: "proc",
                        mode: "offmodifying",
                        data: data
                    }).then(function(){

                    }).catch(function(res){
                        showToastE("서버와의 통신에 실패했습니다.");
                    });
                });

                // save abutton
                let $btn_modal_save = $(areaModalTask.props.frame_position).find('.btn-save');
                $btn_modal_save.on('click', function(){
                    let $wrapper_doc_info = this_instance.$task_modal.find('.doc_info');
                    let data = elem2Obj($wrapper_doc_info);

                    // 0-1. tagify -> input value
                    let selected_user_obj_list = this_instance.tagify_in_modal.value;
                    let selected_user_id_list = selected_user_obj_list.map(user => user.USER_ID);
                    !selected_user_id_list || (data.manager_id = selected_user_id_list.join(','))

                    // 1. validaion
                    let docinfoReuslt = valid.validating($wrapper_doc_info);
                    if(!docinfoReuslt){return;}

                    // 2. save
                    this_instance.formatting4Gantt(data);

                    this_instance.procOnBrowser({
                        mode: this_instance.$task_modal.find('[name="mode"]').val(),
                        data: data
                    });

                    this_instance.$task_modal.modal('hide');
                    this_instance.page_prop.$btnSearch.trigger('click');
                    this_instance.page_prop.$btnSearch.trigger('click');
                });
            }
        });

        if(!isNull(page_prop)){page_prop.areaModalTask = areaModalTask;}
        this_instance.areaModalTask = areaModalTask;

        return Promise.all([areaModalTask.init()]);
    }

    initTaskOutputModal(){
        let this_instance = this;
        let $wrapper = $('.page_content');
        if($wrapper.length == 0){ $wrapper = $('html'); }
        $wrapper.append('<div id="area_modal_output"></div>');

        let areaModalTaskOutput = new CommonFrame({ // 발주모달 - BOM 불러오기 모달
            frame_position: $('#area_modal_output'),
            frame_url: '/common/include/frame/areaModalUltraWide.jsp',
            contents_url: [
                {
                    target_position: '[data-content-body]',
                    url: '/common/include/contents/bizGantt/outputModal.jsp',
                },
                {
                    target_position: '[data-content-footer]',
                    url: '/common/include/contents/contentsModalViewFooter.jsp',
                }
            ],
            ready: function (props) {
                this_instance.$taskoutput_modal = $(areaModalTaskOutput.props.frame_position).find('.modal');

                // title
                props.frame_position.find('.modal-title').text('산출물 관리');

                // autocomplete off
                this_instance.$taskoutput_modal.find('input').attr('autocomplete', 'off');

                // MODAL - DRAGGABLE
                this_instance.$taskoutput_modal.each(function(){
                    $(this).attr('data-backdrop', 'static');
                    $(this).attr('data-keyboard', 'false');
                    $(this).find('.modal-content').draggable({
                        handle: ".modal-header"
                    });
                });

                // close 시 modifying 상태 해제
                this_instance.$taskoutput_modal.on("hide.bs.modal", function (e) {
                    // modal 이외 event 막기
                    if(!e.target.classList.contains('modal')){return;}

                    this_instance.commonBizOutput.disconnectOutput();
                    // sendJson({
                    //     handle: 'BizOutput',
                    //     task: 'select',
                    //     mode: 'disconnect',
                    // });
                });

                // 산출물 table
                this_instance.outputTable = new Tabulator ('#taskOutputList .detail_table', {
                    layout:'fitColumns',
                    // pagination: "remote",
                    // paginationSize:50,
                    // ajaxSorting: !0,
                    height: 310,
                    placeholder:"조회된 데이터가 없습니다.",
                    index: "SEQ",
                    cellHozAlign: 'center',
                    cellVertAlign:"middle",
                    //selectable:true,

                    columns: [
                        // { title: "프로젝트번호", field: "DOC_CD", width:90, headerSort:false},
                        { title: "종류", field: "GUBUN", headerSort:false, width:50, formatter:outputGubunBadge4Tabulator},
                        { title: "제목", field: "TITLE", headerSort:false, width: 300,
                            editor: this_instance.commonBizOutput.outputCommentInputEditor(),
                            editable:false,
                            cellDblClick: function(e, cell){
                                cell.edit(true);
                            }
                        },
                        { title: "산출물", field: "CONTENTS", headerSort:false,/* align:'left',*/
                            formatter: function(cell){
                                let rowData = cell.getData();
                                let gubunAsNum = Number(rowData.GUBUN);
                                let CONTENTS = rowData.CONTENTS || "";
                                if(gubunAsNum == 1){
                                    return this_instance.commonBizOutput.makeFileUploadButton(cell);
                                }
                                let escapeRegex = CONTENTS.replaceAll('\\','\\\\');
                                if(gubunAsNum == 2){
                                    // return `${rowData.LINK}&nbsp;&nbsp;<i class="material-icons" onclick="copy2Clipboard('${escapeRegex}')" style="font-size: 13px;">content_copy</i>`;

                                    return `${CONTENTS}&nbsp;&nbsp;<i class="material-icons" onclick="copy2Clipboard('${escapeRegex}')" style="font-size: 13px;">content_copy</i>`;
                                }
                                if(gubunAsNum == 3){
                                    return `
                                    <a href="${CONTENTS}" style="/*color:#0094ff;*/ text-decoration: underline;">${CONTENTS}</a>
                                    &nbsp;&nbsp;<i class="material-icons" onclick="copy2Clipboard('${escapeRegex}')" style="font-size: 13px;">content_copy</i>
                                    `;
                                }
                            },

                            editor:this_instance.commonBizOutput.outputContentsInputEditor(),
                            // editor:'input',
                            editable:false,
                            cellDblClick: function(e, cell){
                                let rowData = cell.getData();
                                let gubunAsNum = Number(rowData.GUBUN);
                                if(gubunAsNum == 1){return;}

                                cell.edit(true);
                            }
                        },
                        // { title: "담당자", field: "MANAGER_NM", headerSort:false, width:100},
                        // { title: "최종수정일", field: "UPDATE_DT", headerSort:false, width:100},
                        // { title: "등록일", field: "CREATE_DT", headerSort:false, width:100},
                        { width:70, headerSort:false,
                            titleFormatter: function(){
                                let this_tabulator = this.table;
                                let $title = $(`
                                    <div>
                                        <div class="title_nm">
                                            <i class="material-icons md-18 btn_row_add">add</i>
                                        </div>
                                        <ul class="title_btn hidden" style="position: absolute; z-index: 999999; width: 57px; top: -15px; padding:0 2px 0 2px; background:#fff; border:1px solid #ddd;">
                                            <li class="mat_type" style="padding: 1px 0 1px 0; border: 1px solid #ddd; margin: 2px 0 2px 0; cursor:pointer" data-value="01">${outputGubunBadge(1).outerHTML}</li>
                                            <li class="mat_type" style="padding: 1px 0 1px 0; border: 1px solid #ddd; margin: 2px 0 2px 0; cursor:pointer" data-value="02">${outputGubunBadge(2).outerHTML}</li>
                                            <li class="mat_type" style="padding: 1px 0 1px 0; border: 1px solid #ddd; margin: 2px 0 2px 0; cursor:pointer" data-value="03">${outputGubunBadge(3).outerHTML}</li>
                                        </div>
                                    </div>
                                `);

                                $title.on('mouseover', function(e){
                                    $(this).find('.title_nm').addClass('hidden');
                                    $(this).find('.title_btn').removeClass('hidden');
                                    // $(this).find('.title_btn').val('일괄등록');
                                });

                                $title.on('mouseout', function(e){
                                    $(this).find('.title_btn').addClass('hidden');
                                    $(this).find('.title_nm').removeClass('hidden');
                                });

                                $title.on('click', 'li.mat_type', function(){
                                    let GUBUN_TYPE = $(this).data('value');
                                    // let DOC_CD = page_prop.listTable.getSelectedData()[0].DOC_CD;
                                    // 현재 열려있는 TASK의 ID 값을 가져옵니다. INSERT 모드일 경우에는 TASK ID 값이 없으므로(임시ID) 저장 후 나중에 업데이트해줍니다.
                                    // let mode = this_instance.$taskoutput_modal.find('[name="mode"]').val();
                                    let ITM_CD = this_instance.$taskoutput_modal.find('[name="id"]').val();

                                    this_instance.commonBizOutput.insertOutput({
                                        ITM_CD: ITM_CD,
                                        GUBUN: GUBUN_TYPE
                                    });

                                    return;
                                });

                                return $title[0];
                            },

                            cellClick: function(e, cell){
                                let row = cell.getRow();
                                let rowData = row.getData();

                                if(!confirm('삭제 후 복구가 불가능합니다. 삭제하시겠습니까?')){return;}
                                this_instance.commonBizOutput.deleteOutput(rowData);
                            },

                            formatter: function(cell){
                                return '<i class="material-icons md-18">remove</i>';
                            }
                        },
                    ],
                });
            }
        });

        if(!isNull(page_prop)){page_prop.areaModalTaskOutput = areaModalTaskOutput;}
        this_instance.areaModalTaskOutput = areaModalTaskOutput;

        return Promise.all([areaModalTaskOutput.init()]);
    }

    
    getRootTask(child_id){
        let child_task = gantt.getTask(child_id);
        if(isNull(child_task)){throw new Error('cannot find a task');}
        if(child_task.parent == '0' && child_task.type != 'project'){throw new Error('invalid Root Task');}
        if(child_task.parent == '0' && child_task.type == 'project'){return child_task;} // if child == root

        let parentTasks = [];
        gantt.eachParent(function(parentTask){
            parentTasks.push(parentTask);
        }, child_id);

        return parentTasks[parentTasks.length-1];
    }

    formatting4Server(item){
        if(isNull(item)){return;}
        if(!isNull(item.start_date)){
            item.start_date = moment(item.start_date).format('YYYY-MM-DD');
        }
        if(!isNull(item.end_date)){
            item.end_date = moment(item.end_date).format('YYYY-MM-DD');
        }

      if(!isNull(item.progress)){
            item.progress_per = (item.progress * 100).toFixed(0);
        }
        

      
       

  

    }

    formatting4Gantt(item){
        if(isNull(item)){return;}
        if(!isNull(item.start_date)){
            item.start_date = moment(item.start_date).toDate();
        }

        if(!isNull(item.end_date)){
            let end_date_yyyymmdd = item.end_date.substring(0, 10);
            item.end_date = moment(`${end_date_yyyymmdd} 23:59:59`).toDate();
        }

        if(!isNull(item.progress_per)){
            item.progress = (item.progress_per / 100).toFixed(2);
        }
        


 
        if(item.open_yn == 'Y'){item.open = true;}
        else{item.open = false;}
    }
 
    setLevel(val){
        if(val == 'day') {
            gantt.templates.timeline_cell_class = function (task, date) {
                let classes = '';
                if (date.getDay() == 0 || date.getDay() == 6) {
                    classes += "weekend ";
                }
                //
                // if (strToday4Gantt == date.toDateString()) {
                //     classes += "today ";
                // }

                return classes;
            };
        // }else if(val == 'week'){
        //     let thisWeek = moment().isoWeek();
        //     gantt.templates.timeline_cell_class = function (task, date) {
        //         let classes = '';
        //         if (thisWeek == moment(date).isoWeek()) {
        //             classes += "today ";
        //         }
        //
        //         return classes;
        //     };
        // }else if(val == 'month'){
        //     let thisYear = new Date().getFullYear();
        //     let thisMon = new Date().getMonth();
        //     gantt.templates.timeline_cell_class = function (task, date) {
        //         let classes = '';
        //         if (thisMon == date.getMonth() && thisYear == date.getFullYear()) {
        //             classes += "today ";
        //         }
        //
        //         return classes;
        //     };
        // }else if(val == 'quarter'){
        //     let thisYear = new Date().getFullYear();
        //     let thisQ = Math.floor((new Date().getMonth() + 3) / 3);
        //     gantt.templates.timeline_cell_class = function (task, date) {
        //         let classes = '';
        //         if (thisQ == Math.floor((date.getMonth() + 3) / 3) && thisYear == date.getFullYear()) {
        //             classes += "today ";
        //         }
        //
        //         return classes;
        //     };
        }else{
            gantt.templates.timeline_cell_class = function(){return ""};
        }
        gantt.ext.zoom.setLevel(val);
    }

    getUserListAll(){
        return new Promise((resolve, reject) => {
            $.ajax({
                type : "POST",
                url  : window.location.pathname,
                dataType: "json",
                data : {
                    task: "select",
                    mode: "userListAll",
                    data: {
                    }
                }
            }).done(function(data){
	  
                // if(getAjaxResultCodeType(data) == 'E'){ reject("resultcode error"); return; }
                // if(data.data == null){reject("데이터가 없습니다."); return;}
                resolve(data);
             
            }).fail(function(res){
                reject("통신에 문제가 있습니다.");
            });
                
        });
      
    }
   
    
   
}


