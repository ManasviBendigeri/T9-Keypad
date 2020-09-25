
//import array from './dict.js';
//console.log(array)


var time = new Date().getTime();
var up, down;
$(document).ready(function () {
    $("#phone").find('button').mousedown(function (event) {
        down = new Date().getTime();
    })
    $("#phone").find('#suggestions').mousedown(function (event) {
        var suggested_word = $("#suggestions").val();
        $("#result").val(add_suggested_word($("#result").val(), suggested_word))
    })
    $("#phone").find('#suggestions1').mousedown(function (event) {
        var suggested_word = $("#suggestions1").val();
        $("#result").val(add_suggested_word($("#result").val(), suggested_word))
    })
    $("#phone").find('#suggestions2').mousedown(function (event) {
        var suggested_word = $("#suggestions2").val();
        $("#result").val(add_suggested_word($("#result").val(), suggested_word))
    })
    $("#phone").find("button").mouseup(function (event) {
        up = new Date().getTime();
        var button_pressed = $(event.currentTarget).data("value")
        $("#result").val(t9($("#result").val(), button_pressed))
    })
})
var map = {
    '1': '1.,!',
    '2': '2abc',
    '3': '3def',
    '4': '4ghi',
    '5': '5jkl',
    '6': '6mno',
    '7': '7pqrs',
    '8': '8tuv',
    '9': '9wxyz',
    '*': '*',
    '0': '0',
    '#': '#',
    'space': 'space'
}

var word = ['aa','aah','aahed','aahing','aahs','aardvarks','aardwolf','ab','abaci','aback','abacus','abacuses','abaft','abalone','abalones','abandon','abandoned','abandonedly','abandonee','abandoner','abandoners','abandoning','abandonment','abandonments','abandons','abase','abased','abasedly','abasement','annual','apple','asynchronous','bat','big', 'battle','turtle','wagon','wax'];


function fetch(text)
{
    let suggestions=[];
    let suggestions1=[];
    let suggestions2=[];
    
    var myword = word.filter(element => element.includes(text.charAt(text.length-1)));
    suggestions.push(myword[0]);
    suggestions1.push(myword[1]);
    suggestions2.push(myword[2]);
    console.log(suggestions,suggestions1,suggestions2);
    $("#suggestions").val(suggestions);
    $("#suggestions1").val(suggestions1);
    $("#suggestions2").val(suggestions2);
}


function add_suggested_word(text,suggested_word){
    text=suggested_word;
    return text;
}

// function add_new_word(text,suggested_word){
//     if(text!=suggested_word){
//         if(button_pressed==='space'){
//             word.push(text)
//             console.log(word)

//         }
        
//     }

// }


var delay = 1000;
var prev_button = '0';
var char = 0;
var pressed;
function t9(text, button_pressed) {
    // Write your code here
    var current_time = new Date().getTime()
    var diff = current_time - time;
    time = current_time;
    var ctext = text;
    if (button_pressed == 'space') {
        ctext += ' ';
        return ctext;
    }
    if (button_pressed == 'clear') {
        ctext = '\0';
        return ctext;
    }
    if (button_pressed == 'backspace') {
        ctext = ctext.substring(0, ctext.length - 1);
        return ctext;
    }
    if ((diff > delay) || (button_pressed != prev_button)) {
        char = 0;
    }
    //console.log(text +" "+ ctext +" "+ button_pressed +" "+ up +" "+ down);
    if (up - down > 500) {
        ctext += button_pressed;
    }
    else {
        pressed = map[button_pressed][char];
        ctext += map[button_pressed][char];
    }
    if (prev_button == button_pressed) {
        if (diff < delay) {
            var res_length = text.length;
            if (button_pressed == '*' || button_pressed == '0' || button_pressed == '#') {
                char = 0;
            }
            else {
                char++;
                
            }
            //console.log(char);
            pressed = map[button_pressed][char];
            ctext = text.substr(0, res_length - 1) + map[button_pressed][char];
            if (char == map[button_pressed].length - 1) {
                char = -1;
            }
        }
        else {
            char = 0;
        }
    }
    else {
        char = 0;
    }
    prev_button = button_pressed;
    text = ctext;
    //console.log(pressed,text);
    fetch(text);
    return text;
}