/** 
 * @module commonWebSocket
 * @description WebSocket 통신 프론트엔드 프레임. 
 * <br> 현재 디자인은 한개의 socket으로 모든 작업 처리.
 * */
let ws_connected_cnt = 0;
let ws_connection_trying_cnt = 0;
let ws_expired = false;
let ws;
let ws_queue_id = 0;
let ws_queue = {};

function initWebSocket(){
    let ws_protocol = "ws://";
    if (location.protocol === 'https:') {
        ws_protocol = "wss://";
    }

    ws = new WebSocket(ws_protocol + window.location.host + "/ws");
    ws.onopen = function(message) {
        ws_connected_cnt++;
        if(ws_connected_cnt >= 2) {
            showToastI("서버와 재연결되었습니다.");
            ws_connection_trying_cnt = 0;
        }

        //
        // sendJson({
        //     handle: 'Notification',
        //     task: "session_open",
        //     path: window.location.pathname
        // });
    };
    ws.onmessage = function(msg) {
        if(isNullOrBlank(msg.data)){return;}
        let jsonMsg = JSON.parse(msg.data);

        if (typeof(jsonMsg['ws_queue_id']) != 'undefined' && typeof(ws_queue[jsonMsg['ws_queue_id']]) == 'function'){
            execFunc = ws_queue[jsonMsg['ws_queue_id']];
            execFunc(jsonMsg);
            delete ws_queue[jsonMsg['ws_queue_id']]; // to free up memory.. and it is IMPORTANT thanks  Le Droid for the reminder
            return;
        }
        
        if(isNull(wsMsgTaskHandle[jsonMsg.handle])){return;}
        if(!isFunc(wsMsgTaskHandle[jsonMsg.handle][jsonMsg.task])){return;}
        wsMsgTaskHandle[jsonMsg.handle][jsonMsg.task](jsonMsg);
    };
    ws.onerror = function(msg) {
        ws.close();
    }
    ws.onclose = function(msg) {
        if(ws_connection_trying_cnt == 0){showToastE("서버와의 연결이 끊어졌습니다.");}
        
        // ws.terminate();
        // if(ws_connection_trying_cnt > 3){return;}
        if(ws_expired){return;}
        setTimeout(function() {
            ws_connection_trying_cnt++;
            initWebSocket();
        }, 3000);
    };   
}

initWebSocket();

function sendJson(msg, callback) {
    if (typeof(callback) == 'function'){
        ws_queue_id++;
        ws_queue['i_'+ws_queue_id] = callback;
        msg.ws_queue_id = 'i_'+ws_queue_id;
    }

    let msg_string = JSON.stringify(msg);
    ws.send(msg_string);
}

let wsMsgTaskHandle = {
    Notification: {
        init: function(res){ // 알림 초기화
            resetNotiStorage();
            let notificationList = res.data;
            addList2NotiStorage(notificationList);
        },
        notify: function(res){ // 알림(우측상단에 뜨는 알림)
            // asdf('notify');
            notify(res.data);
        },
        processNotify: function(res){ // MES 알림(상단중간에 뜨는 알림)
            // notify(res.data);
            if(res.data.type == 'E'){showToastE(res.data.CONTENTS)}
            if(res.data.type == 'W'){showToastW(res.data.CONTENTS)}
            if(res.data.type == 'I'){showToastI(res.data.CONTENTS)}
        },
    },
    
    session: {
        httpSessionExpired: function(data){
            showToast('세션이 만료되었습니다. 페이지를 새로고침해주세요.', bgColors.W, true);
            ws_expired = true;
        }
    },

    // workresult: {
    //     updaterow: function(data){
    //         if(isNull(page_prop.listTable)){return;}
    //         // workresult.js 에 구현
    //     }
    // }
}