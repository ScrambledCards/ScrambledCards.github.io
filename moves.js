
//une main
const one_hand = [
//easy
{
    move: "Charlier Triangle (beginner)",
    link: "W1_k50kNLw4"
},
{
    move: "Flop by Daniel Lin (beginner)",
    link: "A5TscR-_hvM"
},
{
    move: "Index Cut (beginner)",
    link: "RgZPZ1WR2f0"
},
{
    move: "Knuckle Cut (beginner)",
    link: "bGBidZeAWXo"
},
{
    move: "Rev 2 by Brian Tudor (beginner)",
    link: "rDPmEvIwZFg"
},
{
    move: "Thumb Cut (beginner)",
    link: "p8yYTy-5cFo"
},
//{
//    move: "SEVAW by Simon Lauter (beginner)",
//       link: "3EhR_1IBK44"
//},
{
       move: "Twirl (beginner)",
    link: "aScUHcsIrvI"
},
//inter//
{
    move: "Castiron by Matt Samuel (intermediate)",
    link: "ztuXhY-0ifY"
},
{ move: "Castiron by Matt Samuel (intermediate)", link: "ztuXhY-0ifY" },
{ move: "Ghandi's flip flop by Daniel Lin (intermediate)", link: "f6d7x_CkC2U" },
{ move: "Legolove by Nikolaj Pedersen (intermediate)", link: "boV0c7bKAcM" },
{ move: "Skirt by Tobias Levin (intermediate)", link: "BKSZCNT-w7k" },
{ move: "Judo-Flip by Franco Pascali (intermediate)", link: "XERJh5xlBps" },
{ move: "Kroma Cuts by Jano Slap (intermediate)", link: "789xKHZN6Pg" },
{ move: "Kryptonite by Dan and Dave Buck (intermediate)", link: "o6HNsuFaETA" },
{ move: "L-Cuts Jerry by Cestkowski (intermediate)", link: "5fwh3_FNeR4" },
{ move: "Muse Cut by Henrik Forberg (intermediate)", link: "bpKbyxk78yw" },
{ move: "OH Shuffle by Jerry Cestkowski (intermediate)", link: "TlfbxprcyMo" },
{ move: "Retrigger by Oliver Sogard (intermediate)", link: "5MiqDxD_SJg" },
{ move: "Sange by Daniel Lin (intermediate)", link: "fwD8PkEqyew" },
{ move: "Trigger by Nikolaj Pedersen (intermediate)", link: "axRDCy67TMY" },
{ move: "Waves by Tobias Levin (intermediate)", link: "VvVu5evboJo" },
{ move: "Dropout by Oliver Sogard (intermediate)", link: "0_naI7jtzmc" },
{
    move: "Ghandi's flip flop by Daniel Lin (intermediate)",
    link: "f6d7x_CkC2U"
},
{
    move: "Legolove by Nikolaj Pedersen (intermediate)",
    link: "boV0c7bKAcM"
},
{
       move: "Skirt by Tobias Levin (intermediate)",
        link: "BKSZCNT-w7k"
},
{
    move: "Judo-Flip by Franco Pascali (intermediate)",
    link: "XERJh5xlBps"
},
{
    move: "Kroma Cuts by Jano Slap (intermediate)", 
    link: "789xKHZN6Pg"
},
{
    move: "Kryptonite by Dan and Dave Buck (intermediate)",
    link: "o6HNsuFaETA"
},
{
    move: "L-Cuts Jerry by Cestkowski (intermediate)",
    link: "5fwh3_FNeR4"
},
{
    move: "Muse Cut by Henrik Forberg (intermediate)",
    link: "bpKbyxk78yw"
},
{
    move: "OH Shuffle by Jerry Cestkowski (intermediate)",
    link: "TlfbxprcyMo"
},
//	{
//		move: "OHW by Birger Karlsson",
//		link: "NMY4AXUMGwg"
//	},
{
    move: "Retrigger by Oliver Sogard (intermediate)",
    link: "5MiqDxD_SJg"
},
{
    move: "Sange by Daniel Lin (intermediate)",
    link: "fwD8PkEqyew"
},
{
    move: "Trigger by Nikolaj Pedersen (intermediate)",
    link: "axRDCy67TMY"
},
{
     move: "Waves by Tobias Levin (intermediate)",
    link: "VvVu5evboJo"
},
{
        move: "Dropout by Oliver Sogard (intermediate)",
        link: "0_naI7jtzmc"
},
//advanced//
{
    move: "Cobra Cut by De'vo (advanced)",
    link: "yIfuFqZUH3s"
},
{ move: "Cobra Cut by De'vo (advanced)", link: "yIfuFqZUH3s" },
{ move: "One Handed Mechanical by Dimitri Arleri (advanced)", link: "GR-j3Zt1bUk" },
{ move: "Chaser by Dimitri Arleri (advanced)", link: "m8cnf1HFEu4" },
{ move: "Emratef by Mattis (advanced)", link: "0UC8EOzSE1o" },
{ move: "TRIST by Birger Karlsson (advanced)", link: "9Mnh8dTyTsQ" },
{ move: "V-Cuts by Tobias Levin (advanced)", link: "PPMUpCCqNiI" },
{
        move: "One Handed Mechanical by Dimitri Arleri (advanced)",
        link: "GR-j3Zt1bUk"
},
{
        move: "Chaser by Dimitri Arleri (advanced)",
        link: "m8cnf1HFEu4"
},
//	{
//		move: "Mantra by Tobias Levin",
//		link: null
//	},
//	{
//		move: "Rubix by Buseong Na",
//		link: null
//	},
{
        move: "Emratef by Mattis (advanced)",
        link: "0UC8EOzSE1o"
},
{
    move: "TRIST by Birger Karlsson (advanced)",
    link: "9Mnh8dTyTsQ" 
},
{
    move: "V-Cuts by Tobias Levin (advanced)",
    link: "PPMUpCCqNiI"
},
];
function randomOhMove() {
    return one_hand[Math.floor(Math.random() * one_hand.length)];
}
//deux mains
const two_hand = [
{
    move: "Bop by Nguyen Hoang Duy (beginner)",
    link: "l_UkBBqE3UE"
},
{
    move: "The Two To Cut by Biz (beginner)",
    link: "1mVcMIo21Og"
},
//KFC by Kevin Ho: https://www.youtube.com/watch?v=eHO3hhWhHSY
{
        move: "KFC by Kevin (beginner)",
        link: "eHO3hhWhHSY"
},
//Sybil 947 by Kevin Ho: https://www.youtube.com/watch?v=6GvdlOt45gY
{
        move: "Sybil 947 by Kevin Ho (beginner)",
        link: "6GvdlOt45gY"
},
//Totally Bogus! by Kevin Ho: https://www.youtube.com/watch?v=PiAi1rsTJfA
{
        move: "Totally Bogus! by Kevin Ho (beginner)",
        link: "PiAi1rsTJfA"
},
//Lavender Lapdance Combo by Kevin Ho: https://www.youtube.com/watch?v=a_MzQYgTmio
{
        move: "Lavender Lapdance Combo by Kevin Ho (beginner)",
        link: "a_MzQYgTmio"
},
//Corkscrew Closer by Kevin Ho: https://www.youtube.com/watch?v=35llCrdNssE
{
        move: "Corkscrew Closer by Kevin Ho (beginner)",
        link: "35llCrdNssE"
},
//Untitled by Kevin Ho (this is the last Kevin move I swear): https://www.youtube.com/watch?v=ZchzhKb_ciA
{
        move: "Untitled by Kevin Ho (beginner)",
        link: "ZchzhKb_ciA"
},
//Entangling Your Hands by Amb Rose: https://www.youtube.com/watch?v=dL1bxcaDgBM (beginner/intermediate)
{
        move: "Entangling Your Hands by Amb Rose (beginner)",
        link: "dL1bxcaDgBM"
},
//Smish by Frank Sung: https://www.youtube.com/watch?v=JarsKJBNbc8 
{
        move: "Smish by Frank Sung (beginner)",
        link: "JarsKJBNbc8 "
},
//Heavy Lighter by Henrik Forberg: https://www.youtube.com/watch?v=SeuM-WsMdF8 (beginner/intermediate)
{
        move: "Heavy Lighter by Henrik Forberg (beginner)",
        link: "SeuM-WsMdF8"
},
//Casey Cut by Jay Frye: https://www.youtube.com/watch?v=432Nl4AQFfs
{
        move: "Casey Cut by Jay Frye (beginner)",
        link: "432Nl4AQFfs"
},
//Fiaso by Tan T.H: https://www.youtube.com/watch?v=H07nd252kJs
{
        move: "Fiaso by Tan T.H (beginner)",
        link: "H07nd252kJs"
},
//Phish Food by Beckett Behel: https://www.youtube.com/watch?v=RJ5R3KQ4L-E
{
        move: "Phish Food by Beckett Behel (beginner)",
        link: "RJ5R3KQ4L-E"
},
{
        move: "Oun by Duy Nguyen (beginner)",
        link: "O2njp9oNmow"
},
{
        move: "Waterbend by Joe Feldpausch (beginner)",
        link: "_BcGZbFNM0g"
},
{
        move: "Canvas by Nikolaj Pedersen (beginner)",
        link: "kcBV7ZJR-7Y"
},
{
        move: "Flappy by David Beancurd (beginner)",
        link: "90mwq9S4a5s"
},
{
        move: "Rattle by Birger Karlsson (beginner)",
        link: "uEMlW8WAris"
},
{
        move: "Pearl by Evan Alberto (beginner)",
        link: "eqDwzoML1gc"
},
{
        move: "Reversed under pressure by Birger Karlsson (beginner)",
        link: "cb07WZdiKUs"
},
//	{
//		move: "Molecule Cut by Dan and Dave Buck",
//		link: null
//	},
{
    move: "Oddstyle 01 by Jaspas (beginner)",
    link: "oy2v7EnJXeg"
},

{
    move: "Peach by Frank Sung (beginner)",
    link: "Jc_GD8KONYo"
},
{
    move: "Pinball by Harrison Mace (beginner)",
    link: "T3KO1QNf9YU"
},
{
    move: "WERM by Dan and Dave Buck (beginner)",
    link: "LywWQm0ivUE"
},
{
    move: "Lock'd by Taras Truba (beginner)",
    link: "Y1XZ8NH7trw"
},
//inter
{
    move: "Atrium by Nobutaka Oi (intermediate)",
    link: "d4IAYfh5xyg"
},
//Fresco by Vinney Margot: https://www.youtube.com/watch?v=Ykqtj3hSBoo
{
        move: "Fresco by Vinney Margot (intermediate)",
        link: "Ykqtj3hSBoo"
},
//Lava by Bryan Lam: https://www.youtube.com/watch?v=gkwpEaLIizI
{
        move: "Lava by Bryan Lam (intermediate)",
        link: "gkwpEaLIizI"
},
//Riviera by Edgar Isaac: https://www.youtube.com/watch?v=t7kr-mRRv9Q&t=271s
{
        move: "Riviera by Edgar Isaac (intermediate)",
        link: "t7kr-mRRv9Q"
},
//Skid by Aleksey Lukin: https://www.youtube.com/watch?v=o79HzSzQUro
{
        move: "Skid by Aleksey Lukin (intermediate)",
        link: "o79HzSzQUro"
},
//Spider Cut by Henrik Forberg: https://www.youtube.com/watch?v=_jdrkmh_VmU
{
        move: "Spider Cut by Henrik Forberg (intermediate)",
        link: "_jdrkmh_VmU"
},
//Ziptie by Leo Flores: https://www.youtube.com/watch?v=qrhbVxr1Gok
{
        move: "Ziptie by Leo Flores (intermediate)",
        link: "qrhbVxr1Gok"
},
//Lowrider by Nikolaj Honore: https://www.youtube.com/watch?v=YdIECs17Cw0&t=12s
{
        move: "Lowrider by Nikolaj Honore (intermediate)",
        link: "YdIECs17Cw0"
},
//Lancelot by Nikolaj Honore: https://www.youtube.com/watch?v=YdIECs17Cw0&t=185s
{
        move: "Lancelot by Nikolaj Honore (intermediate)",
        link: "YdIECs17Cw0"
},
//Pesto By Tobias Levin: https://www.youtube.com/watch?v=XZiXyQTTI2A&t=10s
{
        move: "Pesto By Tobias Levin (intermediate)",
        link: "XZiXyQTTI2A"
},
//Hothead 2 by Tobias Levin: https://www.youtube.com/watch?v=XZiXyQTTI2A&t=98s
{
        move: "Hothead 2 by Tobias Levin (intermediate)",
        link: "XZiXyQTTI2A"
},
//Racketeer by Tobias Levin: https://www.youtube.com/watch?v=XZiXyQTTI2A&t=572s
{
        move: "Racketeer by Tobias Levin (intermediate)",
        link: "XZiXyQTTI2A"
},
//Feature Fit by Tobias Levin: https://www.youtube.com/watch?v=XZiXyQTTI2A&t=680s
{
        move: "Feature Fit by Tobias Levin (intermediate)",
        link: "XZiXyQTTI2A"
},
//TnR by Aviv Moraly: https://www.youtube.com/watch?v=Nlf4DEtDOGA&t=164s
{
        move: "TnR by Aviv Moraly (intermediate)",
        link: "Nlf4DEtDOGA"
},
//Carousel by Aviv Moraly: https://www.youtube.com/watch?v=Nlf4DEtDOGA&t=402s
{
        move: "Carousel by Aviv Moraly (intermediate)",
        link: "Nlf4DEtDOGA"
},
//Preqel by Dan Buck: https://www.youtube.com/watch?v=o6HNsuFaETA&t=242s
{
        move: "Preqel by Dan Buck (intermediate)",
        link: "o6HNsuFaETA"
},
//Meta by Antoine Cormerais: https://www.youtube.com/watch?v=7-KBbwSPgeY
{
        move: "Meta by Antoine Cormerais (intermediate)",
        link: "7-KBbwSPgeY"
},
//Full Counter by Luke Sewall: https://www.youtube.com/watch?v=I882rkBHZ1o
{
        move: "Full Counter by Luke Sewall (intermediate)",
        link: "I882rkBHZ1o"
},
//Stardust by Jason Chong: https://www.youtube.com/watch?v=p6aHsohJltU
{
        move: "Stardust by Jason Chong (intermediate)",
        link: "p6aHsohJltU"
},
{
        move: "KickStarter by Winson Lee (intermediate)",
        link: "3VP6XKtR8bQ"
},
{
        move: "Laundry by Birger Karlsson (intermediate)",
        link: "WHky74ZLsbU"
},
{
        move: "Namnlos by Birger Karlsson (intermediate)",
        link: "KIFJFI5lpk4"
},
{
        move: "Fulsomfan by Birger Karlsson (intermediate)",
        link: "bNsL6cij3fA"
},
{
        move: "Seattleite by Zach Mueller (intermediate)",
        link: "bMZ3vl6hasI"
},
{
        move: "Mousetrap by Sam Wheeler (intermediate)",
        link: "SCcdmGu9YWc"
},
//	{
//			move: "Barolo 2 by Nikolaj Pedersen (intermediate)",
//			link: "3yqrlQAwIzQ"
//	},
//	{
//		move: "Collapsybil by Beckett Behel",
//		link: null
//	},
{
        move: "Crawl by Franco Pascali (intermediate)",
        link: "BpgQoQlnw0U"
},
{
        move: "Dunsmuir by Daniel Lin (intermediate)",
        link: "vvPeJw3t2aE"
},
{
        move: "Flip Phone by Tobias Levin (intermediate)",
        link: "PPMUpCCqNiI"
},
{
        move: "Hook by Zach Mueller (intermediate)",
        link: "jrVvVokplQ0"
},
{
        move: "Lacoste 2 by Patrick Varnavas (intermediate)",
        link: "HpjMy2CoQjM"
},
{
        move: "Looper by Ladislas Toubart (intermediate)",
        link: "p52V7plGzQ0"
},
//{
//		move: "Madonna by Dan and Dave Buck",
//		link: null
//	},
//	{
//		move: "Maverick by Oliver Sogard",
//		link: null
//	},
{
    move: "Padlock by @martin_cardist (intermediate)",
    link: "alCdn_oBcoc"
},
{
    move: "Phaced by Tobias Levin (intermediate)",
    link: "-YvPnQFHIK4"
},
{
    move: "Skater Cut/Kickflip by Joey Burton & Dan and Dave Buck (intermediate)",
    link: "yCY2SOw4ZuI"
},
//	{
//		move: "Spin Doctor by Nikolaj Pedersen",
//		link: null
//	},
{
    move: "Spin Sybil by Jaspas (intermediate)",
    link: "uOFnZ8fzowE"
},
//	{
//		move: "Squeeze by Daren Yeow",
//		link: null
//	},
{
    move: "Squoze by Eliot Slevin (intermediate)",
    link: "DqFJCuQhIE4"
},
//	{
//		move: "Very Bad Habit by Brian Tudor",
//		link: null
//	},
{
    move: "Virus by Noel Heath (intermediate)",
    link: "hpPm1lOSCPg"
},
{
    move: "Whiplash by Matthew Beaudouin (intermediate)",
    link: "dYtVh6_HYu0"
},
//advenced th//
{
    move: "Jackson Five by Dan and Dave Buck (advanced)",
    link: "ZiXHXkkwkYA"
},
{
    move: "Boooom by Lun Zi (advanced)",
    link: "KgOz2Qm1m1w"
},
//Eye Cut by Bone Ho: https://www.youtube.com/watch?v=QGkvZNP_OK8
{
        move: "Eye Cut by Bone Ho (advanced)",
        link: "QGkvZNP_OK8"
},
//Helping Hand by Stefan La Iacona: https://www.youtube.com/watch?v=v0sz728TVzs
{
        move: "Helping Hand by Stefan La Iacona (advanced)",
        link: "v0sz728TVzs"
},
//	{
//		move: "Fission by Yang Chan",
//		link: null
//	},
{
    move: "Mocking God by Duy Nguyen",
    link: "wfFXjzO9OCM"
},
{
    move: "Mockingbird by Daren Yeow (advanced)"	,
    link: "Hb4snFAFzTw"
},
];
function randomThMove() {
    return two_hand[Math.floor(Math.random() * two_hand.length)];
}
const aerial = [
//	{
//		move: "Backdrop	Kevin Ho",
//		link: null
//	},
{
    move: "Biddle Flip by Lars Mayrand (beginner)",
    link: "ptl5JNfcDkw"
},
{
    move: "Deck Flip by T.G. Murphy (beginner)",
    link: "DFIf1ZC1lY4"
},
{
    move: "Flic by Dan and Dave Buck (beginner)",
    link: "vG3hSfTdD2Y"
},
{
    move: "Instant Replay by Paul Harris (beginner)",
    link: "Ul4Kc9ZOUOY"
},
{
    move: "Long Dist. Spinner by Audley V. Walsh (beginner)",
    link: "janqHU5Ydo0"
},
{
    move: "Slicing Waterfall by Jaspas (beginner)",
    link: "TYHV-8uSnkg"
},
//interm
{
    move: "ATM by Oliver Sogard (intermediate)",
    link: "UvtjLyrdUTs"
},
{
    move: "Blackhawk by @martin_cardist (intermediate)",
    link: "tvzxZBBG6kg"
},
{
    move: "Erdnase Go Round by Dan and Dave Buck (intermediate)",
    link: "RQrfhYNYHIs"
},
{
    move: "Judo-Shot by Weston Hamilton (intermediate)",
    link: "n9PQnaU3gCs"
},
{
    move: "Thin Spring by Classic Move (intermediate)",
    link: "YeGPp3J774g"
},
{
    move: "Throwback by Max Galarce (intermediate)",
    link: "fwxIraySvIE"
},
{
    move: "Vertigo by Dan and Dave Buck (intermediate)",
    link: "UuGrR9HhDP0"
},
];
function randomAerial() {
    return aerial[Math.floor(Math.random() * aerial.length)];
}