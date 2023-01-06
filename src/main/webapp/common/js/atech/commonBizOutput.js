'use strict';

class CommonBizOutput {
    // this_instance;
    constructor(props) {
        // this.this_instance = this;
        // static 으로 선언했었으나 minify 빌드 중 에러 이슈로 인해 아래로 변경
        this.$btn_fileinfo = $('<div style="width:100%; display: contents;"></div>');
        this.$btn_filedelete = $('<i class="material-icons" data-dz-uploadbtn style="font-size: 13px;">delete</i>');
        this.$btn_fileupload = $(`<button class="btn btn_in_tabulator bg-white" data-dz-uploadbtn>업로드</button>`);
    }

    init(){
        return new Promise(function(resolve, reject){

        });
    };

    getOutputListWithItemCode(ITM_CD){
        return new Promise(function(resolve, reject){
            $.ajax({
                type : "POST",
                url  : '/business/BizOutput.do',
                dataType: "json",
                data : {
                    task: "select",
                    mode: "list",
                    data: {
                        ITM_CD: ITM_CD,
                    }
                }
            }).done(function(res) {
                if (getAjaxResultCodeType(res) == 'E') {return reject(res.resultMessage);}
                if (res.data == null) {reject("데이터가 없습니다."); return;};

                resolve(res.data);
            }).fail(function(res){
                reject("통신에 문제가 있습니다.");
            });
        });
    }

    makeFileUploadButton(cell){
        let this_instance = this;
        let rowData = cell.getData();
        let FILE_SEQ = cell.getData().FILE_SEQ;
        let $btn_fileinfo_clone  = this_instance.$btn_fileinfo.clone();

        if(isNullOrBlank(FILE_SEQ)){
            // 1. 파일 업로드 안된 상태
            let $target_dropzone = this_instance.makeDropZone4Output(cell);
            let $btn_fileupload_clone = this_instance.$btn_fileupload.clone('true');
            $btn_fileupload_clone.on('click', function(){
                $($target_dropzone)[0].dropzone.hiddenFileInput.click();
            });

            $btn_fileinfo_clone.append($target_dropzone);
            $btn_fileinfo_clone.append($btn_fileupload_clone);
        }else{
            // 2. 파일 업로드 된 상태
            let $badge = $outputGubunBadgeEtc.clone('true');
            $badge.text(rowData.FILE_NM);

            let $btn_filedelete_clone = this_instance.$btn_filedelete.clone('true');
            $btn_fileinfo_clone.append($badge);
            $btn_fileinfo_clone.append(`
        <i class="material-icons" style="font-size: 14px;" data-btn-download data-value="${rowData.CONTENTS}">file_download</i>
        `);
            // $btn_fileinfo_clone.append($btn_filedelete_clone);
            // $btn_filedelete_clone.on('click', function(e){
            //     // delete 항목에 추가
            //     if(isNull(page_prop.delete_files)){page_prop.delete_files = [];}
            //     page_prop.delete_files.push(FILE_SEQ);
            //
            //     let updated_data = {};
            //     updated_data['FILE_SEQ'] = null;
            //     updated_data['FILE_NM'] = null;
            //     cell.getRow().update(updated_data);
            // });
        }

        return $btn_fileinfo_clone[0];
    }

    makeDropZone4Output(cell){
        let this_instance = this;
        let $dropzone_wrapper = $('<div class="dropzone hidden"></div>');
        $dropzone_wrapper.dropzone({
            url: '/business/BizOutput.do?task=proc&mode=upload',
            dictDefaultMessage: '',
            maxFiles:1,
            maxFilesize: global_props.dropzone.maxFilesize,
            thumbnailWidth: null,
            thumbnailHeight: 10,
            previewTemplate: `
        <div class="dz-preview dz-file-preview">
            <div class="dz-details hidden">
                <div class="dz-filename"><span data-dz-name></span></div>
                <img data-dz-thumbnail/>
                <i class="material-icons md-18" data-dz-remove>cancel</i>
            </div>
            <div class="dz-success-mark hidden"><span>✔</span></div>
            <div class="dz-error-mark hidden"><span>✘</span></div>
            <div class="dz-error-message hidden"><span data-dz-errormessage></span></div>
            <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
        </div>
        `,
            init: function(){
                this.on("success", function(file, res) {
                    let resObj = JSON.parse(res);
                    let newData = cell.getData();
                    let row = cell.getRow();
                    newData.FILE_SEQ = resObj.data[0]['FILE_SEQ'];
                    newData.CONTENTS = newData.FILE_SEQ;
                    newData.FILE_NM = resObj.data[0]['FILE_NM'];
                    // cell.getRow().update(newData);
                    showToastI('파일이 업로드되었습니다.');

                    this_instance.updateOutput(newData);
                });

                // file size limit evnet
                this.on("error", function(file, response) {
                    let changeByte = global_props.dropzone.maxFilesize * 1000000;
                    if(file.size > changeByte){
                        showToastE('파일용량은 500mb를 넘을수 없습니다.');
                    }
                    this.removeFile(file);
                });
            }
        });
        return $dropzone_wrapper;
    }

    connectOutput(){
        sendJson({
            handle: 'BizOutput',
            task: 'select',
            mode: 'connect',
        });
    }

    disconnectOutput(){
        sendJson({
            handle: 'BizOutput',
            task: 'select',
            mode: 'disconnect',
        });
    }

    insertOutput(newData, callback){
        sendJson({
            handle: 'BizOutput',
            task: 'proc',
            mode: 'insert',
            data: newData
        }, callback);
    }

    updateOutput(newData, deleteFiles, callback){
        sendJson({
            handle: 'BizOutput',
            task: 'proc',
            mode: 'update',
            data: newData,
            deleteFiles: deleteFiles
        }, callback);
    }

    deleteOutput(data, callback){
        sendJson({
            handle: 'BizOutput',
            task: 'proc',
            mode: 'delete',
            data: data
        }, callback);
    }

    outputCommentInputEditor() {
        let this_instance = this;
        return function(cell, onRendered, success, cancel, editorParams){
            let prevVal = cell.getValue();
            let column = cell.getColumn();
            let field = column.getField();

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

            // let on_changing = false;
            function onChange(e) {
                // if (on_changing) {return;}
                // on_changing = true;
                if (!(isNull(prevVal) && input.value !== "" || input.value !== prevVal)) {cancel(); return;}

                // 1. server update
                let newData = cell.getData();
                if(field == "TITLE"){
                    newData.TITLE = input.value;
                }else{
                    newData.COMMENT = input.value;
                }

                if (success(input.value)) {
                    this_instance.updateOutput(newData);
                }
            }

            //submit new value on blur or change
            input.addEventListener("change", onChange);
            // input.addEventListener("blur", onChange);

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
    }

    outputContentsInputEditor() {
        let this_instance = this;
        return function(cell, onRendered, success, cancel, editorParams){
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

                if (success(input.value)) {
                    this_instance.updateOutput(newData);
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
    }
}