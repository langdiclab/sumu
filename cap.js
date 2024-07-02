let d64 = {
conv: function(opt, val) {
  let seq = "0123456789"+"abcdefghijklmnopqrstuvwxyz"+"%"+"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"&";
  let ret; switch(opt) {
  case 0: 
    if((typeof val) != "string") return("★error typeof val★"); ret = 0; if(val.length > 4) return("★val too big★");
    if(val[0] == "0") val = val.substr(1); let len = val.length; for(let i=0; i<len; i++) {
      for(let p=0; p<seq.length; p++) { if(val[len-i-1] == seq[p]) { ret += p*64**i; break; }}
    }
    break;
  case 1:
    if((typeof val) != "number") return("★error typeof val★");
    if(val >= 64**4) return("★val too big★"); ret = ""; let calc = val;
    if(calc >= 64**3) { ret += seq[Math.floor(calc/(64**3))]; calc = calc%(64**3);}
    if(calc >= 64**2) { ret += seq[Math.floor(calc/(64**2))]; calc = calc%(64**2);} else if(ret != "") { ret += "0";}
    if(calc >= 64**1) { ret += seq[Math.floor(calc/(64**1))]; calc = calc%(64**1);} else if(ret != "") { ret += "0";}
    ret += seq[calc];
    break;
  }
  return(ret);
},
calc: function(val) { let ret = {dec: null, d64: ""};
  let tmp = val.split("+"); if(tmp.length >= 2) { ret.dec = 0; for(let i=0; i<tmp.length; i++) { ret.dec += this.conv(0,tmp[i]); }}
  else { tmp = val.split("-"); if(tmp.length == 2) { ret.dec = this.conv(0,tmp[0]) - this.conv(0,tmp[1]); }}
  if(ret.dec != null) { if(ret.dec >= 0) { ret.d64 = this.conv(1,ret.dec); } else { ret.d64 = "★"; }} return(ret);
},
}

const cgHr = "ぁ-ん";
const cgKt = "ァ-ヴー";
const cgKj = "一-鿯々";
const sfPnHr = "(さ|ちゃ)ん";
const sfPnKj = "[君氏]";
const sfPn = `${sfPnHr}|${sfPnKj}`;
let cap = {
kj: [
  "今年時間朝昼夜何誰彼人体実身名根頭顔口鼻耳目手足肌指者親子物事味色画音数方形気毛心先品種力面所友共庭葉歯場花原平部文他町本家屋世"+
  "海岡川空地野山湖谷晴雲雨熱暑寒深浅天市犬美駅公同母門風株極薬国車声米姿旅民常父鳥肉主自私初店道路虫飯最優社豊円科界各期季型元然全"+
  "日月火水木金土大中小多少上下高低明暗良悪前後入出内外遠近太細重軽有無新古強弱長短早速遅広狭真男女東西南北春夏秋冬白黒赤青黄緑茶紫"+
  "合会遊値当余編操現表在辺歩言生活行受失産映動疑置起送修押落驚帯思想終影返書傾変代聞効切着嫌組配来繰削転応答裂咲支定死知直過好勧住"+
  "責立建試保使付作継伝続通届閉相商与要打移写売得選追負教覚帰抱限囲勝奏乾考決加企消超込栄探刺去示調記進注育供備楽食頼違仕集務積連問"+
  "解説取眺流投和成均握似残除登化果離張響降欲瞬丸回周観営浮治買飼語借比攻告勉募整富悩習慣願寝述飲乗計運始走放話貼光引開含防振震触減"+
  "曲交増益待祭惑学守護迷充満見向報結用持戻求養休読呼喜若分別忘笑割安意医印因校区魅個式週節像達点描発必逆不的法理局感系族次非状度容"+
  "予存域器絵怖専未郡神頃酒筋互正確為縄苦猫再途病夢可能第由番号題認便関係歳際阪了格技術識参経英評様皆昔易提都設況機位球更視診研字致"+
  "一二三四五六七八九十百千万億兆左右対氏京毎態策件験究員量料居般特団利難信室処覧接健断改善異脱条詳担課版頂枚症討及任較額念済程例段"+
  "談製承費価旧準故資己基象案約絶以戸反客菜情素単査質業電性昨史完害複福銀線井片肩是僕俺枝危幸審困具練索被標絡看環境迎紹介精権導徒労"+
  "歴検台希択類普士宅妻嫁娘舗制丈夫展師携律契委弊採漫請倫躍努職将誕申街範構工敗午丁払演弁収粧訪却政府証授施謝購階恋愛税維憶施織避側"+
  "依県働又園卒厳倍斬伐材適算議灰席項仲功望訳規模換緒融療妊娠撃醜総把掲敵拠息旦那稿券抑雰齢摂央剤寧監督既麗納忙到簡籍践脳録撮築率伴"+
  "険販判管院援協頑障載興康章偽催嬉駐婚徴裕燥昭韓析挙激礎講座勤沖島松浦武郎熊楠田臣菌概竹刀堀城役滞紙距災忠軟禁甘寛跡膿狩獲敢王創翼"+
  "幕"+
  "xxx"+
  "★ZZZ★々ヶ"+
  "綺"
],
capa: function(key) { return(""); },
cv: function(str) { return(d64.conv(0,str)); },
cs: function(val) { return(d64.conv(1,val)); },
getStrH: function(s,p,n) { if(n == "!") n = "10"; return(this.kj[s].substr(this.cv(p),this.cv(n))); },
sh: function(s) { return(this.getStrH(0, s.substr(0,2), s[2])); },
getStrV: function(s,p, n) { if(n == "!") n = "10"; let pos = this.cv(p); let cnt = this.cv(n); let ret = ""; 
  for(let i=0;i<cnt;i++) { ret += this.kj[s][pos+64*i]; } return(ret);
},
sv: function(s) { return(this.getStrV(0, s.substr(0,2), s[2])); },
getPos: function(str) { let ret = {a:[], s:""}; for(let i=0;i<str.length;i++) {
  let f = 0; for(let j=0;j<this.kj.length;j++) { for(let k=0;k<this.kj[j].length;k++) { let p = this.kj[j][k];
    if(p == str[i]) { let pos = d64.conv(1,k); if(pos.length == 1) pos = "0"+pos; ret.a.push({s:j, pos}); ret.s += pos; f = 1; break; }} if(f) break;
  } if(f == 0) { ret.a.push({s:0, pos:"★"}); ret.s += "★"; }
  } return(ret);
},
gp: function(str) { let ret = ""; let tmp = str.split(","); for(let i=0;i<tmp.length;i++) { ret += this.getPos(tmp[i]).s+" "; } return(str+"\n"+ret+"\n"); },
getCharSf: function(p) { let ret = ""; for(let i=0;i<p.length;i++) { ret += this.kj[p[i].s].substr(this.cv(p[i].pos),1); } return(ret); },
ss: function(p) { let par = []; for(let i=0;i<p.length/2;i++) { par.push({s:0, pos:p.substr(i*2,2)}); } return(this.getCharSf(par)); },
}
const cgSC = "㋐㋑㋒";
const reSC = new RegExp("["+cgSC+"]",'g');
let mus = {
  basRe: [],
  pnOn: [],
  pnPn: [],
  pnGn: [],
basReInit: function() {
  let reOn = this.get(this.pnOn); if(reOn != "") this.basRe.push({id:"On", exp: new RegExp(`(${reOn})`, "g"), rep:"㋐$1㋐"});
  let rePn = this.getPn(); if(rePn != "") this.basRe.push({id:"Pn", exp: new RegExp(`(${rePn})`, "g"), rep:"㋑$1㋑"});
  let reGn = this.get(this.pnGn); if(reGn != "") {
    const GnExp = `(${reGn})`; this.basRe.push({id:"Gn", exp: new RegExp(`${GnExp}`, "g"), rep:"㋒$1㋒"});
  }
  this.basRe.push({id:"$ust1", exp: null, rep:"㋐$1㋐"});
  this.basRe.push({id:"$ust2", exp: null, rep:"㋑$1㋑"});
  this.basRe.push({id:"$ust3", exp: null, rep:"㋒$1㋒"});
},
  cmdHd: [],
basReUS: function() {
  for(let i=0;i<this.cmdHd.length;i++) { let p = this.cmdHd[i]; if(p.substr(0,4) != "$ust") continue;
    let tmp = p.split("w:"); let exp = (tmp.length == 2)? tmp[1].replace(/,/g,"|") : ""; if(exp != "") {
      exp = (/\(.+\)/.exec(exp) != null)? `${exp}`:`(${exp})`;
      for(let j=0;j<this.basRe.length;j++) { let q = this.basRe[j]; if(q.id == p.substr(0,5)) q.exp = new RegExp(exp, "g"); }
    }
    const sel = this.gs(".stFoU"+p[4]); if(sel == null) { alert(`error sel .stFoU${p[4]} not found`); continue; }
    const csItems = ["c","f","s"]; for(let j=0;j<csItems.length;j++) { let q = csItems[j]; tmp = p.split(q+":"); if(tmp.length == 2) {
        const v = (/:/g.exec(tmp[1]) != null)? tmp[1].replace(/^([^:]+) [cfsw]:.+/g,"$1") : tmp[1]; if(v != "") this.cs(sel,q,v);
      }
    }
  } return (0);
},
get: function(arr) {
  let ret = ""; for(let i=0;i<arr.length;i++) { if(arr[i] == "") continue; if(i > 0) ret += "|"; ret += arr[i]; } return(ret);
},
getPn: function() {
  let pnJpn = []; for(let i=0;i<this.pnPn.length;i++) { let p = this.pnPn[i].split("|"); 
  if(p.length == 2) { pnJpn.push({fn:p[0], pn:p[1]}); } else if(p.length == 1) { pnJpn.push({fn:"★", pn:p}); } else { continue; }}
  let fnList = ""; let pnList = ""; for(let i=0;i<pnJpn.length;i++) { let p = pnJpn[i]; if(p.fn != "★") fnList += "|"+p.fn; if(p.pn != "★") pnList += "|"+p.pn; }
  if(fnList.length > 2) fnList = fnList.replace(/^\|/,""); if(pnList.length > 2) pnList = pnList.replace(/^\|/,"");
  let ret = (pnList == "")? "" : `(${fnList})(${sfPn})|(${pnList})(${sfPn})*`;
  return(ret);
},
ap: function(tmp) {
  for(let j=0;j<this.basRe.length;j++) { let p = this.basRe[j]; if(p.exp == null) continue;
    if(p.exp.exec(tmp) != null) tmp = tmp.replace(p.exp, p.rep);
  } return(tmp);
},
rc: function(tmp) {
  const basReApp = [
  {id:"㋐", ke: /㋐/, exp:/㋐([^㋐]{1,64})㋐/g, rep:"<span class=\"stFoU1\">$1</span>"},
  {id:"㋑", ke: /㋑/, exp:/㋑([^㋑]{1,64})㋑/g, rep:"<span class=\"stFoU2\">$1</span>"},
  {id:"㋒", ke: /㋒/, exp:/㋒([^㋒]{1,64})㋒/g, rep:"<span class=\"stFoU3\">$1</span>"},
  ];
  for(let j=0;j<basReApp.length;j++) { let p = basReApp[j]; if(p.ke.exec(tmp) == null) continue;
    let exp = new RegExp(`${p.id}([^${p.id}]+"highlighter"[^${p.id}]+)${p.id}`, "g");
    if(exp.exec(tmp) != null) {
console.log(`dGAT.rc: detect ${p.id}highlighter${p.id}`);
    }
    tmp = tmp.replace(p.exp, p.rep);
  } return(tmp);
},
gs: function(sel) { let ret = null; let cssRules = document.styleSheets[0].cssRules;
  for(let i=0; i<cssRules.length; i++) { let p = cssRules[i]; if(p.selectorText == sel) return(p); } return(ret);
},
cs: function(sel,csItems,v) {
  const tmp = sel.cssText; switch(csItems) {
  case "c": sel.style.color = v;; break;
  case "f": sel.style.fontFamily = v;; break;
  case "s": sel.style.fontSize = v;; break;
  }
  let chLog = ""; if(tmp != sel.cssText) { const selNm = tmp.split(" { ")[0];
  const pOV = (tmp.split(" { ")[1].split(" }")[0]).split(";"); const pNV = (sel.cssText.split(" { ")[1].split(" }")[0]).split(";");
  for(let i=0;i<pOV.length;i++) { const p = pOV[i].split(": "); const q = pNV[i].split(": ");
  if(p[1] != q[1]) { chLog = `$ust${selNm.substr(6)} changed ${p[0]} : ${p[1] }> ${q[1]}`; break; }}}
  if(chLog != "") {
console.log(chLog);
  }
},
}
const maxTsvCnt = 3200;
let tsvConfig = {
  title:"",
  colWs:[],
  colMaxWid:[],
  tbl:[],
  errCnt:null,
make: function(valArr, cmds) {
  const fName = "makeTsv";
console.log(`${fName} valArr.length=${valArr.length}`);
  let maxLine = valArr.length; if(valArr.length > maxTsvCnt) {
alert(`${maxTsvCnt+1}件以上を検出 先頭${maxTsvCnt}件を処理します。`); maxLine = maxTsvCnt;
  }
  if(cmds.length >= 3) this.title = cmds[2]; if(cmds.length >= 4) { valArr = loadCol(valArr,"\t",cmds[3].split(",")); }
  let colWs = []; let tmp = valArr[0].split("\t");
  for(let i=0;i<tmp.length;i++) { let ta = ""; if(tmp[i][0] == "▶") ta = "▶"; colWs.push({c:{len:0,str:"",rn:0}, width:0, tx:{len:0,str:"",rn:0},ta:ta}); }
  let errCnt = { colOvr:0, colUnd:0 }; for(let i=0;i<maxLine;i++) { if(valArr[i] == "") continue;
    let tmp = valArr[i].split("\t");
    if(colWs.length != tmp.length) { if(colWs.length < tmp.length) errCnt.colOvr++; else errCnt.colUnd++; }
    for(let k=0;k<tmp.length;k++) { if(colWs[k].c.len < tmp[k].length) { colWs[k].c.len = tmp[k].length; colWs[k].c.str = tmp[k]; colWs[k].c.rn = i; }
      let width = 0; let crTmp = tmp[k].split("▼"); for(let m=0;m<crTmp.length;m++) {
        let tmpW = ctxLoc.measureText(crTmp[m]).width; if(crTmp[m][0] == "-") tmpW += 2; if(tmpW > width) width = tmpW; }
      if(colWs[k].width < width) { colWs[k].width = width; colWs[k].tx.len = tmp[k].length; colWs[k].tx.str = tmp[k]; colWs[k].tx.rn = i; }
    } csvArr.push(valArr[i]);
  }
  this.colMaxWid = []; for(let i=0;i<colWs.length;i++) { this.colMaxWid.push({rn:colWs[i].tx.rn, str:colWs[i].tx.str}); }
  this.colWs = colWs; this.errCnt = errCnt; return (0);
},
};
let tsm = {
  ts:"",
gt: function () { const dt = new Date();
  let year = `${dt.getFullYear()}`;
  let mon = `${dt.getMonth()+1}`; if(mon.length == 1) mon = "0"+mon;
  let date = `${dt.getDate()}`; if(date.length == 1) date = "0"+date;
  return (`U ${year} ${mon}${date}`);
  },
}
let com = {
checkTag: function(cond) {
  if(cond.length != 3) return; if(cond[2] == "") return; let tmp = cond[2].split("||"); let exp = cond[1];
  let pushOn = ""; let pushPn = ""; let pushGn = ""; 
  for(let i=0;i<tmp.length;i++) { let p = tmp[i]; if(p.substr(0,2) != "pn") continue;
    if(p == "pnFn") { pushPn = `${exp}|★`; }
    else if(p.length == 4 && /pnP[mwu]/.exec(p) != null) { pushPn = `★|${exp}`; }
    else if(p == "pnPn") { pushPn = `${exp}`; }
    else if(p.substr(0,4) == "pnGn") { pushGn = exp; if(p == "pnGnFn") pushPn = `${exp}|★`; }
    else { pushOn = exp; }
  }
  if(pushOn != "") mus.pnOn.push(pushOn);
  if(pushPn != "") mus.pnPn.push(pushPn);
  if(pushGn != "") mus.pnGn.push(pushGn);
},

parCond: function(conds,i,sb) {
  const fNm = "parCond";
  let ret = conds[i].cond;
  if(/[\+-]*[1-9]*\?/g.exec(ret) != null) {
    if(/[\+-][1-9]*\?/g.exec(ret) != null) {
      const mai = [...ret.matchAll(/[\+-][1-9]*\?/g)]; for(let j=0;j<mai.length;j++) {
      const p = mai[j][0]; const ofs = (p[1] == "?")? 1 : parseInt(p[1]);
      const ti = (p[0] == "+")? i+ofs : i-ofs; ret = ret.replace(/[\+-][1-9]*\?/, conds[ti].cond);
    }} else if(sb != null) {
      const xf = sb.cond.split("~"); let tmp = [];
      if(xf.length > 1) { const xfm = xf[1].split(" "); for(let i=0;i<xfm.length;i++) { tmp.push("x~"+xfm[i]); }}
      else { tmp = decRegEx(sb.cond); }
      const mai = [...ret.matchAll(/\?[1-9]*/g)]; for(let j=0;j<mai.length;j++) {
      const p = mai[j][0]; const ofs = (p == "?")? 0 : parseInt(p[1])-1;
        for(let k=0;k<tmp.length;k++) { if(ofs == k) { ret = ret.replace(/\?[1-9]*/g, tmp[k]); break; }}
      }
    }
    const ck = ret.split("x~"); if(ck.length > 2) ret = "x~" + ck.join("");
  }
  return(ret);
},

getCond: function(val) {
  const fNm = "getCond"; let cond = ""; let len = val.length;
  if(reDI == 0) { if(/[.*+?^=!:${}()|[\]\/\\]/.exec(val) != null) { return(escapeRegExp(val)); }}
  let wgCond = ""; if(val.length >= 3 && /%/.exec(val) != null) {
    let p = val.split("%"); for(let i=0;i<wgPS.length;i++) { if(p[0] == wgPS[i].key) { wgCond = getWGOpt(i,p); break; }
      let cd = wgPS[i].key; cd = cd.replace(/[aiueo]/g, ""); if(p[0] == cd) { wgCond = getWGOpt(i,p); break; }
    }
  } if(wgCond != "") return("wg:"+wgCond); 

  let sb = null; for(let i=0;i<conds.length;i++) {
    const p = conds[i]; let cr = (p.romz.substr(0,2) == "-?")? conds[i-1].romz+p.romz.substr(2) : p.romz;
    if(p.romz[0] == "?") p.romz = sb.romz+p.romz.substr(1);
    if(cr[0].toLowerCase() == val[0].toLowerCase()) {
      if(cr.substr(0,len) == val) { cond = com.parCond(conds,i,sb); break; }
      if((/[A-Z]/.exec(cr[0]) != null)) { let tmp = cr.toLowerCase();
        if(tmp.substr(0,len) == val) { cond = com.parCond(conds,i,sb); break; }
      }
    } if(p.alt[0] == "!") sb = p;
  }

  if(cond.length > 2 && /x/g.exec(cond) != null) { let p = cond.split("~");
    cond = ""; let fo = p[0].split("x"); let da = p[1].split(" "); let ca = []; for(let i=0;i<da.length;i++) { ca.push(cap.ss(da[i])); }
    for(let i=0;i<ca.length;i++) { cond += fo[i] + ca[i] } if(fo.length > ca.length) cond += fo[fo.length-1];
  }
  if(cond == "") { for(let i=0;i<conds.length;i++) { let p = conds[i]; if(p.alt == "") continue;
      let alt = p.alt.split("||")[0]; if(alt.substr(0,len) == val) { cond = p.cond; break; }}
  }
  let kana = ""; let kanaGet = 1; if(len == 3) { for(let i=0;i<kC2.length;i++) { if(val == kC2[i][0]) { kanaGet = 0; break; }}}
  if(/[A-Z]/.exec(val[0]) != null) kanaGet = 0;
  const delim = "|"; if(kanaGet && len > 1) { if(/[aiueon-]/.exec(val[len-1]) != null) { let tmp = romzJpn.getChar(val,3);
      for(let i=0;i<tmp.length;i++) { if(tmp[i].length > 1) kana += (kana == "")? tmp[i] : "|"+tmp[i]; }
      if(cond == "") { cond = (kana != "")? kana : ""; } else { if(kana != "") cond = kana+delim+cond; }}
  }
  cond = (cond == "")? val : val+"|"+cond; return(cond);
},
makeScrollList: function(pElem, id, csv, opt) { const fName = "makeScrollList";
  let head = document.createElement("div"); let list = document.createElement("ul");
  let listItem,span; let spanPos = (opt != "")? [{left:0, width:32}] : []; const spCnt = spanPos.length;
  let divs = []; if(spCnt) { let div = document.createElement("div");
    div.setAttribute("style",`position:absolute; top:0px; left:0px; width:${32-2}px; outline: 1px solid;`); divs.push(div);
  }
  let tmpW = 0; let listW = 52; for(let j=0;j<tsvConfig.colWs.length;j++) { let tmp = tsvConfig.colWs[j];
    if(tmp.width < 54) tmpW = 54; else tmpW = tmp.width+8; listW += tmpW;
    let p = (spanPos.length > 0)? spanPos[spCnt+j-1] : {left:0, width:0}; spanPos.push({left:p.left+p.width, width:tmpW});
    p = spanPos[spCnt+j]; let w = p.width; if(j == tsvConfig.colWs.length-1) { if(listW > 1080) listW = 1120; w = listW -p.left+2; }
    div = document.createElement("div"); let tmpL = p.left-2; if(spCnt == 0 && j ==0) { tmpL = p.left; w -=2; }
    div.setAttribute("style",`position:absolute; top:0px; left:${tmpL}px; width:${w}px; outline: 1px solid;`); divs.push(div);
  }
  let listCnt = 0; let listH = 0; let hitRow = 0; let hh = 28;

  for(let i=0;i<csv.length;i++) { listItem = (i == 0)? head : document.createElement("li");
    if(spCnt) { span = document.createElement("span"); span.textContent = "HD"; listItem.appendChild(span); }
    let tmpSpan = 0; let tmp = csv[i]; let skip = 0; tmp = mus.ap(tmp);

    if(i > 0 && tmpRe.length > 0) { let hit = 0; for(let j=0;j<tmpRe.length;j++) {
      const res = com.ah(tmpRe[j], tmp); tmp = res.ret; hit += res.hit; skip += res.skip;
      } if(hit > 0) hitRow++; if(tmpRe.length == skip) continue;
    }

    if(/[㋐㋑㋒]/.exec(tmp) != null) tmp = mus.rc(tmp); tmp = tmp.split("\t"); let crCnt = 1;
    for(let j=0;j<tmp.length;j++) { span = document.createElement("span");
      let inner = tmp[j].split("▼"); if(inner.length > 1) { tmp[j] = inner.join("<br>"); if(inner.length > crCnt) crCnt = inner.length; }
      if(i == 0 && tmp[j][0] == "▶") tmp[j] = tmp[j].substr(1); span.innerHTML = tmp[j];
      tmpSpan += (spCnt == 0 && j == 0)? 2 : spanPos[spCnt+j-1].width;
      let taOfs = 0; if(i > 0 && tsvConfig.colWs[j].ta == "▶") taOfs = (tmp[j].length >4)? 18:30;
      span.setAttribute("style",`position:absolute; top:2px; left:${tmpSpan+taOfs}px;`);
      if(/[ぁ-ん]/g.exec(tmp[j]) != null) { span.style.fontFamily = "UD デジタル 教科書体 N-R"; } listItem.appendChild(span);
    }
    if(i > 0) { listItem.className = "listItem"; listItem.id = "li"+String(i); let ht = 28*crCnt; listH += ht; let lh = (crCnt > 1)? " line-height: 160%;":"";
      listItem.setAttribute("style",`position:relative; height:${ht}px; border: 1px solid;${lh}`); list.appendChild(listItem); listCnt++;
    } else { if(crCnt > 1) hh = 24*crCnt }
  }
  const hMax = 10*28+16; let dL = (listCnt > 10)? 10 : listCnt;
  let hv = dL*28+16; if(listCnt < 10 && listH > hv) hv = listH +16; let ad = (listCnt > 10)? dL*2-2 : dL*2;
  for(let i=0;i<divs.length;i++) { divs[i].style.height = String(hh+(hv-16)+ad)+"px"; head.appendChild(divs[i]); }
  let styleDef = ""; const w = `width:${listW}px;`; head.className = "header"; head.id = id+"_header";
  styleDef = `position:relative; margin-top: 16px; margin-left: 40px; ${w} height:${hh}px; background: lightgray; outline: solid; font-weight: bold;`;
  head.setAttribute("style",styleDef); pElem.appendChild(head); list.className = "scrollList"; list.id = id; let h = `height:${hv}px`;
  styleDef = `position:relative; margin-top: 2px; list-style-type: decimal-leading-zero; ${w} ${h}; overflow: auto; ${ffam} font-size: 18px;`;
  list.setAttribute("style",styleDef); pElem.appendChild(list);
  if(scrollPos > 0) document.getElementById("csvTab").scrollTop = scrollPos;
  statsProc(csv.slice(1).join("\n"), hitRow); return 0;
},
as: function(item, cNm) { return (`<span class="${cNm}">${item}</span>`); },
ah: function(re,tmp) {
  let ret = tmp; let hit = 0; let skip = 0; if(re.exp.exec(tmp) == null) {
    let a = []; let s = ""; let dc = ""; if(reSC.exec(tmp) != null) {
    const sConds = decRegEx(tmpCond[0]); let crossTarg = []; for(let i=0;i<sConds.length;i++) {
      let re = new RegExp(sConds[i],'g'); if(re.exec(tmp.replace(reSC,"")) != null) { crossTarg.push(sConds[i]); }
    }
  const sc = cgSC; if(crossTarg.length > 0) { for(let i=0;i<sc.length;i++) { if(!tmp.includes(sc[i])) continue;
  const w = crossTarg[0]; for(let k=1;k<w.length;k++) {
    s = w.substr(0,k)+sc[i]+ w.substr(k); a = tmp.split(s); if(a.length > 1) { dc = sc[i]; break; }
  }}}} if(dc != "") { const cNm = "highlighter";
    const t = s.split(dc);  s = this.as(t[0], cNm)+dc+this.as(t[1], cNm); ret = a.join(s); hit++;
  } else { if(fMd == 1) skip++; }
  } else { ret = tmp.replace(re.exp, re.rep); hit++; } return({ret,hit,skip});
},
}
