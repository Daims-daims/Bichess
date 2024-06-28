const dictCoordToLetter:{[n:number]:string} = {
    0:"a",
    1:"b",
    2:"c",
    3:"d",
    4:"e",
    5:"f",
    6:"g",
    7:"h",
}

const dictLetterToCoord:{[n:string]:number} = {
    "a":0,
    "b":1,
    "c":2,
    "d":3,
    "e":4,
    "f":5,
    "g":6,
    "h":7,
}

const lengthGame = 5

const backEndUrl = "http://localhost:3030"

const color={
    primary_color:"#FF8551",
    primary_color_fade : "#FF855133",
    primary_color_low_fade : "#FF855166",
    primary_bold:"#ff6e30",
    primary_extra_bold:"#E64500",
    primary_background:"#FFE3D7"
}

export {dictCoordToLetter,dictLetterToCoord,lengthGame,backEndUrl,color}