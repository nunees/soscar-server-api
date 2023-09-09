
export function getWeekDay(date: Date){
    const weekDays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

    const fullDate = date.toString().split("/");
    const day = Number(fullDate[0]);
    const month = Number(fullDate[1])-1;
    const year = Number(fullDate[2]);

    const newDate = new Date(year, month, day).getDay();


    let weekDay = weekDays[newDate];

    return weekDay;

}