const CASH_TYPE = {
	"1":"购买方案",
	"2":"不中退款",
	"3":"方案销售",
	"4":"中奖佣金"
}

const paramsMap = {
		'lotteryEnMap':{'51':'竞足胜平负','52':'竞足比分','53':'竞足总进球','54':'竞足半全场','56':'竞足让球胜平负','59':'竞足混合投注','61':'竞篮让分胜负','62':'竞篮胜负','64':'竞篮大小分','63':'竞篮胜分差','69':'竞篮混合投注',"200":"北单胜平负","210":"北单上下单双","230":"北单总进球数","240":"北单半全场","250":"北单比分","270":"北单胜负过关"},
		'hafu':{'hh':'胜胜','hd':'胜平','ha':'胜负','dh':'平胜','dd':'平平','da':'平负','ah':'负胜','ad':'负平','aa':'负负',"-1:-1":"取消"},
		'had':{'h':'胜','d':'平','a':'负',"-1:-1":"取消"},
		'hhad':{'h':'让胜','d':'让平','a':'让负',"-1:-1":"取消"},
		'ttg':{"s0":'0球',"s1":'1球',"s2":'2球',"s3":'3球',"s4":'4球',"s5":'5球',"s6":'6球',"s7":'7+球',"-1:-1":"取消"},
		'crs':{"0000":"0:0","0001":"0:1","0002":"0:2","0003":"0:3","0004":"0:4","0005":"0:5",
				"0100":"1:0","0101":"1:1","0102":"1:2","0103":"1:3","0104":"1:4","0105":"1:5",
				"0200":"2:0","0201":"2:1","0202":"2:2","0203":"2:3","0204"	:"2:4","0205":"2:5",
				"0300":"3:0","0301":"3:1","0302":"3:2","0303":"3:3",
				"0400":"4:0","0401":"4:1","0402":"4:2","0500":"5:0",
				"0501":"5:1","0502":"5:2","-1-a":"负其它","-1-d":"平其它","-1-h":"胜其它","-1:-1":"取消"},
		'mnl':{'h':"主胜",'a':"主负","-1:-1":"取消"},
		'hdc':{'h':"主让胜",'a':"主让负","-1:-1":"取消"},
		'hilo':{'h':"大分",'l':'小分',"-1:-1":"取消"},
		'wnm':{"w1":"主胜1-5","w2":"主胜6-10","w3":"主胜11-15","w4":"主胜16-20","w5":"主胜21-25"
			,"w6":"主胜26+","l1":"主负1-5","l2":"主负6-10","l3":"主负11-15","l4":"主负16-20","l5":"主负21-25","l6":"主负26+","-1:-1":"取消"},
		'mnlAttr':{'主胜':'h',"主负":'a'},
		'hdcAttr':{'主让胜':'h',"主让负":'a'},
		'hiloAttr':{'大分':'h',"小分":'l'},
		'wnmAttr':{'主胜1-5':'w1','主胜6-10':'w2','主胜11-15':'w3','主胜16-20':'w4','主胜21-25':'w5','主胜26+':'w6',
			'主负1-5':'l1','主负6-10':'l2','主负11-15':'l3','主负16-20':'l4','主负21-25':'l5','主负26+':'l6'},
		'200':{'3':'胜','1':'平','0':'负'},
		'250':{"0000":"0:0","0001":"0:1","0002":"0:2","0003":"0:3","0004":"0:4",
	    				"0100":"1:0","0101":"1:1","0102":"1:2","0103":"1:3","0104":"1:4",
	    				"0200":"2:0","0201":"2:1","0202":"2:2","0203":"2:3","0204"	:"2:4",
	    				"0300":"3:0","0301":"3:1","0302":"3:2","0303":"3:3",
	    				"0400":"4:0","0401":"4:1","0402":"4:2","-1-a":"负其它","-1-d":"平其它","-1-h":"胜其它"},
	    '240':{'33':'胜胜','31':'胜平','30':'胜负','13':'平胜','11':'平平','10':'平负','03':'负胜','01':'负平','00':'负负'},
	    '230':{"s0":'0球',"s1":'1球',"s2":'2球',"s3":'3球',"s4":'4球',"s5":'5球',"s6":'6球',"s7":'7+球'},
	    '210':{"1":'上单',"2":'上双',"3":'下单',"4":'下双'},
	    "270":{"3":"胜","0":"负"},
	    "bdEnMap":{
	    	"71":"胜平负",
	    	"72":"单场比分",
	    	"73":"半全场胜平负",
	    	"74":"总进球数",
	    	"75":"上下盘单双数",
	    	"200":"胜平负",
	    	"210":"上下盘单双数",
	    	"230":"总进球数",
	    	"240":"半全场胜平负",
	    	"250":"单场比分"
	    },
	    "bdCnMap":{
	    	"200":"71",
	    	"210":"75",
	    	"230":"74",
	    	"240":"73",
	    	"250":"72",
	    	"270":"76"
	    }
	}

const betParamMap={
		"lotteryId":{"51":"had","52":"crs","53":"ttg","54":"hafu","56":"hhad","59":"ht","61":"hdc","62":"mnl","63":"wnm","64":"hilo","69":"hhgg"},
		"lotteryType":{"nspf":"had","spf":"hhad","jqs":"ttg","bqc":"hafu","bf":"crs","sf":"mnl","rfsf":"hdc","sfc":"wnm","dxf":"hilo"},
		'hafu':{'hh':'86','hd':'85','ha':'84','dh':'83','dd':'82','da':'81','ah':'80','ad':'79','aa':'78'},
		'had':{'h':'100','d':'99','a':'98'},
		'hhad':{'h':'97','d':'96','a':'95'},
		'ttg':{"s0":'94',"s1":'93',"s2":'92',"s3":'91',"s4":'90',"s5":'89',"s6":'88',"s7":'87'},
		'crs':{"0000":"77","0001":"76","0002":"75","0003":"74","0004":"73","0005":"72",
				"0100":"71","0101":"70","0102":"69","0103":"68","0104":"67","0105":"66",
				"0200":"65","0201":"64","0202":"63","0203":"62","0204"	:"61","0205":"60",
				"0300":"59","0301":"58","0302":"57","0303":"56",
				"0400":"55","0401":"54","0402":"53","0500":"52",
				"0501":"51","0502":"50","-1-a":"47","-1-d":"48","-1-h":"49"},
		'mnl':{
			'h':'50','a':'49'
		},
		'hdc':{
			'h':'48','a':'47'
		},
		'wnm':{
			'w1':'46','w2':'45','w3':'44','w4':'43','w5':'42','w6':'41',
			'l1':'40','l2':'39','l3':'38','l4':'37','l5':'36','l6':'35'
		},
		'hilo':{
			'h':'34','l':'33'
		},
		'250':{"0000":"77","0001":"76","0002":"75","0003":"74","0004":"73",
			"0100":"71","0101":"70","0102":"69","0103":"68","0104":"67",
			"0200":"65","0201":"64","0202":"63","0203":"62","0204":"61",
			"0300":"59","0301":"58","0302":"57","0303":"56",
			"0400":"55","0401":"54","0402":"53","-1-a":"47","-1-d":"48","-1-h":"49"
		},
		'240':{'33':'86','31':'85','30':'84','13':'83','11':'82','10':'81','03':'80','01':'79','00':'78'},
		'200':{'3':'100','1':'99','0':'98'},
		'230':{"s0":'94',"s1":'93',"s2":'92',"s3":'91',"s4":'90',"s5":'89',"s6":'88',"s7":'87'},
		'210':{'1':'100','2':'99','3':'98',"4":"97"},
		"270":{"3":"99","0":"98"}
}

const betEnMap={
		"poolCode":{ "hhad":"rqspf", "had":"spf", "crs":"bf", "ttg":"zjq", "hafu":"bqspf", "mnl":"sf", "hdc":"rfsf", "wnm":"sfc", "hilo":"dxf","ht":"hhgg","hhgg":"hhgg" },
		"lotteryType":{"nspf":"had","spf":"hhad","jqs":"ttg","bqc":"hafu","bf":"crs","sf":"mnl","rfsf":"hdc","sfc":"wnm","dxf":"hilo"},
		'hafu':{'hh':'33','hd':'31','ha':'30','dh':'13','dd':'11','da':'10','ah':'03','ad':'01','aa':'00'},
		'had':{'h':'3','d':'1','a':'0'},
		'hhad':{'h':'3','d':'1','a':'0'},
		'ttg':{"s0":'0',"s1":'1',"s2":'2',"s3":'3',"s4":'4',"s5":'5',"s6":'6',"s7":'7'},
		'crs':{"0000":"00","0001":"01","0002":"02","0003":"03","0004":"04","0005":"05",
				"0100":"10","0101":"11","0102":"12","0103":"13","0104":"14","0105":"15",
				"0200":"20","0201":"21","0202":"22","0203":"23","0204"	:"24","0205":"25",
				"0300":"30","0301":"31","0302":"32","0303":"33",
				"0400":"40","0401":"41","0402":"42","0500":"50",
				"0501":"51","0502":"52","-1-a":"0A","-1-d":"1A","-1-h":"3A"},
		'mnl':{
			'h':'3','a':'0'
		},
		'hdc':{
			'h':'3','a':'0'
		},
		'wnm':{
			'w1':'01','w2':'02','w3':'03','w4':'04','w5':'05','w6':'06',
			'l1':'11','l2':'12','l3':'13','l4':'14','l5':'15','l6':'16'
		},
		'hilo':{
			'h':'3','l':'0'
		},
		"bdPoolCode":{"200":"had","230":"ttg","240":"hafu","250":"crs","210":"wnm","270":"mnl"},
		"bdPoolCodeEn":{"had":"200","ttg":"230","hafu":"240","crs":"250","wnm":"210","mnl":"270"}
}



export{
	CASH_TYPE,
	paramsMap,
	betParamMap,
	betEnMap
}