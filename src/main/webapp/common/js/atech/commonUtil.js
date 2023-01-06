/** 
 * @module commonUtil
 * @description Utility function 모음
 * */

/******************************************************************************************
LOG 
******************************************************************************************/
/**
 * @function
 * @description console.log() 대체
 * @param {String} str 문자열
 * @example
 * asdf('안녕하세요');
 * > 안녕하세요
 */
function asdf(str) { console.log(str); }

/**
 * @function
 * @description console.trace() 대체
 * @param {String} str 문자열
 * @example
 * asdff('안녕하세요');
 * // console.trace('안녕하세요'); 와 동일
 */
function asdff(str) { console.trace(str); }


/******************************************************************************************

******************************************************************************************/
/**
 * @function
 * @description null or undefined => ''
 * @param {String} param 문자열
 * @example
 * null2Blank('안녕하세요');
 * > '안녕하세요'
 * null2Blank('');
 * > ''
 * null2Blank(null);
 * > ''
 * null2Blank(undefined);
 * > ''
 */
function null2Blank(param) {
	if (param == null || param == undefined)
		return '';
	return param;
}

/**
 * @function
 * @description null or undefined => true
 * @param {String} param 문자열
 * @example
 * null2Blank('안녕하세요');
 * > false
 * null2Blank('');
 * > false
 * null2Blank(null);
 * > true
 * null2Blank(undefined);
 * > true
 */
function isNull(param) {
	if (param == null || param == undefined)
		return true;
	return false;
}

/**
 * @function
 * @description null or undefined or => true
 * @param {String} param 문자열
 * @example
 * null2Blank('안녕하세요');
 * > false
 * null2Blank('');
 * > true
 * null2Blank(null);
 * > true
 * null2Blank(undefined);
 * > true
 */
function isNullOrBlank(str) {
	if (str === 0) return true;

	if (str == null || str == undefined)
		return true;

	if (str == '')
		return true;

	return false;
}

/**
 * @function
 * @description function => true
 * @param {String} param 문자열
 * @example
 * let testFunc = function(){...}
 * let testVal = 1;
 * isFunc(testFunc)
 * > true
 * isFunc(testVal)
 * > false
 */
function isFunc(func) {
	if (func == null || func == undefined) return false;
	if (typeof func !== "function") return false;
	return true;
}

/**
 * @function
 * @description html(string) -> element
 * @param {String} htmlString html 문자열
 * @example
 * let elem = html2Elem('<div class="test-class test" ><ul id="testID"></ul></div>');
 */
function html2Elem(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}

/**
 * @function
 * @description html(string) -> element
 * @param {Number} num 숫자
 * @param {Number} opt option 1, 2, 3, null
 * @example
 * // opt == 1 : 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
 * // opt == 2 : 부호 미사용, 자릿수구분기호 선택, 소수점 선택
 * // opt == 3 : 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
 * // else : only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
 */
function isNumeric(num, opt) {
	// 좌우 trim(공백제거)을 해준다.
	num = String(num).replace(/^\s+|\s+$/g, "");
	let regex;
	if (typeof opt == "undefined" || opt == "1") {
		// 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
		regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	} else if (opt == "2") {
		// 부호 미사용, 자릿수구분기호 선택, 소수점 선택
		regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
	} else if (opt == "3") {
		// 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
		regex = /^[0-9]+(\.[0-9]+)?$/g;
	} else {
		// only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
		regex = /^[0-9]$/g;
	}

	if (regex.test(num)) {
		num = num.replace(/,/g, "");
		return isNaN(num) ? false : true;
	} else { return false; }
}



/******************************************************************************************
DATE FORMAT
******************************************************************************************/
/* YYYYMMDD -> YYYY-MM-DD */
function date2Hyphen(val) {
	if (null2Blank(val) == '') { return ''; }
	return moment(val).format("YYYY-MM-DD");
}

function yymmdd2Hyphen(val) {
	val = val + "";
	return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
}

/* YYYYMMDD -> YY-MM-DD */
function date2YYMMDDHyphen(val) {
	return moment(val).format("YY-MM-DD");
}

/* DATETIME -> YYYY-MM-DD HH:mm*/
function datetime2Datetime(datetimeVal) {
	let now = moment().format("YYYY-MM-DD");
	let isEmpty = (datetimeVal != null && datetimeVal != "") ? false : true;

	if (!isEmpty) {
		let dt = datetimeVal.split(" ");
		let format = (now == dt[0]) ? "HH:mm:ss" : "YYYY-MM-DD HH:mm";

		return moment(datetimeVal).format(format);
	} else {
		return "-";
	}
}

/* DATETIME -> YYYY-MM-DD */
function datetime2Date(datetimeVal) {
	return moment(datetimeVal).format("YYYY-MM-DD");
}

/* DATETIME -> HH:mm:ss */
function datetime2time(datetimeVal) {
	return moment(datetimeVal).format("HH:mm:ss");
}

/* DATETIME -> YYMMDD */
function datetime2YYMMDD(datetimeVal) {
	return moment(datetimeVal).format("YYMMDD");
}



/******************************************************************************************
NUMBER FORMAT
******************************************************************************************/
/*  */
/**
 * @function
 * @description isInteger Error - solve
 * @param {Number} value Number value
 */
Number.isInteger = Number.isInteger || function (value) {
	return typeof value === "number" &&
		isFinite(value) &&
		Math.floor(value) === value;
};

/* zerofill */
/**
 * @function
 * @description html(string) -> element
 * @param {Number} num 숫자
 * @param {Number} opt option 1, 2, 3, null
 * @example
 * // opt == 1 : 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
 * // opt == 2 : 부호 미사용, 자릿수구분기호 선택, 소수점 선택
 * // opt == 3 : 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
 * // else : only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
 */
function zeroFill(number, width) {
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + "";
}

/**
 * @function
 * @description 숫자 콤마 지우기
 * @param {String || Number} num 콤마 씌운 숫자
 * @example
 * removeComma('100,000,000');
 * > 100000000
 * removeComma(100000000);
 * > 100000000
 */
function removeComma(num) {
	num = String(num);
	return num.replace(/,/gi, "");
}

/**
 * @function
 * @description 숫자에 000 단위 콤마 씌우기
 * @param {Number} num 숫자
 * @example
 * comma(100000000);
 * > '100,000,000'
 */
function comma(num, nullFormatter) {
	if (isNull(nullFormatter)) { nullFormatter = '-'; }
	if (num == null || num == "") { return nullFormatter; }
	num = String(num);
	return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

/**
 * @author thkim
 * @function
 * @description Number.toFixed()는 정확한 반올림이 안되는 이슈가 있음. 해당 함수로 대체
 * @param {Number} value 숫자
 * @param {Number} digit 소수점 자리수
 * @example
 * getRound(24.555, 2);
 * > 24.56
 * Number(24.555).toFixed(2);
 * > 24.55
 */
function getRound(value, digit) {
	return Number(Math.round(value + 'e' + digit) + 'e-' + digit);
}


// 하단 단위는 삭제할지 옮길지 고민중



/* fixed : 원화 */
function priceFixed(value) {
	return (Number(value).toFixed(0));
}

/* fixed : 달러 */
function priceDlrFixed(value) {
	return (Number(value).toFixed(2));
}

/* fixed : 수량 */
function qtyFixed(value) {
	return (Number(value).toFixed(0));
}

/* fixed : 중량 */
function weightFixed(value) {
	return (Number(value).toFixed(2));
}

/* fixed : 길이 */
function lengthFixed(value) {
	return (Number(value).toFixed(0));
}

/* format : 원화 */
function priceFormatter(value) {
	return comma(priceFixed(value));
}

function priceFormatter4Tabulator(cell) {
	return priceFormatter(cell.getValue());
}

/* format : 달러 */
function priceDlrFormatter(value) {
	return comma(priceDlrFixed(value));
}

/* format : 수량 */
function qtyFormatter(value) {
	return comma(qtyFixed(value));
}

/* format : 중량 */
function weightFormatter(value) {
	return comma(weightFixed(value));
}

/* format : 길이 */
function lengthFormatter(value) {
	return lengthFixed(value);
}

// 하단의 함수는 추후 사용될 때 확인 및 일부 수정이 필요함

/////////////////////////////
/*   FUNCTION - TABULATOR  */
/////////////////////////////
/* Tabulator - 결재상태 색상변경 */
function apprStatFormatter(cell) {
	//let field = cell.getField();
	let data = cell.getRow().getData();
	var fontColor;

	switch (data.DOC_STATUS) {
		case '임시저장':
			fontColor = "text-secondary"; break;
		case '결재진행':
			fontColor = "text-primary"; break;
		case '결재완료':
			fontColor = "fc_green"; break;
		case '반려':
			fontColor = "text-danger"; break;
	}
	return "<span class=\"" + fontColor + "\"><b>" + data.DOC_STATUS + "</b></span>";
}


/////////////////////////////
/*     FUNCTION - DOC      */
/////////////////////////////
/* 문서타입 확인 */
function cd2DocType(APRVL_CD) {
	let docType = APRVL_CD.substring(0, 2);
	return docType;
}

/* 문서명 확인 */
function DocNo2DocName(APRVL_CD, DOC_TYPE) {
	let docType = cd2DocType(APRVL_CD);
	return mapDocName[DOC_TYPE][docType];
}

/* 선입력 유도 EVENT */
function leadTypingStepEvent(list_item, $space, init_idx) {
	list_item.some(function (item, idx) {
		let $input_code = $space.find('input[name="' + item.code + '"]');
		let $input_display = $space.find('input[name="' + item.display + '"]');

		if (item.type == 'typeahead') {
			/* CODE 값 변경 시 */
			$input_code.on('change', function (e) {
				let val_code = $(this).val();

				// 값을 선택하기 전까지는 typing 중인것을 표시하기 위한 클래스를 남깁니다.
				if (!isNullOrBlank(val_code)) {
					$input_display.removeClass('typeahead-on-typing');
				}

				// 마지막 elem일 경우
				if (list_item.length == (idx + 1)) return;

				// 하위 elem으로 연쇄
				if (null2Blank(item.pass_next) != '' && item.pass_next == true) {
					if (null2Blank($(this).attr('readonly')) != '') { disableElem(list_item[idx + 1], $space); }
					else { enableElem(list_item[idx + 1], $space); }
				} else if (val_code == '') {
					// 하위 elem 해제
					disableElem(list_item[idx + 1], $space);
				} else if (val_code == '' && item.pass_when_typing_start) {
					//pass. keyup에서 해결합니다.
				} else {
					enableElem(list_item[idx + 1], $space);
				}
			});

			/* DISPLAY 값 입력 시 */
			$input_display.on('keyup', function (e) {
				let val_display = $(this).val();
				if (e.keyCode == 13 || e.keyCode == 9) return false;
				$input_code.val('');
				$input_code.trigger('change');

				// 값을 선택하기 전까지는 typing 중인것을 표시하기 위한 클래스를 남깁니다.
				$(this).addClass('typeahead-on-typing');

				// pass_when_typing_start == true일땐 값하나라도 입력하면 pass
				if (val_display.length > 0 && item.pass_when_typing_start) {
					enableElem(list_item[idx + 1], $space);
				}
			});
		}

		if (item.type == 'input') {
			/* CODE 값 변경 시 */
			$input_code.on('keyup change', function (e) {
				if (list_item.length == (idx + 1)) return;

				// 하위 elem으로 연쇄
				if (null2Blank(item.pass_next) != '' && item.pass_next == true) {
					if (null2Blank($(this).attr('readonly')) != '') { disableElem(list_item[idx + 1], $space); }
					else { enableElem(list_item[idx + 1], $space); }

				} else if ($(this).val() == '') {
					// 하위 elem 해제
					disableElem(list_item[idx + 1], $space);
				} else {
					enableElem(list_item[idx + 1], $space);
				}
			});
		}

		if (item.type == 'select') {
			/* CODE 값 변경 시 */
			$input_code.on('change', function (e) {
				if (list_item.length == (idx + 1)) return;

				// 하위 elem으로 연쇄
				if (null2Blank(item.pass_next) != '' && item.pass_next == true) {
					//
				} else if ($(this).val() == '') {
					// 하위 elem 해제
					disableElem(list_item[idx + 1], $space);
				} else {
					enableElem(list_item[idx + 1], $space);
				}

			});
		}
	});

	/* init 시 값 상관없이 강제로 enable 시킬 input */
	if (isNull(init_idx)) {
		enableElem(list_item[0], $space);
	} else {
		for (let i = 0; i <= init_idx; i++) {
			enableElem(list_item[i], $space);
		}
	}
	// let $last_init_input = $space.find('[name="' + list_item[(isNull(init_idx)? 0 : init_idx)].code + '"]');
	// $last_init_input.trigger('change');
}

function disableElem(item, $space) {
	let $input_code = $space.find('[name="' + item.code + '"]');
	let $input_display = $space.find('[name="' + item.display + '"]');

	if (item.type == 'typeahead') {
		$input_display.val('');
		$input_display.typeahead('destroy');
		if (!isNull(item.placeholder_disable)) $input_display.attr('placeholder', item.placeholder_disable);
		if (!isNull(item.affected_holder) && item.affected_holder == true) $input_display.attr('placeholder', '');
		$input_display.attr('readonly', true);

		$input_code.val('');
		$input_code.trigger('change');
	}

	if (item.type == 'input') {
		if (!isNull(item.placeholder_disable)) $input_display.attr('placeholder', item.placeholder_disable);
		if (!isNull(item.affected_val) && item.affected_val == true) $input_display.val('');
		if (!isNull(item.affected_holder) && item.affected_holder == true) $input_display.attr('placeholder', '');
		$input_display.attr('readonly', true);
		$input_code.trigger('change');
	}

	if (item.type == 'select') {
		$input_display.empty();

		let append_option = '<option';
		append_option += ' value=""';
		append_option += '>';
		append_option += '선택';
		append_option += '</option>';
		$input_display.append(append_option);

		$input_display.addClass('readonly');
		$input_code.trigger('change');
	}
}

function enableElem(item, $space) {
	let $input_code = $space.find('[name="' + item.code + '"]');
	let $input_display = $space.find('[name="' + item.display + '"]');

	if (item.type == 'typeahead') {
		$input_display.attr('readonly', false);
		if (!isNull(item.placeholder)) $input_display.attr('placeholder', item.placeholder);

		let prev_list_input_code = {};
		if (null2Blank(item.func_param_elems) != '' && item.func_param_elems.length != 0) {
			for (const input_name in item.func_param_elems) {
				let value = $space.find('[name="' + item.func_param_elems[input_name] + '"]').val();
				prev_list_input_code[input_name] = value;
			}
		}

		// typeahead init
		item.func_init($input_display, $.extend(item.func_param, prev_list_input_code), item);
		$input_code.trigger('change');
	} else if (item.type == 'input') {
		$input_display.attr('readonly', false);
		if (!isNull(item.placeholder)) $input_display.attr('placeholder', item.placeholder);
		$input_code.trigger('change');

	} else if (item.type == 'select') {
		$input_display.removeClass('readonly');

		// 상위 elem에 따라 바뀌는 경우(func 있음)
		if (null2Blank(item.func_param_elems) != '' && item.func_param_elems.length != 0) {
			let prev_list_input_code = {};
			for (const input_name in item.func_param_elems) {
				let value = $space.find('[name="' + item.func_param_elems[input_name] + '"]').val();
				prev_list_input_code[input_name] = value;
			}

			$input_display.empty();
			item.func_init($input_display, $.extend(item.func_param, prev_list_input_code), item);

			// 고정된 option 값일 경우(func 없음)
		} else {
			//
		}

		$input_code.trigger('change');
	}
}

function initSelect(property) {
	$.ajax({
		type: "POST",
		url: property.url,
		dataType: "json",
		data: property.list_param
	}).done(function (data) {
		let $elem = property.target_elem;
		let append_list = '';

		if (data.length == 0) {
			let append_option = '<option';
			append_option += ' value=""';
			append_option += '>';
			append_option += '항목 없음';
			append_option += '</option>';
			append_list += append_option;
		} else {
			data.some(function (m) {
				let append_option = '<option';
				append_option += ' value="' + m[property.option_value] + '"';
				append_option += '>';
				append_option += m[property.option_text];
				append_option += '</option>';
				append_list += append_option;
			});
		}

		$elem.append(append_list);

	}).fail(function (data) {
		showToastE("통신에 문제가 있습니다.");
	});
}

/* keyup Stock Usable Validation */
// function isStockUsableEnoughEvent($input, ref_input, valid_input){
// 	// ref_input: 참고용(가용재고), valid_input: (실재고)

// 	// set popover
// 	$input.attr('data-toggle','popover');
// 	$input.attr('title','재고정보');
// 	$input.popover({
// 		placement:'top',
// 		trigger:'focus'
// 	});
// 	$input.popover('disable');

// 	// set event
// 	$input.on('keyup', function(e){
// 		if($input.length ==0 || valid_input.length == 0 || ref_input.length == 0 ){return}
// 		let val = $(this).val();
// 		let ref_val = ref_input.val();
// 		let valid_val = valid_input.val();

// 		$input.attr('data-content','재고: ' + valid_val + ', [가용: ' + ref_val + ']');

// 		// :: popover
// 		if(isNull(val) || val == ''){
// 			if($input.hasClass('popover-enabled')){
// 				$input.removeClass('popover-enabled');
// 				$input.popover('disable');
// 				$input.popover('hide');
// 			}
// 		}else{
// 			if(!$input.hasClass('popover-enabled')){
// 				$input.addClass('popover-enabled');
// 				$input.popover('enable');
// 				$input.popover('show');
// 			}
// 		}

// 		// :: fatal warning border
// 		if(Number(val) <= Number(valid_val)){
// 			$input.removeClass('valid-fatal'); 
// 			// :: warning border
// 			if(Number(val) <= Number(ref_val)){ 
// 				$input.removeClass('valid-warn'); 
// 			}else{ 
// 				$input.addClass('valid-warn').removeClass('valid-fatal');
// 			}
// 		}else{
// 			$input.addClass('valid-fatal').removeClass('valid-warn');
// 		}
// 	});
// }

// function isStockEnoughEvent($input, valid_input){
// 	// valid_input: (실재고)

// 	// set popover
// 	$input.attr('data-toggle','popover');
// 	$input.attr('title','재고정보');
// 	$input.popover({
// 		placement:'top',
// 		trigger:'focus'
// 	});
// 	$input.popover('disable');

// 	// set event
// 	$input.on('keyup', function(e){
// 		if($input.length ==0 || valid_input.length == 0){return}
// 		let val = $(this).val();
// 		let valid_val = valid_input.val();

// 		$input.attr('data-content','재고: ' + valid_val);

// 		// :: popover
// 		if(isNull(val) || val == ''){
// 			if($input.hasClass('popover-enabled')){
// 				$input.removeClass('popover-enabled');
// 				$input.popover('disable');
// 				$input.popover('hide');
// 			}
// 		}else{
// 			if(!$input.hasClass('popover-enabled')){
// 				$input.addClass('popover-enabled');
// 				$input.popover('enable');
// 				$input.popover('show');
// 			}
// 		}

// 		// :: fatal warning border
// 		if(Number(val) <= Number(valid_val)){
// 			$input.removeClass('valid-fatal'); 
// 		}else{
// 			$input.addClass('valid-fatal');
// 		}
// 	});
// }

function initCalTotalEvent(op, $table, $name, list_operand, formatter, afterFunc, execTrigger) {
	let $tbody = $table.find('tbody');

	list_operand.some(function (operand_name) {
		$tbody.on('keyup', '[name="' + operand_name + '"]', function (e) {
			let $tr = $(e.target).closest('tr');
			let result = Number(removeComma($tr.find('[name="' + list_operand[0] + '"]').val()));
			list_operand.some(function (op_for_result, idx) {
				if (idx == 0) return false;

				if (op == '+') {
					result = Number(result) + Number(removeComma($tr.find('[name="' + op_for_result + '"]').val()));
				} else if (op == '-') {
					result = Number(result) - Number(removeComma($tr.find('[name="' + op_for_result + '"]').val()));
				} else if (op == '*') {
					result = Number(result) * Number(removeComma($tr.find('[name="' + op_for_result + '"]').val()));
				} else if (op == '/') {
					result = Number(result) / Number(removeComma($tr.find('[name="' + op_for_result + '"]').val()));
				}

			});

			if (isFunc(formatter)) result = formatter(result);

			let $elem = $tr.find('[name="' + $name + '"]');
			//asdf(result);
			$elem.val(result);
			if (execTrigger == false) { $elem.trigger('change'); }

			if (isFunc(afterFunc)) afterFunc($tr, $elem);
		});
	});

	// refresh
	let list_tr = $tbody.find('tr');
	if (list_tr.length == 0) return;
	list_tr.each(function (idx) {
		let operand = $(this).find('[name="' + list_operand[0] + '"]');
		if (null2Blank(operand.val()) == '') return false;

		operand.trigger('keyup');
	});
}

/* 수정안되고 삭제해야되는 행에서 사용*/
function mkInputReadonly($row, list_input_nm) {
	if (isNull(list_input_nm) || list_input_nm.length == 0) { return }
	list_input_nm.forEach(function (input_nm) {
		let $input = $row.find('[name="' + input_nm + '"]');
		$input.addClass('hide');
		$input.after('<input class="form-control align-center viewD" readonly="readonly" autocomplete="off" value="' + $input.val() + '"/>');
	});
}

/////////////////////////////
/*  FUNCTION - TYPEAHEAD   */
/////////////////////////////
function initTypeAhead(property) {
	property.target_elem.typeahead('destroy');

	let list_param = '';
	for (const sear in property.list_param) {
		list_param += '&' + sear + '=' + property.list_param[sear];
	}

	/* bloodhound */
	let dataSourceProdCD = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: property.url + '?sear=%QUERYSTRING' + list_param, // sear 추가
			wildcard: '%QUERYSTRING',
			cache: false,
		}
	});

	/* optsHash */
	let taOptsHash = {
		name: property.name,
		source: dataSourceProdCD,
		display: property.display,
		limit: (property.limit | 20),
		highlight: true,
		templates: {
			empty:
				`<div class="empty-message">
                검색된 결과가 없습니다.
			</div>`,
			suggestion: function (d) {
				return property.suggestion_string(d);
			}
		}
	};

	property.target_elem.typeahead(
		(null2Blank(property.min_length) + '' != '' ? { minLength: property.min_length, /* highlight: true */ } : null),
		taOptsHash
	).off('typeahead:select').on('typeahead:select', function (ev, selected) {
		property.event_select(ev, selected);
		property.target_elem.trigger('change');
	});

	setTypeaheadStyle(property.target_elem);
}

function setTypeaheadStyle(elem_typeahead) {
	elem_typeahead.css('background-color', '');
}





/////////////////////////////
/*    FUNCTION - MODAL     */
/////////////////////////////
$(function () {

});






/////////////////////////////
/*     FUNCTION - ETC      */
/////////////////////////////
const startYear = 2019;
function initSelectOptionYear($elem, selectThisYear) {
	let thisYear = new Date().getFullYear();
	let $frag = $(document.createDocumentFragment());
	for (let i = startYear; i <= thisYear; i++) {
		$frag.prepend('<option value="' + i + '">' + i + '년</option>');
	}
	$elem.append($frag);

	if (selectThisYear == true) $elem.val(thisYear);
}

function initSelectOptionMonth($elem, selectThisMonth) {
	let thisMonth = new Date().getMonth() + 1;
	let $frag = $(document.createDocumentFragment());
	for (let i = 1, chimdaeIsSimonth = 1; i <= 12; i++) {
		if (i < 10) { chimdaeIsSimonth = '0' + i; }
		else { chimdaeIsSimonth = i; }
		$frag.append('<option value="' + chimdaeIsSimonth + '">' + i + '월</option>');
	}
	$elem.append($frag);

	if (selectThisMonth == true) $elem.val(thisMonth);
}

function initSelectOptionDay($elem, thisYear, thisMonth, selectThisDay) {
	let thisDay = new Date().getDate();
	let $frag = $(document.createDocumentFragment());
	for (let i = 1, jeepEgagoseepDay = 1; i <= new Date(thisYear, thisMonth, 0).getDate(); i++) {
		if (i < 10) { jeepEgagoseepDay = '0' + i; }
		else { jeepEgagoseepDay = i }
		$frag.append('<option value="' + jeepEgagoseepDay + '">' + i + '일</option>');
	}
	$elem.append($frag);

	if (selectThisDay == true) $elem.val(thisDay);
}

function obj2elem(obj, $elem) {
	console.log(obj)
	for (let key in obj) {
		if (!obj.hasOwnProperty(key)) continue;
		let $target_elem = $elem.find(`[name="${key}"]`);
		if ($target_elem == null || $target_elem.length == 0) {
			continue;
		}

		let val = obj[key];
		let tagname = $target_elem.prop('tagName');
		let type = $target_elem.attr('type');

		if (tagname == 'INPUT' && type == 'checkbox') {
			(val == 'Y') ? $target_elem.prop('checked', true) : $target_elem.prop('checked', false)

		} else if (tagname == 'INPUT' || tagname == 'TEXTAREA' || tagname == 'SELECT') {
			$target_elem.val(val);
		} else {
			$target_elem.text(val);
		}
	}
}

/**
 * @function
 * @param {Node} searchInfoObj 검색어
 * @param {Array} list 리스트
 * @description selected item 찾기 대작전
 * @example
 * 이전 select했던 item을 무지하게 찾고싶다.
 * -> findSelectedRowList({MAT_CD: "BO-2101-0002_10"}, rows);
 */
function elem2Obj($elem) {
	let obj = {}
	let $target_elem_list = $elem.find("[name]");

	if ($target_elem_list.length == 0) { return obj; }

	$target_elem_list.each(function () {
		let tagname = $(this).prop('tagName');
		let key = $(this).attr('name');
		let val = '';
		let type = $(this).attr('type');

		if (tagname == 'INPUT' && type == 'checkbox') {
			$(this).is(':checked') ? (val = 'Y') : (val = 'N');
		} else if (tagname == 'INPUT' || tagname == 'TEXTAREA' || tagname == 'SELECT') {
			val = $(this).val();
		} else {
			val = $(this).text();
		}

		if (isNull(obj[key])) {
			obj[key] = val;
			return true;
		}

		if (!Array.isArray(obj[key])) {
			obj[key] = [];
			obj[key].push(val);
			return true;
		}

		obj[key].push(val);
	});

	return obj;
}

function datePicker() {
	let $form_dates = $('.form_date');
	$form_dates.datepicker({
		format: "yyyy-mm-dd",
		todayBtn: "linked",
		language: "kr",
		orientation: "bottom auto",
		keyboardNavigation: false,
		forceParse: false,
		autoclose: true,
		todayHighlight: true,
	});

	$form_dates.on('keydown', datePickerOnKeyDown);
}

function datePickerOnKeyDown(e) {
	if (e.keyCode === 13) {
		e.stopPropagation();
		e.preventDefault();

		return false;
	}
}

$.fn.datetimepicker.dates['kr'] = {
	days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
	daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
	daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
	months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	today: "today",
	meridiem: 'kr',
};
function dateTimePicker() {
	let $form_datetimes = $('.form_dateTime');
	$form_datetimes.datetimepicker({
		format: 'yyyy-mm-dd hh:ii',
		todayBtn: "linked",
		language: "kr",
		orientation: "bottom auto",
		keyboardNavigation: false,
		forceParse: false,
		autoclose: true,
		todayHighlight: true,
		// startDate: new moment(),
	});

	$form_datetimes.on('keydown', datePickerOnKeyDown);
}

// get path from selected element
jQuery.fn.extend({
	getPath: function () {
		var path, node = this;
		while (node.length) {
			var realNode = node[0], name = realNode.name;
			if (!name) break;
			name = name.toLowerCase();

			var parent = node.parent();

			var sameTagSiblings = parent.children(name);
			if (sameTagSiblings.length > 1) {
				var allSiblings = parent.children();
				var index = allSiblings.index(realNode) + 1;
				if (index > 1) {
					name += ':nth-child(' + index + ')';
				}
			}

			path = name + (path ? '>' + path : '');
			node = parent;
		}

		return path;
	}
});

/**
 * @function
 * @param {String} str 
 * @description string -> color
 */
var string2Color = function (str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var colour = '#';
	for (var i = 0; i < 3; i++) {
		var value = (hash >> (i * 8)) & 0xFF;
		colour += ('00' + value.toString(16)).substr(-2);
	}
	return colour;
}

/**
 * @function
 * @param {String} str 
 * @description 시간 h:m -> hh:mm 단위로 조정
 */
function h2hh(str) {
	return (str.length > 1 ? str : '0' + str);
}

function getAjaxResultCodeType(ajaxResponse) {
	// null일 경우도 error로 취급
	let resultCode = ajaxResponse.resultCode;
	if (isNull(resultCode) || resultCode.substring(0, 1) == 'E') {
		return 'E';
	} else if (resultCode.substring(0, 1) == 'W') {
		return 'W';
	} else if (resultCode.substring(0, 1) == 'I') {
		return 'I';
	} else {
		return 'E';
	}
}

function copy2Clipboard(value) {
	asdf(value);

	// let $clipboardinput = $('<input  id="clipboardinput" style="position:absolute; top:0; left:0; width:1px; height:1px; margin:0; padding:0; border:0;">');
	// $clipboardinput.val(value);
	// $('html').append($clipboardinput);
	// var copyText = document.getElementById("clipboardinput");
	// copyText.select();
	// document.execCommand("Copy");
	// $clipboardinput.remove();

	navigator.clipboard.writeText(value).then(
		// 복사 성공 시
		() => {
		showToastI("클립보드에 복사되었습니다.")
	},
		// 복사 실패 시(아마 복사 권한 문제 -보안)
		() => {
			showToastE("클립보드에 복사되지 않았습니다.");
		}
	);

}