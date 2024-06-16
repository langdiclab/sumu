const repId = "sumu";
const ttIdx = `★${repId} index★`;
const ttEdt = `★${repId} editor★`;
let appId = "";
const ctxLoc = document.createElement('canvas').getContext('2d');
ctxLoc.font = '18px "Linux Biolinum G"';
const htmlCR = "<br>"+ "\n";
const ffam = `font-family:"Linux Biolinum G";`;
let txu = {
  cmd: { $:"" },
  sc: function (tx) {
    if(tx[0].substr(0,4) == "$tsv") this.cmd.$ = tx.splice(0, 1)[0]; else this.cmd.$ = ""; //
    return(tx);
  },
}
function escapeHtml(tx) {
  const fName = "escapeHtml";
  let ret = tx.replace(/&/g,"&amp;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&apos;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");
  return(ret);
}
function escapeHtmlSp(tx,opt) {
const reps = [
  {exp:/&/g, rep:"&amp;", sp:"礪"},
  {exp:/"/g, rep:"&quot;", sp:"礫"},
  {exp:/'/g, rep:"&apos;", sp:"礬"},
  {exp:/</g, rep:"&lt;", sp:"礭"},
  {exp:/>/g, rep:"&gt;", sp:"礮"},
];
  let ret = tx;
  if(opt == 0) {
    for(i=0; i< reps.length; i++) { let p = reps[i]; ret = ret.replace(p.exp,p.sp); }
  } else {
    for(i=0; i< reps.length; i++) { let p = reps[i]; ret = ret.replace(new RegExp(p.sp,'g'),p.rep); }
  }
  return(ret);
}
let statsBuf = "";
let subWin = null;
function loadCol(val,delim,cols) {
  const fName = "loadCol";
  let newVal = []; let newCsv = []; let idx = [];
  if(cols.length > 8) { alert("列数8件までしか処理しません"); }
  let csv = []; for(let i=0;i<val.length;i++) { csv.push(val[i].split(delim)); }
  
  for(let j=0;j<8;j++) { if(j == cols.length) break;
    for(let i=0;i<csv[0].length;i++) { if(cols[j] == csv[0][i]) idx.push([i,cols[j]]); }
  }
  for(let i=0;i<csv.length;i++) {
    let tmp = []; for(let j=0;j<idx.length;j++) { tmp.push(csv[i][idx[j][0]]); }
    newCsv.push(tmp);
    newVal.push(tmp.join(delim));
  }
  return(newVal);
}
function statsProc(tmp, hitRow) {
  const fName = "statsProc";
  mai.ret= [...tmp.matchAll(mai.exp)];
  statsBuf = `hitRow=${hitRow}`+"\n";
  for(let i=0;i<stats.length;i++) { statsBuf += stats[i].hd+"\n";
    for(let j=0;j<stats[i].mb.length;j++) { let p = stats[i].mb[j];
      let hitCnt = 0; for(let k=0;k<mai.ret.length;k++) { let q = mai.ret[k];
        for(let m=0;m<q.length;m++) { if(p.w == q[m]) hitCnt++; }
      } p.h = hitCnt;
      if(p.h > 0) statsBuf += `  ${p.w} (${p.h})`+"\n";
    } statsBuf += "\n";
  }
  if(subWin) { 
    let txBoxSub = subWin.document.getElementById("txBox"); txBoxSub.value = statsBuf;
  }
}
function demoAreaUpdate(pElem, id, arr, cond) {
  let retUpdate = 0;
  if(id == "csvTab") { retUpdate = com.makeScrollList(pElem, id, arr, cond); }
else {
  let freeTx = document.createElement("div"); let tmp = arr.join("\n"); let hitRow = 0;
  let esc = (/[&"'<>]/g.exec(tmp) == null)? 0 : 1; if(esc) tmp = escapeHtmlSp(tmp, 0);
  tmp =  mus.ap(tmp);
  if(tmpRe.length > 0) { let filtered = ""; let tmp2 = tmp.split("\n");
    for(let i=0;i<tmp2.length;i++) { if(tmp2[i] == "") continue; let hit = 0; let tmp3 = tmp2[i].split("。"); let cnt = tmp3.length -1 ;
      for(let k=0;k<tmp3.length;k++) { if(tmp3[k] == "") continue; if(cnt > 0) { tmp3[k] +="。"; cnt--; }
        for(let j=0;j<tmpRe.length;j++) { if(tmpRe[j].exp.exec(tmp3[k]) == null) continue;
          if(j > 0) filtered += "--------"+"\n"; filtered += tmp3[k].replace(tmpRe[j].exp, tmpRe[j].rep) +"\n"; hit++;
      }} if(hit > 0) hitRow++;
    } if(fMd) { tmp = filtered; } else { for(let j=0;j<tmpRe.length;j++) { tmp = tmp.replace(tmpRe[j].exp, tmpRe[j].rep); }}
    statsProc(arr.join("\n"), hitRow);
  }
  tmp = mus.rc(tmp);
  if(esc) tmp = escapeHtmlSp(tmp, 1); freeTx.innerHTML = tmp.split("\n").join(htmlCR);
  let styleDef = `width:1004px; height:480px; overflow: scroll; position:relative; margin-top: 8px; margin-left: 8px; line-height: 2em; background: #e6eded;`;
  styleDef += ` font-family: "UD デジタル 教科書体 N-R"; font-size: 20px;`;
  freeTx.setAttribute("style",styleDef); freeTx.id = "divFtx"; pElem.appendChild(freeTx);
  if(scrollPos > 0) document.getElementById("divFtx").scrollTop = scrollPos;
}
  return(retUpdate);
}
function decRegEx(reStr) {
  const fName = "decRegEx";
  let res = []; let err = 0; let tmp;
  tmp = reStr.split("("); let pf = (tmp.length > 1)? tmp[0] : "";
  tmp = reStr.split(")"); let sf = (tmp.length > 1)? tmp[1] : "";
  tmp = (pf !="" || sf !="")? reStr.split("(")[1].split(")")[0] : reStr; tmp = tmp.split("|");
  
  for(let i=0;i<tmp.length;i++) {
    let str = ""; let tmp2 = tmp[i].split("[");
    if(tmp2.length > 1) {
      let prefix = tmp2[0]; let arr = []; let arr2 = [];
      for(let j=1;j<tmp2.length;j++) { if(tmp2[j] == "") continue;
        let tmp3 = tmp2[j].split("]"); if(tmp3.length != 2) { err = 1; alert(`${fName} 不正パターン検知 ${reStr}`); continue; }
        if(arr.length == 0) { for(let k=0;k<tmp3[0].length;k++) { arr.push(tmp3[0][k] + tmp3[1]); }
        } else if(arr.length > 0) {
          for(let k=0;k<tmp3[0].length;k++) { 
            for(let m=0;m<arr.length;m++) { arr2.push(arr[m] + tmp3[0][k] + tmp3[1]); }
          }
          arr = []; for(let m=0;m<arr2.length;m++) { arr.push(arr2[m]); } arr2 = [];
        }
      }
      for(let k=0;k<arr.length;k++) { res.push(prefix+arr[k]); }
    } else { str += tmp2[0]; res.push(str); }
  }
  if(pf !="" || sf !="") { for(let i=0;i<res.length;i++) { res[i] = pf+res[i]+sf; }}
  return (res);
}
