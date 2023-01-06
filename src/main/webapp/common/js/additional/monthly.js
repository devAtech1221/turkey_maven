/*
Monthly 2.2.2 by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

let monthly_data = {};
var member_data;
var filter;//dept_cd

(function ($) {
	"use strict";
	$.fn.extend({
		monthly: function(customOptions) {

			// These are overridden by options declared in footer
			var defaults = {
				dataType: "xml",
				disablePast: false,
				eventList: true,
				events: "",
				jsonUrl: "",
				linkCalendarToEventUrl: false,
				maxWidth: false,
				mode: "event",
				setWidth: false,
				showTrigger: "",
				startHidden: false,
				stylePast: false,
				target: "",
				useIsoDateFormat: false,
				weekStart: 1,	// Monday
				xmlUrl: ""
			};

			var	options = $.extend(defaults, customOptions),
				uniqueId = $(this).attr("id"),
				parent = "#" + uniqueId,
				currentDate = new Date(),
				currentMonth = currentDate.getMonth() + 1,
				currentYear = currentDate.getFullYear(),
				currentDay = currentDate.getDate(),
				locale = (options.locale || defaultLocale()).toLowerCase(),
				monthNameFormat = options.monthNameFormat || "short",
				weekdayNameFormat = options.weekdayNameFormat || "short",
				monthNames = options.monthNames || defaultMonthNames(),
				dayNames = options.dayNames || defaultDayNames(),
				markupBlankDay = '<div class="m-d monthly-day-blank"><div class="monthly-day-number"></div></div>',
				weekStartsOnMonday = options.weekStart === "Mon" || options.weekStart === 1 || options.weekStart === "1",
				primaryLanguageCode = locale.substring(0, 2).toLowerCase(),
				// 오늘날짜를 중심으로 캘린더 출력 변수
				todayCheck = false,
				// 현재 오늘날짜중심 캘린더 출력 상태
				stateCheck = true,
				//현재 페이지 년도
				pageYear = currentYear,
				//현재 페이지 월
				pageMonth = currentMonth;

		if (options.maxWidth !== false) {
			$(parent).css("maxWidth", options.maxWidth);
		}
		if (options.setWidth !== false) {
			$(parent).css("width", options.setWidth);
		}

		if (options.startHidden) {
			$(parent).addClass("monthly-pop").css({
				display: "none",
				position: "absolute"
			});
			$(document).on("focus", String(options.showTrigger), function (event) {
				$(parent).show();
				event.preventDefault();
			});
			$(document).on("click", String(options.showTrigger) + ", .monthly-pop", function (event) {
				event.stopPropagation();
				event.preventDefault();
			});
			$(document).on("click", function () {
				$(parent).hide();
			});
		}

		// Add Day Of Week Titles
		_appendDayNames(weekStartsOnMonday);

		// Add CSS classes for the primary language and the locale. This allows for CSS-driven
		// overrides of the language-specific header buttons. Lowercased because locale codes
		// are case-insensitive but CSS is not.
		$(parent).addClass("monthly-locale-" + primaryLanguageCode + " monthly-locale-" + locale);

		// Add Header & event list markup
		$(parent).prepend('<div class="monthly-header"><div class="monthly-header-title"><a href="#" class="monthly-header-title-date" onclick="return false"></a></div><a href="#" class="monthly-prev"></a><a href="#" class="monthly-next"></a></div>').append('<div class="monthly-event-list"></div>');

		// Set the calendar the first time
		localStorage.filter_btn_group = '';
		localStorage.filter_btn_userId = '';
		localStorage.filter_btn_checked = '';
		//setMonthly(currentMonth, currentYear, localStorage.filter_btn_group);
		
		// How many days are in this month?
		function daysInMonth(month, year) {
			return month === 2 ? (year & 3) || (!(year % 25) && year & 15) ? 28 : 29 : 30 + (month + (month >> 3) & 1);
		}
		function prevDaysInMonth(month, year) {
			let m
			if(month==1){
				m = 12
			}else{
				m = month-1
			}
			return m === 2 ? (year & 3) || (!(year % 25) && year & 15) ? 28 : 29 : 30 + (m + (m >> 3) & 1);
		}
		function nextDaysInMonth(month, year) {
			let m = month + 1;
			return m === 2 ? (year & 3) || (!(year % 25) && year & 15) ? 28 : 29 : 30 + (m + (m >> 3) & 1);
		}

		// Build the month
		function setMonthly(month, year, group, todayCheck) {
			$(parent).data("setMonth", month).data("setYear", year);
			// Get number of days
			var index = 0,
				dayQty = daysInMonth(month, year),
				prevDayQty = prevDaysInMonth(month, year),
				// Get day of the week the first day is
				mZeroed = month - 1,
				firstDay = new Date(year, mZeroed, todayCheck ? currentDay : 1, 0, 0, 0, 0).getDay(),
				settingCurrentMonth = month === currentMonth && year === currentYear;
			// Remove old days
			$(parent + " .monthly-day, " + parent + " .monthly-day-blank").remove();
			$(parent + " .monthly-event-list, " + parent + " .monthly-day-wrap").empty();

			// Print out the days
			for(var dayNumber = todayCheck ? currentDay : 1; dayNumber <= dayQty; dayNumber++) {
				var thisDate = new Date(year, mZeroed, dayNumber, 0, 0, 0, 0);
				var weekendMark = "";
				if(dayNames[thisDate.getDay()] == "토" || dayNames[thisDate.getDay()] == "일"){
					weekendMark = "f_red2";
				}
				// Check if it's a day in the past
				var isInPast = options.stylePast && (
					year < currentYear
					|| (year === currentYear && (
						month < currentMonth
						|| (month === currentMonth && dayNumber < currentDay)
					))),
					innerMarkup = '<div class="monthly-day-number '+ weekendMark +'">' + dayNumber + '</div><div class="monthly-indicator-wrap"></div>';

				if(options.mode === "event") {
					//var thisDate = new Date(year, mZeroed, dayNumber, 0, 0, 0, 0);//if문 밖으로 이동(for문 바로 아래)
					var formDate = thisDate.getFullYear() + '-' + (thisDate.getMonth()+1 < 10 ? ('0' + (thisDate.getMonth()+1)) : (thisDate.getMonth()+1)) + '-' + ((thisDate.getDate() < 10) ? ('0' + thisDate.getDate()) : thisDate.getDate());
					
					$(parent + " .monthly-day-wrap").append("<div"
						+ attr("class", "m-d monthly-day monthly-day-event thisMonth"
							+ (isInPast ? " monthly-past-day" : "")
							// + " dt" + thisDate.toISOString().slice(0, 10)
							+ " dt" + formDate
							)
						+ attr("data-number", dayNumber)
						+ attr("id", formDate)
						+ ">" + innerMarkup + "</div>");
					$(parent + " .monthly-event-list").append("<div"
						+ attr("class", "monthly-list-item")
						+ attr("id", uniqueId + "day" + dayNumber)
						+ attr("data-number", dayNumber)
						+ '><div class="monthly-event-list-date">' + dayNames[thisDate.getDay()] + "<br>" + dayNumber + "</div></div>");
				} else {
					$(parent + " .monthly-day-wrap").append("<a"
						+ attr("href", "#")
						+ attr("class", "m-d monthly-day monthly-day-pick" + (isInPast ? " monthly-past-day" : ""))
						+ attr("data-number", dayNumber)
						+ ">" + innerMarkup + "</a>");
				}
			}

			if (settingCurrentMonth) {
				$(parent + ' *[data-number="' + currentDay + '"]').addClass("monthly-today");
			}

			// Reset button
			// $(parent + " .monthly-header-title").html('<a href="#" class="monthly-header-title-date" onclick="return false">' + monthNames[month - 1] + " " + year + "</a>" + (settingCurrentMonth && $(parent + " .monthly-event-list").hide() ? "" : '<a href="#" class="monthly-reset"></a>'));
			var _week = moment().week();
			var arrowLeftTitle = (g_isMobile == "true" && $(window).width() < 1024) ? '<a href="#" class="monthly-prev"><</a>' : "";
			var arrowRightTitle = (g_isMobile == "true" && $(window).width() < 1024) ? '<a href="#" class="monthly-next">></a>' : "";
			$(parent + " .monthly-header-title").html(arrowLeftTitle+'<a href="#" class="monthly-header-title-date" onclick="return false">' + year + '년 ' + monthNames[month - 1] + '<span class="f_hot">(W' + (_week > 1 ? (_week-1) : moment().subtract(7, 'days').week()) + ')</span></a>'+arrowRightTitle);

			// Account for empty days at start
			if(weekStartsOnMonday) {
				if (firstDay === 0) {
					if(todayCheck){
						_prependBlankDaysToday(13, currentDay-1, thisDate);
					}else{
						_prependBlankDays(6, prevDayQty, thisDate);						
					}
				} else if (firstDay !== 1) {
					if(todayCheck){
						_prependBlankDaysToday(firstDay+6, currentDay-1, thisDate);
					}else{
						_prependBlankDays(firstDay - 1, prevDayQty, thisDate);
					}
				}
			} else if(firstDay !== 7) {
				if(todayCheck){
					/*_prependBlankDays(firstDay+7, currentDay-1, new Date(year, mZeroed+1, dayNumber, 0, 0, 0, 0));*/
					_prependBlankDaysToday(firstDay+7, currentDay-1, thisDate);
				}else{
					_prependBlankDays(firstDay, prevDayQty, thisDate);
				}
			}

			// Account for empty days at end
			var numdays = $(parent + " .monthly-day").length,
				numempty = $(parent + " .monthly-day-blank").length,
				totaldays = numdays + numempty,
				roundup = Math.ceil(totaldays / 7) * 7,
				daysdiff = roundup - totaldays;

			if(todayCheck){		
				// 다음달 일 추가 (오늘날짜기준)	
				// daysdiff = append할 다음달 일자 수
				daysdiff = Math.ceil((daysInMonth(month, year)<29 ? 29 : daysInMonth(month, year)) /7)*7 - totaldays;					
				
				// 출력된 일수가 너무많을경우
				while(daysdiff<0){
					daysdiff += 7;
				}
				
				for(index = 0; index < daysdiff; index++) {
					let nextDate = (thisDate.getMonth()+1 > 11 ? thisDate.getFullYear()+1 : thisDate.getFullYear())
						+'-'+ (thisDate.getMonth()+1 > 11 ? '01' : (thisDate.getMonth()+2 < 10 ? ('0' + (thisDate.getMonth()+2)) : (thisDate.getMonth()+2))) 
						+ (index+1 < 10 ? '-0': '-') + (index+1);
					let nextInnerMarkup = '<div class="monthly-day-number">' + (index+1) + '</div><div class="monthly-indicator-wrap"></div>'
					$(parent + " .monthly-day-wrap").append("<div"
						+ attr("class", "m-d monthly-day monthly-day-event dt" + nextDate)
						+ attr("data-number", (index+1))
						+ attr("id", nextDate)
						+ attr("style", "opacity:0.6") + ">" 
						+ nextInnerMarkup + "</div>");
				}

			}else{
				// 다음달 일 추가
				if(totaldays % 7 !== 0) {
					for(index = 0; index < daysdiff; index++) {
						let nextDate = (thisDate.getMonth()+1 > 11 ? thisDate.getFullYear()+1 : thisDate.getFullYear())
							+'-'+ (thisDate.getMonth()+1 > 11 ? '01' : (thisDate.getMonth()+2 < 10 ? ('0' + (thisDate.getMonth()+2)) : (thisDate.getMonth()+2))) 
							+ '-0' + (index+1);
						let nextInnerMarkup = '<div class="monthly-day-number">' + (index+1) + '</div><div class="monthly-indicator-wrap"></div>'
						$(parent + " .monthly-day-wrap").append("<div"
							+ attr("class", "m-d monthly-day monthly-day-event dt" + nextDate)
							+ attr("data-number", (index+1))
							+ attr("id", nextDate)
							+ attr("style", "opacity:0.6") + ">" 
							+ nextInnerMarkup + "</div>");
					}
				}
			}
			// 한번에 표시되는 일수가 42일(7줄 이상일때)
			while($(parent+" .m-d").length > 42){
				$('.m-d:last-child').remove();
			}
			
			// Events
			if (options.mode === "event") {
				addEvents(month, year);
			}
			
			var divs = $(parent + " .m-d");		
			

						
			for(index = 0; index < divs.length; index += 7) {
				divs.slice(index, index + 7).wrapAll('<div class="monthly-week"></div>');
			}
			
			//TODO - 주말 및 공휴일 setting
			var weeks = $('.monthly-week').size();
			for (var i=0; i<weeks; i++) {
				$('.monthly-week').eq(i).children().eq(0).css('color', 'red');
			}
		}

		function addEvent(event, setMonth, setYear) {
			// Year [0]   Month [1]   Day [2]
			var fullStartDate = _getEventDetail(event, "startdate"),
				fullEndDate = _getEventDetail(event, "enddate"),
				startArr = fullStartDate.split("-"),
				startYear = parseInt(startArr[0], 10),
				startMonth = parseInt(startArr[1], 10),
				startDay = parseInt(startArr[2], 10),
				startDayNumber = startDay,
				endDayNumber = startDay,
				showEventTitleOnDay = startDay,
				startsThisMonth = startMonth === setMonth && startYear === setYear,
				happensThisMonth = startsThisMonth;

			if(fullEndDate) {
				// If event has an end date, determine if the range overlaps this month
				var	endArr = fullEndDate.split("-"),
					endYear = parseInt(endArr[0], 10),
					endMonth = parseInt(endArr[1], 10),
					endDay = parseInt(endArr[2], 10),
					startsInPastMonth = startYear < setYear || (startMonth < setMonth && startYear === setYear),
					endsThisMonth = endMonth === setMonth && endYear === setYear,
					endsInFutureMonth = endYear > setYear || (endMonth > setMonth && endYear === setYear);
				if(startsThisMonth || endsThisMonth || (startsInPastMonth && endsInFutureMonth)) {
					happensThisMonth = true;
					startDayNumber = startsThisMonth ? startDay : startDay-prevDaysInMonth(setMonth, setYear);
					endDayNumber = endsThisMonth ? endDay : daysInMonth(setMonth, setYear)+endDay;
					showEventTitleOnDay = startsThisMonth ? startDayNumber : 1;
				}
				
				// 이번달이 아닌 시작일자와 종료일자가 같은달에 있는 일정
				if(startMonth == endMonth && (setMonth > endMonth || setMonth < endMonth)){
					endDayNumber = endDay;
				}
			}
			/*if(!happensThisMonth) {
				return;
			}*/

			var startTime = _getEventDetail(event, "starttime"),
				endTime = _getEventDetail(event, "endtime"),
				timeHtml = "",
				eventURL = _getEventDetail(event, "url"),
				eventTitle = _getEventDetail(event, "title"),
				eventClass = _getEventDetail(event, "class"),
				eventColor = _getEventDetail(event, "color"),
				eventId = _getEventDetail(event, "calendarCD"),
				/* custom dwkim */
				eventMember = _getEventDetail(event, "member"),
				eventComplete = _getEventDetail(event, "complete"),
				eventLevel = _getEventDetail(event, "level"),
				eventConfirm = _getEventDetail(event, "confirmYN"),
				eventPublic = _getEventDetail(event, "publicYN"),
				eventOwn = _getEventDetail(event, "writer"),
				eventGroupCD = _getEventDetail(event, "groupCD"),
				eventGroup = _getEventDetail(event, "group"),
				
				customClass = eventClass ? " " + eventClass : "",
				//완료 시 취소선
				compCss = (eventComplete == "Y") ? "text-decoration: line-through;" : "",
				dayStartTag = "<div",
				dayEndTags = "</span></div>";
				
			//내가 포함된 일정인 경우 #c2cdea8c 제출항목일 경우 #ffdcdc
			var ownCss = ""
			if(eventLevel==4){
				ownCss = "background: #ffdcdc;"
			}else if(eventMember.includes(g_uname)) {
				ownCss = "background: #c2cdea8c;";
			}

			if(startTime){
				var member = " [ " + '<div class="monthly-list-time-start">' + eventMember + '</div> ]';
				var endTime = _getEventDetail(event, "endtime");
				timeHtml = '<div><div class="monthly-list-time-start">' + formatTime(startTime) + "</div>"
					+ (endTime ? '<div class="monthly-list-time-end">' + formatTime(endTime) + "</div>" + member : member)
					+ "</div>";
				startTime = "("+startTime+")";
			}

			if(options.linkCalendarToEventUrl && eventURL) {
				dayStartTag = "<a" + attr("href", eventURL);
				dayEndTags = "</span></a>";
			}
			
			var markupDayInitStyle = (g_isMobile == "true" && $(window).width() < 1024) ? "" : "padding:2px;background:#fff;color:#484848;border-bottom:1px dashed #ccc;";
			var	markupDayStart = dayStartTag
					+ attr("data-eventid", eventId)
					+ attr("title", eventTitle)
					+ attr("data-complete", eventComplete)
					// BG and FG colors must match for left box shadow to create seamless link between dates
//					+ (eventColor ? attr("style", "background:" + eventColor + ";color:" + eventColor) : ""),
//					+ (eventColor ? attr("style", "padding: 2px; background:#fff; color:#484848; border-bottom:1px dashed #ccc;"+ownCss) : ""),
					+ attr("style", markupDayInitStyle+ownCss+compCss),
				markupListEvent = "<a"
					+ attr("href", "#")
					+ attr("class", "listed-event " + customClass)
					+ attr("data-eventid", eventId)
					+ attr("style", ownCss + compCss)
					// + (eventColor ? attr("style", "background:" + eventColor) : "")	
					+ ">" + eventTitle + " " + timeHtml + "</a>";
			
			for(var index = startDayNumber; index <= endDayNumber; index++) {
				//var doShowTitle = index === showEventTitleOnDay;
				let thisMonthDay = startMonth < setMonth ? prevDaysInMonth(setMonth, setYear) : daysInMonth(setMonth, setYear);
				let regYear = startYear;
				let regMonth = startMonth;
				let regDate = index;
				
				// EndDate 값이 있을경우
				if(fullEndDate && startMonth != endMonth){
					// 출력된 리스트 중 현재 페이지 setMonth, setYear보다 이전날짜인 경우(지난 달 부터 이번 달까지 이어지는 일정)
					if(startMonth < setMonth || startYear < setYear){
						if(regDate <= 0){
							regDate = regDate + prevDaysInMonth(setMonth, setYear);
						}else{
							regMonth++
							if(regMonth > 12){
								regMonth=1
								regYear++;
							}
						}
					}
					// 현재 페이지 month의 day보다 더 값이 클 경우(이번 달 부터 다음 달 까지 이어지는 일정)
					if(regDate > thisMonthDay || (index == thisMonthDay && startMonth < setMonth)){
						// 시작날짜가 이번달 이전달, 종료날짜가 이번달 이후달일때
						if(startMonth < setMonth && endMonth > setMonth){
							thisMonthDay = daysInMonth(setMonth, setYear);							
						}
						regDate = regDate%thisMonthDay;
						regMonth++
						if(regMonth > 12){
							regMonth=1
							regYear++;
						}					
					}
				}
				
				var doShowTitle = isNull(fullEndDate) ? false : true;
				var _confirmClass = (eventConfirm == "N") ? "f_gray" : "";
				var _groupClass = makeGroupBadge(eventGroupCD);
//				startTime = (startTime == "") ? "" : "("+startTime+")";
				
				// 모바일에서 접속하였는가?
				if(g_isMobile == "true" && $(window).width() < 1024){
					//공개 일정인가?
					if(eventPublic == "Y"){
						//모바일일 경우, 하루에 일정이 여러개라도 한번만 표기				
						if($(parent + ' #'+regYear + '-' + (regMonth<10 ? '0'+regMonth : regMonth) + '-' + (regDate<10 ? '0'+regDate : regDate) + ' .monthly-indicator-wrap .monthly-event-indicator').length == 0){
							$(parent + ' #'+regYear + '-' + (regMonth<10 ? '0'+regMonth : regMonth) + '-' + (regDate<10 ? '0'+regDate : regDate) + ' .monthly-indicator-wrap').append(markupDayStart
									+ attr("class", "monthly-event-indicator" + customClass + (doShowTitle ? "" : " monthly-event-continued"))
									+ ">" + "<span class='f_black fb'>●</span>"
									+ dayEndTags);
						}
					}else{
						//비공개 일정을 내가 등록하였는가?
						if(eventOwn == g_uname){
							if($(parent + ' #'+regYear + '-' + (regMonth<10 ? '0'+regMonth : regMonth) + '-' + (regDate<10 ? '0'+regDate : regDate) + ' .monthly-indicator-wrap .monthly-event-indicator').length == 0){
							$(parent + ' #'+regYear + '-' + (regMonth<10 ? '0'+regMonth : regMonth) + '-' + (regDate<10 ? '0'+regDate : regDate) + ' .monthly-indicator-wrap').append(markupDayStart
									+ attr("class", "monthly-event-indicator" + customClass + (doShowTitle ? "" : " monthly-event-continued"))
									+ ">" + "<span class='f_black fb'>●</span>"
									+ dayEndTags);
							}
						}else{
							//내꺼 아니네
							continue;
						}
					}
				}else{
					//공개 일정인가?
					if(eventPublic == "Y"){
						// Add to calendar view
						$(parent + ' #'+regYear + '-' + (regMonth<10 ? '0'+regMonth : regMonth) + '-' + (regDate<10 ? '0'+regDate : regDate) + ' .monthly-indicator-wrap').append(
								markupDayStart
								+ attr("class", "monthly-event-indicator" + customClass
									// Include a class marking if this event continues from the previous day
									+ (doShowTitle ? "" : " monthly-event-continued")
									)
								+ ">"
								+ "<span class='"+_groupClass+"' style='float:left; width:25px; height:28px; line-height:28px; border-radius:0;'>" + eventGroup + "</span>"
								/* custom dwkim */
								+ "<span class='ta_left schedule_member " + _confirmClass + "' style='color:#333;text-indent:5px;'>" + startTime + " " + (doShowTitle ? eventTitle : "") + "<br />"
								+ "&nbsp;&nbsp;" + eventMember + "<br />"
								+ dayEndTags);
						// Add to event list
						if(happensThisMonth){
							$(parent + ' .monthly-list-item[data-number="' + index + '"]').addClass("item-has-event").append(markupListEvent);
						}
					}else{
						//비공개 일정을 내가 등록하였는가?
						if(eventOwn == g_uname){
							// Add to calendar view
							$(parent + ' #'+regYear + '-' + (regMonth<10 ? '0'+regMonth : regMonth) + '-' + (regDate<10 ? '0'+regDate : regDate) + ' .monthly-indicator-wrap').append(
									markupDayStart
									+ attr("class", "monthly-event-indicator" + customClass
										// Include a class marking if this event continues from the previous day
										+ (doShowTitle ? "" : " monthly-event-continued")
										)
									+ ">"
									+ "<span class='"+_groupClass+"' style='float:left; width:25px; height:28px; line-height:28px; border-radius:0;'> - </span>"
									+ "<span class='ta_left schedule_member " + _confirmClass + "' style='color:#333;text-indent:5px;'>" + startTime + " " + (doShowTitle ? eventTitle : "") + "<br />"
									+ "&nbsp;&nbsp;" + eventMember + "<br />"
									+ dayEndTags);
							// Add to event list
							if(happensThisMonth){
								$(parent + ' .monthly-list-item[data-number="' + index + '"]').addClass("item-has-event").append(markupListEvent);
							}
						}else{
							//내꺼 아니네
							continue;
						}
					}
				}
								
			}
			
			$.each($('.monthly-day-wrap').find('div.monthly-day-event'), function(i){
				if($('.monthly-day-event').eq(i).find('.monthly-indicator-wrap').children().length > 0){
					$('.monthly-day-event').eq(i).addClass('on');
				}else{
					$('.monthly-day-event').eq(i).removeClass('on');
				}
			});
		}

		function addEvents(month, year) {	
			if(options.events) {
				// Prefer local events if provided
				addEventsFromString(options.events, month, year);
			} else {
				var remoteUrl = options.dataType === "xml" ? options.xmlUrl : options.jsonUrl;
				
				addEventsFromString(remoteUrl, month, year);
				
//				if(remoteUrl) {
//					// Replace variables for month and year to load from dynamic sources
//					var url = String(remoteUrl).replace("{month}", month).replace("{year}", year);
//					$.get(url, {now: $.now()}, function(data) {
//						addEventsFromString(data, month, year);
//					}, options.dataType).fail(function() {
//						console.error("Monthly.js failed to import " + remoteUrl + ". Please check for the correct path and " + options.dataType + " syntax.");
//					});
//				}
			}
		}

		function addEventsFromString(events, setMonth, setYear) {	
			if (options.dataType === "xml") {
				$(events).find("event").each(function(index, event) {
					addEvent(event, setMonth, setYear);
				});
			} else if (options.dataType === "json") {
				let result = localStorage.filter_btn_group;
				result = (result == "") ? "" : result;
				// 현재 달력 첫 칸 id
				let prevDay=$(".monthly-day:first-child").attr('id');
				// 현재 달력 마지막 칸 id
				let nextDay=$(".monthly-day:last-child").attr('id');
				$.ajax({
			        type : "POST",
			        url  : "/main/Main.do",
			        dataType: "json",
			        data : {
			            task: "select",
			            mode: "selectPlanList",
						YEAR : prevDay,
						MONTH : nextDay,
			            /*YEAR: setYear,
			            MONTH: setMonth,*/
			            DEPT_CD: result,
						USER_ID: localStorage.filter_btn_userId,
						IS_CHECKED: localStorage.filter_btn_checked
			        }
			    }).done(function(data){
			    	if(data.resultCode == ""){ return showToastW("데이터를 가져오는데 문제가 있습니다."); }
					if(data.monthly == null){ return showToastW("데이터가 없습니다.");}
					
					$.each(data.monthly, function(index, event) {
						addEvent(event, setMonth, setYear);
					});
					monthly_data = data.monthly;
			    }).fail(function(data){
			    	showToastE("통신에 문제가 있습니다.");
					if(isFunc(func_fail)){func_fail(data);}
			    });
			}
		}

		function attr(name, value) {
			var parseValue = String(value);
			var newValue = "";
			for(var index = 0; index < parseValue.length; index++) {
				switch(parseValue[index]) {
					case "'": newValue += "&#39;"; break;
					case "\"": newValue += "&quot;"; break;
					case "<": newValue += "&lt;"; break;
					case ">": newValue += "&gt;"; break;
					default: newValue += parseValue[index];
				}
			}
			return " " + name + "=\"" + newValue + "\"";
		}

		function _appendDayNames(startOnMonday) {
			var offset = startOnMonday ? 1 : 0,
				dayName = "",
				dayIndex = 0;
			for(dayIndex = 0; dayIndex < 6; dayIndex++) {
				dayName += "<div>" + dayNames[dayIndex + offset] + "</div>";
			}
			dayName += "<div>" + dayNames[startOnMonday ? 0 : 6] + "</div>";
			$(parent).append('<div class="atech_theme1 monthly-day-title-wrap">' + dayName + '</div><div class="monthly-day-wrap "></div>');
		}

		// Detect the user's preferred language
		function defaultLocale() {
			if(navigator.languages && navigator.languages.length) {
				return navigator.languages[0];
			}
			return navigator.language || navigator.browserLanguage;
		}

		// Use the user's locale if possible to obtain a list of short month names, falling back on English
		function defaultMonthNames() {
			if(typeof Intl === "undefined") {
				return ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			}
			var formatter = new Intl.DateTimeFormat(locale, {month: monthNameFormat});
			var names = [];
			for(var monthIndex = 0; monthIndex < 12; monthIndex++) {
				var sampleDate = new Date(2017, monthIndex, 1, 0, 0, 0);
				names[monthIndex] = formatter.format(sampleDate);
			}
			return names;
		}

		function formatDate(year, month, day) {
			if(options.useIsoDateFormat) {
				return new Date(year, month - 1, day, 0, 0, 0).toISOString().substring(0, 10);
			}
			if(typeof Intl === "undefined") {
				return month + "/" + day + "/" + year;
			}
			return new Intl.DateTimeFormat(locale).format(new Date(year, month - 1, day, 0, 0, 0));
		}

		// Use the user's locale if possible to obtain a list of short weekday names, falling back on English
		function defaultDayNames() {
			if(typeof Intl === "undefined") {
				return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			}
			var formatter = new Intl.DateTimeFormat(locale, {weekday: weekdayNameFormat}),
				names = [],
				dayIndex = 0,
				sampleDate = null;
			for(dayIndex = 0; dayIndex < 7; dayIndex++) {
				// 2017 starts on a Sunday, so use it to capture the locale's weekday names
				sampleDate = new Date(2017, 0, dayIndex + 1, 0, 0, 0);
				names[dayIndex] = formatter.format(sampleDate);
			}
			return names;
		}

		// 지난달 일 붙이기
		function _prependBlankDays(count, prevMonth, thisDate) {
			var wrapperEl = $(parent + " .monthly-day-wrap"),
				index = 0;
			for(index = 0; index < count; index++) {
				let prevDate = (thisDate.getMonth()+1 < 2 ? thisDate.getFullYear()-1 : thisDate.getFullYear()) 
					+ '-' + (thisDate.getMonth() < 10 ? (thisDate.getMonth() < 1 ? '12' : '0' + (thisDate.getMonth())) : thisDate.getMonth()) 
					+ '-' + (prevMonth-index);
				let prevInnerMarkup = '<div class="monthly-day-number">' + (prevMonth-index) + '</div><div class="monthly-indicator-wrap"></div>';
				wrapperEl.prepend("<div" 
					+ attr("class", "m-d monthly-day monthly-day-event dt"+prevDate)
					+ attr("data-number", (prevMonth-index))
					+ attr("id", prevDate)
					+ attr("style", "opacity:0.6") +">"
					+ prevInnerMarkup + "</div>");
			}
		}
		
		// 지난달 일 붙이기 (오늘 날짜 기준)
		function _prependBlankDaysToday(count, prevMonth, thisDate){
			var wrapperEl = $(parent + " .monthly-day-wrap"),
				index = 0;
				
			for(index = 0; index < count; index++) {
				let	prevYear = thisDate.getFullYear(),
					prevMonths = thisDate.getMonth()+1,
					prevDay = prevMonth-index;
					
				// 오늘 기준 이전일
				let dateNum = prevDay < 10 ? prevDay < 1 ? prevDaysInMonth(prevMonths, prevYear)+prevDay : '0'+(prevDay) : prevDay;	
				// 오늘 기준 달(prevDay값이 0보다 작을경우 이전달)
				let finalMonth = prevDay < 1 ? (prevMonths < 2 ? '12' : prevMonths-1) : prevMonths
				// 오늘 기준 년(prevDay값이 0보다 작고 현재 1월달일경우 이전년)
				let finalYear = prevMonths < 2 ? ( prevDay < 1 ? prevYear-1 : prevYear) : prevYear
				
				if(finalMonth<10){
					finalMonth = '0'+finalMonth;
				}
					
				let prevDate = finalYear
					+ '-' + finalMonth
					+ '-' + dateNum;
				let prevInnerMarkup = '<div class="monthly-day-number">' + parseInt(dateNum) + '</div><div class="monthly-indicator-wrap"></div>';
				wrapperEl.prepend("<div" 
					+ attr("class", "m-d monthly-day monthly-day-event dt"+prevDate)
					+ attr("data-number", parseInt(dateNum))
					+ attr("id", prevDate)
					+ ((finalYear + finalMonth) < (prevYear + (prevMonths<10 ? '0'+(prevMonths) : prevMonths)) ? attr("style", "opacity:0.6") : attr("style", "opacity:1")) +">"
					+ prevInnerMarkup + "</div>");
			}
		}

		function _getEventDetail(event, nodeName) {
			return options.dataType === "xml" ? $(event).find(nodeName).text() : event[nodeName];
		}

		// Returns a 12-hour format hour/minute with period. Opportunity for future localization.
		function formatTime(value) {
			var timeSplit = value.split(":");
			var hour = parseInt(timeSplit[0], 10);
			var period = "AM";
			if(hour > 12) {
				hour -= 12;
				period = "PM";
			} else if (hour == 12) {
				period = "PM";
			} else if(hour === 0) {
				hour = 12;
			}
			return hour + ":" + String(timeSplit[1]) + " " + period;
		}

		function setNextMonth() {
			var	setMonth = $(parent).data("setMonth"),
				setYear = $(parent).data("setYear"),
				newMonth = setMonth === 12 ? 1 : setMonth + 1,
				newYear = setMonth === 12 ? setYear + 1 : setYear;
			pageYear = newYear;
			pageMonth = newMonth;
			setMonthly(newMonth, newYear, localStorage.filter_btn_group, false);
			todayCheck = false;
			stateCheck = false;
			viewToggleButton();
		}

		function setPreviousMonth() {
			var setMonth = $(parent).data("setMonth"),
				setYear = $(parent).data("setYear"),
				newMonth = setMonth === 1 ? 12 : setMonth - 1,
				newYear = setMonth === 1 ? setYear - 1 : setYear;
			pageYear = newYear;
			pageMonth = newMonth;
			setMonthly(newMonth, newYear, localStorage.filter_btn_group, false);
			todayCheck = false;
			stateCheck = false;
			viewToggleButton();
		}

		// Function to go back to the month view
		function viewToggleButton() {
			if($(parent + " .monthly-event-list").is(":visible")) {
				$(parent + " .monthly-cal").remove();
//				$(parent + " .monthly-header-title").prepend('<a href="#" class="monthly-cal"></a>');
			}
		}

		// Advance months
		$(document.body).on("click", ".monthly-next", function (event) {
			setNextMonth();
			event.preventDefault();
			event.stopPropagation();
		});

		// Go back in months
		$(document.body).on("click", ".monthly-prev", function (event) {
			setPreviousMonth();
			event.preventDefault();
			event.stopPropagation();
		});

		// Reset Month
		$(document.body).on("click", ".monthly-reset", function (event) {
			stateCheck = todayCheck;
			pageYear = currentYear;
			pageMonth = currentMonth;
			if(todayCheck){
				setMonthly(currentMonth, currentYear, localStorage.filter_btn_group, todayCheck);
				todayCheck = false;
			}else{
				setMonthly(currentMonth, currentYear, localStorage.filter_btn_group, todayCheck);
				todayCheck = true;
			}
			viewToggleButton();
			event.preventDefault();
			event.stopPropagation();
		});

		// Back to month view
		$(document.body).on("click", ".monthly-cal", function (event) {
			$(parent + " .monthly-event-list").css("transform", "scale(0)");
			$(parent + " .monthly-event-list").hide();
			event.preventDefault();
		});

		// Click A Day
		$(document.body).on("click touchstart", " .monthly-list", function (event) {
			// If events, show events list
			// var whichDay = $(this).data("number");			
			//var whichDay = $(parent).find('.monthly-day-event').data("number");
			var whichDay = $(parent).find('.thisMonth').data("number");
			if(options.mode === "event" && options.eventList) {
				var	theList = $(parent + " .monthly-event-list"),
					myElement = document.getElementById(uniqueId + "day" + whichDay),
					topPos = myElement.offsetTop;
				theList.show();
				theList.css("transform");
				theList.css("transform", "scale(1)");
				$(parent + ' .monthly-list-item[data-number="' + whichDay + '"]').show();
				theList.scrollTop(topPos);
				viewToggleButton();
				if(!options.linkCalendarToEventUrl){ event.preventDefault(); }
			// If picker, pick date
			} else if (options.mode === "picker") {
				var	setMonth = $(parent).data("setMonth"),
					setYear = $(parent).data("setYear");
				// Should days in the past be disabled?
				if($(this).hasClass("monthly-past-day") && options.disablePast) {
					// If so, don't do anything.
					event.preventDefault();
				} else {
					// Otherwise, select the date ...
					$(String(options.target)).val(formatDate(setYear, setMonth, whichDay));
					// ... and then hide the calendar if it started that way
					if(options.startHidden) {
						$(parent).hide();
					}
				}
				event.preventDefault();
			}
		});

		// Clicking an event within the list
		$(document.body).on("click", parent + " .listed-event", function (event) {
			var href = $(this).attr("href");
			// If there isn't a link, don't go anywhere
			if(!href){ event.preventDefault(); }
		});
		
		/* open complete popup */
	    $(document.body).on("mousedown", parent + " .monthly-day .monthly-event-indicator", function (e) {
	    	let mem = $(this).find('.schedule_member').text();
	    	if(e.button == 2){
	    		var comp = ($(this).data("complete") == "N") ? "Y" : "N";
	    		var ownAuth = (mem.includes(g_uname)) ? true : false;
	    		if(g_admin == "N"){
	    			if(g_auth == "1" || g_auth == "2" || g_auth == "5"){
	    				updateScheduleComplete($(this).data("eventid"), comp, g_admin);
	    			}else{
	    				if(!ownAuth){
		    				showToastE("본인의 일정만 종료할 수 있습니다.");
		    			}else{
		    				updateScheduleComplete($(this).data("eventid"), comp, g_admin);
		    			}
	    			}
	    		}else{
	    			updateScheduleComplete($(this).data("eventid"), comp, g_admin);
	    		}
	    	}
	    });
		
		/* event */
//	    $(document.body).unbind('keydown').bind('keydown', function(e){
//	    	if(!$('.modal').hasClass('show')){
//	    		if($('#schedule').hasClass('active')){
//	    			//q : 이전달r
//			    	if(e.keyCode == 81 || e.which == 81){
//			    		$(".monthly-prev").trigger('click');
//						event.preventDefault();
//			    	}
//			    	//w : 다음달
//			    	if(e.keyCode == 87 || e.which == 87){
//			    		$(".monthly-next").trigger('click');
//						event.preventDefault();
//			    	}
//	    		}
//	    	}
//	    });
	    
	    /* event : filter */
	    page_prop.$btnGroupWrapper.on('click', 'button', function(){
	    	page_prop.$btnGroupWrapper.find('button').removeClass('selected');
	    	var	mm = $(parent).data("setMonth"),
				yyyy = $(parent).data("setYear");
	        let deptCD = $(this).data('value');
	        
	        $(this).addClass('selected');
	        localStorage.filter_btn_group = deptCD;

	        setMonthly(pageMonth, pageYear, localStorage.filter_btn_group, stateCheck);
	    });
	    page_prop.$btnFilterWrapper.on('click', 'button', function(){
			let val = $(this).data('value');
			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
				if($(this).hasClass('btn_uid')){
					localStorage.filter_btn_userId = "";
				}else{
					localStorage.filter_btn_checked = "";
				}
			}else{
				$(this).addClass('selected');
				if($(this).hasClass('btn_uid')){
					localStorage.filter_btn_userId = val;
				}else{
					localStorage.filter_btn_checked = val;
				}
			}
			setMonthly(pageMonth, pageYear, localStorage.filter_btn_group, stateCheck);
		});
		

	    function updateScheduleComplete(id, comp, admin){
	    	$.ajax({
	            type : "POST",
	            url  : "/main/Main.do",
	            data : {
	                task: "proc",
	                mode: "updateStatus",
	                type: "schedule",
	                data: {
	                	 CALENDAR_CD: id,
	                	 COMPLETE_YN: comp
	                }
	            }
	        }).done(function(data){
	        	let adm = (admin == "Y") ? "[ * ]" : "";
	        	(comp=="Y") ? showToastI(adm+"일정이 종료되었습니다.") : showToastE(adm+"roll-back!");
				var setMonth = $(parent).data("setMonth"),
					setYear = $(parent).data("setYear");
				setMonthly(setMonth, setYear, localStorage.filter_btn_group, stateCheck);
	    		viewToggleButton();
	        }).fail(function(data){
	        	showToastE("통신에 문제가 있습니다.");
	    		if(isFunc(func_fail)){func_fail(data);}
	        });
	    }
	}
	});
}(jQuery));

