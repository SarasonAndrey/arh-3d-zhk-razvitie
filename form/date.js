/* --- Swazz Javascript Calendar ---
/* --- v 1.0 3rd November 2006
By Oliver Bryant
http://calendar.swazz.org

Update:
Gene Bechtold
http://www.bechtold.biz
12/11/2011

C помощью разных добрых людей:
tullin
 */

function getObj(objID)
{
    if (document.getElementById) {return document.getElementById(objID);}
    else if (document.all) {return document.all[objID];}
    else if (document.layers) {return document.layers[objID];}
}

function checkClick(e) {
	e?evt=e:evt=event;
	CSE=evt.target?evt.target:evt.srcElement;
	if (CSE.tagName!='SPAN')
	if (getObj('fc'))
		if (!isChild(CSE,getObj('fc')))
			getObj('fc').style.display='none';
}

function isChild(s,d) {
	while(s) {
		if (s==d)
			return true;
		s=s.parentNode;
	}
	return false;
}

function Left(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function Top(obj)
{
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}

// Calendar script
var now = new Date;
var sccd=now.getDate();
var sccm=now.getMonth();
var sccy=now.getFullYear();
var ccm=now.getMonth();
var ccy=now.getFullYear();

// For current selected date
var selectedd, selectedm, selectedy;

// віризано: document.write('<table id="fc" style="position:absolute;border-collapse:collapse;background:#FFFFFF;border:1px solid #FFD088;display:none;-moz-user-select:none;-khtml-user-select:none;user-select:none;" cellpadding="2">');
// віризано: document.write('<tr style="font:bold 13px Arial" onselectstart="return false"><td style="cursor:pointer;font-size:15px" onclick="upmonth(-1)">&laquo;</td><td colspan="5" id="mns" align="center"></td><td align="right" style="cursor:pointer;font-size:15px" onclick="upmonth(1)">&raquo;</td></tr>');
// віризано: document.write('<tr style="background:#FF9900;font:12px Arial;color:#FFFFFF"><td align=center>П</td><td align=center>В</td><td align=center>С</td><td align=center>Ч</td><td align=center>П</td><td align=center>С</td><td align=center>В</td></tr>');

document.write('<table id="fc" style="position:absolute;width:300px;height:320px;border-collapse:collapse;background:#b6c710;color:#ffffff;display:none;-moz-user-select:none;-khtml-user-select:none;user-select:none;" cellpadding="0">');
document.write('<tr style="height:50px; font:13px Arial; border:10px" onselectstart="return false"><td style="cursor:pointer;font-size:15px" onclick="upmonth(-1)">&nbsp; &laquo;</td><td colspan="5" id="mns" align="center"></td><td align="right" style="cursor:pointer;font-size:15px" onclick="upmonth(1)">&raquo; &nbsp;</td></tr>');
document.write('<tr style="height:22px; border-top:1px solid rgba(30,81,104,0.03); font:12px Arial;color:#FFFFFF"> <td align=center> ПН </td><td align=center> ВТ </td><td align=center> СР </td><td align=center> ЧТ </td><td align=center> ПТ </td><td align=center> СБ </td><td align=center> ВС </td></tr>');



for(var kk=1;kk<=6;kk++) {
	document.write('<tr>');
	for(var tt=1;tt<=7;tt++) {
		num=7 * (kk-1) - (-tt);
		document.write('<td id="cv' + num + '" style="width:18px;height:18px">&nbsp;</td>');
	}
	document.write('</tr>');
}
// віризано: document.write('<tr><td colspan="7" align="center" style="cursor:pointer;font:13px Arial;background:#FFC266" onclick="today()">Сегодня: '+addnull(sccd,sccm+1,sccy)+'</td></tr>');
document.write('</table>');

document.all?document.attachEvent('onclick',checkClick):document.addEventListener('click',checkClick,false);




var updobj;
function lcs(ielem) {
	updobj=ielem;
//	getObj('fc').style.left=Left(ielem)+'px';					// вирізано
//	getObj('fc').style.top=Top(ielem)+ielem.offsetHeight+'px';	// вирізано
	getObj('fc').style.left = document.getElementById("order").getBoundingClientRect().right + 10 +'px';
	getObj('fc').style.top  = document.getElementById("order").getBoundingClientRect().top  + 100 +'px';
	getObj('fc').style.display='';
	
	document.getElementById("krpanoSWFObject").appendChild(document.getElementById("fc"))	// добавляємо календарі в тур
	
	// First check date is valid
	curdt=ielem.value;
	curdtarr=curdt.split('-');
	isdt=true;
	for(var k=0;k<curdtarr.length;k++) {
		if (isNaN(curdtarr[k]))
			isdt=false;
	}
	if (isdt&(curdtarr.length==3)) {
		ccm=curdtarr[1]-1;
		ccy=curdtarr[2];

		selectedd=parseInt ( curdtarr[0], 10 );
		selectedm=parseInt ( curdtarr[1]-1, 10 );
		selectedy=parseInt ( curdtarr[2], 10 );

		prepcalendar(curdtarr[0],curdtarr[1]-1,curdtarr[2]);
	}

}

function evtTgt(e){
	var el;
	if(e.target)el=e.target;
	else if(e.srcElement)el=e.srcElement;
	if(el.nodeType==3)el=el.parentNode; // defeat Safari bug
	return el;
}
function EvtObj(e){if(!e)e=window.event;return e;}
function cs_over(e) {
	evtTgt(EvtObj(e)).style.background='#7d890b';		// колір комірки при наведенні курсору
}
function cs_out(e) {
	evtTgt(EvtObj(e)).style.background='#b6c710';		// колір комірки при втраті фокусу
}
function cs_click(e) {
	updobj.value=calvalarr[evtTgt(EvtObj(e)).id.substring(2,evtTgt(EvtObj(e)).id.length)];
	getObj('fc').style.display='none';
}

var mn=new Array('ЯНВАРЬ','ФЕВРАЛЬ','МАРТ','АПРЕЛЬ','МАЙ','ИЮНЬ','ИЮЛЬ','АВГУСТ','СЕНТРЯБРЬ','ОКТЯБРЬ','НОЯБРЬ','ДЕКАБРЬ');
var mnn=new Array('31','28','31','30','31','30','31','31','30','31','30','31');
var mnl=new Array('31','29','31','30','31','30','31','31','30','31','30','31');
var calvalarr=new Array(42);

function f_cps(obj) {
	obj.style.background='#b6c710';		// колір комірки при завантаженні
	obj.style.font='10px Arial';
	obj.style.color='#ffffff';			// колір числа в комірці при завантаженні
	obj.style.textAlign='center';
	obj.style.textDecoration='none';
//	obj.style.border='1px solid #FFD088';//'1px solid #606060'; - вирізано: рамка довкола комірок
	obj.style.cursor='pointer';
}

function f_cpps(obj) {
	obj.style.background='#C4D3EA';
	obj.style.font='10px Arial';
	obj.style.color='#FF9900';
	obj.style.textAlign='center';
	obj.style.textDecoration='line-through';
	obj.style.border='1px solid #6487AE';
	obj.style.cursor='default';
}

function f_hds(obj) {
	obj.style.background='#FFF799';
	obj.style.font='bold 10px Arial';
	obj.style.color='#333333';
	obj.style.textAlign='center';
	obj.style.border='1px solid #6487AE';
	obj.style.cursor='pointer';
}

// day selected
function prepcalendar(hd,cm,cy) {
	now=new Date();
	sd=now.getDate();
	td=new Date();
	td.setDate(1);
	td.setFullYear(cy);
	td.setMonth(cm);
	cd=td.getDay();
	if (cd==0)cd=6; else cd--;
//	getObj('mns').innerHTML=mn[cm]+'&nbsp;<span style="cursor:pointer" onclick="upmonth(-12)">&lt;</span>'+cy+'<span style="cursor:pointer" onclick="upmonth(12)">&gt;</span>';
	getObj('mns').innerHTML=mn[cm]+'&nbsp;'+cy;	// відображення дати при листанні
	marr=((cy%4)==0)?mnl:mnn;
	for(var d=1;d<=42;d++) {
		cv=getObj('cv'+parseInt(d));
		f_cps(cv);
		if ((d >= (cd -(-1)))&&(d<=cd-(-marr[cm]))) {
			dip=((d-cd < sd)&&(cm==sccm)&&(cy==sccy));
			htd=((hd!='')&&(d-cd==hd));

			cv.onmouseover=cs_over;
			cv.onmouseout=cs_out;
			cv.onclick=cs_click;

			// if today
		//	if (sccm == cm && sccd == (d-cd) && sccy == cy) // вирізано
		//		cv.style.color='#FF9900';					// вирізано
		
			if (sccm == cm && sccd == (d-cd) && sccy == cy && typeof lock == "undefined"){	
				cv.style.background='#7d890b';				// при завантаженні скрипта виділяємо сьогоднішню дату
				cv.onmouseout=null;							// і забороняємо знімати виділення поки не зробиться клік
				lock="";									// а після першого кліку (вибору будь якої дати) в подальшому забороняємо виділяти сьогоднішню дату
			}

			// if selected date
			if (cm == selectedm && cy == selectedy && selectedd == (d-cd) )
			{
				cv.style.background='#7d890b';				// фон вибраної комірки
				//cv.style.color='#e0d0c0';
				//cv.style.fontSize='1.1em';
				//cv.style.fontStyle='italic';
				//cv.style.fontWeight='bold';

				// when use style.background
				cv.onmouseout=null;
			}

			cv.innerHTML=d-cd;

			calvalarr[d]=addnull(d-cd,cm-(-1),cy);
		}
		else {
			cv.innerHTML='&nbsp;';
			cv.onmouseover=null;
			cv.onmouseout=null;
			cv.onclick=null;
			cv.style.cursor='default';
			}
	}
}

prepcalendar('',ccm,ccy);

function upmonth(s)
{
	marr=((ccy%4)==0)?mnl:mnn;

	ccm+=s;
	if (ccm>=12)
	{
		ccm-=12;
		ccy++;
	}
	else if(ccm<0)
	{
		ccm+=12;
		ccy--;
	}
	prepcalendar('',ccm,ccy);
}

function today() {
	updobj.value=addnull(now.getDate(),now.getMonth()+1,now.getFullYear());
	getObj('fc').style.display='none';
	prepcalendar('',sccm,sccy);
}

function addnull(d,m,y)
{
	var d0='',m0='';
	if (d<10)d0='0';
	if (m<10)m0='0';

	return ''+d0+d+'-'+m0+m+'-'+y;
}