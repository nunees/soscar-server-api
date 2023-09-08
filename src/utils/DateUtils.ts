
export function getWeekDay(date: Date){
    const weekDay = date.getDay();
    switch(weekDay){
        case 0:
        return "domingo";
        case 1:
        return "segunda";
        case 2:
        return "terça";
        case 3:
        return "quarta";
        case 4:
        return "quinta-";
        case 5:
        return "sexta";
        case 6:
        return "sábado";
    }
}