'use strict';
/** 
 * @module
 * @example
 * 1. 일반 element
 * <li class="_col4"><label class="">담당자</label>
 * 		<input type="text" class="hidden" name="MANAGER_ID">
 * 		<div class="input_group"><input type="text" class="required" name="MANAGER_NM" data-type="none" data-valid-types="notnull" data-ref-name="MANAGER_ID"></div>
 * </li>
 * 
 * 2. tabulator
 * {title: "수량", field: "QTY", headerSort:false, editor:"number", cssClass:'cell_write', width: 70, data_type:'number', valid_types:'notnull min' valid_min:0,}
 * @description
 * .required class 필요(tabulator 제외)
 * 
 * ####### element 종류
 * 1. <일반>
 * - input, checkbox, textarea, select ... etc
 * 2. <tabulator>
 * 
 * ####### validation 종류
 * ### data type
 * 1. none
 * none
 * 
 * 2. <날짜>
 * date [data-foramt=YYYY-MM-DD, ]
 * 
 * 3. <숫자>
 * number [data-comma, data-max, data-min ...]
 * 
 * 4. <정수> : 아직 추가 안함
 * int [data-comma, data-max, data-min ...]
 * 
 * 5. <전화번호>
 * cellphone
 * 
 * 6. <주민등록번호>
 * rrn
 * 
 * ### valid type
 * 1. <필수입력>
 * notnull
 * 
 * 2. <최소값>
 * min
 * 
 * ### etc
 * 1. <참조값> : 참조값으로 유효성검사를 합니다.
 * ref [data-ref-name=CUSTOMER_CD]
 * ex) <input type="text" name="CUSTOMER_NM" data-type="number" data-ref data-ref_name="CUSTOMER_CD" data-valid-types="notnull"/>
 * 
 * @member {boolean} focus_first_error 유효성검사 후 유효하지않은 항목 focus 여부
 * @member {boolean} validated 유효성검사여부
 * 
 */
var CommonValidaion = function(){
	this.focus_first_error = true;
	this.validated = false;
}

CommonValidaion.prototype.func_validation_map = {
	none: {
		err_msg: (valid_props) => {return ''},
		valid: (value, valid_props) => {
			return true;
		},
	},
	date: {
		err_msg: (valid_props) => {return '\'YYYY-MM-DD\' 형식의 유효한 날짜값을 입력해주세요'},
		valid: (value, valid_props) => { // 날짜(format 2020-12-12)
			if(isNullOrBlank(value)) {return true;}
			return moment(value, 'Y-MM-DD', true).isValid();
		},
	},
	number: {
		err_msg: (valid_props) => {return '숫자값을 입력해주세요'},
		valid: (value, valid_props) => { // 숫자
			if(isNullOrBlank(value)) {return true;}
			if(valid_props.formats.includes('comma')){
				// value = this.func_format_map.comma(value);
				value = removeComma(value);
			}

			return !isNaN(value);
		},
	},
	cellphone: {
		err_msg: (valid_props) => {return '\'000-0000-0000\', \'000-000-0000\' 형식의 핸드폰번호값을 입력해주세요'},
		valid: (value, valid_props) => { // 핸드폰번호
			if(isNullOrBlank(value)) {return true;}
			return /^\d{3}-\d{3,4}-\d{4}$/.test(value);
		},
	},
	email: {
		err_msg: (valid_props) => {return '이메일 형식의 값을 입력해주세요'},
		valid: (value, valid_props) => { // email
			if(isNullOrBlank(value)) {return true;}

			let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(value);
		},
	},
	rrn: {
		err_msg: (valid_props) => {return '\'XXXXXX-XXXXXXX\' 형식의 주민등록번호값을 입력해주세요'},
		valid: (value, valid_props) => { // 주민등록번호
			if(isNullOrBlank(value)) {return true;}
			return /^\d{6}-\d{7}$/.test(value);
		},
	},

	// valid types
	notnull: {
		err_msg: (valid_props) => {return '필수입력 항목입니다.'},
		valid: (value, valid_props) => { // check null or blank
			if(isNullOrBlank(value)) {return false};
			return true;
		},
	},
	min: {
		subprops: ['valid-min'],
		subprops_tbltr: ['valid_min'],
		err_msg: (valid_props) => {
			let min = (!isNull(valid_props.subprops.valid_min) ? valid_props.subprops.valid_min
					: (!isNull(valid_props.subprops['valid-min']) ? valid_props.subprops['valid-min'] : null)
			)
			return `${min}보다 작은 수는 입력할 수 없습니다.`
		},
		valid: (value, valid_props) => { // check null or blank
			if(valid_props.data_type != 'number') {
				throw new Error('must be defined as a \'number\' data-type for using \'min\' valid_types.');
			}
			if(valid_props.formats.includes('comma')){
				// value = this.func_format_map.comma(value);
				value = removeComma(value);
			}

			// tabulator = valid_min, element = valid-min
			let min = (!isNull(valid_props.subprops.valid_min) ? valid_props.subprops.valid_min
					: (!isNull(valid_props.subprops['valid-min']) ? valid_props.subprops['valid-min'] : null)
			)
			if(isNull(valid_props.subprops) || isNull(min)) {
				throw new Error('must be defined \'data-valid-min(valid_min in tabulator)\' in element attribute(tabulator \'col definition\').');
			}
			if(min > value){return false;}
			return true;
		},
	},
	max: {
		subprops: ['valid-max'],
		subprops_tbltr: ['valid_max'],
		err_msg: (valid_props) => {
			let max = (!isNull(valid_props.subprops.valid_max) ? valid_props.subprops.valid_max
					: (!isNull(valid_props.subprops['valid-max']) ? valid_props.subprops['valid-max'] : null)
			)
			return `${max}보다 큰 수는 입력할 수 없습니다.`
		},
		valid: (value, valid_props) => { // check null or blank
			if(valid_props.data_type != 'number') {
				throw new Error('must be defined as a \'number\' data-type for using \'min\' valid_types.');
			}
			if(valid_props.formats.includes('comma')){
				// value = this.func_format_map.comma(value);
				value = removeComma(value);
			}

			// tabulator = valid_max, element = valid-max
			let max = (!isNull(valid_props.subprops.valid_max) ? valid_props.subprops.valid_max
					: (!isNull(valid_props.subprops['valid-max']) ? valid_props.subprops['valid-max'] : null)
			)
			if(isNull(valid_props.subprops) || isNull(max)) {
				throw new Error('must be defined \'data-valid-min(valid_min in tabulator)\' in element attribute(tabulator \'col definition\').');
			}
			if(max < value){return false;}
			return true;
		},
	},
	// format: {
	// 	subprops: ['valid-format'],
	// 	subprops_tbltr: ['valid_format'],
	// 	def_format_list: ['comma'],
	// 	err_msg: (valid_props) => {return '필수입력 항목입니다.'},
	// 	valid: (value, valid_props) => { // check null or blank
	// 		// tabulator = valid_min, element = valid-min
	// 		let formats = (!isNull(valid_props.subprops.valid_format) ? valid_props.subprops.valid_format 
	// 			: (!isNull(valid_props.subprops['valid-format']) ? valid_props.subprops['valid-format'] : null)
	// 			)
	// 		if(isNull(valid_props.subprops) || isNull(formats)) {
	// 			throw new Error('must be defined \'data-valid-format(\'valid_format\' in tabulator)\' in element attribute(tabulator \'col definition\').');
	// 		}
			
	// 		let format_list = ((formats) ? formats.split(' ') : []);
	// 		format_list.forEach(function(format){
	// 			if(format == 'comma'){
	// 				if(valid_props.data_type != 'number') {
	// 					throw new Error('must be defined as a \'number\' data-type for using \'comma\' format type.');
	// 				}

	// 				if()
	// 			}
	// 		});

	// 		return true;
	// 	},
	// }
}

CommonValidaion.prototype.func_format_map = {
	comma: function(value){
		return removeComma(value);
	}
}

/**
 * @function initValidElem
 * @description <br>유효성 검사 및 메시지 출력을 위한 초기화 함수. 모달이 열릴 때 초기화됩니다.(CommonValidaion.js의 updateModalOpen(), writeModalOpen())
 * @param $target_wrapper 유효성검사를 할 영역
 * @return {null}
 */
CommonValidaion.prototype.initValidElem = function($target_wrapper){
	let instance = this;

	//  적용되어있던거 해제만. 현재 초기화해야할 설정은 없습니다.
	// 1. normal form일 경우
	$target_wrapper.find('.required').each(function(){
		instance.deactivateValidError($(this))
	});

	// 2. tabualtor일 경우
	let target_tabulator_list = this.getTabulatorObjList($target_wrapper);
	if(target_tabulator_list.length > 0){
		target_tabulator_list.forEach(function(target_tabulator){
			// deactivate 하자

			instance.deactivateTabulatorValidError(target_tabulator);

			// helpbox 초기화
			// $target_wrapper.find('.help_block').text('');
		});
	}
}

/**
 * @function validating
 * @description 유효성 검사하기!
 * @param {Object} $target_wrapper 유효성검사를 할 영역
 * @param {boolean} focus_first_error 첫번째 elem focus 여부
 * @returns {boolean} wrapper 영역 내 검사 통과여부
 * @example
 * if(!valid.validating) {return;}
 * saveDoc({ ... })
 */
CommonValidaion.prototype.validating = function($target_wrapper){
	let invalid_elem_list = [];

	// 1. init
	this.initValidElem($target_wrapper);

	// 2. valid
	let result_elem = this.validatingElem($target_wrapper, invalid_elem_list);
	let result_tabulator = this.validatingTabulator($target_wrapper, invalid_elem_list);

	// 3. focus on first invalid elem
	if(this.focus_first_error){
		if(invalid_elem_list.length > 0){invalid_elem_list[0].focus();}
	}
	
	this.validated = true;
	return (result_elem && result_tabulator);
}

/**
 * @function validatingElem
 * @description 영역 내 유효성 검사
 * @param $target_wrapper 유효성검사를 할 영역
 * @param invalid_elem_list 유효성검사 미통과 elem push
 * @returns {boolean} 영역 전체 유효성검사 통과여부
 */
CommonValidaion.prototype.validatingElem = function($target_wrapper, invalid_elem_list){
	let instance = this;
	let total_valid_result = true;

	// 1. select validation elem & loop
	let $valid_elems = $target_wrapper.find('.required');
	for(let idx = 0; idx < $valid_elems.length; idx++){
		// 2. check eleme properties
		let $target = $valid_elems.eq(idx);
		let value = this.getValidValue($target, $target_wrapper);
		let valid_props = this.getValidProps($target, $target_wrapper);
		let target_result = true;
		
		// 3. check [data-type]
		if(isNull(valid_props.data_type)){
			throw new Error(`[data-type]이 정해지지 않았습니다.([name="${$target.attr['[name]']}")`);
		}

		// 4. validation - data type
		// console.log(`data type 검사 결과: ${this.func_validation_map[valid_props.data_type].valid(value)}`);
		if(!this.func_validation_map[valid_props.data_type].valid(value, valid_props)){
			target_result = false;
			this.activateValidError($target, this.func_validation_map[valid_props.data_type].err_msg(valid_props));
		}

		// 5. validation - valid_types
		let tmpresult = true;
		valid_props.valid_types.forEach(function(item){
			// console.log(`valid type 검사 결과: ${this.func_validation_map[type.valid_types].valid(value)}`);
			if(!instance.func_validation_map[item].valid(value, valid_props)){
				target_result = false;
				// tmpresult = false;
				instance.activateValidError($target, instance.func_validation_map[item].err_msg(valid_props));
			}
		});

		// asdf($target);
		// asdf(`
		// name: ${valid_props.name}
		// tagname: ${valid_props.tagname}
		// value: ${value}
		// type - data: ${valid_props.data_type}
		// type - valid: ${valid_props.valid_types}
		// type - subprops: ${valid_props.subprops}
		// type - format: ${valid_props.formats}
		// result - data: ${this.func_validation_map[valid_props.data_type].valid(value, valid_props)}
		// result - valid: ${tmpresult}
		// `);

		// 6. store elem & set total result
		if(target_result == true){ 
			this.deactivateValidError($target);
		}else{
			invalid_elem_list.push($target);
			total_valid_result = target_result;
		}
	}

	return total_valid_result;
}

/**
 * @function validatingTabulator
 * @description 유효성 검사 for tabulator
 * @param $target_wrapper 유효성검사를 할 tabulator
 * @param invalid_elem_list 유효성검사 미통과 elem push
 * @returns 영역 전체 유효성검사 통과여부(boolean)
 * @description
 * tabulator의 렌더링 방식으로 인해 display none 처리되어있는 tabulator는 cell element에 대한 error표시작업을 스킵합니다.(element를 찾을 수 없음)
 * 참고: tabulator 렌더링 방식(http://tabulator.info/docs/4.6/virtual-dom)
 */
CommonValidaion.prototype.validatingTabulator = function($target_wrapper, invalid_elem_list){
	let instance = this;
	let total_valid_result = true;

	let tabulator_list = this.getTabulatorObjList($target_wrapper);
	if(tabulator_list.length == 0){return true;}

	// 1. tabulator list loop
	tabulator_list.some(function(tbltr){
		let  tbltr_datalist = tbltr.getData();
		if(tbltr_datalist.length == 0) {return false;} // = continue;

		// 2. get column valid properties
		let cols_valid_props = instance.getTabulatorValidProps(tbltr);
		let valid_col_nms = Object.keys(cols_valid_props);
		if(valid_col_nms.length == 0){return false;} // = continue;

		// 3. tabulator data loop for each row
		let row_elems = tbltr.getRows();
		tbltr_datalist.forEach(function(tbltr_data, idx){
			valid_col_nms.forEach(function(col_nm){
				let target_result = true;
				
				
				let targetCell = row_elems[idx].getCell(col_nm);
				let value = tbltr_data[col_nm];
				let valid_props = cols_valid_props[col_nm];
				
				// asdf(`
				// name: ${valid_props.name}
				// value: ${value}
				// type - data: ${valid_props.data_type}
				// type - valid: ${valid_props.valid_types}
				// subprops : ${JSON.stringify(valid_props.subprops)}
				// `);
				
				// not rendered yet.
				if(isNull(targetCell) || targetCell == false){ 
					// 4. validation - data type
					if(!instance.func_validation_map[valid_props.data_type].valid(value, valid_props)){
						target_result = false;
					}

					// 5. validation - valid_types
					valid_props.valid_types.forEach(function(item){
						if(!instance.func_validation_map[item].valid(value, valid_props)){
							target_result = false;
						}
					});	

				// rendered tabulator
				}else{ 
					let $target = $(targetCell.getElement());

					// 4. validation - data type
					if(!instance.func_validation_map[valid_props.data_type].valid(value, valid_props)){
						target_result = false;
						instance.activateTabulatorValidError($target, instance.func_validation_map[valid_props.data_type].err_msg(valid_props));
					}

					// 5. validation - valid_types
					valid_props.valid_types.forEach(function(item){
						if(!instance.func_validation_map[item].valid(value, valid_props)){
							target_result = false;
							instance.activateTabulatorValidError($target, instance.func_validation_map[item].err_msg(valid_props));
						}
					});	

					// 6. store elem & set total result
					if(target_result == true){ 
						instance.deactivateTabulatorValidError($target);
					}else{
						invalid_elem_list.push($target);
					}
				}
				
				if(target_result == false){total_valid_result = target_result;}
			});
		});
	});

	return total_valid_result;
}

/**
 * @function getValidValue
 * @description 유효성검사항목의 유효성검사속성정보 확인
 * @param $target 유효성검사항목 $elem
 * @param $target_wrapper 영역 $elem
 * @returns $target의 유효성검사속성정보
 */
CommonValidaion.prototype.getValidValue = function($target, $target_wrapper){
	let tagname = $target.prop('tagName');
	let target_value = null;
	let $valid_target = null; //검사대상 elem

	// data-ref 여부(data-ref의 경우 자신의 값이 아닌 참조되는 element 값으로 판단)
	if(typeof $target.data('ref-name') !== typeof undefined){
		let ref_name = $target.data('ref-name');
		let $ref = $target_wrapper.find(`[name=${ref_name}]`);
		if($ref.length == 0){ 
			throw new Error(`cannot find ref elem.(selector:"[name=${ref_name}]")`);
		}
		if($ref.length > 1){
			throw new Error(`2 or more 'ref elem' exist.(selector:"[name=${ref_name}]")`);
		}

		$valid_target = $ref;
	}else{
		$valid_target = $target;
	}

	if(tagname == 'INPUT' || tagname == 'SELECT' || tagname == 'TEXTAREA'){
		target_value = $valid_target.val();
	// }else if(tagname == 'span'){
	// }	
	}else{
		target_value = $valid_target.text();
	}

	return target_value;
}

CommonValidaion.prototype.getValidProps = function($target, $target_wrapper){
	let instance = this;
	let data_type = $target.data('type');
	let valid_types = $target.data('valid-types');
	let tagname = $target.prop('tagName');
	let name = $target.attr('name');
	if(isNull(data_type) && isNull(valid_types)){
		throw new Error('no valid props but required class exist');
	}
	data_type = ((data_type) ? data_type : 'none');
	valid_types = ((valid_types) ? valid_types.split(' ') : []);
	
	// get sub property
	let subprops = {};
	valid_types.forEach(function(valid_type){
		let def_subprops = instance.func_validation_map[valid_type].subprops;
		if(isNull(def_subprops)){return;}
		
		def_subprops.forEach(function(subprop_nm){
			subprops[subprop_nm] = $target.data(subprop_nm);
		});
	});

	// formatter
	let formats = $target.data('valid-format');
	formats = ((formats) ? formats.split(' ') : []);

	let valid_prop = {
		data_type: data_type,
		valid_types: valid_types,
		tagname: tagname,
		name: name,
		subprops: subprops,
		formats: formats,
	};

	return valid_prop;
}

CommonValidaion.prototype.getTabulatorValidProps = function(tbltr){
	let instance = this;
	let col_valid_props = {};
	let col_props = tbltr.getColumnDefinitions();

	if(col_props.length == 0) {return;} // == continue;
	col_props.forEach(function(col_prop){
		let data_type = col_prop['data_type'];
		let valid_types = col_prop['valid_types'];
		let field = col_prop['field'];
		let label = col_prop['title'];
		if(isNull(data_type) && isNull(valid_types)){return;}
		if(isNull(field)){
			throw new Error(`유효성검사 tabulator의 컬럼정보 중 'field' 정보는 필수값입니다.`);
		}
		data_type = ((data_type) ? data_type : 'none');
		valid_types = ((valid_types) ? valid_types.split(' ') : []);
		
		// subprops
		let subprops = {};
		valid_types.forEach(function(valid_type){
			let def_subprops = instance.func_validation_map[valid_type].subprops_tbltr;
			if(isNull(def_subprops)){return;}
			
			def_subprops.forEach(function(subprop_nm){
				subprops[subprop_nm] = col_prop[subprop_nm];
			});
		});

		// formatter
		let formats = col_prop['valid_format'];
		formats = ((formats) ? formats.split(' ') : []);

		col_valid_props[field] = {
			data_type: data_type,
			valid_types: valid_types,
			name: field,
			label: label,
			subprops: subprops,
			formats: formats,
		};
	});

	return col_valid_props;
}

CommonValidaion.prototype.activateValidError = function($target, msg){
	// 1. 이미 activate 되어있으면 메시지만 추가합니다.
	if(!$target.hasClass('_inputError')){
		// help box	
		let topside = ($target.hasClass('tt-input') || $target.hasClass('form_date'));
		$target.closest('.input_group').append(`<span class="help_block hidden ${topside ? 'top' : 'bottom'}"></span>`);

		$target.addClass('_inputError');	
		$target.on('focus', this.validErrorFocusEvent);
		$target.on('blur', this.validErrorBlurEvent);
	}
	
	// let validateLabel = $target.closest('li').find('label').text().replace("(*)", "");
	let $help_block = $target.closest('.input_group').find('span.help_block');
	let _msg = `- ${msg}`;
	$help_block.text(`${$help_block.text()}${($help_block.text() == '') ? '' : '\n'}${_msg}`);
}

CommonValidaion.prototype.activateTabulatorValidError = function($target, msg){
	// 1. 이미 activate 되어있으면 메시지만 추가합니다.
	if(!$target.hasClass('_inputError')){
		// help box	
		$target.after(`<span class="help_block right hidden"></span>`);

		$target.addClass('_inputError');
		$target.on('focus', 'input', this.validErrorFocusEventTabulator);
		$target.on('blur', 'input', this.validErrorBlurEventTabulator);
		$target.on('keydown', 'input', this.validErrorBlurEventTabulator);
	}
	
	// let validateLabel = $target.closest('li').find('label').text().replace("(*)", "");
	let $help_block = $target.next();
	if(!$help_block.hasClass('help_block')){
		throw new Error('can\'t find \'.help_block\' element.');
	}
	let _msg = `- ${msg}`;
	let _prvmsg = $help_block.text();
	if(!isNull(_prvmsg) && _prvmsg.includes(_msg)){return;}

	$help_block.text(`${_prvmsg}${(_prvmsg == '') ? '' : '\n'}${_msg}`);
}

CommonValidaion.prototype.deactivateValidError = function($target){
	$target.removeClass('_inputError');
	$target.closest('.input_group').find('span.help_block').remove();

	$target.off('focus', this.validErrorFocusEvent);
	$target.off('blur', this.validErrorBlurEvent);
}

/**
 * @description tabulator eleme deactivate valid error
 * @param {Tabulator} tbltr Tabulator 인스턴스
 */
CommonValidaion.prototype.deactivateTabulatorValidError = function(tbltr){
	let $tbltr = $(tbltr.element);
	let list_errorcell = $tbltr.find('._inputError');
	let list_helpblock = $tbltr.find('span.help_block');

	list_errorcell.off('focus', 'input', this.validErrorFocusEventTabulator);
	list_errorcell.off('blur', 'input', this.validErrorBlurEventTabulator);
	list_errorcell.off('keydown', 'input', this.validErrorBlurEventTabulator);

	if(!isNull(list_errorcell) && list_errorcell.length > 0){
		list_errorcell.removeClass('_inputError');
	}
	if(!isNull(list_helpblock) && list_helpblock.length > 0){
		list_helpblock.remove();
	}
}

CommonValidaion.prototype.validErrorFocusEvent = function(e){
	if(!$(this).hasClass('_inputError')){return;}
	
	// 동적으로 생기는 typeahead input 때문에 코드 추가
	let $input_group = $(this).closest('.input_group');
	let $typeahead_input = $input_group.find('.tt-input');
	let $datepicker_input = $input_group.find('.form_date');
	let $help_block = $input_group.find('.help_block');
	if($typeahead_input.length > 0 || $datepicker_input.length > 0){
		$help_block.addClass('top');
		$help_block.removeClass('bottom');
	}else{
		$help_block.addClass('bottom');
		$help_block.removeClass('top');
	}

	$(this).closest('.input_group').find('.help_block').removeClass('hidden');
}

CommonValidaion.prototype.validErrorFocusEventTabulator = function(e){
	let $cell = $(this).closest('.tabulator-cell');
	if(!$cell.hasClass('_inputError')){return;}
	
	let $next_elem = $cell.next();
	if(!$next_elem.hasClass('help_block')){return;}
	let $help_block = $next_elem;
	$help_block.removeClass('hidden');
}

CommonValidaion.prototype.validErrorBlurEvent = function(e){
	if(!$(this).hasClass('_inputError')){return;}

	$(this).closest('.input_group').find('.help_block').addClass('hidden');
}

CommonValidaion.prototype.validErrorBlurEventTabulator = function(e){
	let $cell = $(this).closest('.tabulator-cell');

	if(!$cell.hasClass('_inputError')){return;}
	let $next_elem = $cell.next();
	if(!$next_elem.hasClass('help_block')){return;}
	let $help_block = $next_elem;
	$help_block.addClass('hidden');
}

CommonValidaion.prototype.getTabulatorObjList = function($target_wrapper){
	let tabulator_obj_list = [];
	$target_wrapper.find('.tabulator').each(function(){
		let tabulator_in_wrapper = this;
		let tabulator_list = Tabulator.prototype.findTable('.tabulator');
		if(tabulator_list == false) {return false;}

		// selector를 이용하여 찾아낸 wrapper 안 tabulator의 Tabulator객체를 가져옵니다.
		tabulator_list.forEach(function(item){
			if(tabulator_in_wrapper == item.element){
				tabulator_obj_list.push(item);
				return false;
			}
		});
	});

	return tabulator_obj_list;
}

let valid = new CommonValidaion();