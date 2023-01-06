/** @module commonNotification */

let $notiCount, $notiUl, $notiIcon;
const bgColors = {
    I: "linear-gradient(135deg, #e4f3ff, #c7e3fa)",
    // W: "linear-gradient(to right, #00b09b, #96c93d)", //색 임의넣음 수정필요
    W: "linear-gradient(to right, #e7e569, #dad74e)", //색 임의넣음 수정필요
    // E: "linear-gradient(to right, #ff5f6d, #ffc371)", //색 임의넣음 수정필요
    E: "linear-gradient(to right, #ff5f6d, #ff5f6d)", //색 임의넣음 수정필요
    NOTI: "linear-gradient(to right, #feffef, #fafbea)",
};


$(function(){
    $notiCount = document.getElementById('notificationCount');
    $notiUl = document.getElementById('notificationUl');
    $notiIcon = document.getElementById('notiIcon');
    // resetNotiStorage();

    // 1. 페이지 첫 로딩때는 ajax로 알림기록들을 가져옵니다. 이후부터 발생되는 알림은 websocket으로 가져옵니다. -> websocket에서 알아서 보내주는것으로 변경
    // getNotificationHistory(function(messageList){
    //     addList2NotiStorage(messageList);
        
    //     let notReadCount = 0;
    //     messageList.forEach(function(message){
    //         if(!isNull(message.READ_YN) && message.READ_YN != 'Y'){
    //             notReadCount++;
    //         }
    //     });
    //     showToastI(`읽지않은 알림이 ${notReadCount}건 있습니다.`);
    // });

    /* 알림 지우기 event */
    $('#btnRemoveNoti').on('click', function(e){
        deleteAllNoti(function(){
            resetNotiStorage();
        });
    });

});

function notify(message){
    add2NotiStorage(message);
    showNotiToast(message);
}

function resetNotiStorage(){
    $notiCount = document.getElementById('notificationCount');
    $notiUl = document.getElementById('notificationUl');
    $notiIcon = document.getElementById('notiIcon');

    if(isNull($notiUl)){return;}

    while($notiUl.firstChild){
        $notiUl.removeChild($notiUl.firstChild);
    }
    $notiCount.textContent = 0;
    $($notiCount).addClass('count_0');
}
function removeAllLi(){
    $notiUl.innerHTML = "";
}

function add2NotiStorage(noti){
    let $li = document.createElement('li');
    let $a = document.createElement('a');
    let contents = `
    <div class="menu-info">
    <button id="btnRemoveEach" class="close">✖</button>
	<p class="noti_seq" style="display:none;">${noti.NOTI_SEQ}</p>
    <p class="noti_contents">${noti.CONTENTS}</p>
    <p>${moment(noti.CREATE_DTM).format('YYYY-MM-DD HH:mm:ss')}</p>
    </div>
    `;

    $a.innerHTML = contents;
    $a.setAttribute('class','formAlarm');
    $li.appendChild($a);
    $notiUl.prepend($li);

    increaseCount();
    ringdingdong();
}

function addList2NotiStorage(notiList){
    if(isNull(notiList) || notiList.length == 0){return;}
    $notiUl = document.getElementById('notificationUl');
    notiList.forEach(function(noti){
        let $li = document.createElement('li');
        let $a = document.createElement('a');
        let contents = `
        <div class="menu-info">
		<button id="btnRemoveEach" class="close">✖</button>
		<p class="noti_seq" style="display:none;">${noti.NOTI_SEQ}</p>
        <p class="noti_contents">${noti.CONTENTS}</p>
        <p>${moment(noti.CREATE_DTM).format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
        `;
        
        $a.innerHTML = contents;
        $a.setAttribute('class','formAlarm');
        $li.appendChild($a);
        $notiUl.prepend($li);
    
        increaseCount();
    });

	/* click한 알람 지우기 event */
	$('ul.menu li button').on('click', function(e) {
		let row = $(this).parents('a').parent('li');
		let NOTI_SEQ = row.find('.noti_seq').text();
		deleteEachNoti(NOTI_SEQ);
		row.remove();
		decreaseCount();
		
	});

    ringdingdong();
}

function ringdingdong(){
    let ringdingdongCount = 0;
    let ringdingdongDirection = 0;
    let ringdingdongBright = false;
    let ringdingdong = setInterval(function(){
        if(ringdingdongCount >= 4){
            $notiIcon.classList.remove('ringdingdong-l');
            $notiIcon.classList.remove('ringdingdong-r');
            $notiIcon.classList.remove('ringdingdong-bright');
            clearInterval(ringdingdong);
            return;
        }
        
        if(ringdingdongDirection != 1){
            ringdingdongDirection = 1;
            $notiIcon.classList.remove('ringdingdong-r');
            $notiIcon.classList.add('ringdingdong-l');
        }else{
            ringdingdongDirection = -1;
            $notiIcon.classList.remove('ringdingdong-l');
            $notiIcon.classList.add('ringdingdong-r');
        }

        if(ringdingdongBright == false){
            $notiIcon.classList.add('ringdingdong-bright');
        }
        
        ringdingdongCount = ringdingdongCount + 1;
    }, 100);
}

function increaseCount(){
    $notiCount = document.getElementById('notificationCount');
    $notiCount.textContent = (Number($notiCount.textContent) + 1);
    $($notiCount).removeClass('count_0');
}

function decreaseCount() {
	$notiCount = document.getElementById('notificationCount');
    $notiCount.textContent = (Number($notiCount.textContent) - 1);
	if($notiCount.textContent == 0) {
		$($notiCount).addClass('count_0');
	}
}

let toastFlag = false;
function showToastI(message){showToast(message, bgColors.I)}
function showToastW(message){showToast(message, bgColors.W)}
function showToastE(message){showToast(message, bgColors.E)}
function showToast(message, color, isPermanence){
    Toastify({
        text: message,
        duration: isPermanence ? -1 : 5000, // -1 : permanent toast
        selector: 'content_section', //id
        gravity: 'top', // top , bottom
        position: 'center', // `left`, `center` or `right`
        backgroundColor: color,
        callback: function(){
        	toastFlag = false;
        }
    }).showToast();
}
function showToastFromAjax(res, isPermanence){
    Toastify({
        text: res.resultMessage,
        duration: isPermanence ? -1 : 5000, // -1 : permanent toast
        selector: 'content_section', //id
        gravity: 'top', // top , bottom
        position: 'center', // `left`, `center` or `right`
        backgroundColor: bgColors[res.resultCode.substring(0, 1)]
    }).showToast();
}

// function getNotificationHistory(callback){
//     $.ajax({
//         type : "POST",
//         url  : '/notification/Notification.do',
//         dataType: "json",
//         data : {
//             task: "select",
//             mode: "list",
//             // data: {
//             //     USER_ID: USER_ID,
//             // }
//         }
//     }).done(function(data){
//         if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data);}
//         let messageList= data.data;
//         if(isFunc(callback)){callback(messageList);}
//     }).fail(function(data){
//         showToastE("통신에 문제가 있습니다.");
//     });
// }

function showNotiToast(message){
    Toastify({
        text: message.CONTENTS,
        duration: -1,
        selector: 'content_section', //id
        gravity: message.GRAVITY || 'top', // top , bottom
        position: message.POSITION || 'right', // `left`, `center` or `right`
        backgroundColor: bgColors.NOTI,
        close: true
    }).showToast();
}

function deleteAllNoti(callback){
    $.ajax({
        type : "POST",
        url  : '/notification/Notification.do',
        dataType: "json",
        data : {
            task: "proc",
            mode: "deleteAll",
        }
    }).done(function(data){
        if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
        if(isFunc(callback)){callback();}
    }).fail(function(data){
        showToastE("통신에 문제가 있습니다.");
    });
}

function deleteEachNoti(NOTI_SEQ) {
	$.ajax({
		type:"POST",
		url: '/notification/Notification.do',
		dataType: "json",
		data: {
			task: "proc",
			mode: "deleteEach",
			NOTI_SEQ: NOTI_SEQ
		}
	}).done(function(data) {
		if(getAjaxResultCodeType(data) == 'E'){showToastFromAjax(data); return;}
	}).fail(function(data){
		showToastE("통신에 문제가 있습니다.");
	});
}