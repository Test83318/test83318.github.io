// PAYMENT

for await (const i of data) {
    await Pay(i, "October13-19") 
};

//PREVIOUS 

let History = []
let cursor = 0
$(".console-wrapper").draggable({
    containment: "window"
})
function Push(message) {
    let now = new Date(Date.now())
    let time = "[" + Pad(now.getHours(), 2) + ":" + Pad(now.getMinutes(), 2) + ":" + Pad(now.getSeconds(), 2) + "] "
    // remove HTML tags
    message = message.replace(/(<([^>]+)>)/ig, "");
    $(".console-entries").append("<li>" + time + message + "</li>")
    $(".console-log").scrollTop($(".console-log")[0].scrollHeight);
}

function Clear() {
    $(".console-entries").empty()
}


function CursorToEnd() {
    let el = $(".console-input input")[0]
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function Pad(a, b) {
    return (1e15 + a + '').slice(-b);
}

function Input(message) {
    return new Promise((r) => {
        if (message.length == 0) return
        History.unshift(message)
        Push("> " + message)

        $.ajax({
            url: '/console/input',
            type: 'POST',
            error: function (xhr, error, thrown) {

            },
            data: {
                Message: message,
                _token: $('meta[name="csrf-token"]').attr('content'),
            },
            success: function (d) {
                for (let index in d.Response)
                    Push(d.Response[index])

                if (d.Purge) Clear()
                r(true);

            }
        })
    });

}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Pay(cmd, reason) {
    return new Promise(async(r) =>{
        await Input(cmd + " "+reason)
        await(delay(2000)); 
        await Input("Y");
        await(delay(2000)); 
        console.log(cmd);
        r(true);
    })   
}

$(".console-input input").keydown(function (event) {
    if (event.keyCode == 13) {
        Input($(".console-input input").val())
        $(".console-input input").val("")
    } else if (event.keyCode == 38) {
        cursor = Math.min(Math.max(++cursor, 0), History.length - 1)
        console.log(cursor)
        let element = History[cursor]
        $(".console-input input").val("")
        $(".console-input input").val(element)
        CursorToEnd()

    } else if (event.keyCode == 40) {
        cursor = Math.min(Math.max(--cursor, 0), History.length - 1)
        console.log(cursor)
        let element = History[cursor]
        $(".console-input input").val("")
        $(".console-input input").val(element)
        CursorToEnd()
    }
});