import _ from './Language';
class DateHelper {
    getDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!

        const yyyy = date.getFullYear();
        const value = dd + '/' + mm + '/' + yyyy;
        return value;
    }
    getTime(date) {
        let hh = date.getHours();
        let ii = date.getMinutes();
        if (ii < 10) {
            ii = '0' + ii;
        }
        const value = hh + ':' + ii;
        return value;
    }
    getMonthName(date) {
        let data = date.split('/');
        const day = data[0];
        const month = Number(data[1]);
        let monthName;
        switch (month) {
            case 1:
                monthName = _('january');
                break;
            case 2:
                monthName = _('february');
                break;
            case 3:
                monthName = _('march');
                break;
            case 4:
                monthName = _('april');
                break;
            case 5:
                monthName = _('may');
                break;
            case 6:
                monthName = _('june');
                break;
            case 7:
                monthName = _('july');
                break;
            case 8:
                monthName = _('august');
                break;
            case 9:
                monthName = _('september');
                break;
            case 10:
                monthName = _('october');
                break;
            case 11:
                monthName = _('november');
                break;
            case 12:
                monthName = _('december');
        }
        return `${day} ${monthName}`;
    }
    getDayName(date, fullName = true) {
        let day;
        if (fullName) {
            switch (date.getDay()) {
                case 0:
                    day = _('sunday');
                    break;
                case 1:
                    day = _('monday');
                    break;
                case 2:
                    day = _('tuesday');
                    break;
                case 3:
                    day = _('wednesday');
                    break;
                case 4:
                    day = _('thursday');
                    break;
                case 5:
                    day = _('friday');
                    break;
                case 6:
                    day = _('saturday');
            }
        } else {
            switch (date.getDay()) {
                case 0:
                    day = _('sun');
                    break;
                case 1:
                    day = _('mon');
                    break;
                case 2:
                    day = _('tue');
                    break;
                case 3:
                    day = _('wed');
                    break;
                case 4:
                    day = _('thu');
                    break;
                case 5:
                    day = _('fri');
                    break;
                case 6:
                    day = _('sat');
            }
        }
        return day;
    }
}

const date = new DateHelper();
export default date;