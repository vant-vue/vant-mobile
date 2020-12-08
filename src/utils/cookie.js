
export const userinfo = "ld_ulk";
export const domains = document.domain;
export function getDomain() {
	var h = window.location.href.substr(7);
	var end = h.indexOf("/");
	var temp = h.substr(0, end).split(".");
	var len = temp.length;
	return "." + temp[len - 2] + "." + temp[len - 1];
}

export function getCookie(name, isEncode) {
	var start = document.cookie.indexOf(name + "=");
	if (start == -1)
		return null;
	var len = start + name.length + 1;
	var end = document.cookie.indexOf(';', len);
	if (end == -1)
		end = document.cookie.length;
	var retValue = "";
	if (isEncode) {
		// retValue = decodeURI (document.cookie.substring(len, end))getCookie;
		retValue = unescape(document.cookie.substring(len, end));
	} else {
		retValue = document.cookie.substring(len, end);
	}
	return retValue;
}


export function getLocalStorage(name, isEncode){
	var storage = localStorage.getItem(name);
	if (isEncode) {
		storage = decodeURI(storage);
	} 
	if(!storage||storage=='null'){
		 setLocalStorage();
		 storage = localStorage.getItem(name);
	}
	return storage;
}
export function setLocalStorage(name, value, isEncode) {
	if(!name&&!value){
		name = userinfo;
		value = getCookie(name);
		if(value){
			localStorage.setItem(userinfo, value);
		}
	}
	if (isEncode&&value) {
		value = encodeURI(value);
	}
	if(value){
		localStorage.setItem(name, value);
	}
}


export function setCookie(name, value, expires, isEncode) {
	var expires_date;
	if(!expires){
		expires = 100;
	}
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
		var today = new Date();
		expires_date = new Date(today.getTime() + (expires));
	}
	if (isEncode) {
		value = encodeURI(value);
	}
	document.cookie = name + '=' + value + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ';path=/'
			+ ((getDomain()) ? ';domain=' + getDomain() : '');
}

export function deleteCookie(name,isLocal) {
	if(isLocal){
		localStorage.removeItem(name);
	}
	if (getCookie(name)!=null && getCookie(name)!="") {
		document.cookie = name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}
	return getCookie(name);
}

export function deleteCookieUser(isLocal) {
	deleteCookie(userinfo,isLocal);
}

export function getUserloginInfo(name,isLocal) {
	var userLoginInfo;
	if(!isLocal){
		userLoginInfo= getCookie(name);
	}else{
		userLoginInfo = getLocalStorage(name);
	}
	if (userLoginInfo != null && userLoginInfo != '' && userLoginInfo != "\"\"" && userLoginInfo != "null" && userLoginInfo.length != 0) {
		return decodeURIComponent(userLoginInfo).split('_');
	}
	return null;
}

export function getUserId(isLocal) {
	var cookieUserId = getUserloginInfo(userinfo) != null ? getUserloginInfo(userinfo)[1] : '';;
	var strageUserId = getUserloginInfo(userinfo,isLocal) != null ? getUserloginInfo(userinfo,isLocal)[1] : '';
	if(cookieUserId||strageUserId!=strageUserId){
		localStorage.setItem(userinfo, getCookie(userinfo));
		return cookieUserId;
	}
	if(!strageUserId){
		var href = window.location.href;
		if(href.indexOf("loginMessage")!=-1){
			var loginMessage = getParmUrl(href).loginMessage;
			if(isLocal){
				localStorage.setItem(userinfo, loginMessage);
			}else{
				setCookie(userinfo, loginMessage);
			}
			//return;
			strageUserType = getUserloginInfo(userinfo,isLocal) != null ? getUserloginInfo(userinfo,isLocal)[1] : '';
		}
	}
	return strageUserId;
}



export function getUserName(isLocal) {
	return getUserloginInfo(userinfo,isLocal) != null ? getUserloginInfo(userinfo,isLocal)[3] : '';
}

export function getHeadersLocalStorage(){
	var userInfoS = getLocalStorage(userinfo);
	var message = getCookie("message_code");
	var mp = {};
	mp[userinfo] = userInfoS;
	mp["message_code"] = message;
	return mp;
}