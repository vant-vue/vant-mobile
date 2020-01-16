
/**
 * 得到下几天时间
 * @param dd
 * @returns {String}
 */
export function getNextDayDate(AddDayCount,dd){
    var date = new Date(dd);
    date =+date + 1000*60*60*24*(AddDayCount);
    date = new Date(date);
	return date;
}