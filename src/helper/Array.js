class ArrayHelper {
    find(array, element) {
        let index = "";
        array.forEach((data, num) => {
            if (data.id === element)
                index = num;
        });
        if (index !== -1)
           return index;
    }
    search(array, element) {
        let index = "";
        array.forEach((data, num) => {
            data.forEach((inside) => {
                if (inside === element)
                    index = num;
            })
        });
        const returnValue = typeof index === "number" ? true : false;
        return returnValue;
    }
    delete(array, element) {
        let index = "";
        array.forEach((data, num) => {
            if (data.id === element)
                index = num;
        });
        if (index !== -1)
           return array.splice(index, 1);
    }
    sortDate(array, element) {
        let index = "";
        let newArray= Array();
        array.forEach((data, num) => {
            if (data.date === element)
                newArray.push(array[num]);
        });
        return newArray;
    }

}

const exporDefault = new ArrayHelper();
export default exporDefault;
