var node;
var shown_cards = [];
var asked_questions = [];
var submitted_statements = [];
var scored_cards = [];
var logged_cards = [];
var space_pressed = 0;
var last_space_pressed = 0;
var forbid_input = false;
var multiplayer;
var last_successful_request = 0;

var MID_MODEL = [
    "conceptualise a ~ MID thing ~ that is an entity and is an imageable thing",
    "conceptualise a ~ place ~ P that is a locatable thing and is an MID thing",
    "conceptualise a ~ city ~ C that is an MID thing",
    "conceptualise the place P ~ is located in ~ the city C",
    "conceptualise a ~ character ~ C that is an MID thing and has the place P as ~ shrine ~",
    "conceptualise the place P ~ is shrine to ~ the character C",
    "conceptualise a ~ actor ~ A that is an MID thing",
    "conceptualise an ~ alien ~ A that is an MID thing",
    "conceptualise a ~ spaceship ~ S that is an MID thing and has the place P as ~ fuelling station ~",
    "conceptualise the spaceship S ~ is owned by ~ the character C",
    "conceptualise the character C ~ owns ~ the spaceship S and ~ is played by ~ the actor A and ~ created ~ the alien D and ~ has the dog D as ~ pet ~",
    "conceptualise the actor A ~ plays ~ the character C",
    "conceptualise an ~ organisation ~ O that is an MID thing and has the place P as ~ base ~",
    "conceptualise a ~ dog ~ D that is an MID thing and has the character C as ~ master ~",
    "conceptualise a ~ planet ~ P that is an MID thing",
    "conceptualise the planet P ~ is home to ~ the alien A",
    "conceptualise the alien A ~ is created by ~ the character C and has the planet P as ~ home planet ~",
    "conceptualise a ~ programme ~ P that is an MID thing",
    "conceptualise the programme P ~ is filmed in ~ the city C",

    "there is a programme named 'Doctor Who'",
    "there is a programme named 'Sherlock'",
    "there is an actor named 'Martin Freeman'",
    "there is an actor named 'John Barrowman'",
    "there is an actor named 'Jenna Coleman'",
    "there is an actor named 'Tom Baker'",
    "there is an actor named 'David Tennant'",
    "there is an actor named 'Matt Smith'",
    "there is an actor named 'Peter Capaldi'",
    "there is an actor named 'Lis Sladen'",
    "there is an actor named 'Billie Piper'",
    "there is an actor named 'Karen Gillan'",
    "there is a character named 'Davros'",
    "there is a character named 'The Fourth Doctor'",
    "there is a character named 'The Tenth Doctor'",
    "there is a character named 'The Eleventh Doctor'",
    "there is a character named 'The Doctor'",
    "there is a character named 'Ianto Jones'",
    "there is a character named 'Captain Jack'",
    "there is a character named 'John Watson'",
    "there is a character named 'Clara Oswald'",
    "there is a character named 'Sarah Jane Smith'",
    "there is a character named 'Amy Pond'",
    "there is a character named 'Rose Tyler'",
    "there is an organisation named 'Torchwood'",
    "there is an organisation named 'UNIT'",
    "there is an alien named 'Dalek'",
    "there is an alien named 'Cybermen'",
    "there is an alien named 'Slitheen'",
    "there is a planet named 'Skaro'",
    "there is a planet named 'Mondas'",
    "there is a planet named 'Telos'",
    "there is a planet named 'Raxacoricofallapatorius'",
    "there is a planet named 'Earth'",
    "there is a dog named 'K9'",
    "there is a city named 'Cardiff'",
    "there is a city named 'London'",
    "there is a city named 'Bristol'",
    "there is a place named 'Cardiff Bay'",
    "there is a place named 'Tower of London'",
    "there is a place named 'Baker Street'",
    "there is a spaceship named 'TARDIS' that has 'http://mid.cenode.io/media/tardis.png' as image",

    "there is a rule named r1 that has 'if the character C ~ owns ~ the spaceship S then the spaceship S ~ is owned by ~ the character C' as instruction",
    "there is a rule named r2 that has 'if the spaceship S ~ is owned by ~ the character C then the character C ~ owns ~ the spaceship S' as instruction",
    "there is a rule named r3 that has 'if the alien A ~ is created by ~ the character C then the character C ~ created ~ the alien A' as instruction",
    "there is a rule named r4 that has 'if the character A ~ created ~ the alien A then the alien A ~ is created by ~ the character C' as instruction",
    "there is a rule named r5 that has 'if the actor A ~ plays ~ the character C then the character C ~ is played by ~ the actor A' as instruction",
    "there is a rule named r6 that has 'if the character C ~ is played by ~ the actor A then the actor A ~ plays ~ the character C' as instruction",
    "there is a rule named r7 that has 'if the character C has the place P as ~ shrine ~ then the place P ~ is shrine to ~ the character C' as instruction",
    "there is a rule named r8 that has 'if the place P ~ is shrine to ~ the character C then the character C has the place P as ~ shrine ~' as instruction",
    "there is a rule named r9 that has 'if the dog D has the character C as ~ master ~ then the character C has the dog D as ~ pet ~' as instruction",
    "there is a rule named r10 that has 'if the character C has the dog D as ~ pet ~ then the dog D has the character C as ~ master ~' as instruction",
    "there is a rule named r11 that has 'if the planet P ~ is home to ~ the alien A then the alien A has the planet P as ~ home planet ~' as instruction",
    "there is a rule named r12 that has 'if the alien A has the planet P as ~ home planet ~ then the planet P ~ is home to ~ the alien A' as instruction",

    // Uncomment the 3 lines below to enable multiplayer using Mycroft as the relay:
    //
    "there is an agent named 'Mycroft' that has 'http://mycroft.cenode.io' as address",
    "there is a tell policy named 'p1' that has 'true' as enabled and has the agent 'Mycroft' as target",
    "there is a listen policy named 'p2' that has 'true' as enabled and has the agent 'Mycroft' as target",

    "conceptualise a ~ question ~ Q that has the value V as ~ text ~ and has the value W as ~ value ~ and has the value X as ~ relationship ~",
    "conceptualise the question Q ~ concerns ~ the MID thing C",

    "there is a question named q1 that concerns the character 'The Doctor' and has 'owns' as relationship and has 'What spaceship does the Doctor own?' as text",
    "there is a question named q2 that concerns the spaceship 'TARDIS' and has 'is owned by' as relationship and has 'Which character owns the TARDIS?' as text",
    "there is a question named q3 that concerns the organisation 'Torchwood' and has 'base' as value and has 'Where is Torchwood\\'s base located?' as text",
    "there is a question named q4 that concerns the alien 'Dalek' and has 'is created by' as relationship and has 'Who created the Daleks?' as text",
    "there is a question named q5 that concerns the character 'Davros' and has 'created' as relationship and has 'Which kind of alien was created by Davros?' as text",
    "there is a question named q6 that concerns the character 'Clara Oswald' and has 'is played by' as relationship and has 'Who plays Clara Oswald?' as text",
    "there is a question named q7 that concerns the actor 'Jenna Coleman' and has 'plays' as relationship and has 'What character is played by Jenna Coleman?' as text",
    "there is a question named q8 that concerns the character 'Captain Jack' and has 'is played by' as relationship and has 'Who plays Captain Jack in Doctor Who and Torchwood?' as text",
    "there is a question named q9 that concerns the actor 'John Barrowman' and has 'plays' as relationship and has 'What character is played by John Barrowman?' as text",
    "there is a question named q10 that concerns the spaceship 'TARDIS' and has 'fuelling station' as value and has 'Where did the TARDIS refuel in the episode \\'Boom Town\\'?' as text",
    "there is a question named q11 that concerns the place 'Cardiff Bay' and has 'is shrine to' as relationship and has 'Cardiff Bay has a \\'shrine\\' to which Torchwood character?' as text",
    "there is a question named q12 that concerns the character 'The Doctor' and has 'pet' as value and has 'What is the name of the Doctor\\'s dog?' as text",
    "there is a question named q13 that concerns the character 'John Watson' and has 'is played by' as relationship and has 'Who plays John Watson in Sherlock?' as text",
    "there is a question named q14 that concerns the programme 'Doctor Who' and has 'is filmed in' as relationship and has 'In what city is Doctor Who mainly filmed?' as text",
    "there is a question named q15 that concerns the programme 'Sherlock' and has 'is filmed in' as relationship and has 'In what city is Sherlock mainly filmed?' as text",	
    "there is a question named q16 that concerns the place 'Baker Street' and has 'is located in' as relationship and has 'In what city is Baker Street located?' as text",
    "there is a question named q17 that concerns the planet 'Skaro' and has 'is home to' as relationship and has 'What alien race is the planet Skaro home to?' as text",
    "there is a question named q18 that concerns the alien 'Dalek' and has 'home planet' as value and has 'What is the home planet of the Daleks?' as text",
    "there is a question named q19 that concerns the alien 'Cybermen' and has 'home planet' as value and has 'What is the home planet of the Cybermen?' as text",
    "there is a question named q20 that concerns the planet 'Raxacoricofallapatorius' and has 'is home to' as relationship and has 'What alien race is the planet Raxacoricofallapatorius home to?' as text",
    "there is a question named q21 that concerns the alien 'Slitheen' and has 'home planet' as value and has 'What is the home planet of the Slitheen?' as text",
    "there is a question named q22 that concerns the character 'Sarah Jane Smith' and has 'is played by' as relationship and has 'Who played Sarah Jane Smith?' as text",
    "there is a question named q23 that concerns the character 'The Fourth Doctor' and has 'is played by' as relationship and has 'Who played the Fourth Doctor?' as text",
    "there is a question named q24 that concerns the character 'The Tenth Doctor' and has 'is played by' as relationship and has 'Who played the Tenth Doctor?' as text",
    "there is a question named q25 that concerns the character 'The Eleventh Doctor' and has 'is played by' as relationship and has 'Who played the Eleventh Doctor?' as text",
    "there is a question named q26 that concerns the character 'The Doctor' and has 'is played by' as relationship and has 'Who plays the Doctor?' as text",
    "there is a question named q27 that concerns the organisation 'UNIT' and has 'base' as value and has 'Where is UNIT\\'s base located?' as text",
    "there is a question named q28 that concerns the character 'Amy Pond' and has 'is played by' as relationship and has 'Who plays Amy Pond?' as text",
    "there is a question named q29 that concerns the actor 'Billie Piper' and has 'plays' as relationship and has 'What Doctor Who character is played by Billie Piper?' as text",
    "there is a question named q30 that concerns the character 'Rose Tyler' and has 'is played by' as relationship and has 'Who plays Rose Tyler?' as text"
];

var settings = {
    logged_in : false,
};

var user = {
    id : null,
    cards : [],
    questions : [],
    answers : [],
    inputs: [],
    input_counter : 0,
    score : 0,
    current_screen : "login"
};

var ui = {
    buttons : {
        login : null,
        logout : null,
        send : null,
    },
    inputs : {
        login_user_id : null,
        main_user_id : null,
        text : null,
        guess : null,
        autofill : null,
        multiplayer: null
    },
    overlays : {
        login : null,
        moira : null,
        dashboard: null
    },
    view_changers : [],
    info : {
        cards : null,
        questions : null,
        login_error : null,
        score : null,
        online_status : null
    }
};

function initialize_ui(){
    ui.buttons.login = document.getElementById("login");
    ui.buttons.logout = document.getElementById("logout");
    ui.buttons.send = document.getElementById("send");
    ui.inputs.login_user_id = document.getElementById("login_username");
    ui.inputs.main_user_id = document.getElementById("username");
    ui.inputs.text = document.getElementById("text");
    ui.inputs.guess = document.getElementById("guess");
    ui.inputs.autofill = document.getElementById("autofill");
    ui.overlays.login = document.getElementById("login_overlay");
    ui.overlays.moira = document.getElementById("moira_overlay");
    ui.overlays.dashboard = document.getElementById("dashboard_overlay");
    ui.info.cards = document.getElementById("cards");
    ui.info.questions = document.getElementById("questions");
    ui.info.login_error = document.getElementById("login_error");
    ui.info.score = document.getElementById("score");
    ui.info.online_status = document.getElementById("online_status");
    ui.view_changers = document.getElementsByClassName("change_view");
}

function bind_listeners(){
    ui.buttons.login.onclick = login;
    ui.buttons.logout.onclick = logout;
    ui.buttons.send.onclick = send;
    ui.inputs.text.onkeyup = key_up;
    ui.inputs.text.onkeydown = key_down;
    for(var i = 0; i < ui.view_changers.length; i++){
	    ui.view_changers[i].onclick = function(e){change_view(e.target.getAttribute("data-view"));};
    }
    ui.inputs.login_user_id.onkeyup = function(e){
        if(e.keyCode == 13){
            login();
        }
    };
}

function change_view(view){
    user.selected_screen = view;
    update_ui();
}

function login(){
    user.id = ui.inputs.login_user_id.value.charAt(0).toUpperCase() + ui.inputs.login_user_id.value.slice(1);
    user.id = user.id.trim();
    multiplayer =  true;
    if(user.id == null || user.id == ""){
        ui.info.login_error.style.display = "block";
        return;
    }

    if(multiplayer){
        node = new CENode(MODELS.CORE, MID_MODEL);
        ui.info.online_status.style.display = "block";
        check_online();
    }
    else{
        node = new CENode(MODELS.CORE, MODELS.SHERLOCK_CORE);
        ui.info.online_status.style.display = "none";
    }
    node.set_agent_name(user.id+" agent");
    node.add_sentence("there is a tell card named 'msg_{uid}' that is from the agent '"+node.get_agent_name().replace(/'/g, "\\'")+"' and is to the agent '"+node.get_agent_name().replace(/'/g, "\\'")+"' and has the timestamp '{now}' as timestamp and has 'there is an agent named \\'"+node.get_agent_name().replace(/'/g, "\\\'")+"\\'' as content");
    node.add_sentence("there is a feedback policy named 'p3' that has the individual '"+user.id+"' as target and has 'true' as enabled and has 'full' as acknowledgement"); 

    settings.logged_in = true;    
    user.selected_screen = "moira";
    user.cards = [];
    ui.info.login_error.style.display = "none";
    ui.inputs.main_user_id.value = user.id;

    update_ui();
    load_questions();//fetch_questions();
    poll_for_instances();
}

function logout(){
    location.reload();
}

function add_sentence(t){
    node.add_sentence(t);
}   

function key_down(e){
    if(forbid_input){
        e.preventDefault();
        return false;
    }
    if(e.keyCode == 9){
        e.preventDefault();
        return false;
    }
    if(e.keyCode == 32){
        space_pressed = new Date().getTime();
        if((space_pressed - last_space_pressed) < 200){
            if(ui.inputs.text.value.length < ui.inputs.guess.value.length && ui.inputs.autofill.checked == true){
                if(  navigator.userAgent.match(/Android/i)
                  || navigator.userAgent.match(/webOS/i)
                  || navigator.userAgent.match(/iPhone/i)
                  || navigator.userAgent.match(/iPad/i)
                  || navigator.userAgent.match(/iPod/i)
                  || navigator.userAgent.match(/BlackBerry/i)
                  || navigator.userAgent.match(/Windows Phone/i)
                  ){
                    e.preventDefault();
                    ui.inputs.text.value = node.guess_next(ui.inputs.text.value.substring(0, ui.inputs.text.value.length-1));
                    return false;
                }
            }
        }
        last_space_pressed = new Date().getTime();
    }
}

function key_up(e){
    if(forbid_input){
        e.preventDefault();
        return false;
    }
    if(e.keyCode == 13){
        send();
    }
    else if(e.keyCode == 38){
        if(user.input_counter > 0){
            user.input_counter--;
            ui.inputs.text.value = user.inputs[user.input_counter];       
        }
        e.preventDefault();
    }
    else if(e.keyCode == 40){
        if(user.input_counter < user.inputs.length-1){
            user.input_counter++;
            ui.inputs.text.value = user.inputs[user.input_counter];
        }
        else{
            ui.inputs.text.value = "";
        }
    }
    else if(e.keyCode == 9){
        ui.inputs.text.value = node.guess_next(ui.inputs.text.value);
        e.preventDefault();
        return false;
    }
    if(ui.inputs.autofill.checked == true){
        ui.inputs.guess.value = node.guess_next(ui.inputs.text.value);
    }
    else{
        ui.inputs.guess.value = "";
    }
}

function send(){
    var input = ui.inputs.text.value.trim().replace(/(\r\n|\n|\r)/gm,"");
    if(input.match(/\band\b/i)){
        return window.alert("Please only enter single-part sentences.");
    }

    ui.inputs.text.value = "";
    user.inputs.push(input);
    user.input_counter = user.inputs.length;

    var sentence = input.replace(/'/g, "\\'");
    var card;
    if(sentence.toLowerCase().indexOf("who ") == 0 || sentence.toLowerCase().indexOf("what ") == 0 || sentence.toLowerCase().indexOf("where ") == 0 || sentence.toLowerCase().indexOf("list ") == 0){
        card = "there is an ask card named 'msg_{uid}' that has '"+sentence+"' as content and is to the agent '"+node.get_agent_name().replace(/'/g, "\\'")+"' and is from the individual '"+user.id+"' and has the timestamp '{now}' as timestamp";
        add_card(input, true, null, user.id);
    }
    else{
        if(submitted_statements.indexOf(input.toLowerCase()) > -1 ){
            add_card("I cannot accept duplicate information from the same user.", false, null, "Sherlock");
            return window.alert("The input is invalid or you've already entered this information!");
        }
        submitted_statements.push(input.toLowerCase());

        card = "there is an nl card named 'msg_{uid}' that has '"+sentence+"' as content and is to the agent '"+node.get_agent_name().replace(/'/g, "\\'")+"' and is from the individual '"+user.id+"' and has the timestamp '{now}' as timestamp";
        for(var i = 0; i < user.questions.length; i++){
            var q = user.questions[i];
            if(q.relationship == null && sentence.toLowerCase().indexOf(q.value.toLowerCase()) > -1 && sentence.toLowerCase().indexOf(q.concerns.toLowerCase()) > -1){
                asked_questions.push(user.questions[i].text);
            }
            else if(q.value == null && sentence.toLowerCase().indexOf(q.relationship.toLowerCase()) > -1 && sentence.toLowerCase().indexOf(q.concerns.toLowerCase()) > -1){
                asked_questions.push(user.questions[i].text);
            }
        }
        add_card(input, true, null, user.id);
        
    }
    node.add_sentence(card);
}

function confirm_card(id, content){
    document.getElementById("confirm_"+id).style.display = "none";
    document.getElementById("unconfirm_"+id).style.display = "none";
    forbid_input = false;

    if(submitted_statements.indexOf(content.toLowerCase()) > -1){
        add_card("I cannot accept duplicate information from the same user.", false, null, "Sherlock");
        return window.alert("You have already entered or conifirmed this statement.");
    }
    submitted_statements.push(content.toLowerCase());

    add_card("Yes.", true, null, user.id);
    var card = "there is a tell card named 'msg_{uid}' that has '"+content.replace(/'/g, "\\'")+"' as content and is to the agent '"+node.get_agent_name().replace(/'/g, "\\'")+"' and is from the individual '"+user.id+"' and has the timestamp '{now}' as timestamp";

    node.add_sentence(card);
    setTimeout(function(){
        ask_question_based_on_input(content);
    }, 1500);
}

function unconfirm_card(id){
    document.getElementById("confirm_"+id).style.display = "none";
    document.getElementById("unconfirm_"+id).style.display = "none";
    add_card("No.", true, null, user.id);
    add_card("OK.", false, null, "Sherlock");
    forbid_input = false;
}

function ask_question_based_on_input(sentence){
    var ins = node.get_instances("MID thing", true);
    var concerns;
    var potentials = {};
    var match = sentence.match(/the ([a-zA-Z0-9 ]*) '([a-zA-Z0-9 ]*)'/);
    if(match && match[2]){
        for(var i = 0; i < ins.length; i++){
            if(ins[i].name.toLowerCase() == match[2].toLowerCase()){
                concerns = ins[i];
                break;
            }
        }
    }
    if(concerns == null){return;}
    console.log(user.questions[0]);
    for(var i  = 0; i < user.questions.length; i++){
        if(user.questions[i].concerns == concerns.name){
            var state = get_question_state(user.questions[i]);
            if(state != "answered" && asked_questions.indexOf(user.questions[i].text) == -1){
                if(!user.questions[i].relationship || sentence.toLowerCase().indexOf(user.questions[i].relationship.toLowerCase()) == -1){
                    if(!user.questions[i].value || sentence.toLowerCase().indexOf(user.questions[i].value.toLowerCase()) == -1){
                        if(potentials[state] == null){potentials[state] = [];}
                        potentials[state].push(user.questions[i]);       
                    }
                }
            }       
        }
    }
    var card = "there is an ask card named 'msg_"+user.id+"_sherlock' that is from the agent 'Sherlock' and is to the individual '"+user.id+"' that has '{now}' as timestamp and has ";
    var content;
    if(potentials.contested != null){
        content = potentials.contested[0].text;
        asked_questions.push(potentials.contested[0].text);
    }
    else if(potentials.unconfident != null){
        content = potentials.unconfident[0].text;
        asked_questions.push(potentials.unconfident[0].text);
    }
    else if(potentials.unanswered != null){
        content = potentials.unanswered[0].text;
        asked_questions.push(potentials.unanswered[0].text);
    }

    if(content){
        card+="'"+content.replace(/'/g, "\\'")+"' as content.";
        console.log(card);
        node.add_sentence(card);
    }
}

function update_ui(){
    if(settings.logged_in == true){
        ui.overlays.login.style.display = "none";
        ui.info.score.innerHTML = user.score;
        if(user.selected_screen == "moira"){
            ui.overlays.moira.style.display = "block"; 
            ui.overlays.dashboard.style.display = "none";
        }
        else if(user.selected_screen == "dashboard"){
            ui.overlays.dashboard.style.display = "block";
            ui.overlays.moira.style.display = "none";
        }
    }
    else{
        ui.overlays.login.style.display = "block";
        ui.overlays.moira.style.display = "none"; 
        ui.inputs.login_user_id.value = "";
        ui.info.cards.innerHTML = "";
    }
}

function add_card(content, local, id, author, linked_content, card_type){
    if(id == null || (id != null && shown_cards.indexOf(id) == -1)){
        if(author == user.id+" agent"){
            author = "Sherlock";
        }
        shown_cards.push(id);
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        var c = '<div class="card';
        if(local){c+=' user';}
        else{
            c+=' friend';
            if(navigator.vibrate){
                navigator.vibrate([70,40,200]);
            }
        }
        c+='">';
        if(author != null){
            c+= '<p class="author">'+author+'</p>';
        }   
        c+='<p>';
        if(card_type != null && card_type == "confirm card"){
            c+='OK. Is this what you meant?<br /><br />';
        }
        c+=content.replace(/(?:\r\n|\r|\n)/g, ' <br /> ').replace(/  /g, '&nbsp;&nbsp;')+'</p>';
        if(linked_content != null){
            c+='<img src="'+linked_content+'" alt="Attachment" />';
        }
        if(card_type != null && card_type == "confirm card"){
            c+='<button id="confirm_'+id+'" class="confirm" onclick="confirm_card(\''+id+'\', \''+content.replace(/'/g, "\\'")+'\')">Yes</button>';
            c+='<button id="unconfirm_'+id+'" class="unconfirm" onclick="unconfirm_card(\''+id+'\')">No</button>';
            forbid_input = true;
        }
        c+='</div>';
        ui.info.cards.innerHTML+=c;
        ui.info.cards.scrollTop = ui.info.cards.scrollHeight;
    }
}

function get_question_state(q){
    if(q.responses.length == 0){return "unanswered";}
    else if(q.responses.length < 2){return "unconfident";}
    else{
        var responses = {};
        var response_vols = [];
        for(var j = 0; j < q.responses.length; j++){
            if(!(q.responses[j] in responses)){responses[q.responses[j]] = 0;}
            responses[q.responses[j]]++;
        }
        for(key in responses){response_vols.push(responses[key]);}
        response_vols.sort().reverse();
        if(response_vols.length == 1){return "answered";}
        else if(response_vols.length > 1 && (response_vols[0]-response_vols[1]) >= 3){return "answered";}
        else{return "contested";}
    }
}

function check_answers(ins){
    ui.info.questions.innerHTML = "";
    for(var i = 0; i < user.questions.length; i++){user.questions[i].responses = [];}
    for(var i = 0; i < ins.length; i++){

        // Detect if type of card. If so, filter and add to UI if necessary
        if(node.get_instance_type(ins[i]).indexOf("card") > -1){
            var tos = node.get_instance_relationships(ins[i], "is to");
            for(var j = 0; j < tos.length; j++){
                if(tos[j].name.toLowerCase() == user.id.toLowerCase()){
                    add_card(node.get_instance_value(ins[i], "content"), false, ins[i].name, node.get_instance_relationship(ins[i], "is from").name, node.get_instance_value(ins[i], "linked content"), node.get_instance_type(ins[i]));
                }
            }
            var from = node.get_instance_relationship(ins[i], "is from");
            if(from.name.toLowerCase() == user.id.toLowerCase() && node.get_instance_type(ins[i]) == "tell card"){
                if(scored_cards.indexOf(ins[i].name) == -1){
                    user.score++;
                    scored_cards.push(ins[i].name);
                    update_ui();
                }
            }
            
        }
        else{
            for(var j = 0; j < user.questions.length; j++){
                var instance = ins[i];
                var question = user.questions[j];
                if(question.concerns.toLowerCase() == instance.name.toLowerCase()){
                    if(question.value != null){
                        for(var k = 0; k < instance.values.length; k++){
                            if(instance.values[k].descriptor == question.value){question.responses.push(instance.values[k].type_name.toLowerCase());}
                        }
                    }
                    if(question.relationship != null){
                        for(var k = 0; k < instance.relationships.length; k++){
                            if(instance.relationships[k].label == question.relationship){question.responses.push(instance.relationships[k].target_name.toLowerCase());}
                        }
                    }
                }
            }
        }
    }
    for(var i = 0; i < user.questions.length ; i++){
        ui.info.questions.innerHTML += '<li onclick="alert(\''+user.questions[i].text.replace(/'/g, "\\'")+'\');" class="response question '+get_question_state(user.questions[i])+'">'+(i+1)+'</li>';
    }
}

function load_questions(){
    var qs = node.get_instances("question");
    for(var i = 0; i < qs.length; i++){
        var q = {};
        q.responses = [];
        for(var j = 0; j < qs[i].values.length; j++){
            q[qs[i].values[j].descriptor] = qs[i].values[j].type_name;
        }
        for(var j = 0; j < qs[i].relationships.length; j++){
            q[qs[i].relationships[j].label] = qs[i].relationships[j].target_name;
        }
        user.questions.push(q);
    }
}

function poll_for_instances(){
    if(node == null){
        return;
    }
    setTimeout(function(){
        if(node != null){
            check_answers(node.get_instances());
            poll_for_instances();
        }
    },1000);
}

function check_online(){
    var now = new Date().getTime();
    var last = node.get_agent().get_last_successful_request();
    var diff = now - last;
    if(diff < 5000){
        ui.info.online_status.style.backgroundColor = "green";
    }
    else{
        ui.info.online_status.style.backgroundColor = "gray";
    }
    setTimeout(function(){
        check_online();
    }, 1000);
}

window.onload = function(){
    initialize_ui();
    bind_listeners();
    ui.overlays.moira.style.display = "none";
    ui.overlays.dashboard.style.display = "none";
};
