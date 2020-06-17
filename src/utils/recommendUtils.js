export function formatContent(matchJson,yh){
    let jsonArr = [];
    let isYh = false;
    for(let b in matchJson){
    	let match = matchJson[b];
    	let obj = {};
    	for(let a in match){
    		if(a=="winBet"||a=="isRemove"||a=="winStatus"){
    			continue;
    		}
    		obj.hName = match[a].home_team;
    		obj.aName = match[a].visiting_team;
    		obj.lName = match[a].lname;
    		obj.num = match[a].bno_cn;
    		obj.endTime = match[a].time.replace(/_/g,":").substrng(0,5);
    	    let bet = obj.bet;
    		if(!bet){
    			bet = [];
    		}
    		let betObj = {};
    		betObj.bet = match[a].bet.indexOf("r")!=-1?match[a].bet.substring(1):match[a].bet;
    		betObj.odd = match[a].odd;
    		betObj.lott = match[a].lott;
    		betObj.txt = paramsMap[betObj.lott][betObj.bet];
    		betObj.sortBy = betParamMap[match[a].lott][betObj.bet];
    		bet.push(betObj);
    		obj.bet = bet;
    	}
    	obj.bet.sort(by_str("sortBy"));
    	let betStr = "";
    	for(let c in obj.bet){
    		let d = obj.bet[c];
    		betStr += " "+d.txt+d.odd;
    	}
    	betStr = betStr.substring(1);
    	if(obj.bet.length>1&&!isYh&&yh>0){
    		isYh = true;
    		betStr += " ("+this.yhMap[yh]+")";
    	}
    	obj.betStr = betStr;
    	jsonArr.push(obj);
    }
    return jsonArr;
}

export function formatEndTime(endTime){
	if(typeof endTime == "string"){
		endTime = parseTime(endTime);
	}
	if(endTime.getTime()<new Date().getTime()){
		return "已截止";
	}
	let hm = endTime.getTime() - new Date().getTime();
	let day = hm/(1000*3600*24);//天数
	let str = "";
	if(day>0){
		str += day+"天";
	}
	hm = hm%(1000*3600*24);
	let hour = hm/(3600*1000);//小时
	if(hour>0){
		str += day+"小时";
	}
	hm = hm%(3600*24);
	let min = hm/(60*1000);//分钟
	str += min+"分后截止";
	return str;
}