'use strict';
if (typeof jQuery === "undefined") {
    throw new Error("jQuery undefined.");
}

const stack_active_modal = [];

/**
 * 
 * @class
 * @classdesc 통신 Serialize 및 규격 위한 클래스.
 * 
 */
class CommonFrame {
    /**
     * @constructs 
     * @param {Object} props_init 생성자 property
     * @param {String} props.id [필수] 모달 id
     * @param {String} props.title [필수] 모달 title
     * @param {URL} props.frame_url [옵션] 모달 frame_url
     * @param {URL} props.contents_url [필수] 모달 contents_url
     * @param {Array} props.list [옵션] 모달 list
     * @param {Function} props.ready [옵션] 모달 생성 이후 콜백 function
     * 
     * @param {Element} $frame frame Element
     * <br>test입니다
     * testdldldldl
     * @example <caption> 예제1 </caption>
     * let test = new CommonFrame({
     *      id:"doc",
     *      title:"일반문서모달",
     *      frame_url: '/common/include/frame/areaSearch.jsp',
     *      contents_url: '/view/sample/sample1/doc.jsp',
     *      ready: function(){
     *      },
     * });
     * 
     * @example <caption> 예제1 </caption>
     */
    constructor(props_init){
        if(props_init === undefined || props_init == null){
            throw new Error('Selector String is null');
        }

        // 1. set properties
        this.setProps(props_init);
        
    }

    setProps(props){
        // frame_position - element
        let frame_position = props.frame_position;
        if(isNull(frame_position) || !typeof(target_position) == 'element'){
            throw new Error("invalid property 'target_position'[element]");
        }
        if(frame_position.length > 1){
            throw new Error("2 or more 'target_position' found");
        }

        // frame_url - string
        if(isNullOrBlank(props.frame_url)){
            throw new Error("cannot find property [frame_url]");
        }

        // contents_url : array
        let contents_url = props.contents_url;
        if(isNull(contents_url)){
            throw new Error("cannot find property [contents_url]");
        }
        if(!Array.isArray(contents_url)){
            throw new Error("not an array. [contents_url]");
        }
        if(contents_url.length == 0){
            throw new Error("array length: 0 [contents_url]");
        }

        contents_url.forEach(function(each_url, idx){
            if(isNull(each_url.target_position) || !typeof(each_url.target_position) == 'element'){
                throw new Error(`must be 'element' type [contents_url[${idx}].target_position]`);
            }

            if(isNullOrBlank(each_url.url)){
                throw new Error(`invalid property [contents_url[${idx}].url]`);
            }
        });

        // ready()
        if(!isNull(props.ready) && !isFunc(props.ready)){
            throw new Error("'ready' property only can declare as a function");
        }

        this.props = props;
    }

    init(){
        let this_instance = this;
        let props = this_instance.props;

        return new Promise(function(resolve, reject){
            let contents_url = props.contents_url;
            
            // req_contents
            let req_contents_list = [];
            contents_url.forEach(function(each_itm){
                req_contents_list.push($.ajax(each_itm.url))
            });

            $.when.apply($, [$.ajax(props.frame_url)].concat(req_contents_list)).done(function(){
                // 1. check ajax response state
                $.each(arguments, function(i, res){
                    if(res[1] != 'success'){
                        reject(props);
                        throw new Error('invalid url[contents file]');
                    }
                });
    
                // 2. frame
                let $tmpWrapper = document.createElement('div');
                let res_frame = arguments[0];
                $tmpWrapper.innerHTML = res_frame[0].trim();
                this_instance.$frame = $tmpWrapper.firstChild;
    
                // 3. custom contents
                this_instance.$contents_position = []
                $.each(arguments, function(i, res){
                    if(i == 0) return true; // == continue; arguments[0] == frame response;

                    let $contents_position = this_instance.$frame.querySelectorAll(contents_url[i-1].target_position);
                    if($contents_position == null || $contents_position.length == 0){
                        reject(props);
                        throw new Error(`cannot find element $(\'${contents_url[i-1].target_position}\')`);
                    }
                    
                    this_instance.$contents_position.push($contents_position[0]);
                    $(this_instance.$contents_position[this_instance.$contents_position.length - 1]).prepend(res[0].trim());
                });
                
                // 4. append 
                props.frame_position.append(this_instance.$frame);
                
                if(isFunc(props.ready)){
                    props.ready(props);
                }

                resolve(props);
            });
        });
    }
    
    /**
     * @function CommonFrame#valid
     * @description valid
     */
    valid(){
        let obj;
        try{
            obj = $(this.$contents).serializeObject();
        }catch(e){
            throw new Error();
        }
    }

    /**
     * @function CommonFrame#req
     * @description req
     */
    req(){
        // elem -> obj

        // validation

        // req with Ajax
    }

    validation(val, prop){
        if(prop.allowBlank && val == ''){
            return false;
        }
    
        if(prop.allowNull && val == null){
            return false;
        }
    
        if(prop.type == 'numeric' && isNumeric(val)){
            return false;
        }
    
        return true;
    }
}