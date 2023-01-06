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
				weekStart: 0,	// Sunday
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
				primaryLanguageCode = locale.substring(0, 2).toLowerCase();


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
		//setMonthly(currentMonth, currentYear, localStorage.filter_btn_group);
		
		// How many days are in this month?
		function daysInMonth(month, year) {
			return month === 2 ? (year & 3) || (!(year % 25) && year & 15) ? 28 : 29 : 30 + (month + (month >> 3) & 1);
		}

		// Build the month
		function setMonthly(month, year, group) {
			$(parent).data("setMonth", month).data("setYear", year);
			// Get number of days
			var index = 0,
				dayQty = daysInMonth(month, year),
				// Get day of the week the first day is
				mZeroed = month - 1,
				firstDay = new Date(year, mZeroed, 1, 0, 0, 0, 0).getDay(),
				settingCurrentMonth = month === currentMonth && year === currentYear;

			// Remove old days
			$(parent + " .monthly-day, " + parent + " .monthly-day-blank").remove();
			$(parent + " .monthly-event-list, " + parent + " .monthly-day-wrap").empty();
			// Print out the days
			for(var dayNumber = 1; dayNumber <= dayQty; dayNumber++) {
				// Check if it's a day in the past
				var isInPast = options.stylePast && (
					year < currentYear
					|| (year === currentYear && (
						month < currentMonth
						|| (month === currentMonth && dayNumber < currentDay)
					))),
					innerMarkup = '<div class="monthly-day-number">' + dayNumber + '</div><div class="monthly-indicator-wrap"></div>';
				if(options.mode === "event") {
					var thisDate = new Date(year, mZeroed, dayNumber, 0, 0, 0, 0);
					let formDate = thisDate.getFullYear() + '-' + (thisDate.getMonth()+1 < 10 ? ('0' + (thisDate.getMonth()+1)) : (thisDate.getMonth()+1)) + '-' + ((thisDate.getDate() < 10) ? ('0' + thisDate.getDate()) : thisDate.getDate());
					
					$(parent + " .monthly-day-wrap").append("<div"
						+ attr("class", "m-d monthly-day monthly-day-event"
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
			$(parent + " .monthly-header-title").html('<a href="#" class="monthly-header-title-date" onclick="return false">' + year + '년 ' + monthNames[month - 1] + "<span class='f_hot'>(W" + (_week-1) + ")</span></a>");

			// Account for empty days at start
			if(weekStartsOnMonday) {
				if (firstDay === 0) {
					_prependBlankDays(6);
				} else if (firstDay !== 1) {
					_prependBlankDays(firstDay - 1);
				}
			} else if(firstDay !== 7) {
				_prependBlankDays(firstDay);
			}

			// Account for empty days at end
			var numdays = $(parent + " .monthly-day").length,
				numempty = $(parent + " .monthly-day-blank").length,
				totaldays = numdays + numempty,
				roundup = Math.ceil(totaldays / 7) * 7,
				daysdiff = roundup - totaldays;
			if(totaldays % 7 !== 0) {
				for(index = 0; index < daysdiff; index++) {
					$(parent + " .monthly-day-wrap").append(markupBlankDay);
				}
			}

			// Events
			if (options.mode === "event") {
				addEvents(month, year);
			}
			var divs = $(parent + " .m-d");
			for(index = 0; index < divs.length; index += 7) {
				divs.slice(index, index + 7).wrapAll('<div class="monthly-week"></div>');
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
					startDayNumber = startsThisMonth ? startDay : 1;
					endDayNumber = endsThisMonth ? endDay : daysInMonth(setMonth, setYear);
					showEventTitleOnDay = startsThisMonth ? startDayNumber : 1;
				}
			}
			if(!happensThisMonth) {
				return;
			}

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
			
			//내가 포함된 일정인 경우 배경색 적용
			var ownCss = (eventMember.includes(g_uname)) ? "background: #c2cdea8c;" : "";

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
			
			var	markupDayStart = dayStartTag
					+ attr("data-eventid", eventId)
					+ attr("title", eventTitle)
					+ attr("data-complete", eventComplete)
					// BG and FG colors must match for left box shadow to create seamless link between dates
//					+ (eventColor ? attr("style", "background:" + eventColor + ";color:" + eventColor) : ""),
//					+ (eventColor ? attr("style", "padding: 2px; background:#fff; color:#484848; border-bottom:1px dashed #ccc;"+ownCss) : ""),
					+ attr("style", "padding:2px;background:#fff;color:#484848;border-bottom:1px dashed #ccc;"+ownCss+compCss),
				markupListEvent = "<a"
					+ attr("href", "#")
					+ attr("class", "listed-event " + customClass)
					+ attr("data-eventid", eventId)
					+ attr("style", ownCss + compCss)
					// + (eventColor ? attr("style", "background:" + eventColor) : "")	
					+ ">" + eventTitle + " " + timeHtml + "</a>";
			
			for(var index = startDayNumber; index <= endDayNumber; index++) {
				//var doShowTitle = index === showEventTitleOnDay;
				var doShowTitle = isNull(fullEndDate) ? false : true;
				var _confirmClass = (eventConfirm == "N") ? "f_gray" : "";
				var _groupClass = makeGroupBadge(eventGroupCD);
//				startTime = (startTime == "") ? "" : "("+startTime+")";
				
				//공개 일정인가?
				if(eventPublic == "Y"){
					// Add to calendar view
					$(parent + ' *[data-number="' + index + '"] .monthly-indicator-wrap').append(
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
					$(parent + ' .monthly-list-item[data-number="' + index + '"]').addClass("item-has-event").append(markupListEvent);
				}else{
					//비공개 일정을 내가 등록하였는가?
					if(eventOwn == g_uname){
						// Add to calendar view
						$(parent + ' *[data-number="' + index + '"] .monthly-indicator-wrap').append(
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
						$(parent + ' .monthly-list-item[data-number="' + index + '"]').addClass("item-has-event").append(markupListEvent);
					}else{
						//내꺼 아니네
						continue;
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
				
				$.ajax({
			        type : "POST",
			        url  : "/main/Main.do",
			        dataType: "json",
			        data : {
			            task: "select",
			            mode: "selectPlanList",
			            YEAR: setYear,
			            MONTH: setMonth,
			            DEPT_CD: result
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

		function _prependBlankDays(count) {
			var wrapperEl = $(parent + " .monthly-day-wrap"),
				index = 0;
			for(index = 0; index < count; index++) {
				wrapperEl.prepend(markupBlankDay);
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
			setMonthly(newMonth, newYear, localStorage.filter_btn_group);
			viewToggleButton();
		}

		function setPreviousMonth() {
			var setMonth = $(parent).data("setMonth"),
				setYear = $(parent).data("setYear"),
				newMonth = setMonth === 1 ? 12 : setMonth - 1,
				newYear = setMonth === 1 ? setYear - 1 : setYear;
			setMonthly(newMonth, newYear, localStorage.filter_btn_group);
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
			setMonthly(currentMonth, currentYear, localStorage.filter_btn_group);
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
			var whichDay = $(parent).find('.monthly-day-event').data("number");
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
	    	page_prop.$btnGroupList.removeClass('selected');
	    	var	mm = $(parent).data("setMonth"),
				yyyy = $(parent).data("setYear");
	        let deptCD = $(this).data('value');
	        
	        $(this).addClass('selected');
	        localStorage.filter_btn_group = deptCD;

	        setMonthly(currentMonth, currentYear, localStorage.filter_btn_group);
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
	    		setMonthly(currentMonth, currentYear, localStorage.filter_btn_group);
	    		viewToggleButton();
	        }).fail(function(data){
	        	showToastE("통신에 문제가 있습니다.");
	    		if(isFunc(func_fail)){func_fail(data);}
	        });
	    }
	}
	});
}(jQuery));

