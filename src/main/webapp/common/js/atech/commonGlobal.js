'use strict';

/** 
 * @module commonGlobal 
 * @description 해당 프로젝트에서 공통적으로 사용되는 함수, 필드 선언 및 사용.(commonUtil은 프로젝트에 상관없이 공통적인 것들)
 * */

/* DATA */
let global_props = {};
let global_data = {};
global_props.dropzone = {};
global_props.dropzone.maxFilesize = 500; // mb
// global_props.dropzone.acceptedFiles = "image/*,application/pdf,.doc,.docx,.hwp,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf";

{
    global_props.tabulator = {};
    global_props.tabulator.config = {};
    global_props.tabulator.config.height1of1 = "671px";
    global_props.tabulator.config.height1of2 = "300px";
    global_props.tabulator.config.height2of2 = "250px";
    let prop_css = {};
    prop_css = {};
    prop_css._100vh = window.innerHeight;
    prop_css.nav_height = 50;
    prop_css.title_height = 36;
    prop_css.content_sec_margin_height = 15;
    prop_css.content_search_height = 67;
    prop_css.content_header_height = 34;
    prop_css.content_gantt_search_height = 33;
    prop_css.contents_height =
        window.innerHeight -
        prop_css.nav_height -
        prop_css.title_height -
        prop_css.content_search_height -
        prop_css.content_sec_margin_height -
        prop_css.content_header_height;
    prop_css.gantt_height = prop_css.contents_height - prop_css.content_gantt_search_height;
    prop_css.tbltr_height1of1 = prop_css.contents_height - 30;
    prop_css.tbltr_height1of2 = (Number(prop_css.contents_height) / 2) - 75;
    global_props.css = prop_css;
}


function pageCommonInit(){
    /* MODAL - BUTTON[CLOSE] */
	$(document.body).on("click", 'button.btn-close', function(e){
		e.preventDefault();
		let $modal = $(e.target).closest('.modal');
		// let modal_id = $modal.attr('id');
		
		$modal.modal('hide');
	});
	
	/* MODAL - ESC[CLOSE] */
	$(document.body).on('keydown', function(e) {
		if (e.keyCode == 27)	{
			e.preventDefault();
			let $modal = $(e.target).closest('.modal');
			
			$modal.modal('hide');
		}
	});

	/* MODAL - 저장[CTRL + ENTER] */
    let keypressed = {};
    $(document.body).on("keydown", '.modal.show', function(e){
        e = e || event; // to deal with IE
        keypressed[e.keyCode] = true;

        if(keypressed[13] && keypressed[17]){
            // 1. .modal.show 안에서
            // 2. 17(control) + 13(enter) 을 동시에 눌렀을 때

            // 3. 해당 모달의 save 버튼을 누르게 합니다.
            $(this).find('.btn-save').eq(0).trigger('click');

            // 4. 누른 후에는 모달이 꺼지게 되므로 이후 13과 17에 대해 keydown 이벤트가 발생해도 keypressed 값이 업데이트 되지 않습니다.
            //    따라서 직접 키 해제시켜줍니다.
            keypressed[13] = false;
            keypressed[17] = false;
        }

    });
    $(document.body).on("keyup", '.modal.show', function(e){
        e = e || event; // to deal with IE
        keypressed[e.keyCode] = false;
    });

	/* MODAL - DRAGGABLE */
	let modal_list = $(document.body).find('.modal');
	if(modal_list.length > 0){
		modal_list.each(function(){
			/* 닫히는옵션 FALSE */
			if($(this).attr("id") != "pdfEmbedViewer"){
				$(this).attr('data-backdrop', 'static');
				$(this).attr('data-keyboard', 'false');
				
				/* DRAGGABLE */
				$(this).find('.modal-content').draggable({
					handle: ".modal-header"
				});
			}
		});
	}
	
	/* DATEPICKER */
    datePicker();
    dateTimePicker();

    /* INPUT AUTOCOMPLETE DIABLE */
    $('input').attr('autocomplete', 'off');
    
    /* SEARCH */
    $('.btn_search_detail').on('click', function(e){
		e.preventDefault();
		
		$(this).closest('.page_content').find('.search_area').toggleClass('on');
		$(this).closest('.page_content').find('.search_area').hasClass('on') ? $(this).text('상세검색 -') : $(this).text('상세검색 +');
	});

    /* DOWNLOAD BUTTON */
    $('body').on('click', '[data-btn-download]', function(){
        let FILE_SEQ = $(this).val();
        if(isNullOrBlank(FILE_SEQ)){
            FILE_SEQ = $(this).data('value');
        }

        window.location.href = `${window.location.pathname}?task=select&mode=download&FILE_SEQ=${FILE_SEQ}`;
    });
    
    searchBtn();
    $(window).resize(function(){
    	searchBtn();
    });

    /* Permissions button */
	if(update_y == 'N'){
		$('.button_area .btn_proc_group').addClass("hidden");
		$('.button_area').css({'opacity':'1'});
        //$('.button_area button').attr('disabled',true);
	}else{
		$('.button_area .btn_proc_group').removeClass("hidden");
		$('.button_area').css({'opacity':'1'});
        //$('.button_area button').attr('disabled',false);
	}
}

/* ajax */
function docAjax(task, data_json, func_done, func_error, func_fail){
    let req_data = {}
    if(task == 'insert'){
        req_data.task = 'proc';
        req_data.mode = 'insert';
    }else if(task == 'update'){
        req_data.task = 'proc';
        req_data.mode = 'update';
    }else if(task == 'delete'){
        req_data.task = 'proc';
        req_data.mode = 'delete';
    }else if(task == 'select'){
        req_data.task = 'select';
        req_data.mode = 'doc';
    }else{
        throw new Error('invalid param[task]');
    }
    
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : $.extends(req_data, data_json)
    }).done(function(data){
        if(data.resultCode == ""){
            if(isFunc(func_done)){func_done(data);}
        }else{
            if(isFunc(func_error)){func_error(data);}
        }
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        if(isFunc(func_fail)){func_fail(data);}
    });
}

/* tabulator */
const ajaxConfig = {
	method:"get",
	headers: {
		'Cache-Control': 'no-cache',
		'Pragma' : 'no-cache',
		'Expires': '0',
		// "Content-type": 'application/x-www-form-urlencoded; charset=UTF-8',
	},
};

/* tabulator -> select row -> show view */
function selectRow(){

}

/* form 검증 */
function nullValid(formData,errors) {
    let checkValue = true;

    errors.forEach(ele => {
        ele.success = formData[ele.id];

        if(ele.id === 'user_pass2') {
            let passChk = formData.user_pass === formData.user_pass2;
            ele.success = passChk;
        }
    })

    errors.forEach(ele => {
        if(!ele.success) {
            checkValue = false;
            const msg_div = $(`.error-box[data-key="${ele.id}"]`)
                .find('.error-msg');
            msg_div.text(ele.msg);
        }
    })

    return checkValue;
}

/* 솔루션 이미지 정보 반환 */
function getSolutionImage(solution_id) {
    let imageList = [];
    let contextPath = '/common/images/solution';

    if(solution_id === '1') {
        imageList = [
            {path: `${contextPath}/SHT_1/1_수주관리.png`,tag: `수주관리`},
            {path: `${contextPath}/SHT_1/2_생산계획.png`,tag: `생산계획`},
            {path: `${contextPath}/SHT_1/3_자재소요량산출.png`,tag: `자재소요량산충`},
            {path: `${contextPath}/SHT_1/4_작업지시.png`,tag: `작업지시`},
            {path: `${contextPath}/SHT_1/5_작업실적.png`,tag: `작업실적`},
            {path: `${contextPath}/SHT_1/6_계획대비실적.png`,tag: `계획대비실적`},
            {path: `${contextPath}/SHT_1/7_BOM현황.png`,tag: `BOM현황`},
        ]

    } else if(solution_id === '2') {
        imageList = [
            {path: `${contextPath}/KPNC_2/1_BOM관리.png`,tag: `BOM관리`},
            {path: `${contextPath}/KPNC_2/2_대시보드.png`,tag: `대시보드`},
            {path: `${contextPath}/KPNC_2/3_자재현황.png`,tag: `자재현황`},
            {path: `${contextPath}/KPNC_2/4_작업지시.png`,tag: `작업지시`},
            {path: `${contextPath}/KPNC_2/5_프로젝트현황.png`,tag: `프로젝트현황`},
        ]

    } else if(solution_id === '3') {
        imageList = [
            {path: `${contextPath}/HSG_3/1_작업지시.png`,tag: `작업지시`},
            {path: `${contextPath}/HSG_3/2_생산정보.png`,tag: `생산정보`},
            {path: `${contextPath}/HSG_3/3_생산완료정보.png`,tag: `생산완료정보`},
            {path: `${contextPath}/HSG_3/4_설비유지보수.png`,tag: `설비유지보수`},
            {path: `${contextPath}/HSG_3/5_모니터링.png`,tag: `모니터링`},
        ]
    }

    return imageList;
}

/* modal */
function openModal($modal){
    $modal.attr('class','modal openModal');
}

function closeModalHtml(event){
    event.target.closest('.modal').className = 'modal';
}

function closeModal($modal){
    $modal.attr('class','modal');
}

function clearModal($modal){
    // if $modal == not modal 
    $modal.find('.modalform')[0].reset();
}

function clearForm($form){
    $form[0].reset();
}

function openViewModal($modal) {
	let url = new URL(window.location.href);
	let DOC_CD = url.searchParams.get('DOC_CD');
	if(isNull(DOC_CD)) {return;}
	
	if(g_isMobile == "true"){ 
		getDocumentAtMobile(DOC_CD, page_prop.mobileTbl);
	}else{
		$modal.trigger('click', {DOC_CD : DOC_CD});
	}
}

function writeModalOpen($modal){
	//dwkim 210812
	if(update_y == "N"){ return showToastW("등록 권한이 없습니다."); }
	
    // if $modal == not modal 
    clearModal($modal);
	
    $modal.find('[name="task"]').val('proc');
    $modal.find('[name="mode"]').val('insert');
    $modal.find('.btn-remove').addClass('hidden');

    // custom data-attr setting
    $modal.find('[data-writeonly]').each(function(idx){
        $(this).attr('disabled', false);
    });
    $modal.find('input[data-writeonly]').each(function(idx){
        $(this).removeAttr('readonly');
    })
    
    $modal.find('input, select, textarea').prop('disabled', false);

    // validation func init
    valid.initValidElem($modal);

    $modal.modal('show');
}

function updateModalOpen($modal){
	//dwkim 210812
	if(update_y == "N"){ return showToastW("수정 권한이 없습니다."); }

    // if $modal == not modal 
    $modal.find('.modalform')[0].reset();
    $modal.find('[name="task"]').val('proc');
    $modal.find('[name="mode"]').val('update');
    $modal.find('.btn-remove').removeClass('hidden');

    // custom data-attr setting
    $modal.find('button[data-writeonly]').each(function(idx){
        $(this).attr('disabled', true);
    });
    $modal.find('input[data-writeonly]').each(function(idx){
        $(this).attr('readonly', true);
    })

    // validation func init
    valid.initValidElem($modal);

    $modal.modal('show');
}

function deleteModalOpen($modal){
    // if $modal == not modal 
    $modal.find('.modalform')[0].reset();
    $modal.find('[name="task"]').val('proc');
    $modal.find('[name="mode"]').val('delete');
    $modal.find('.btn-remove').removeClass('hidden');

    // custom data-attr setting
    $modal.find('button[data-writeonly]').each(function(idx){
        $(this).attr('disabled', true);
    });
    $modal.find('input[data-writeonly]').each(function(idx){
        $(this).attr('readonly', true);
    })

    // validation func init
    valid.initValidElem($modal);

    $modal.modal('show');
}

/*
 * 일반 사용자일 경우 작성자가 본인일 경우에만 수정, 삭제 가능
 * 관리자일 경우 모든 문서 수정, 삭제 가능
 */
/* 개인 */
function checkOwnModal(object, $modal){
	let o = object;
	if(g_admin == "N"){
		if(o.CREATE_ID == g_uid){ 
			$modal.find('.btn-save, .btn-remove').removeClass("hidden");
			$modal.find('input, select, textarea').prop('disabled', false);
		}else{ 
			$modal.find('.btn-save, .btn-remove').addClass("hidden");
			$modal.find('input, select, textarea').prop('disabled', true);
		}
	}else{
		$modal.find('.btn-save, .btn-remove').removeClass("hidden");
		$modal.find('input, select, textarea').prop('disabled', false);
	}
}
/* 그룹 */
function checkOwnGroupModal(object, $modal){
	let o = object;
	if(g_admin == "N"){
		if(o.DEPT_CD == g_dept){ 
			$modal.find('.btn-save, .btn-remove').removeClass("hidden");
			$modal.find('input, select, textarea').prop('disabled', false);
		}else{ 
			$modal.find('.btn-save, .btn-remove').addClass("hidden");
			$modal.find('input, select, textarea').prop('disabled', true);
		}
	}else{
		$modal.find('.btn-save, .btn-remove').removeClass("hidden");
		$modal.find('input, select, textarea').prop('disabled', false);
	}
}

function saveDoc(param){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : param.req_data
    }).done(function(data){
        showToastFromAjax(data);
        
        if(data.resultCode.substring(0,1) == "E"){
            if(isFunc(param.error)){param.error(data);}
        }else{
            if(isFunc(param.done)){param.done(data);}
        }
    }).fail(function(data){
        // showToastE("통신에 문제가 있습니다.");
        showToastE("통신에 문제가 있습니다.");
        if(isFunc(param.fail)){param.fail(data);}
    });
}

function searchBtn(){
	if($('.search_wrap ul').height() > '35'){
		$('.btn_search_detail').addClass('active');
		$('.cont_search').removeClass('mb20');
    }else{
    	$('.btn_search_detail').removeClass('active');
    	$('.cont_search').addClass('mb20');
    }
}

function printDoc($modal){
	let _CSS = "common/css/additional/printDoc.css";
	let $body = $modal.find('div.modal-body');
	
	$('btn-print').hide();
	
	$body.printThis({
		importCSS: true,
		loadCSS: _CSS,
		base: false,
		formValues: true,
		header: false,
	});
	
	setTimeout(function() {
		$('.btn-print').show();
	}, 2000);
}

/**
 * @function
 * @description console.trace() 대체
 * @param {Tabulator} tbltr Tabulator 객체
 * @param {String} IDX_COL_NM IDX(SEQ)에 해당하는 컬럼(필드)명
 * @example
 * let tabulator1 = new Tabulator({
 *     ...
 *     columns:[
 *         {title:"정렬순서", field:"SEQ", ...}
 *     ]
 * });
 * resetTabulatorSEQ(tabulator1, "SEQ")
 */
function resetTabulatorSEQ(tbltr, IDX_COL_NM){
    let list_row = tbltr.getRows();
    if(list_row.length == null) {return;}

    list_row.forEach(function(row, idx){
        let UPDATE_IDX_COL = {};
        UPDATE_IDX_COL[IDX_COL_NM] = (Number(idx) + 1);
        row.update(UPDATE_IDX_COL);
    });
}

/**
 * @function
 * @param {Array} partlist 그냥 파트리스트
 * @returns {Array} hierarchy 파트리스트
 * @description 그냥 파트리스트 -> hierarchy 파트리스트
 */
function partlist2hierarchy4tabulator(partlist){
    let datalist = partlist;

    if(isNull(datalist) || datalist.length == 0){
        return datalist;
    }

    // 1. sort by PART_NO_SPLIT LENGTH
    let datalist_copy = JSON.parse(JSON.stringify(datalist));
    datalist_copy.sort((a, b) => {
        let a_PART_NO_split = a.PART_NO.split('-');
        let b_PART_NO_split = b.PART_NO.split('-');

        // PARTNO 레벨 비교
        if(a_PART_NO_split.length > b_PART_NO_split.length){return 1;}
        if(a_PART_NO_split.length < b_PART_NO_split.length){return -1;}
        
        // 같은 레벨일 경우
        let compare_result = 0;
        a_PART_NO_split.some(function(a_no, level){
            a_no = Number(a_no);
            let b_no = Number(b_PART_NO_split[level]);
            if(a_no > b_no){compare_result = 1; return true;}
            if(a_no < b_no){compare_result = -1; return true;}
        });

        return compare_result;
        // return (a.PART_NO.split('-').length > b.PART_NO.split('-').length) ? 1 : -1
    });
    
    // 2.pop() -> insert parent
    let total_count = datalist_copy.length;
    for(let idx = 0; idx < total_count; idx++){
        let dataitem = datalist_copy.pop();
        let PART_NO = dataitem.PART_NO;
        let PART_NO_PARENT = PART_NO.split('-');
        PART_NO_PARENT.pop();
        PART_NO_PARENT = PART_NO_PARENT.join('-');

        let count_after_pop = datalist_copy.length;
        let inserted = false;
        for(let idx2 = count_after_pop - 1; idx2 >= 0; idx2--){
            let itemForCheckingParent = datalist_copy[idx2];
            if(PART_NO_PARENT != itemForCheckingParent.PART_NO){continue;}
            
            if(isNull(itemForCheckingParent['_children'])){itemForCheckingParent['_children'] = []}
            itemForCheckingParent['_children'].unshift(dataitem);
            inserted = true;
            break;
        }

        if(inserted == false){datalist_copy.unshift(dataitem);}
    }

    // 3. sort <- ? 왜이렇게넣었는지 기억필요
    // datalist_copy.sort((a, b) => (a.PART_NO > b.PART_NO) ? 1 : -1);

    // 4. insert all into PART_NO=0(=완제품)
    let idx_partno_0 = datalist_copy.findIndex((item) => item.PART_NO == 0);
    if(idx_partno_0 != -1){
        let partno_0 = datalist_copy.splice(idx_partno_0, 1)[0];
        partno_0['_children'] = datalist_copy;
        return [partno_0];
    }

    return datalist_copy;
}

/**
 * @function
 * @param {Array} hierarchy 파트리스트
 * @returns {Array} partlist 그냥 파트리스트
 * @description hierarchy 파트리스트 -> 그냥 파트리스트
 */
function hierarchy2partlist4tabulator(hierarchyPartlist){
    let datalist = hierarchyPartlist;
    if(isNull(datalist) || datalist.length == 0){return datalist;}

    // if _children exist -> recursive
    let partlist = [];
    datalist.forEach(function(data){
        // 1. 부모 처리
        let parent_copy = JSON.parse(JSON.stringify(data));
        delete parent_copy['_children'];
        partlist.push(parent_copy);

        // 2. 자식 처리
        if(isNull(data._children)) {return;} // == continue;
        let children2partlist = hierarchy2partlist4tabulator(data._children);
        partlist = partlist.concat(children2partlist);
    });

    return partlist;
}

/**
 * @function
 * @param {Object} searchInfoObj 검색어
 * @param {Array} hierarchyPartlist 파트리스트
 * @description hierarchy 데이터에서 아이템 찾기
 * @example
 * MAT_CD가 BO-2101-0002_10인 PART를 찾고싶다 
 * -> findPartFromHierarchyPartlist({MAT_CD: "BO-2101-0002_10"}, hierarchyPartlist);
 */
function findPartFromHierarchyPartlist(searchInfoObj, hierarchyPartlist){
    // 1. param 검사
    if(isNull(searchInfoObj) || isNull(Object.keys(searchInfoObj))){
        throw new Error('Invalid searchInfo parameter');
    }
    let key_length = Object.keys(searchInfoObj).length;
    if(key_length > 1){
        throw new Error(`key length:${key_length}, excepted length: 1`);
    }

    // 2. hierarchyPartlist 로부터 아이템 찾기
    let result = null;
    let key = Object.keys(searchInfoObj)[0];
    if(isNull(hierarchyPartlist) || hierarchyPartlist.length == 0){return null;}
    hierarchyPartlist.some(function(part){
        // 2-1. 비교
        if(part[key] == searchInfoObj[key]){
            result = part;
            return true;
        }

        // 2-2. 자식들 비교
        if(!isNull(part['_children']) && part['_children'].length > 0){
            result = findPartFromHierarchyPartlist(searchInfoObj, part['_children']);
            if(!isNull(result)){return true;}
        }
    });

    return result;
}

/**
 * @function
 * @param {Object} searchInfoObj 검색어
 * @param {Array} hierarchyPartlist 파트리스트
 * @description hierarchy tabulator row에서 아이템 찾기
 * @example
 * PART_CD가 BO-2101-0002_10인 PART를 찾고싶다 
 * -> findPartFromHierarchyTabulatorPartlist({MAT_CD: "BO-2101-0002_10"}, tabulatorExample.getRows());
 */
function findPartFromHierarchyTabulatorPartlist(searchInfoObj, hierarchyPartlist){
    // 1. param 검사
    if(isNull(searchInfoObj) || isNull(Object.keys(searchInfoObj) || Object.keys(searchInfoObj).length <= 0)){
        throw new Error('Invalid searchInfo parameter');
    }

    // 1-1. key는 1개만 가능 => 여러개 가능하도록 주석처리 및 하단 코드 일부 수정(21.04.09)
    // let key_length = Object.keys(searchInfoObj).length;
    // if(key_length > 1){
    //     throw new Error(`key length:${key_length}, excepted length: 1`);
    // }

    // 2. hierarchyPartlist 로부터 아이템 찾기
    let result = null;
    let keys = Object.keys(searchInfoObj);
    if(isNull(hierarchyPartlist) || hierarchyPartlist.length == 0){return null;}
    hierarchyPartlist.some(function(part){
        // 2-1. 비교
        let findout = true;
        keys.forEach(function(key){
            if(part.getData()[key] != searchInfoObj[key]){
                findout = false;
            }
        });

        if(findout == true){
            result = part;
            return true;
        }

        // 2-2. 자식들 비교
        let children = part.getTreeChildren();
        if(!isNull(children) && children.length > 0){
            result = findPartFromHierarchyTabulatorPartlist(searchInfoObj, children);
            if(!isNull(result)){return true;}
        }
    });

    return result;
}

function getHierachyTabulatorAllChildList(hierarchyPart){
    let result = hierarchy2partlist4tabulator([hierarchyPart]);
    return result;
}

/**
 * @function
 * @param {Object} searchInfoObj 검색어
 * @param {Array} list 리스트
 * @description selected item 찾기 대작전
 * @example
 * 이전 select했던 item을 무지하게 찾고싶다.
 * -> findSelectedRowList({MAT_CD: "BO-2101-0002_10"}, rows);
 */

function findSelectedRowList(searchInfoObj, list){
    // 1. param 검사
    if(isNull(searchInfoObj) || isNull(Object.keys(searchInfoObj))){
        throw new Error('Invalid searchInfo parameter');
    }
    let key_length = Object.keys(searchInfoObj).length;
    if(key_length > 1){
        throw new Error(`key length:${key_length}, excepted length: 1`);
    }

    // 2. list 로부터 아이템 찾기
    let result = null;
    let key = Object.keys(searchInfoObj)[0];
    if(isNull(list) || list.length == 0){return null;}
    list.some(function(part){
        // 2-1. 비교
        if(part.getData()[key] == searchInfoObj[key]){
            result = part;
            return true;
        }
    });
    
    return result;
}

/**
 * @function
 * @return {Node}
 * @description
 * 페이지 records element id: #listTablePageCount
 * 페이지 records element id: #listTableTotalCount
 */
function makeTabulatorCounterElem(){
    return $footerCounter.clone(true)[0];
}
const $footerCounter = $(`
<div class="tabulator-footer">
    <div class="f_left" style="padding-top:4px; font-weight:normal;">
        <span></span><span id="listTablePageCount"></span><span> [ total: </span><span id="listTableTotalCount"></span><span> ]</span>
    </div>
</div>
`);

/**
 * @function
 * @param {String} val MAT_TYPE(=PART_TYPE) 값. 1, 2, 3, 4
 * 
 */
const $importanceTypeBadge0 = $('<span class="material-icons f_navy">star_border</span>');
const $importanceTypeBadge1 = $('<span class="material-icons f_navy">star_border</span>');
const $importanceTypeBadge2 = $('<span class="material-icons f_navy">star</span>');
const $importanceTypeBadge3 = $('<span class="material-icons f_navy">hotel_class</span>');
const $importanceTypeBadgeEtc = $('<span class="badge badge-light">-</span>');
// function importanceBadge(val){
//     if(Number(val) == 0){return $importanceTypeBadge0.clone('true')[0];}
//     if(Number(val) == 1){return $importanceTypeBadge1.clone('true')[0];}
//     if(Number(val) == 2){return $importanceTypeBadge2.clone('true')[0];}
//     if(Number(val) == 3){return $importanceTypeBadge3.clone('true')[0];}
//     return $importanceTypeBadgeEtc.clone('true')[0];
// }
// function importanceBadge4Tabulator(cell){
//     return itemImportanceBadge(cell.getValue());
// }
//--------------------
const $itemApprovalBadge1 = $('<span class="badge badge-l-green">Y</span>');
const $itemApprovalBadge2 = $('<span class="badge badge-light">N</span>');
const $itemApprovalEtc = $('<span class="badge badge-light">-</span>'); 
function itemApprovalBadge(val){
    if(val == 'Y'){return $itemApprovalBadge1.clone('true')[0];}
    if(val == 'N'){return $itemApprovalBadge2.clone('true')[0];} 
    

    return $itemApprovalEtc.clone('true')[0];
}
function itemApprovalBadge4Tabulator(cell){ 
    return itemApprovalBadge(cell.getValue()); 
}
//--------------------




//--------------------
const $itemImportanceBadge1 = $('<span class="badge badge-l-green">승인</span>');
const $itemImportanceBadge2 = $('<span class="badge badge-light">미승인</span>');
const $itemImportanceBadge3 = $('<span class="badge badge-light">승인중</span>');
const $itemImportanceBadge4 = $('<span class="badge badge-light">대기</span>');
const $itemImportanceBadgeEtc = $('<span class="badge badge-light">-</span>');
function itemImportanceBadge(val){
    if(Number(val) == 1){return $itemImportanceBadge1.clone('true')[0];}
    if(Number(val) == 2){return $itemImportanceBadge2.clone('true')[0];} 
    if(Number(val) == 3){return $itemImportanceBadge3.clone('true')[0];}
    if(Number(val) == 0){return $itemImportanceBadge4.clone('true')[0];}

    return $itemImportanceBadgeEtc.clone('true')[0];
}
function itemImportanceBadge4Tabulator(cell){ 
    return itemImportanceBadge(cell.getValue());
}
//--------------------

const $itemStatusBadge1 = $('<span class="badge badge-light">대기</span>');
const $itemStatusBadge2 = $('<span class="badge badge-l-grey">진행</span>');
const $itemStatusBadge3 = $('<span class="badge badge-l-green">완료</span>');
const $itemStatusBadge4 = $('<span class="badge badge-l-yellow">중지</span>');
const $itemStatusBadge5 = $('<span class="badge badge-l-red">취소</span>');
const $itemStatusBadgeEtc = $('<span class="badge badge-light">알수없음</span>');
function itemStatusBadge(val){
    if(Number(val) == 1){return $itemStatusBadge1.clone('true')[0];}
    if(Number(val) == 2){return $itemStatusBadge2.clone('true')[0];}
    if(Number(val) == 3){return $itemStatusBadge3.clone('true')[0];}
    if(Number(val) == 4){return $itemStatusBadge4.clone('true')[0];}
    if(Number(val) == 5){return $itemStatusBadge5.clone('true')[0];}
    return $itemStatusBadgeEtc.clone('true')[0];
}
function itemStatusBadge4Tabulator(cell){
    return itemStatusBadge(cell.getValue());
}

const $outputGubunBadge1 = $('<span class="badge badge-l-blue">파일</span>');
const $outputGubunBadge2 = $('<span class="badge badge-light">NAS</span>');
const $outputGubunBadge3 = $('<span class="badge badge-l-grey">URL</span>');
const $outputGubunBadgeEtc = $('<span class="badge badge-light">알수없음</span>');
function outputGubunBadge(val){
    if(Number(val) == 1){return $outputGubunBadge1.clone('true')[0];}
    if(Number(val) == 2){return $outputGubunBadge2.clone('true')[0];}
    if(Number(val) == 3){return $outputGubunBadge3.clone('true')[0];}
    return $outputGubunBadgeEtc.clone('true')[0];
}
function outputGubunBadge4Tabulator(cell){
    return outputGubunBadge(cell.getValue());
}

function makeGroupBadge(val){
    if(val == '01'){return "badge big badge-danger";}
    if(val == '02'){return "badge big badge-danger";}
    if(val == '03'){return "badge big badge-orange";}
    if(val == '04'){return "badge big badge-warning";}
    if(val == '05'){return "badge big badge-success2";}
    if(val == '06'){return "badge big badge-primary";}
    if(val == '07'){return "badge big badge-secondary";}
    if(val == '08'){return "badge big badge-secondary";}
    if(val == '09'){return "badge big badge-group9";}
    if(val == '10'){return "badge big badge-group10";}
    return "badge big badge-default";
}

function makeBizGroupBadge(val, dept_cd){
	let $bizGroupBadge = $(`<span class="${makeGroupBadge(val)}">${dept_cd ? dept_cd : "-"}</span>`)
	return $bizGroupBadge.clone('true')[0];
}
const $bizGroupBadge1 = $('<span class="badge big badge-danger">★</span>');
const $bizGroupBadge2 = $('<span class="badge big badge-danger">MS</span>');
const $bizGroupBadge3 = $('<span class="badge big badge-orange">BC</span>');
const $bizGroupBadge4 = $('<span class="badge big badge-warning">DP</span>');
const $bizGroupBadge5 = $('<span class="badge big badge-success2">DA</span>');
const $bizGroupBadge6 = $('<span class="badge big badge-primary">AI</span>');
const $bizGroupBadge7 = $('<span class="badge big badge-secondary">SD</span>');
const $bizGroupBadge8 = $('<span class="badge big badge-secondary">PM</span>');
const $bizGroupBadgeETC = $('<span class="badge badge-light">-</span>');

function makeBizTypeBadge(val){
    if(val == '01'){return $bizTypeBadge1.clone('true')[0];}
    if(val == '02'){return $bizTypeBadge2.clone('true')[0];}
    if(val == '03'){return $bizTypeBadge3.clone('true')[0];}
    return $bizTypeBadgeEtc.clone('true')[0];
}
const $bizTypeBadge1 = $('<span class="badge dep2">신규</span>');
const $bizTypeBadge2 = $('<span class="badge dep3">고도화</span>');
const $bizTypeBadge3 = $('<span class="badge dep1">유지보수</span>');
const $bizTypeBadgeEtc = $('<span class="badge badge-light">알수없음</span>');
 
function makeIsCheckedBadge(val){
    if(val == 'Y'){return $isCheckedBadge1.clone('true')[0];}
    if(val == 'N'){return $isCheckedBadge2.clone('true')[0];}
    return $isCheckedBadgeEtc.clone('true')[0];
}
const $isCheckedBadge1 = $('<span class="badge badge-primary2">확인</span>');
const $isCheckedBadge2 = $('<span class="badge badge-secondary">미확인</span>');
const $isCheckedBadgeEtc = $('<span class="badge badge-light">알수없음</span>');

function makeMeetRoomBadge(val){
    if(val == '1'){return "badge big badge-danger";}
    if(val == '2'){return "badge big badge-orange";}
    if(val == '3'){return "badge big badge-warning";}
    return $meetRoomBadgeEtc.clone('true')[0];
}
const $meetRoomBadge1 = $('<span class="badge big badge-primary">대</span>');
const $meetRoomBadge2 = $('<span class="badge big badge-primary">중</span>');
const $meetRoomBadge3 = $('<span class="badge big badge-primary">소</span>');
const $meetRoomBadgeEtc = $('<span class="badge big badge-light">알수없음</span>');



function makeProdStepBadge(val){
    if(val == '1'){return $prodStepBadge1.clone('true')[0];}
    if(val == '2'){return $prodStepBadge2.clone('true')[0];}
    return $prodStepBadgeEtc.clone('true')[0];
}
const $prodStepBadge1 = $('<span class="badge badge-warning">샘플</span>');
const $prodStepBadge2 = $('<span class="badge badge-primary2">양산</span>');
const $prodStepBadgeEtc = $('<span class="badge badge-light">알수없음</span>');


/* 수금여부 */
function makeCloseYNBadge(val){
    if(val == 'N'){return $closeYNBadge0.clone('true')[0];}
    if(val == 'Y'){return $closeYNBadge1.clone('true')[0];}
    return $closeYNBadgeEtc.clone('true')[0];
}
const $closeYNBadge0 = $('<span class="badge badge-danger">미완료</span>');
const $closeYNBadge1 = $('<span class="badge badge-success">완료</span>');
const $closeYNBadgeEtc = $('<span class="badge badge-light">알수없음</span>');

function makeProcBadge(val, innerfield){
    let $procBadge_clone = $procBadge.clone('true');
    if(isNull(val)){
        $procBadge_clone.addClass('proc_etc');
    }else{
        $procBadge_clone.addClass(`proc${val}`);
        $procBadge_clone.text(innerfield);
    }

    return $procBadge_clone[0];
}
const $procBadge = $('<span class="badge"></span>');

function makeProcDtlBadge(innerfield){
    let $procDtlBadge_clone = $procDtlBadge.clone('true');
    $procDtlBadge_clone.text(innerfield);
    return $procDtlBadge_clone[0];
}
const $procDtlBadge = $('<span class="badge proc_dtl"></span>');

function makeSpecificationStatusBadge(val){
    let val_num = Number(val);
    if(val_num == 1){return $specificationStatusBadge1.clone('true')[0];}
    if(val_num == 2){return $specificationStatusBadge2.clone('true')[0];}
    if(val_num == 3){return $specificationStatusBadge3.clone('true')[0];}
    // if(val_num == 4){return $specificationStatusBadge4.clone('true')[0];}
    return $specificationStatusBadgeEtc.clone('true')[0];
}
const $specificationStatusBadge1 = $('<span class="badge big badge-primary">대기</span>');
const $specificationStatusBadge2 = $('<span class="badge big badge-secondary">미선정</span>');
const $specificationStatusBadge3 = $('<span class="badge big badge-success2">선정</span>');
// const $specificationStatusBadge4 = $('<span class="badge big badge-secondary">미선정</span>');
const $specificationStatusBadgeEtc = $('<span class="badge big badge-light">알수없음</span>');

function makeDocStatusBadge(val){
    if(val == '0'){return $docStatusBadge0.clone('true')[0];}
    if(val == '1'){return $docStatusBadge1.clone('true')[0];}
    if(val == '2'){return $docStatusBadge2.clone('true')[0];}
    if(val == '3'){return $docStatusBadge3.clone('true')[0];}
    return $docStatusBadgeEtc.clone('true')[0];
}
const $docStatusBadge0 = $('<span class="badge big badge-secondary">대기</span>');
const $docStatusBadge1 = $('<span class="badge big badge-primary">진행</span>');
const $docStatusBadge2 = $('<span class="badge big badge-success2">완료</span>');
const $docStatusBadge3 = $('<span class="badge big badge-danger">취소</span>');
const $docStatusBadgeEtc = $('<span class="badge big badge-light">알수없음</span>');

function makeDocRegisterStatusBadge(val){
    if(val == '0'){return $docRegisterStatusBadge0.clone('true')[0];}
    if(val == '1'){return $docRegisterStatusBadge1.clone('true')[0];}
    return $docRegisterStatusBadgeEtc.clone('true')[0];
}
const $docRegisterStatusBadge0 = $('<span class="badge big badge-secondary">대기</span>');
const $docRegisterStatusBadge1 = $('<span class="badge big badge-success2">등록</span>');
const $docRegisterStatusBadgeEtc = $('<span class="badge big badge-light">알수없음</span>');

function makeInspectionTypeBadge(val){
    if(val == '2'){return $inspectionTypeBadge2.clone('true')[0];}
    return $inspectionTypeBadge1.clone('true')[0];
}
const $inspectionTypeBadge1 = $('<span class="badge big badge-secondary">미검사</span>');
const $inspectionTypeBadge2 = $('<span class="badge big badge-success2">검사완료</span>');

function makeMeasureTypeBadge(val){
    if(val == 'Y'){return $measureTypeBadge1.clone('true')[0];}
    return $measureTypeBadge2.clone('true')[0];
}
const $measureTypeBadge1 = $('<span class="badge badge-success"> O </span>');
const $measureTypeBadge2 = $('<span class="badge badge-danger"> X </span>');

//입고상태
function makeWarehousingStatusBadge(val1, val2){
	let val;
	val2 = (typeof(val2) === "undefined") ? "0" : val2;
	
	if(Number(val2) != 0){
		if ( Number(val1) > Number(val2)){ val = 1; }
		else { val = 2; }
	}else{
		val = 0;
	}
	
    if(val == '0'){return $WarehousingStatusBadge0.clone('true')[0];}
    if(val == '1'){return $WarehousingStatusBadge1.clone('true')[0];}
    if(val == '2'){return $WarehousingStatusBadge2.clone('true')[0];}
    return $WarehousingStatusBadgeEtc.clone('true')[0];
}
const $WarehousingStatusBadge0 = $('<span class="badge big badge_circle_red"> </span>');
const $WarehousingStatusBadge1 = $('<span class="badge big badge_circle_orange"> </span>');
const $WarehousingStatusBadge2 = $('<span class="badge big badge_circle_green"> </span>');
const $WarehousingStatusBadgeEtc = $('<span class="badge big badge-light">미확인</span>');


var CommonGlobal = function(){}
/**
 * @function
 * @param {*} $modal 
 * @param {*} elem_nm 
 * @description [for modal]
 * 
 */
CommonGlobal.prototype.setBizImportanceListSelectBox = function($modal, elem_nm){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "bizImportanceList",
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(data.data == null){showToastE("데이터를 가져올 수 없습니다."); return;}
        if(data.data.length == 0){showToastE("데이터가 없습니다."); return;}

        let $target_selectbox = $modal.find(`[name="${elem_nm}"]`);
        data.data.forEach(function(item){
            let $option = $(`<option value="${item.MST2_CD}">${item.MST_NM}</option>`);
            $target_selectbox.append($option);
        });
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        // if(isFunc(func_fail)){func_fail(data);}
    });
}

CommonGlobal.prototype.setBizGubunListSelectBox = function($modal, elem_nm){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "bizGubunList",
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(data.data == null){showToastE("데이터를 가져올 수 없습니다."); return;}
        if(data.data.length == 0){showToastE("데이터가 없습니다."); return;}

        let $target_selectbox = $modal.find(`[name="${elem_nm}"]`);
        data.data.forEach(function(item){
            let $option = $(`<option value="${item.MST2_CD}">${item.MST_NM}</option>`);
            $target_selectbox.append($option);
        });
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        // if(isFunc(func_fail)){func_fail(data);}
    });
}

CommonGlobal.prototype.setBizStatusListSelectBox = function($modal, elem_nm){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "bizStatusList", 
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(data.data == null){showToastE("데이터를 가져올 수 없습니다."); return;}
        if(data.data.length == 0){showToastE("데이터가 없습니다."); return;}

        let $target_selectbox = $modal.find(`[name="${elem_nm}"]`);
        data.data.forEach(function(item){
            let $option = $(`<option value="${item.MST2_CD}">${item.MST_NM}</option>`);
            $target_selectbox.append($option);
        });
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        // if(isFunc(func_fail)){func_fail(data);}
    });
} 




CommonGlobal.prototype.setPriorityListSelectBox = function($modal, elem_nm){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "priorityList",
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(data.data == null){showToastE("데이터를 가져올 수 없습니다."); return;}
        if(data.data.length == 0){showToastE("데이터가 없습니다."); return;}

        let $target_selectbox = $modal.find(`[name="${elem_nm}"]`);
        data.data.forEach(function(item){
            let $option = $(`<option value="${item.MST2_CD}">${item.MST_NM}</option>`);
            $target_selectbox.append($option);
        });
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        // if(isFunc(func_fail)){func_fail(data);}
    });
}

CommonGlobal.prototype.setCurrencyListSelectBox = function($modal, elem_nm){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "currencyList",
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(data.data == null){showToastE("데이터를 가져올 수 없습니다."); return;}
        if(data.data.length == 0){showToastE("데이터가 없습니다."); return;}
        
        let $target_selectbox = $modal.find(`[name="${elem_nm}"]`);
        data.data.forEach(function(item){
            let $option = $(`<option value="${item.MST2_CD}">${item.MST_NM}</option>`);
            $target_selectbox.append($option);
        });
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        // if(isFunc(func_fail)){func_fail(data);}
    });
}

/**
 * @function
 * @param {*} $modal 
 * @param {*} elem_nm 
 * @description [for modal]
 * 
 */
CommonGlobal.prototype.setProc1ListSelectBox = function($modal, elem_nm){
    $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "proc1List",
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(data.data == null){showToastE("데이터를 가져올 수 없습니다."); return;}
        if(data.data.length == 0){showToastE("데이터가 없습니다."); return;}

        let $target_selectbox = $modal.find(`[name="${elem_nm}"]`);
        data.data.forEach(function(item){
            let $option = $(`<option value="${item.PROC1_CD}">${item.PROC_NM}</option>`);
            $target_selectbox.append($option);
        });
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
        // if(isFunc(func_fail)){func_fail(data);}
    });
}

/**
 * @function
 * @param {*} target_elem 
 * @param {*} list_param 
 * @description [for typeahead]
 * 
 */
// CommonGlobal.prototype.getProcessAll = function(){
//     $.ajax({
//         type : "POST",
//         url  : window.location.pathname,
//         dataType: "json",
//         data : {
//             task: "select",
//             mode: "procListAll",
//         }
//     }).done(function(data){
//         page_prop.data_proc_list = [];
//         if(isNull(data)) { return;}
//
//         data.forEach(function(worker){
//             let proc_info = {};
//             proc_info.PROC1_CD = worker.PROC1_CD;
//             proc_info.PROC2_CD = worker.PROC2_CD;
//             proc_info.PROC3_CD = worker.PROC3_CD;
//             proc_info.PROC_SEQ = worker.PROC_SEQ;
//             proc_info.PROC_NM = worker.PROC_NM;
//             proc_info.SORT_SEQ = worker.SORT_SEQ;
//             page_prop.data_proc_list.push(proc_info);
//         });
//
//     }).fail(function(res){
//         showToastE("통신에 문제가 있습니다.");
//         // if(isFunc(func_fail)){func_fail(data_doc);}
//     });
// }

// CommonGlobal.prototype.getWorkerListAll = function(){
//     $.ajax({
//         type : "POST",
//         url  : window.location.pathname,
//         dataType: "json",
//         data : {
//             task: "select",
//             mode: "workerListAll",
//         }
//     }).done(function(data){
//         page_prop.data_worker_list = [];
//         if(isNull(data)) { return;}
//
//         data.forEach(function(worker){
//             let worker_info = {}
//             worker_info.value = worker.WORKER_CD;
//             worker_info.name = worker.WORKER_NM;
//             worker_info.work_kind = null2Blank(worker.WORK_KIND);
//             worker_info.comment = null2Blank(worker.COMMENT);
//             worker_info.avatar = '/common/images/person.jpg';
//             page_prop.data_worker_list.push(worker_info);
//         });
//     }).fail(function(res){
//         showToastE("통신에 문제가 있습니다.");
//         // if(isFunc(func_fail)){func_fail(data_doc);}
//     });
// }

CommonGlobal.prototype.getUserListAll = function(){
    return $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "userListAll",
        }
    });
}

CommonGlobal.prototype.getBizListAll = function(YEAR){
    return $.ajax({
        type : "POST",
        url  : window.location.pathname,
        dataType: "json",
        data : {
            task: "select",
            mode: "bizListAll",
            data: {
                YEAR: YEAR,
            }
        }
    });
}

/**
 * @function
 * @param {*} target_elem 
 * @param {*} list_param 
 * @description [for typeahead] 업체 : 담당자 검색
 * 
 */
CommonGlobal.prototype.initManagerTypeahead = function(target_elem, list_param, itemprop){
    let target_form = target_elem.closest('form');
    if(!isNull(page_prop.in_out)) {
        list_param = $.extend(list_param, {IN_OUT: page_prop.$in_out.val()});
    }
    
    initTypeAhead({
        target_elem:target_elem,
        name:'USER_NM',
        display: 'USER_NM',
        url: window.location.pathname,
        list_param: list_param,
        min_length:0,
        
        suggestion_string: function(data){
            return `<span><strong>${data.USER_NM} ${null2Blank(data.RANK_NM)}</strong>(${null2Blank(data.DEPT_NM)})</span>`
        },
        event_select: function(ev, selected){
            target_form.find(`input[name="${itemprop.code}"]`).val(selected.USER_ID);
            target_form.find(`input[name="${itemprop.code}"]`).trigger('change');
        }
    });
}

/**
 * @function
 * @param {*} cell 
 * @param {*} COL_NM 
 * @param {function(element, cell):boolean} func_before_update - change event 내에서 row update 전 callback. return true -> row update.
 * @description [for tabulator] 
 * 
 */
CommonGlobal.prototype.makeCheckButton = function(cell, COL_NM, func_before_update){
	if(!isNull(cell.getData().IS_CANCEL) && cell.getData().IS_CANCEL == "Y"){ return; }
	
    let value = cell.getData()[COL_NM];
    let $btn_check_clone = $btn_check.clone('true');

    $btn_check_clone.on('change', function(){
        let checked = $btn_check_clone.is(':checked');
        let updated_data = {};
        updated_data[COL_NM] = (checked ? 'Y' : 'N');

        if(isFunc(func_before_update)){
            if(!func_before_update($btn_check_clone, updated_data)) return;
        }
        cell.getRow().update(updated_data);
    });

    if(isNullOrBlank(value) || value == 'N'){
        return $btn_check_clone[0];
    }else{
        $btn_check_clone.prop('checked', true);
        return $btn_check_clone[0];
    }
}
const $btn_check = $(`<input type="checkbox" class="">`);

/**
 * @function
 * @param {*} cell 
 * @param {*} COL_NM 
 * @description [for tabulator]
 * 
 */
CommonGlobal.prototype.makeReadOnlyCheckButton = function(cell, COL_NM){
    let value = cell.getData()[COL_NM];
    let $btn_check_clone = $btn_readonly_check.clone('true');
    $btn_check_clone.on('change', function(){
        let checked = $btn_check_clone.is(':checked');
        let updated_data = {};
        updated_data[COL_NM] = (checked ? 'Y' : 'N');
        cell.getRow().update(updated_data);
    });

    if(isNullOrBlank(value) || value == 'N'){
        return $btn_check_clone[0];
    }else{
        $btn_check_clone.prop('checked', true);
        return $btn_check_clone[0];
    }
}
const $btn_readonly_check = $(`<input type="checkbox" class="" onclick="return false;" disabled="disabled">`);

/**
 * @function
 * @param {*} cell 
 * @param {*} onRendered 
 * @param {*} success 
 * @param {*} cancel 
 * @param {*} editorParams 
 * @description [for tabulator]
 * 
 */
CommonGlobal.prototype.dateEditor = function(cell, onRendered, success, cancel, editorParams){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass the successfuly updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell
    //editorParams - params object passed into the editorParams column definition property

    //create and style editor
    var editor = document.createElement("input");

    editor.setAttribute("type", "date");

    //create and style input
    editor.style.padding = "3px";
    editor.style.width = "100%";
    editor.style.boxSizing = "border-box";

    //Set value of editor to the current value of the cell
    editor.value = moment(cell.getValue(), "DD/MM/YYYY").format("YYYY-MM-DD")

    //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
    onRendered(function(){
        editor.focus();
        editor.style.css = "100%";
    });

    //when the value has been set, trigger the cell to update
    function successFunc(){
        success(moment(editor.value, "YYYY-MM-DD").format("DD/MM/YYYY"));
    }

    editor.addEventListener("change", successFunc);
    editor.addEventListener("blur", successFunc);

    //return the editor element
    return editor;
};

/**
 * @function
 * @param {Cell} cell tabulator Cell object.
 * @description [for tabulator]
 * cell date Formatter. datepicker로 세팅됩니다.
 * tabulator initialize 시 해당 column의 field를 기입해주셔야합니다.
 */
CommonGlobal.prototype.makeFormDate = function(cell){
	if(!isNull(cell.getData().IS_CANCEL) && cell.getData().IS_CANCEL == "Y"){ return; }
	if(!isNull(cell.getData().WORK_STATUS) && cell.getData().WORK_STATUS == "4"){ return; }
	
    let self = this;
    let $input_datepicker = $('<input class="form-control form_date" style="height:20px !important;" readonly/>');
    let row = cell.getRow();
    let fieldName = cell.getField();
    let fieldData = (isNull(cell.getData()[fieldName]) ? '' : cell.getData()[fieldName]);
    $input_datepicker.val(fieldData);

    $input_datepicker.on('change', function(){
        let newData = cell.getData();
        newData[fieldName] = $(this).val();
        row.update(newData);
    });

    let $target_tabulator = $(cell.getTable().element);
    $input_datepicker.datepicker({
        format: "yyyy-mm-dd",
        todayBtn:"linked",
        language: "kr",
        orientation: "top auto",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        todayHighlight: true,
        // container: $target_tabulator.find('.tabulator-tableHolder'),
    });

    // $input_datepicker.on('keydown', function(e){
    //     if(e.keyCode === 13) {
    //         e.stopPropagation();
    //         e.preventDefault();
    
    //         return false;
    //     }
    // });

    return $input_datepicker[0];
}

/**
 * @function
 * @param {Cell} cell tabulator Cell object.
 * @description [for tabulator]
 * cell datetime Formatter. datetimepicker로 세팅됩니다.
 * tabulator initialize 시 해당 column의 field를 기입해주셔야합니다.
 */
CommonGlobal.prototype.makeFormDateTime = function(cell){
    let self = this;
    let $input_datepicker = $('<input class="form-control form_date" style="height:20px !important;" readonly/>');
    let row = cell.getRow();
    let fieldName = cell.getField();
    let fieldData = (isNull(cell.getData()[fieldName]) ? '' : cell.getData()[fieldName]);
    $input_datepicker.val(fieldData);

    $input_datepicker.on('change', function(){
        let newData = cell.getData();
        newData[fieldName] = $(this).val();
        row.update(newData);
    });

    let $target_tabulator = $(cell.getTable().element);
    $input_datepicker.datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
	    todayBtn:"linked",
	    language: "kr",
	    orientation: "top auto",
	    minuteStep: 30,
	    keyboardNavigation: false,
	    forceParse: false,
	    autoclose: true,
        todayHighlight: true,
	    startDate: new moment(),
        container: $target_tabulator.find('.tabulator-tableHolder'),
	});

    return $input_datepicker[0];
}

CommonGlobal.prototype.tabulatorInputEditor = function(cell, onRendered, success, cancel, editorParams) {
    //create and style input
    var cellValue = cell.getValue(),
        input = document.createElement("input");

    input.setAttribute("type", editorParams.search ? "search" : "text");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
        for (var key in editorParams.elementAttributes) {
            if (key.charAt(0) == "+") {
                key = key.slice(1);
                input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
            } else {
                input.setAttribute(key, editorParams.elementAttributes[key]);
            }
        }
    }

    input.value = typeof cellValue !== "undefined" ? cellValue : "";

    onRendered(function () {
        input.focus({ preventScroll: true });
        input.style.height = "100%";
    });

    function onChange(e) {
        if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value !== cellValue) {
            if (success(input.value)) {
                cellValue = input.value; //persist value if successfully validated incase editor is used as header filter
            }
        } else {
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            // case 9:
            case 13:
                onChange(e);
                break;

            case 27:
                cancel();
                break;
        }
    });

    if (editorParams.mask) {
        this.table.modules.edit.maskInput(input, editorParams);
    }

    return input;
}

CommonGlobal.prototype.tabulatorTextareaEditor = function(cell, onRendered, success, cancel, editorParams) {
    var self = this,
        cellValue = cell.getValue(),
        vertNav = editorParams.verticalNavigation || "hybrid",
        value = String(cellValue !== null && typeof cellValue !== "undefined" ? cellValue : ""),
        count = (value.match(/(?:\r\n|\r|\n)/g) || []).length + 1,
        input = document.createElement("textarea"),
        scrollHeight = 0;

    //create and style input
    input.style.display = "block";
    input.style.padding = "2px";
    input.style.height = "100%";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.style.whiteSpace = "pre-wrap";
    input.style.resize = "none";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
        for (var key in editorParams.elementAttributes) {
            if (key.charAt(0) == "+") {
                key = key.slice(1);
                input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
            } else {
                input.setAttribute(key, editorParams.elementAttributes[key]);
            }
        }
    }

    input.value = value;

    onRendered(function () {
        input.focus({ preventScroll: true });
        input.style.height = "100%";
    });

    function onChange(e) {

        if ((cellValue === null || typeof cellValue === "undefined") && input.value !== "" || input.value !== cellValue) {

            if (success(input.value)) {
                cellValue = input.value; //persist value if successfully validated incase editor is used as header filter
            }

            setTimeout(function () {
                cell.getRow().normalizeHeight();
            }, 300);
        } else {
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);

    input.addEventListener("keyup", function () {

        input.style.height = "";

        var heightNow = input.scrollHeight;

        input.style.height = heightNow + "px";

        if (heightNow != scrollHeight) {
            scrollHeight = heightNow;
            cell.getRow().normalizeHeight();
        }
    });

    input.addEventListener("keydown", function (e) {

        switch (e.keyCode) {
            case 27:
                cancel();
                break;

            case 38:
                //up arrow
                if (vertNav == "editor" || vertNav == "hybrid" && input.selectionStart) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }

                break;

            case 40:
                //down arrow
                if (vertNav == "editor" || vertNav == "hybrid" && input.selectionStart !== input.value.length) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }
                break;
        }
    });

    if (editorParams.mask) {
        this.table.modules.edit.maskInput(input, editorParams);
    }

    return input;
}

CommonGlobal.prototype.tabulatorNumberEditor = function(cell, onRendered, success, cancel, editorParams) {

    var cellValue = cell.getValue(),
        vertNav = editorParams.verticalNavigation || "editor",
        input = document.createElement("input");

    input.setAttribute("type", "number");

    if (typeof editorParams.max != "undefined") {
        input.setAttribute("max", editorParams.max);
    }

    if (typeof editorParams.min != "undefined") {
        input.setAttribute("min", editorParams.min);
    }

    if (typeof editorParams.step != "undefined") {
        input.setAttribute("step", editorParams.step);
    }

    //create and style input
    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    if (editorParams.elementAttributes && _typeof(editorParams.elementAttributes) == "object") {
        for (var key in editorParams.elementAttributes) {
            if (key.charAt(0) == "+") {
                key = key.slice(1);
                input.setAttribute(key, input.getAttribute(key) + editorParams.elementAttributes["+" + key]);
            } else {
                input.setAttribute(key, editorParams.elementAttributes[key]);
            }
        }
    }

    input.value = cellValue;

    var blurFunc = function blurFunc(e) {
        onChange();
    };

    onRendered(function () {
        //submit new value on blur
        input.removeEventListener("blur", blurFunc);

        input.focus({ preventScroll: true });
        input.style.height = "100%";

        //submit new value on blur
        input.addEventListener("blur", blurFunc);
    });

    function onChange() {
        var value = input.value;

        if (!isNaN(value) && value !== "") {
            value = Number(value);
        }

        if (value !== cellValue) {
            if (success(value)) {
                cellValue = value; //persist value if successfully validated incase editor is used as header filter
            }
        } else {
            cancel();
        }
    }

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 13:
                // case 9:
                onChange();
                break;

            case 27:
                cancel();
                break;

            case 38: //up arrow
            case 40:
                //down arrow
                if (vertNav == "editor") {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }
                break;
        }
    });

    if (editorParams.mask) {
        this.table.modules.edit.maskInput(input, editorParams);
    }

    return input;
}

CommonGlobal.prototype.outputCommentInputEditor = function(cell, onRendered, success, cancel, editorParams) {
    let prevVal = cell.getValue();
    let column = cell.getColumn();
    let field = column.getField();

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.value = prevVal || "";;

    onRendered(function () {
        input.focus({ preventScroll: true });
        input.style.height = "100%";
    });

    function onChange(e) {
        if (!(isNull(prevVal) && input.value !== "" || input.value !== prevVal)) {cancel(); return;}

        // 1. server update
        let newData = cell.getData();
        if(field == "TITLE"){
        	newData.TITLE = input.value;
        }else{
        	newData.COMMENT = input.value;
        }
        
        updateOutput(newData).done(function(data){
            if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
            if(data.data == null){showToastW("데이터가 없습니다."); return;}

            // 2. tabulator update
            if (success(input.value)) {
                // let updateData = {};
                // updateData[page_prop.GUBUN_MAP[Number(GUBUN)]] = input.value;
                // row.update(updateData);
                prevVal = input.value; //persist value if successfully validated incase editor is used as header filter
            }
        }).fail(function(res){
            showToastE("통신에 문제가 있습니다.");
        });
    }

    //submit new value on blur or change
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            // case 9:
            case 13:
                onChange(e);
                break;

            case 27:
                cancel();
                break;
        }
    });

    if(editorParams.mask){ this.table.modules.edit.maskInput(input, editorParams); }

    return input;
}
CommonGlobal.prototype.outputContentsInputEditor = function(cell, onRendered, success, cancel, editorParams) {
    let prevVal = cell.getValue();

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.value = prevVal || "";

    onRendered(function () {
        input.focus({ preventScroll: true });
        input.style.height = "100%";
    });

    function onChange(e) {
        if (!(isNull(prevVal) && input.value !== "" || input.value !== prevVal)) {cancel(); return;}

        // 1. server update
        let newData = cell.getData();
        newData.CONTENTS = input.value;
        updateOutput(newData).done(function(data){
            if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
            if(data.data == null){showToastW("데이터가 없습니다."); return;}

            // 2. tabulator update
            if (success(input.value)) {
                // let updateData = {};
                // updateData[page_prop.GUBUN_MAP[Number(GUBUN)]] = input.value;
                // row.update(updateData);
                prevVal = input.value; //persist value if successfully validated incase editor is used as header filter
            }
        }).fail(function(res){
            showToastE("통신에 문제가 있습니다.");
        });
    }

    //submit new value on blur or change
    input.addEventListener("change", onChange);
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            // case 9:
            case 13:
                onChange(e);
                break;

            case 27:
                cancel();
                break;
        }
    });

    if (editorParams.mask) {
        this.table.modules.edit.maskInput(input, editorParams);
    }

    return input;
}

let global = new CommonGlobal();