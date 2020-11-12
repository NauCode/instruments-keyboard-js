const samplerPiano1 = new Tone.Sampler({
    urls: {
        "C4": "C4.mp3",
        "D#4": "DS4.mp3",
        "F#4": "FS4.mp3",
        "A4": "A4.mp3",
    },
    release: 1,
    baseUrl: "assets/samples/piano1/",
}).toDestination();

const samplerViolin1 = new Tone.Sampler({
    urls: {
        "A0": "A0.mp3",
        "D0": "D0.mp3",
        "E0": "E0.mp3",
        "G0": "G0.mp3",
    },
    release: 1,
    baseUrl: "assets/samples/violin1/",
}).toDestination();

const samplerAcousticGuitar1 = new Tone.Sampler({
    urls: {
        "E1": "E1.m4a",
        "A1": "A1.m4a",
        "D2": "D2.m4a",
        "G2": "G2.m4a",
        "B2": "B2.m4a",
        "E3": "E3.m4a"
    },
    release: 1,
    baseUrl: "assets/samples/acousticGuitar1/",
}).toDestination();

const samplerElectricGuitar1 = new Tone.Sampler({
    urls: {
        "E1": "E1.m4a",
        "A1": "A1.m4a",
        "D2": "D2.m4a",
        "G2": "G2.m4a",
        "B2": "B2.m4a",
        "E3": "E3.m4a"
    },
    release: 1,
    baseUrl: "assets/samples/electricGuitar1/",
}).toDestination();

const samplerBass1 = new Tone.Sampler({
    urls: {
        "E0": "E0.m4a",
        "A0": "A0.m4a",
        "D0": "D0.m4a",
        "D1": "D1.m4a",
        "G0": "G0.m4a",
        "G1": "G1.m4a",
        "C0": "C0.m4a",
        "C1": "C1.m4a",
        "F1": "F1.m4a"
    },
    release: 3,
    baseUrl: "assets/samples/bass1/",
}).toDestination();

const samplerUkelele1 = new Tone.Sampler({
    urls: {
        "G3": "G3.m4a",
        "C3": "C3.m4a",
        "E3": "E3.m4a",
        "A3": "A3.m4a"
    },
    release: 1,
    baseUrl: "assets/samples/ukelele1/",
}).toDestination();

var dur = 1.7;
var holdDur = 8;
var hold = false;
var anK = 200;
var anHK = 400;
var lett = 4;

var samplers = {};
samplers["piano1"] = {
    dur: 1.7,
    holdDur: 8,
    anK: 200,
    anHK: 400,
    defaultLett: 4,
    sampler: samplerPiano1
};
samplers["violin1"] = {
    dur: 3,
    holdDur: 8,
    anK: 200,
    anHK: 400,
    defaultLett: 0,
    sampler: samplerViolin1
};
samplers["acousticGuitar1"] = {
    dur: 1.7,
    holdDur: 8,
    anK: 200,
    anHK: 400,
    defaultLett: 3,
    sampler: samplerAcousticGuitar1
};

samplers["electricGuitar1"] = {
    dur: 1.7,
    holdDur: 8,
    anK: 200,
    anHK: 400,
    defaultLett: 3,
    sampler: samplerElectricGuitar1
};

samplers["bass1"] = {
    dur: 1.7,
    holdDur: 8,
    anK: 200,
    anHK: 400,
    defaultLett: 0,
    sampler: samplerBass1
}

samplers["ukelele1"] = {
    dur:1.7,
    holdDur:8,
    anK: 200,
    anHK:400,
    defaultLett:3,
    sampler: samplerUkelele1
}

var currentSampler = "piano1";

function getSamplerData()
{
    return samplers[currentSampler];
}

function getCurrentSamplerName(){
    return currentSampler;
}

function getSampler()
{
    return samplers[currentSampler].sampler;
}

var keysAnimations = {};

const note = document.getElementById("nowplaying");

const keysObj = {};
keysObj["C"] = document.getElementById("keyC");
keysObj["CS"] = document.getElementById("keyCS");
keysObj["D"] = document.getElementById("keyD");
keysObj["DS"] = document.getElementById("keyDS");
keysObj["E"] = document.getElementById("keyE");
keysObj["F"] = document.getElementById("keyF");
keysObj["FS"] = document.getElementById("keyFS");
keysObj["G"] = document.getElementById("keyG");
keysObj["GS"] = document.getElementById("keyGS");
keysObj["A"] = document.getElementById("keyA");
keysObj["AS"] = document.getElementById("keyAS");
keysObj["B"] = document.getElementById("keyB");
keysObj["C2"] = document.getElementById("keyC2");
keysObj["C2S"] = document.getElementById("keyC2S");
keysObj["D2"] = document.getElementById("keyD2");
keysObj["D2S"] = document.getElementById("keyD2S");
keysObj["E2"] = document.getElementById("keyE2");

document.addEventListener("keyup", keyDownTextField, false);

function changeSampler(sampler)
{
    if(!!samplers && !!samplers[sampler]){
        currentSampler = sampler;
        var samplerData = getSamplerData();
        lett = samplerData.defaultLett;
        dur = samplerData.dur;
        holdDur = samplerData.holdDur;
        anK = samplerData.anK;
        anHK = samplerData.anHK;
    }
}

function increaseLett() {
    lett += 1;
    console.log("Lett: " + lett.toString());
}

function decreaseLett() {
    if (lett - 1 > -1) {
        lett -= 1;
        console.log("Lett: " + lett.toString());
    }
}

function setupAnimation(key) {
    if (!!!keysObj || !!!keysObj[key]) {
        return;
    }
    keysObj[key].classList.add("playing");
    if (!!!keysAnimations) {
        keysAnimations = {};
    }
    if (!!!keysAnimations["C"]) {
        keysAnimations["C"] = [];
    }
    keysAnimations["C"].push("1");
    setTimeout(function () {
        if (keysAnimations["C"].length < 2) {
            keysObj[key].classList.remove("playing");
        }
        keysAnimations["C"].pop();
    }, hold ? anHK : anK);
}

function keyDownTextField(e) {
    console.log(e.key);

    var charCode = e.key;
    switch (charCode) {
        case "z":
            if(getCurrentSamplerName()!=="piano1"){
                changeSampler("piano1");
            }
            break;
        case "x":
            if(getCurrentSamplerName()!=="violin1"){
                changeSampler("violin1");
            }
            break;
        case "c":
            if(getCurrentSamplerName()!=="acousticGuitar1"){
                changeSampler("acousticGuitar1");
            }
            break;
        case "v":
            if(getCurrentSamplerName()!=="electricGuitar1"){
                console.log('cambiado');
                changeSampler("electricGuitar1");
            }
            break;
        case "b":
            if(getCurrentSamplerName()!=="bass1"){
                changeSampler("bass1");
            }
            break;
        case "n":
            if(getCurrentSamplerName()!=="ukelele1"){
                changeSampler("ukelele1");
            }
            break;
        case "0":
            lett = 0;
            break;
        case "1":
            lett = 1;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "2":
            lett = 2;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "3":
            lett = 3;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "4":
            lett = 4;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "5":
            lett = 5;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "6":
            lett = 6;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "7":
            lett = 7;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "8":
            lett = 8;
            //document.getElementById("lett").textContent = lett.toString();
            break;
        case "9":
            lett = 9;
            document.getElementById("lett").textContent = lett.toString();
            break;
        case 'q':
            hold = !hold;
            //document.getElementById("hold").textContent = hold ? "Yes" : "No";
            break;
        case 'a':
            note.textContent = "C" + lett.toString();
            setupAnimation("C");
            getSampler().triggerAttackRelease(["C" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'w':
            note.textContent = "C#" + lett.toString();
            setupAnimation("CS");
            getSampler().triggerAttackRelease(["C#" + lett.toString()], hold ? holdDur : dur);
            break;
        case 's':
            note.textContent = "D" + lett.toString();
            setupAnimation("D");
            getSampler().triggerAttackRelease(["D" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'e':
            note.textContent = "D#" + lett.toString();
            setupAnimation("DS");
            getSampler().triggerAttackRelease(["D#" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'd':
            note.textContent = "E" + lett.toString();
            setupAnimation("E");
            getSampler().triggerAttackRelease(["E" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'f':
            note.textContent = "F" + lett.toString();
            setupAnimation("F");
            getSampler().triggerAttackRelease(["F" + lett.toString()], hold ? holdDur : dur);
            break;
        case 't':
            note.textContent = "F#" + lett.toString();
            setupAnimation("FS");
            getSampler().triggerAttackRelease(["F#" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'g':
            note.textContent = "G" + lett.toString();
            setupAnimation("G");
            getSampler().triggerAttackRelease(["G" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'y':
            note.textContent = "G#" + lett.toString();
            setupAnimation("GS");
            getSampler().triggerAttackRelease(["G#" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'h':
            note.textContent = "A" + lett.toString();
            setupAnimation("A");
            getSampler().triggerAttackRelease(["A" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'u':
            note.textContent = "A#" + lett.toString();
            setupAnimation("AS");
            getSampler().triggerAttackRelease(["A#" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'j':
            note.textContent = "B" + lett.toString();
            setupAnimation("B");
            getSampler().triggerAttackRelease(["B" + lett.toString()], hold ? holdDur : dur);
            break;
        case 'k':
            note.textContent = "C" + (lett + 1).toString();
            setupAnimation("C2");
            getSampler().triggerAttackRelease(["C" + (lett + 1).toString()], hold ? holdDur : dur);
            break;
        case 'o':
            note.textContent = "C#" + (lett + 1).toString();
            setupAnimation("C2S");
            getSampler().triggerAttackRelease(["C#" + (lett + 1).toString()], hold ? holdDur : dur);
            break;
        case 'l':
            note.textContent = "D" + (lett + 1).toString();
            setupAnimation("D2");
            getSampler().triggerAttackRelease(["D" + (lett + 1).toString()], hold ? holdDur : dur);
            break;
        case 'p':
            note.textContent = "D#" + (lett + 1).toString();
            setupAnimation("D2S");
            getSampler().triggerAttackRelease(["D#" + (lett + 1).toString()], hold ? holdDur : dur);
            break;
        case 'ñ':
            note.textContent = "E" + (lett + 1).toString();
            setupAnimation("E2");
            getSampler().triggerAttackRelease(["E" + (lett + 1).toString()], hold ? holdDur : dur);
            break;
    }
}