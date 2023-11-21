    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    for (let i = 1; i <= 7; i++) {
        var next = new Date(curr.getTime());
        next.setDate(first+i);
        if(next.getDate() == (new Date()).getDate()) {
            var activeDate = 'bg-red-500 text-white';
        } else {
            activeDate = '';
        }
        const days = `<div class="cursor-pointer day text-center border p-3 ${activeDate}"><a href="/habits/filter/${next.getFullYear()}-${next.getMonth()+1}-${next.getDate()}"><p>${next.getDate()}</p><p>${weekday[next.getDay()]}</p></a></div>`;
        $('.days-of-this-week').append(days);
    }
    

    // const filterByDate = (date) => {
    //     console.log(date);
    //     try {
    //         $.get("/habits/filter/"+date, 
    //         function (result){
    //             console.log(console.log("Success"+result));
    //         })
    //     } catch (error) {
    //         console.log("Unable to update status "+error);
    //     }
    // }

    const updateStatus = (status)=>{
        const statusData =  status.split(',');
        try {
            $.post("/habits/update-status",
            {
                status : statusData[0],
                id : statusData[1]
            },
            function (result){
                console.log("Success"+result);
                window.location.href= result.redirectUrl;
            })            
        } catch (error) {
            console.log("Unable to update status "+error);
        }
    }