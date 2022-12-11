function organizeArray(data){
    var done = false;
    var index = 0;
    var numberSet = 0;
    var info = [];
    while(!done){
        info[index] = [];
        for (let i = 0; i < 10; i++) {
            if(data[numberSet]){
                info[index].push(data[numberSet]);
                numberSet+=1;
            }
        }
        index+=1;
        if(numberSet >= data.length)
            done = true;
    }
    return info
}

function addFilters(data, filterName, filterAlphabet, filterPrice){

    var sortData = [];
    data.forEach(element => sortData.push(element));
    var filteredCryptoList = [];

    if(filterAlphabet || filterPrice){
        switch(filterPrice) {
            case 'low to high':
                sortData.sort(function (a, b) {
                    var textA = Number(a.openPrice);
                    var textB = Number(b.openPrice);
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                break;
        
            case 'high to low':
                sortData.sort(function (a, b) {
                    var textA = Number(a.openPrice);
                    var textB = Number(b.openPrice);
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                });
                break;
        }
    
        switch(filterAlphabet) {     
            case 'A-Z':
                sortData.sort(function (a, b) {
                    var textA = a.baseAsset.toUpperCase();
                    var textB = b.baseAsset.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
                break;        
            
            case 'Z-A':
                sortData.sort(function (a, b) {
                    var textA = a.baseAsset.toUpperCase();
                    var textB = b.baseAsset.toUpperCase();
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                });
                break;
        }
    }

    if (filterName) {
        filteredCryptoList = sortData.filter(element =>
            (element.baseAsset.toLowerCase()).includes(filterName.toLowerCase()));
    } else {
        filteredCryptoList = sortData;
    }
    
    return filteredCryptoList;
}

function Page(PageNumber, TotalPages, activeState, deactivedState) {
    var changePage = "";

    if (+PageNumber > 1) {
        if (+PageNumber == 2)
            changePage = changePage + "<a page='" + (+PageNumber - 1) + "' class='" + activeState + "'>Previous</a>&nbsp;&nbsp;&nbsp;";
        else {
            changePage = changePage + "<a page='";
            changePage = changePage + (+PageNumber - 1) + "' class='" + activeState + "'>Previous</a>&nbsp;&nbsp;&nbsp;";
        }
    }
    else
        changePage = changePage + "<span class='" + deactivedState + "'>Previous</span>&nbsp;&nbsp;&nbsp;";
    if ((+PageNumber - 2) > 1)
        changePage = changePage + "<a page='1' class='" + activeState + "'>1</a>&nbsp;.....&nbsp;|&nbsp;";
    for (var i = +PageNumber - 2; i <= +PageNumber; i++)
        if (i >= 1) {
            if (+PageNumber != i) {
                changePage = changePage + "<a page='";
                changePage = changePage + i + "' class='" + activeState + "'>" + i + "</a>&nbsp;|&nbsp;";
            }
            else {
                changePage = changePage + "<span style='font-weight:bold;'>" + i + "</span>&nbsp;|&nbsp;";
            }
        }
    for (var i = +PageNumber + 1; i <= +PageNumber + 2; i++)
        if (i <= TotalPages) {
            if (+PageNumber != i) {
                changePage = changePage + "<a page='";
                changePage = changePage + i + "' class='" + activeState + "'>" + i + "</a>&nbsp;|&nbsp;";
            }
            else {
                changePage = changePage + "<span style='font-weight:bold;'>" + i + "</span>&nbsp;|&nbsp;";
            }
        }
    if ((+PageNumber + 2) < TotalPages) {
        changePage = changePage + ".....&nbsp;<a page='";
        changePage = changePage + TotalPages + "' class='" + activeState + "'>" + TotalPages + "</a>";
    }
    if (+PageNumber < TotalPages) {
        changePage = changePage + "&nbsp;&nbsp;&nbsp;<a page='";
        changePage = changePage + (+PageNumber + 1) + "' class='" + activeState + "'>Next</a>";
    }
    else
        changePage = changePage + "&nbsp;&nbsp;&nbsp;<span class='" + deactivedState + "'>Next</span>";

    return (changePage);
}

function date(time){
    var dateTime = new Date(time);
    return  dateTime.toLocaleString();
}