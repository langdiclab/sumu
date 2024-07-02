let sMd = 0;
let fMd = 1;
let conds = [];
let addProp = (obj,prop,val) => {
  Object.defineProperty(obj, prop, { value: val, writable: true, configurable: true, enumerable: true });
}
let csv2objArr = (lines, delim, targ) => {
  let pn = lines[0].split(delim); let pCnt = pn.length; for(let n=0; n<pCnt; n++) { pn[n] = pn[n].trimEnd(); }
  for(k=1; k < lines.length; k++) { if(lines[k] == "") continue; let tmp = lines[k].split(delim);
    if(tmp.length < pCnt) { for(let s=0; s<pCnt-tmp.length; s++) { tmp.push(""); }}
    let tmpObj = {}; for(let n=0; n<pCnt; n++) { addProp(tmpObj,[pn[n]],tmp[n].trimEnd()); } targ.push(tmpObj);
  }
}
let txt2objArr = (txt, delim, targ) => {
  let tmp = txt.split("\n"); let tmp2 = []; for(let i=0; i<tmp.length; i++) {
    if(tmp[i] == "" || tmp[i].substr(0,2) == "//") continue; tmp2.push(tmp[i].split(" "+"//")[0]);
  }
  csv2objArr(tmp2, delim, targ);
}
const kC2 = [
  ["kya", "きゃ"],
  ["kyu", "きゅ"],
  ["kyo", "きょ"],
  ["sha", "しゃ"],
  ["shi", "し"],
  ["shu", "しゅ"],
  ["she", "しぇ"],
  ["sho", "しょ"],
  ["cha", "ちゃ"],
  ["chi", "ち"],
  ["zhi", "ぢ"],
  ["chu", "ちゅ"],
  ["che", "ちぇ"],
  ["cho", "ちょ"],
  ["tsu", "つ"],
  ["zsu", "づ"],
  ["nya", "にゃ"],
  ["nyu", "にゅ"],
  ["nyo", "にょ"],
  ["hya", "ひゃ"],
  ["hyu", "ひゅ"],
  ["hyo", "ひょ"],
  ["pya", "ぴゃ"],
  ["pyu", "ぴゅ"],
  ["pyo", "ぴょ"],
  ["mya", "みゃ"],
  ["myu", "みゅ"],
  ["myo", "みょ"],
  ["rya", "りゃ"],
  ["ryu", "りゅ"],
  ["ryo", "りょ"],
];
let romzJpn = {
  tbl:[],
  getRomzOfSw(prefix,sc) {
    let ret = "";
    switch(sc) {
    case "しぇ" : ret = "she"; break;
    case "じぇ" : ret = "je"; break;
    case "ちぇ" : ret = "che"; break;
    }
    if(ret != "") return(ret);
    for(let m=0;m<jpRomz2HiraSmall.length;m++) { let sp = jpRomz2HiraSmall[m];
      for(let n=0;n<5;n++) { if(sp.v[n] == sc[1]) {
        switch(sc[0]) { 
        case "し": if(sp.c == "y") ret = "sh"+vod[n]; break;
        case "じ": if(sp.c == "y") ret = "j"   +vod[n]; break;
        case "ち": if(sp.c == "y") ret = "ch"+vod[n]; break;
        case "ぢ": if(sp.c == "y") ret = "zh"+vod[n]; break;
        case "う": if(sp.c == "l") { if(sp.v[n] == "ぃ" || sp.v[n] == "ぇ" || sp.v[n] == "ぉ") ret = "w"+vod[n]; } break;
        case "て": if(sp.c == "l") { if(sp.v[n] == "ぃ") ret = "t"+vod[n]; } break;
        case "で": if(sp.c == "l") { if(sp.v[n] == "ぃ") ret = "d"+vod[n]; } break;
        case "と": if(sp.c == "l") { if(sp.v[n] == "ぅ") ret = "t"+vod[n]; } break;
        case "ど": if(sp.c == "l") { if(sp.v[n] == "ぅ") ret = "d"+vod[n]; } break;
        case "ふ": if(sp.c == "l") ret = "f"+vod[n]; break;
        }
        if(ret == "") { ret = prefix+sp.c+vod[n]; } return(ret);
       }}
    }
    return(ret);
  },
  getRomz(word) {
    let ret = []; let bFlag = 0;
    let tmp = word; let la; let tu = "na";
    tmp = tmp.replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
    for(let i=0;i<tmp.length;i++) {
      la = ret.length-1; switch(tmp[i]) {
      case "ー" : if(i == 0) { alert(`getRomz err★★★ word=${word}`); } else { ret[la].chr += "ー"; ret[la].rmz += "-"; } continue; 
      case "っ" : if(i == tmp.length-1) { console.log(`getRomz ★err★ skip word=${word}`); } else { tu = i; } continue;
      }
      bFlag = 0;
      for(let j=0;j<jpRomz2HiraBig.length;j++) { let p = jpRomz2HiraBig[j];
        for(let k=0;k<6;k++) { if(tmp[i] == p.v[k]) {
            if(i < tmp.length-1) {
              let sRomz = this.getRomzOfSw(p.c,tmp.substr(i,2)); if(sRomz != "") {
                ret.push({chr:word.substr(i,2),rmz:sRomz}); bFlag = 1; i++;
              }
            }
            if(bFlag == 0) {
              let chr = word[i]; let rmz; switch(tmp[i]) {
              case "し" : rmz = "shi"; break;
              case "じ" : rmz = "ji"; break;
              case "ち" : rmz = "chi"; break;
              case "ぢ" : rmz = "zhi"; break;
              case "つ" : rmz = "tsu"; break;
              case "づ" : rmz = "zsu"; break;
              default : rmz = p.c+vod[k]; break;
              }
              ret.push({chr,rmz}); bFlag = 1;
            }
          } if(bFlag) break;
        }  if(bFlag) break;
      }
      if(tu != "na") { 
        la = ret.length-1; if(la > 0) { ret[la-1].chr += word[tu]; ret[la-1].rmz += ret[la].rmz[0]; }
        else { ret[la].chr += word[tu]; ret[la].rmz = ret[la].rmz[0]+ret[la].rmz; }
        tu = "na"; 
      }
    }
   
    for(let i=0;i<ret.length;i++) {
      if(i > 0 && ret[i].rmz[0] == "&" && ret[i].rmz[1] != "n") {
        if(ret[i-1].rmz == "&n") ret[i].rmz = "'" + ret[i].rmz;
      }
    }
    return(ret);
  },
  getChar(romz,opt) {
    let ret = "";
    let tmp = romz;
    switch(opt) {
    case 1: case 2: case 3: break; default: return ("opt error");
    }
    let iniCap = (/[A-Z]/.exec(tmp[0]) != null)? 1 : 0;
    if(iniCap) {
console.log("getChar : iniCap Yes");
      tmp = tmp.toLowerCase();
    }
const kV = "aiueo";
const kC1 = [
  ["k", "かきくけこ"],
  ["g", "がぎぐげご"],
  ["s", "さ★すせそ"],
  ["z", "ざ★ずぜぞ"],
  ["j", ["じゃ","じ","じゅ","じぇ","じょ"]],
  ["t", ["た","てぃ","とぅ","て","と"]],
  ["d", ["だ","でぃ","どぅ","で","ど"]],
  ["n", "なにぬねの"],
  ["h", "はひふへほ"],
  ["f", ["ふぁ","ふぃ","ふ","ふぇ","ふぉ"]],
  ["b", "ばびぶべぼ"],
  ["p", "ぱぴぷぺぽ"],
  ["m", "まみむめも"],
  ["y", "やいゆえよ"],
  ["r", "らりるれろ"],
  ["w", ["わ","うぃ","う","うぇ","を"]],
];
    
    lc = 0;
    while(tmp != "") {
      let len = tmp.length; if(/[aiueo]/.exec(tmp[0]) != null) {
        for(let i=0;i<kV.length;i++) {
          if(tmp[0] == kV[i]) { tmp = (len > 1)? tmp.substr(1, len-1) : ""; ret += String.fromCharCode("あ".charCodeAt(0)+i*2); break; }
        }
      } else {
        if(tmp[0] == "-") { tmp = (len > 1)? tmp.substr(1, len-1) : ""; ret += "ー"; continue; }
        if(len == 1 && tmp == "n") { tmp = ""; ret += "ん"; break;}
        else if(len > 1) {
          if(tmp.substr(0,2) == "nn") { tmp = (len > 2)? tmp.substr(2, len-2) : ""; ret += "ん"; continue; }
          if(tmp[0] == "n" && /[aiueoy]/.exec(tmp[1]) == null ) { tmp = tmp.substr(1, len-1); ret += "ん"; continue; }
        }
        let f2 = tmp.substr(0,2); if(f2 == "ci" || f2 == "zi") tmp = f2[0]+"h"+f2[1]+tmp.substr(2);
        let cs = ""; if(len > 2 && tmp[0] == tmp[1]) { cs = "っ"; tmp = tmp.substr(1); }
        let hit = 0; for(let i=0;i<kC2.length;i++) {
          if(tmp.substr(0,3) == kC2[i][0]) { tmp = (len > 3)? tmp.substr(3, len-3) : ""; ret += cs + kC2[i][1]; hit = 1; break; }
        }
        if(hit) continue;
        for(let i=0;i<kC1.length;i++) { let p = kC1[i][0]; let q = kC1[i][1];
          if(p == tmp[0]) { if(/[aiueo]/.exec(tmp[1]) != null) { for(let j=0;j<kV.length;j++) {
          if(tmp[1] == kV[j]) { tmp = (len > 2)? tmp.substr(2, len-2) : ""; ret += cs + q[j]; hit = 1; break;}
          } if(hit) break; }}
        }
      }
      lc++; if(lc == 16) break;
    }
    if(lc == 16) return("error");
    if(opt >= 2) {
      let kata = ret.replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60));
      if(opt == 3) ret = [ret, kata]; else ret = kata;
    }
    return(ret);
  },
}
let condsTxJp =
`romz, cond, alt
AtoChi, x~cT14, AtC
BaSho, x~0P0J, BS
BoKou, x~1o6A, BKu
BouSai, x~5WcN, BuSi
BuBun, x~0T6r, BBn
BunKa, x~0U5e, BnK
BunYa, x~6r15, BnY
ChuuGoku, x~281u, CuGk||pnNat
-?Go, -?x~5v, -?G
ChuuKo, x~282z, !||CuK
?Sha, ?x~1v, ?S
ChuuShin, x|x~280D cOcC, CuSn
DaiGaku, x~2767, !||DiGk
?In, ?x~c4, ?In
?Sei, ?x~3e, ?Si
EiGo, x~7I5v, EiG
EiYou, x~4F6l, !||EiYu
?Shi, ?x~a7, ?S
GaiKan, [x]x~2pcE 5p, GiKn
HacChouBori, x~87aCcH, HCuBr||★an
HatsuDen, x~6L9q, HtDn
HenKa, x~3B5e, HnK
HiKaku, x~5x8U , HKk
Hinan, [x]x~aZ6X 8y, HNn
HiroBa, x~2G0P, HrB
HiroShima, x~2Gcv, HrSm||★gn
HiroShimaJou, x~2GcvcI, HrSmJu
hito, x~0a, ht
HouHou, x~0%6Q, HuHu
IBaSho, x~8t0P0J, IBS
IpPou, x[x]~80 0%6f, IPu
IRyou, x~6ybq, IRu
JiBun, x~1F6r, JBn
JiDai, x~023C, JDi
JinJa, x~791P, JnJ
JinSei, x~0a3e, JnSi
JiShaku, x~d1d2, JSk
JiYuu, [x]x~1F0u 7r, JYu
JuuTaku, x~3&a8, JuTk
KaiGai, x~102p, KiGi
KaiMaku , x~5Ud0, KiMk
KaiSen, x~5n9z, KiSn
KaiSha, x~311P, KiS
KaiYuu, x~5n32, KiYu
KaKaku, x~947C, KKk
KakuToku, x~cW4m, KkTk
KamiYaChou, x~cL0Z0W, KmYCu||★an
KanBi, x|[x]x~9u4Q cRcS 1k, KnB
KanKoku, x|x~cm1u 3Z5z, !||knkk
?Go, ?x~5v, ?G
KanKou, x|[x]x~5p5S 5FcX 3g, KnKu
KanKyou, x~9R9S, KnKu
KaNou, x|x|x|x~7o7p 5ecU 4AbP cV15, KNu||★pn
KanShin, [x]x~7x6T 0D, KnSn
KeiKaku, x~5L0x, KiKk
KenKyuu, x~7Y8p, !||KnKu
?Sha, ?x~0q, ?S
?Sho, ?x~0J, ?S
KenSetsu, x~427Q, KnSt
KiBo, x~blbm, KB
KiBou, x~a3bj, KBu
KiGen, x|x~1V4u 7S3H, KGn
KiHon, x~9a0X, KHn
kinou, x|x|x~9s20 7S7p 4sbP, knu
KiSo, x|x|x~9acq 3od3 24d4, KS||★gn
KoDomo, x~0s4P, KDm
KokuGo, x~1u5v, KkG
KotoBa, x~3d0N, KtB
KouEn, x[x]|x|x[x]~1m b4aE craE 2l 1Rc5, KuEn
KuFuu, x~a%af, KFu
KyoRi, x~cM5g, KR
KyoTen, x~bz6J, KTn
KyouMi, x~ca0v, KuM
MiRai, x~773K, MRi
MiRyoku, x~6C0H, MRk
MokuTeki, x~0l6P, MkTk
MonoGatari, x~0t5v, MnGtr
NakaMa, x~bh03, NkM||★pn
NaMae, x~0e2k, NMe
NanKin, x|x~cPcQ 2N8j, NnKn||★gn
NiHon, x|[2x]x~200X 81 0X, !||NHn
?BunKa, ?x~0U5e, ?BnK
?Go, ?x~5v, ?G
?Shi, ?x~9t, ?S
NipPon, x~200X, NPn
OuJa, x~cY0q, OuJ
RekiShi, x~a09t, RkS
RiYou, x|x~8x6h 6R6&, RYu
RiYuu, x~6R7r, RYu
SakuHin, x~470F, SkHn
SeiBi, x~5B4Q, SiB
SeiHin, x~910F, SiHn
SeiSuu, x~5B0z, SiSu
SenMon, x~761p, SnMn
ShaKai, x~1P31, SKi
ShiAi, x~4330, SAi
shinai, x|x~1i2o cFcG, sni
ShinKa, x|x|x~4M5e 2I94 cC2d, SnK
ShinKin, x|x|x|x~0r2r 0D7c 2IcD 8z25, SnKn
ShiSetsu, x|x|x~aO7Q 456G 1G7Q, SSt
ShitaBi, x~2d22, Stb
ShiYou, [x]x|x~45431G 6h 4V7K, SYu
SouGyou, x~cZ9p, SuGu
TaiZai, x~cK3a, TiZi
TenKai, x~ag5U, TnKi
TenKi, x|x[x]~1h0B 3N 7S4L, TnK
ToDouFuKen, x~7P1JaLb1, tdfkn||%%
ToShin, x~7P0D, TSn
Tsubasa, x~c&, Tbs
YaBou, x~15bj, YBu
YakuWari, x~cJ6v, YkWr
YoTei, x~703T, YTi
Yume, x~7n, Ym
YuRai, x~7r3K, YRi
zz, ZZ, zz`;

let convNotePartsJp = [];
let convNotePartsJpTx =
`key, romz, pc, sc
`;
let convNoteJp = 
`p, c
FUKU, Fff
Z, Zzz
`;
let convNoteRetTx = "";
function convNoteFunc(condsTx) {
  const fName = "convNoteFunc";
  let arr = condsTx.split("\n"); for(let i=0;i<arr.length;i++) {
    if(arr[i] == "" || arr[i].substr(0,2) == "//") { arr.splice(i,1); i--; continue; }
    arr[i] = arr[i].split(" "+"//")[0];
    let p = arr[i].split(", "); com.checkTag(p);
    if(i > 0) targTx += "\n"; targTx += p[1];
  }
  
  txt2objArr(convNotePartsJpTx,", ",convNotePartsJp);
  for(let i=0;i<convNotePartsJp.length;i++) {
    let p = convNotePartsJp[i]; let re = new RegExp("\\$"+p.key, "g");
    if(re.exec(convNoteJp) == null) continue;
    const t = [{s:"pc", p:p.pc},{s:"sc", p:p.sc}]; for(let j=0;j<t.length;j++) {
      convNoteJp = convNoteJp.replace(new RegExp("\\$"+p.key+"\\."+t[j].s, "g"), t[j].p);
    }
  }
  tmp = convNoteJp.split("\n"); for(let i=1;i<tmp.length;i++) {
    if(tmp[i] == "") continue; let tmp2 = tmp[i].split(" "+"//")[0].trimEnd();
    tmp2 = tmp2.split(", ");
    switch(tmp2[1]) {
    case "auto": tmp2[1] = autoFunc(tmp2[0]); break;
    case "capa": tmp2[1] = cap.capa(tmp2[0]); break;
    }
    let re = new RegExp("\\$"+tmp2[0], "g"); targTx = targTx.replace(re, tmp2[1]);
  }
  retArr = []; targArr = targTx.split("\n"); 
  if(arr.length != targArr.length) alert(`${fName} error length arr=${arr.length} targArr=${targArr.length}`);
  for(let i=0;i<arr.length;i++) {
    let p = arr[i].split(", "); retArr.push(`${p[0]}, ${targArr[i]}, ${p[2]}`);
    if(p[1] != targArr[i]) console.log(`${fName} replaced ${p[1]}➔${targArr[i]}`);
  }
  convNoteRetTx =retArr.join("\n");
  return(convNoteRetTx);
}
let targTx ="";
let nats = [];
let natsTx=`
cd, cflag, en, jp
AC, 🇦🇨, Ascension Island, 
AD, 🇦🇩, Andorra, 
AE, 🇦🇪, United Arab Emirates, 
AF, 🇦🇫, Afghanistan, アフガニスタン
AG, 🇦🇬, Antigua & Barbuda, 
AI, 🇦🇮, Anguilla, 
AL, 🇦🇱, Albania, アルバニア
AM, 🇦🇲, Armenia, アルメニア
AO, 🇦🇴, Angola, アンゴラ
AQ, 🇦🇶, Antarctica, 
AR, 🇦🇷, Argentina, アルゼンチン
AS, 🇦🇸, American Samoa, 
AT, 🇦🇹, Austria, オーストリア
AU, 🇦🇺, Australia, オーストラリア
AW, 🇦🇼, Aruba, 
AX, 🇦🇽, Åland Islands, 
AZ, 🇦🇿, Azerbaijan, アゼルバイジャン
BA, 🇧🇦, Bosnia & Herzegovina, 
BB, 🇧🇧, Barbados, 
BD, 🇧🇩, Bangladesh, 
BE, 🇧🇪, Belgium, ベルギー
BF, 🇧🇫, Burkina Faso, 
BG, 🇧🇬, Bulgaria, ブルガリア
BH, 🇧🇭, Bahrain, バーレーン
BI, 🇧🇮, Burundi, 
BJ, 🇧🇯, Benin, 
BL, 🇧🇱, St. Barthélemy, 
BM, 🇧🇲, Bermuda, バルミューダ
BN, 🇧🇳, Brunei, ブルネイ
BO, 🇧🇴, Bolivia, ボリビア
BQ, 🇧🇶, Caribbean Netherlands, 
BR, 🇧🇷, Brazil, ブラジル
BS, 🇧🇸, Bahamas, バハマ
BT, 🇧🇹, Bhutan, ブータン
BV, 🇧🇻, Bouvet Island, 
BW, 🇧🇼, Botswana, ボツワナ
BY, 🇧🇾, Belarus, ベラルーシ
BZ, 🇧🇿, Belize, ベリーズ
CA, 🇨🇦, Canada, カナダ
CC, 🇨🇨, Cocos (Keeling) Islands, 
CD, 🇨🇩, Congo - Kinshasa, 
CF, 🇨🇫, Central African Republic, 
CG, 🇨🇬, Congo - Brazzaville, 
CH, 🇨🇭, Switzerland, スイス
CI, 🇨🇮, Côte d’Ivoire, 
CK, 🇨🇰, Cook Islands, 
CL, 🇨🇱, Chile, チリ
CM, 🇨🇲, Cameroon, カメルーン
CN, 🇨🇳, China, チャイナ|中国
CO, 🇨🇴, Colombia, コロンビア
CP, 🇨🇵, Clipperton Island, 
CR, 🇨🇷, Costa Rica, コスタリカ
CU, 🇨🇺, Cuba, キューバ
CV, 🇨🇻, Cape Verde, カーボヴェルデ
CW, 🇨🇼, Curaçao, 
CX, 🇨🇽, Christmas Island, 
CY, 🇨🇾, Cyprus, キプロス
CZ, 🇨🇿, Czechia, チェコ
DE, 🇩🇪, Germany, ドイツ
DG, 🇩🇬, Diego Garcia, 
DJ, 🇩🇯, Djibouti, 
DK, 🇩🇰, Denmark, デンマーク
DM, 🇩🇲, Dominica, ドミニカ
DO, 🇩🇴, Dominican Republic, 
DZ, 🇩🇿, Algeria, アルジェリア
EA, 🇪🇦, Ceuta & Melilla, 
EC, 🇪🇨, Ecuador, エクアドル
EE, 🇪🇪, Estonia, エストニア
EG, 🇪🇬, Egypt, エジプト
EH, 🇪🇭, Western Sahara, 
ER, 🇪🇷, Eritrea, 
ES, 🇪🇸, Spain, スペイン
ET, 🇪🇹, Ethiopia, エチオピア
EU, 🇪🇺, European Union, 
FI, 🇫🇮, Finland, フィンランド
FJ, 🇫🇯, Fiji, フィジー
FK, 🇫🇰, Falkland Islands, 
FM, 🇫🇲, Micronesia, ミクロネシア
FO, 🇫🇴, Faroe Islands, 
FR, 🇫🇷, France, フランス
GA, 🇬🇦, Gabon, 
GB, 🇬🇧, United Kingdom, イギリス|英国
GD, 🇬🇩, Grenada, 
GE, 🇬🇪, Georgia, ジョージア
GF, 🇬🇫, French Guiana, 
GG, 🇬🇬, Guernsey, 
GH, 🇬🇭, Ghana, ガーナ
GI, 🇬🇮, Gibraltar, ジブラルタル
GL, 🇬🇱, Greenland, グリーンランド
GM, 🇬🇲, Gambia, ガンビア
GN, 🇬🇳, Guinea, ギニア
GP, 🇬🇵, Guadeloupe, 
GQ, 🇬🇶, Equatorial Guinea, 
GR, 🇬🇷, Greece, ギリシャ
GS, 🇬🇸, South Georgia & South Sandwich Islands, 
GT, 🇬🇹, Guatemala, グァテマラ
GU, 🇬🇺, Guam, グァム
GW, 🇬🇼, Guinea-Bissau, 
GY, 🇬🇾, Guyana, 
HK, 🇭🇰, Hong Kong SAR China, 
HM, 🇭🇲, Heard & McDonald Islands, 
HN, 🇭🇳, Honduras, ホンジュラス
HR, 🇭🇷, Croatia, クロアチア
HT, 🇭🇹, Haiti, ハイチ
HU, 🇭🇺, Hungary, ハンガリー
IC, 🇮🇨, Canary Islands, カナリア諸島
ID, 🇮🇩, Indonesia, インドネシア
IE, 🇮🇪, Ireland, アイルランド
IL, 🇮🇱, Israel, イスラエル
IM, 🇮🇲, Isle of Man, 
IN, 🇮🇳, India, インド
IO, 🇮🇴, British Indian Ocean Territory, 
IQ, 🇮🇶, Iraq, イラク
IR, 🇮🇷, Iran, イラン
IS, 🇮🇸, Iceland, アイスランド
IT, 🇮🇹, Italy, イタリア
JE, 🇯🇪, Jersey, 
JM, 🇯🇲, Jamaica, ジャマイカ
JO, 🇯🇴, Jordan, ヨルダン
JP, 🇯🇵, Japan, 日本
KE, 🇰🇪, Kenya, ケニヤ
KG, 🇰🇬, Kyrgyzstan, キルギスタン
KH, 🇰🇭, Cambodia, カンボジア
KI, 🇰🇮, Kiribati, キリバス
KM, 🇰🇲, Comoros, 
KN, 🇰🇳, St. Kitts & Nevis, 
KP, 🇰🇵, North Korea, 北朝鮮
KR, 🇰🇷, South Korea, 韓国
KW, 🇰🇼, Kuwait, クウェート
KY, 🇰🇾, Cayman Islands, 
KZ, 🇰🇿, Kazakhstan, カザフスタン
LA, 🇱🇦, Laos, ラオス
LB, 🇱🇧, Lebanon, 
LC, 🇱🇨, St. Lucia, 
LI, 🇱🇮, Liechtenstein, リヒテンシュタイン
LK, 🇱🇰, Sri Lanka, スリランカ
LR, 🇱🇷, Liberia, リベリア
LS, 🇱🇸, Lesotho, 
LT, 🇱🇹, Lithuania, リトアニア
LU, 🇱🇺, Luxembourg, ルクセンブルク
LV, 🇱🇻, Latvia, ラトビア
LY, 🇱🇾, Libya, リビヤ
MA, 🇲🇦, Morocco, モロッコ
MC, 🇲🇨, Monaco, モナコ
MD, 🇲🇩, Moldova, モルドバ
ME, 🇲🇪, Montenegro, モンテネグロ
MF, 🇲🇫, St. Martin, 
MG, 🇲🇬, Madagascar, マダガスカル
MH, 🇲🇭, Marshall Islands, 
MK, 🇲🇰, North Macedonia, 
ML, 🇲🇱, Mali, マリ
MM, 🇲🇲, Myanmar (Burma), 
MN, 🇲🇳, Mongolia, モンゴル
MO, 🇲🇴, Macao SAR China, 
MP, 🇲🇵, Northern Mariana Islands, 
MQ, 🇲🇶, Martinique, 
MR, 🇲🇷, Mauritania, 
MS, 🇲🇸, Montserrat, 
MT, 🇲🇹, Malta, マルタ
MU, 🇲🇺, Mauritius, 
MV, 🇲🇻, Maldives, モルディブ
MW, 🇲🇼, Malawi, 
MX, 🇲🇽, Mexico, メキシコ
MY, 🇲🇾, Malaysia, マレーシア
MZ, 🇲🇿, Mozambique, 
NA, 🇳🇦, Namibia, ナミビア
NC, 🇳🇨, New Caledonia, ニューカレドニア
NE, 🇳🇪, Niger, ニジェール
NF, 🇳🇫, Norfolk Island, 
NG, 🇳🇬, Nigeria, ナイジェリア
NI, 🇳🇮, Nicaragua, ニカラグア
NL, 🇳🇱, Netherlands, オランダ
NO, 🇳🇴, Norway, ノルウェー
NP, 🇳🇵, Nepal, ネパール
NR, 🇳🇷, Nauru, 
NU, 🇳🇺, Niue, 
NZ, 🇳🇿, New Zealand, ニュージーランド
OM, 🇴🇲, Oman, オマーン
PA, 🇵🇦, Panama, パナマ
PE, 🇵🇪, Peru, ペルー
PF, 🇵🇫, French Polynesia, 
PG, 🇵🇬, Papua New Guinea, 
PH, 🇵🇭, Philippines, フィリピン
PK, 🇵🇰, Pakistan, パキスタン
PL, 🇵🇱, Poland, ポーランド
PM, 🇵🇲, St. Pierre & Miquelon, 
PN, 🇵🇳, Pitcairn Islands, 
PR, 🇵🇷, Puerto Rico, プエルトリコ
PS, 🇵🇸, Palestinian Territories, 
PT, 🇵🇹, Portugal, ポルトガル
PW, 🇵🇼, Palau, パラオ
PY, 🇵🇾, Paraguay, パラグアイ
QA, 🇶🇦, Qatar, カタール
RE, 🇷🇪, Réunion, 
RO, 🇷🇴, Romania, ルーマニア
RS, 🇷🇸, Serbia, セルビア
RU, 🇷🇺, Russia, ロシア
RW, 🇷🇼, Rwanda, ルワンダ
SA, 🇸🇦, Saudi Arabia, サウジアラビア
SB, 🇸🇧, Solomon Islands, ソロモン諸島
SC, 🇸🇨, Seychelles, 
SD, 🇸🇩, Sudan, スーダン
SE, 🇸🇪, Sweden, スウェーデン
SG, 🇸🇬, Singapore, シンガポール
SH, 🇸🇭, St. Helena, 
SI, 🇸🇮, Slovenia, スロベニア
SJ, 🇸🇯, Svalbard & Jan Mayen, 
SK, 🇸🇰, Slovakia, スロバキア
SL, 🇸🇱, Sierra Leone, シエラレオネ
SM, 🇸🇲, San Marino, 
SN, 🇸🇳, Senegal, セネガル
SO, 🇸🇴, Somalia, ソマリア
SR, 🇸🇷, Suriname, スリナム
SS, 🇸🇸, South Sudan, 南スーダン
ST, 🇸🇹, São Tomé & Príncipe, 
SV, 🇸🇻, El Salvador, エルサルバドル
SX, 🇸🇽, Sint Maarten, 
SY, 🇸🇾, Syria, シリア
SZ, 🇸🇿, Eswatini, 
TA, 🇹🇦, Tristan da Cunha, 
TC, 🇹🇨, Turks & Caicos Islands, 
TD, 🇹🇩, Chad, チャド
TF, 🇹🇫, French Southern Territories, 
TG, 🇹🇬, Togo, トーゴ
TH, 🇹🇭, Thailand, タイ
TJ, 🇹🇯, Tajikistan, タジキスタン
TK, 🇹🇰, Tokelau, 
TL, 🇹🇱, Timor-Leste, 
TM, 🇹🇲, Turkmenistan, 
TN, 🇹🇳, Tunisia, 
TO, 🇹🇴, Tonga, トンガ
TR, 🇹🇷, Turkey, トルコ
TT, 🇹🇹, Trinidad & Tobago, 
TV, 🇹🇻, Tuvalu, ツバル
TW, 🇹🇼, Taiwan, 台湾
TZ, 🇹🇿, Tanzania, タンザニア
UA, 🇺🇦, Ukraine, ウクライナ
UG, 🇺🇬, Uganda, ウガンダ
UM, 🇺🇲, U.S. Outlying Islands, 
UN, 🇺🇳, United Nations, 
US, 🇺🇸, United States, アメリカ|米国
UY, 🇺🇾, Uruguay, ウルグアイ
UZ, 🇺🇿, Uzbekistan, ウズベキスタン
VA, 🇻🇦, Vatican City, ヴァチカン
VC, 🇻🇨, St. Vincent & Grenadines, 
VE, 🇻🇪, Venezuela, ベネズエラ
VG, 🇻🇬, British Virgin Islands, 
VI, 🇻🇮, U.S. Virgin Islands, 
VN, 🇻🇳, Vietnam, ベトナム
VU, 🇻🇺, Vanuatu, バヌアツ
WF, 🇼🇫, Wallis & Futuna, 
WS, 🇼🇸, Samoa, サモア
XK, 🇽🇰, Kosovo, コソボ
YE, 🇾🇪, Yemen, イエメン
YT, 🇾🇹, Mayotte, 
ZA, 🇿🇦, South Africa, 南アフリカ
ZM, 🇿🇲, Zambia, ザンビア
ZW, 🇿🇼, Zimbabwe, ジンバブエ
`;
