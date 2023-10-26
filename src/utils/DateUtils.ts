
export function getWeekDay(date: string){
    const weekDays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

    const fullDate = date.toString().split("T")[0].split("-");


    const day = Number(fullDate[2]);
    const month = Number(fullDate[1])-1;
    const year = Number(fullDate[0]);

    const newDate = new Date(year, month, day).getDay();


    let weekDay = weekDays[newDate];

    return weekDay;

}