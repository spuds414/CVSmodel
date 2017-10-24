var canvas, context = null;
var RR = 1000;
var length = 250;
var max_RR = 1050;
var max_p = 160;
var max_q = 500;
var max_v = 400;
var height = 130;
var width = 350;
var height_pv = 150;
var width_pv = 350;
var t_scale = width/max_RR;
var p_scale = height/max_p;
var q_scale = height/max_q;
var v_scale = height/max_v;
var p_pv_scale = height_pv/max_p;
var v_pv_scale = width_pv/max_v;
var prevx, prevy = null;
var dx, dy = null;
var PAOs=0,PAOd=0,PAOm=0,COm=0,QAm=0,QVm=0,EDV=0,ESV=0;
var sPAO=0,sQAO=0,sQVAD=0,hPAOs=0,hPAOd=1000,hEDV=0,hESV=1000;

// plot positions
var xpos1 = 35; 
var ypos1 = 165;
var xpos2 = xpos1; 
var ypos2 = ypos1+height+60;
var xpos4 = xpos1;
var ypos4 = ypos1+height+height_pv+2*60;

var th = 120;
var tr = 2;
var tw = height-30;
var th_space = 90;

var sw = 20;
var sh = 10;

var bw = 75;
var bh = 25 ;

var ctr=0;

var HRmin = 60;
var HRmax = 120;
var HRres = 5;
var HRresp = 20;
var HRposx = 550;
var HRposy = 370;
var HRnext = 80;
var HRposs = (HRnext-HRmin)/(HRmax-HRmin)*th;

var PLmin = 5;
var PLmax = 20;
var PLres = 1;
var PLresp = 5;
var PLposx = HRposx+th_space;
var PLposy = HRposy;
var PLnext = 16;
var PLposs = (PLnext-PLmin)/(PLmax-PLmin)*th;

var ALmin = 5;
var ALmax = 20;
var ALres = 1;
var ALresp = 5;
var ALposx = PLposx+th_space;
var ALposy = HRposy;
var ALnext = 10;
var ALposs = (ALnext-ALmin)/(ALmax-ALmin)*th;

var HFmin = 0;
var HFmax = 3;
var HFres = 1;
var HFresp = 1;
var HFposx = HRposx-th_space;
var HFposy = HRposy;
var HFnext = 2;
var HFposs = (HFnext-HFmin)/(HFmax-HFmin)*th;

var RDmin = 0;
var RDmax = 100;
var RDres = 5;
var RDresp = 20;
var RDposx = HRposx;
var RDposy = 175;
var RDnext = 50;
var RDposs = (RDnext-RDmin)/(RDmax-RDmin)*th;
var RDposs2 = (RDnext-RDmin)/(RDmax-RDmin)*t_scale*max_RR;

var RPmin = 7000;
var RPmax = 10000;
var RPres = 500;
var RPresp = 1000;
var RPposx = RDposx+th_space*2;
var RPposy = RDposy;
var RPnext = 7000;
var RPposs = (RPnext-RPmin)/(RPmax-RPmin)*th;

var SVmin = 10;
var SVmax = 70;
var SVres = 5;
var SVresp = 20;
var SVposx = RDposx+th_space;
var SVposy = RDposy;
var SVnext = 30;
var SVposs = (SVnext-SVmin)/(SVmax-SVmin)*th;


qao_sum = 0;
qao_avg = 0;

qmax = 0;

var selected_point = null;
var mouse_click = false;
var HR_slide_click = false;
var PL_slide_click = false;
var AL_slide_click = false;
var HF_slide_click = false;
var RD_slide_click = false;
var SV_slide_click = false;
var RP_slide_click = false;
var TV_button_click = false;
var TV_button_on = false;
var TV_x = xpos1+width+40;
var TV_y = 70;
var CF_button_click = false;
var CF_button_on = false;
var CF_x = TV_x;
var CF_y = TV_y + 40;
var save_button_click = false;
var save_button_on = false;
var TV_last_button = true;
function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX || e.pageY) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
	
	cvs.x = x;
	cvs.y = y;
}


document.onmousedown = function(event){
	mouse_click = true;
	var x = getCursorPosition(event);

	HR_slide_click = overButton(HRposx-10,HRposy-HRposs-8,20,16);
	PL_slide_click = overButton(PLposx-10,PLposy-PLposs-8,20,16);
	AL_slide_click = overButton(ALposx-10,ALposy-ALposs-8,20,16);
	HF_slide_click = overButton(HFposx-10,HFposy-HFposs-8,20,16);
	RD_slide_click = overButton(RDposx-10,RDposy-RDposs-8,20,16);
	RP_slide_click = overButton(RPposx-10,RPposy-RPposs-8,20,16);
	SV_slide_click = overButton(SVposx-10,SVposy-SVposs-8,20,16);
	TV_button_click = overButton(TV_x,TV_y,bw,bh);
	CF_button_click = overButton(CF_x,CF_y,bw,bh);
}

document.onmouseup = function(event){
	mouse_click = false;
	HR_slide_click = false;
	PL_slide_click = false;
	AL_slide_click = false;
	HF_slide_click = false;
	RD_slide_click = false;
	RP_slide_click = false;
	SV_slide_click = false;
	if (overButton(TV_x,TV_y,bw,bh) == true && TV_button_click == true) {
		if (TV_button_on == false) {
			TV_button_on = true;
			CF_button_on = false;
		}
		else {
			TV_button_on = false;
			TV_last_button = true;
		}
	}
	if (overButton(CF_x,CF_y,bw,bh) == true && CF_button_click == true) {
		if (CF_button_on == false) {
			CF_button_on = true;
			TV_button_on = false;
		}
		else {
			CF_button_on = false;
			TV_last_button = false;
		}
	}
	TV_button_click = false;
	CF_button_click = false;
	cvs.x = null;
	cvs.y = null;
}
			
document.onmousemove = function(event){
if (mouse_click == true) {
		prevx = cvs.x;
		prevy = cvs.y;

	var x = getCursorPosition(event);

	dx = cvs.x - prevx;
	dy = cvs.y - prevy;
	cvs.rd_new += dx/t_scale;
	if (cvs.rd >= RR)
	{	
		cvs.rd_new = 0;
	}
	if (cvs.rd < 0)
	{
		cvs.rd_new = 0;
	}
	
	if (cvs.y > HRposy-th-8 && cvs.y < HRposy+8 && cvs.x > HRposx-10 &&  cvs.x < HRposx+10 && HR_slide_click == true) {	
		HRposs -= dy;
		if (HRposs > th) {	
			HRposs = th;
		}
		if (HRposs < 0) {
			HRposs = 0;
		}
	}
	else {
		HR_slide_click = false;
	}

	if (cvs.y > PLposy-th-8 && cvs.y < PLposy+8 && cvs.x > PLposx-10 &&  cvs.x < PLposx+10 && PL_slide_click == true) {	
		PLposs -= dy;
		if (PLposs > th) {	
			PLposs = th;
		}
		if (PLposs < 0) {
			PLposs = 0;
		}
	}
	else {
		PL_slide_click = false;
	}
	
	if (cvs.y > ALposy-th-8 && cvs.y < ALposy+8 && cvs.x > ALposx-10 &&  cvs.x < ALposx+10 && AL_slide_click == true) {	
		ALposs -= dy;
		if (ALposs > th) {	
			ALposs = th;
		}
		if (ALposs < 0) {
			ALposs = 0;
		}
	}
	else {
		AL_slide_click = false;
	}
	
	if (cvs.y > HFposy-th-8 && cvs.y < HFposy+8 && cvs.x > HFposx-10 &&  cvs.x < HFposx+10 && HF_slide_click == true) {	
		HFposs -= dy;
		if (HFposs > th) {	
			HFposs = th;
		}
		if (HFposs < 0) {
			HFposs = 0;
		}
	}
	else {
		HF_slide_click = false;
	}
	
	if (TV_button_on == true) {
	if (cvs.y > RDposy-th-8 && cvs.y < RDposy+8 && cvs.x > RDposx-10 &&  cvs.x < RDposx+10 && RD_slide_click == true) {	
		RDposs -= dy;
		if (RDposs > th) {	
			RDposs = th;
		}
		if (RDposs < 0) {
			RDposs = 0;
		}
	}
	else {
		RD_slide_click = false;
	}
	}
	
	 if (TV_button_on == true) {
 	if (cvs.y > SVposy-th-8 && cvs.y < SVposy+8 && cvs.x > SVposx-10 &&  cvs.x < SVposx+10 && SV_slide_click == true) {	
 		SVposs -= dy;
 		if (SVposs > th) {	
 			SVposs = th;
 		}
 		if (SVposs < 0) {
 			SVposs = 0;
 		}
 	}
 	else {
 		SV_slide_click = false;
 	}
 	}
	
	if (CF_button_on == true) {
	if (cvs.y > RPposy-th-8 && cvs.y < RPposy+8 && cvs.x > RPposx-10 &&  cvs.x < RPposx+10 && RP_slide_click == true) {	
		RPposs -= dy;
		if (RPposs > th) {	
			RPposs = th;
		}
		if (RPposs < 0) {
			RPposs = 0;
		}
	}
	else {
		RP_slide_click = false;
	}
	}
	
	if (cvs.x > TV_x && cvs.x < TV_x+bw && cvs.y > TV_y && cvs.y < TV_x+bh && TV_button_click == true) {
	}
	else {
		TV_button_click = false;
	}
	
	if (cvs.x > CF_x && cvs.x < CF_x+bw && cvs.y > CF_y && cvs.y < CF_y+bh && CF_button_click == true) {
	}
	else {
		CF_button_click = false;
	}
	
}
}

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {

    
    canvas = document.getElementById("cvs");

    //canvas.addEventListener("click", halmaOnClick, false);
	
    canvas.width = 800;
    canvas.height = 600;

    context = canvas.getContext("2d");
    context.font = '12px sans-serif';
    context.strokeStyle = '#000';
    context.lineJoin = 'round';
	context.textAlign = 'center';


    ypos11 = Math.floor(height);
    xpos11 = Math.floor(0);

	//initialize array - needed for Firefox.
	for (i = 0; i < length; i += 1) {
		cvs.ta[i] = 0;
		cvs.ta2[i] = 0;
		cvs.plv[i] = 0;
		cvs.vlv[i] = 0;
		cvs.pao[i] = 0;
		cvs.qmi[i] = 0;
		cvs.qao[i] = 0;
		cvs.qvad[i] = 0;
    }
    
    
	
    context.save();

	
setInterval(cvs, 50);
	 

}



/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
var cvs = function () {




 

	context.clearRect(0, 0, canvas.width, canvas.height);

	for (i = 0; i < 10; i += 1)
	{
		cvs.dt = .005;
		cvs.seconds = cvs.seconds + cvs.dt*1000;
		cvs.t = cvs.seconds/1000;
		cvs.cnt += 1;
		if (cvs.cnt >= length) 
		{
			cvs.cnt = 0;
		}	
		solve();	
		
	}
		
	context.fillStyle = 'rgb(230,230,230)';
	context.fillRect(0,0,canvas.width,canvas.height);
	
	context.fillStyle = 'rgb(255,255,255)';
	context.fillRect(xpos1,ypos1-height,width,height);
	context.fillRect(xpos2,ypos2-height,width,height);
	context.fillRect(xpos4,ypos4-height_pv,width_pv,height_pv);
	
	// Set styles for animated graphics
	context.save();
	context.strokeStyle = '#00f';
	context.fillStyle = '#fff';
	context.lineWidth = 2;

	plot(cvs.t);
	
	context.font = '12px sans-serif';
    context.fillStyle = '#000';
	context.textAlign = 'center';
	reportValues(660,440,50,50);

	if (HR_slide_click == false) {
		HRposs = (HRnext - HRmin)/(HRmax-HRmin)*th;
	}
	drawSlide(HRposx,HRposy,HRposs,th,HRmin,HRmax,HRres,HRresp,HRnext,'HR','bpm',HR_slide_click);
	
	if (PL_slide_click == false) {
		PLposs = (PLnext-PLmin)/(PLmax-PLmin)*th;
	}
	drawSlide(PLposx,PLposy,PLposs,th,PLmin,PLmax,PLres,PLresp,PLnext,'Preload','mmHg');
	if (AL_slide_click == false) {
		ALposs = (ALnext-ALmin)/(ALmax-ALmin)*th;
	}
	drawSlide(ALposx,ALposy,ALposs,th,ALmin,ALmax,ALres,ALresp,ALnext,'Afterload','Wood units');
	if (HF_slide_click == false) {
		HFposs = (HFnext - HFmin)/(HFmax-HFmin)*th;
	}
	drawSlide(HFposx,HFposy,HFposs,th,HFmin,HFmax,HFres,HFresp,HFnext,'HF','',HF_slide_click);
	
	 
 		if (RD_slide_click == false) {
 			RDposs = (RDnext-RDmin)/(RDmax-RDmin)*th;
 		}
 		drawSlide(RDposx,RDposy,RDposs,th,RDmin,RDmax,RDres,RDresp,RDnext,'R-wave delay','% phase');
 		
 		if (SV_slide_click == false) {
 			SVposs = (SVnext-SVmin)/(SVmax-SVmin)*th;
 		}
 		drawSlide(SVposx,SVposy,SVposs,th,SVmin,SVmax,SVres,SVresp,SVnext,'Stroke Volume','ml');
 		
 		if (RP_slide_click == false) {
 			RPposs = (RPnext-RPmin)/(RPmax-RPmin)*th;
 		}
 		drawSlide(RPposx,RPposy,RPposs,th,RPmin,RPmax,RPres,RDresp,RPnext,'Speed','rpm');
	
	if (TV_button_on == false) {
		context.fillStyle = 'rgb(230,230,230)';
		context.globalAlpha = 0.75;
		context.fillRect(RDposx-bw/2,RDposy-th-50,bw*2+20*2,th+65);
		context.globalAlpha = 1.0;
	}
	if (CF_button_on == false) {
		context.fillStyle = 'rgb(230,230,230)';
		context.globalAlpha = 0.75;
		context.fillRect(RPposx-bw/2,RPposy-th-50,bw+20*2,th+65);
		context.globalAlpha = 1.0;
	}
	
	
	drawButton(TV_x,TV_y,bw,bh,'TORVAD',TV_button_click,TV_button_on);
	drawButton(CF_x,CF_y,bw,bh,'HMI II',CF_button_click,CF_button_on);
	
	context.restore();
	
	// Draw the axes in their own path
	context.beginPath();
	drawAxes();
	context.stroke();
	cvs.pcnt = 1;
		
	

};


cvs.seconds = 0;
cvs.t = 0;
cvs.cnt = 1;
cvs.ta = new Array(length);
cvs.ta2 = new Array(length);
cvs.plv = new Array(length);
cvs.pao = new Array(length);
cvs.qmi = new Array(length);
cvs.qao = new Array(length);
cvs.qvad = new Array(length);
cvs.vlv = new Array(length);
cvs.qvad_m = new Array(length);
cvs.start = 0;
cvs.stop = 0;
cvs.dt = 0;
cvs.vlv0 = 100;
cvs.plv0 = 10;
cvs.pao0 = 100;
cvs.pcnt = 1;
cvs.pos = 0;
cvs.x = null;
cvs.y = null;
cvs.sv = 30;
cvs.sv_new = 30;
cvs.rd = 250;
cvs.rd_new = 250;
cvs.st = 250;
cvs.qmax = 400;
cvs.par = 80;
cvs.qvad_flag = false;
cvs.tx = 0;
cvs.tx2 = 0;
cvs.qvad_prev = 0;
cvs.vla = 50;
cvs.vla0 = 50;
cvs.pla = 0;

cvs.Elv = 2;
cvs.Alv = .25;
cvs.Blv = .018;




function drawAxes() {
	
	context.fillStyle = 'rgb(100,100,100)'; 
	context.strokeStyle = 'rgb(100,100,100)'; 

    drawBox(xpos1,ypos1,width,height);
	drawBox(xpos2,ypos2,width,height);
	drawBox(xpos4,ypos4,width_pv,height_pv);
    
	context.textAlign = 'center';
	context.textBaseline = 'top';
	drawXTicks(xpos1,ypos1,width,0,max_RR,250,5,false,1000,'');
	drawXTicks(xpos2,ypos2,width,0,max_RR,250,5,false,1000,'');
	drawXTicks(xpos2,ypos2,width,0,max_RR,250,5,true,1000,'Time (sec)');
	drawXTicks(xpos1,ypos1,width,0,max_RR,250,5,true,1000,'Time (sec)');
	drawXTicks(xpos4,ypos4,width_pv,0,max_v,50,5,true,1,'LVV (ml)');
	
	context.textAlign = 'right';
	context.textBaseline = 'middle';
	drawYTicks(xpos1,ypos1,height,0,max_q,500,5,true,1,'Flow rate (ml/s)');
	drawYTicks(xpos2,ypos2,height,0,max_p,50,5,true,1,'Pressure (mmHg)');
	drawYTicks(xpos4,ypos4,height_pv,0,max_p,50,5,true,1,'LVP (mmHg)');

}

var vad_start = false;

function solve() {
	
	HRnext = HRmin + (HRmax-HRmin)*HRposs/th;
    HRnext = Math.round(HRnext/HRres)*HRres;
	PLnext = PLmin + (PLmax-PLmin)*PLposs/th;
    PLnext = Math.round(PLnext/PLres)*PLres;
    HFnext = HFmin + (HFmax-HFmin)*HFposs/th;
    HFnext = Math.round(HFnext/HFres)*HFres;
	ALnext = ALmin + (ALmax-ALmin)*ALposs/th;
    ALnext = Math.round(ALnext/ALres)*ALres;
	RDnext = RDmin + (RDmax-RDmin)*RDposs/th;
    RDnext = Math.round(RDnext/RDres)*RDres;
	RPnext = RPmin + (RPmax-RPmin)*RPposs/th;
    RPnext = Math.round(RPnext/RPres)*RPres;
    SVnext = SVmin + (SVmax-SVmin)*SVposs/th;
    SVnext = Math.round(SVnext/SVres)*SVres;
	
	var x = (cvs.t*1000) % max_RR;
	cvs.tx = cvs.tx + cvs.dt*1000;
	cvs.tx2 = cvs.tx2 + cvs.dt*1000;
	if (cvs.tx > RR) {
		var HR = Math.round(HRnext/10)*10;
		RR = 60/HR*1000;
		qao_avg = qao_sum/(cvs.tx/(cvs.dt*1000));
		qao_sum = 0;
		cvs.tx = 0;
		EDV = hEDV;
		ESV = hESV;
		hESV = 1000;
		hEDV = 0;
		
		RDposs = (RDnext-RDmin)/(RDmax-RDmin)*th;
		
		PAOs = hPAOs;
		PAOd = hPAOd;
		hPAOd = 1000;
		hPAOs = 0;
		
		PAOm = sPAO/ctr;
		sPAO = 0;
		
		QVm = sQVAD/ctr*60/1000;
		sQVAD = 0;
		
		QAm = sQAO/ctr*60/1000;
		sQAO = 0;
		
		COm = QVm + QAm;
		
		ctr = 1;
		
		RR_flag = 1;
	}

		
	var elv = 0;
    var Tvc = 550-1.75*Math.round(HRnext/10)*10;;
	if (cvs.tx <= 2*Tvc/3) 
	{
		elv = .5 - .5 * Math.cos(3*Math.PI*cvs.tx/(2*Tvc));
	}
	else if (cvs.tx > 2*Tvc/3 && cvs.tx < Tvc) 
	{
		elv = .5 + .5 * Math.cos(3*Math.PI*cvs.tx/Tvc - 2*Math.PI);
	}		
		
	if (HFnext==0 && cvs.tx==0) {
		cvs.Elv = 2;
	}
	else if (HFnext==1 && cvs.tx==0) {
		cvs.Elv = 1.05;
		cvs.Alv = .2;
		cvs.Blv = .027;
	}
	else if (HFnext==2 && cvs.tx==0) {
		cvs.Elv = .32;
		cvs.Alv = .25;
		cvs.Blv = .018;
	}
	else if (HFnext==3 && cvs.tx==0) {
		cvs.Elv = .25;
		cvs.Alv = .18;
		cvs.Blv = .016;
	}
	
	cvs.qvad[cvs.cnt] = 0;
	
	
	if (((cvs.tx >= cvs.rd && cvs.tx-cvs.dt*1000 < cvs.rd) || (cvs.tx == 0 && cvs.rd == 0)) && TV_button_on == true) {
		vad_start = true;
	}
	var vad_end = cvs.rd+cvs.st
	if (vad_end > RR) {
		vad_end -= RR;
	}
	if ((cvs.tx >= vad_end && cvs.tx-cvs.dt*1000 < vad_end) || (cvs.tx == RR && cvs.rd == RR)) {
		vad_start = false;
	}
	
	if (vad_start == true){
		if ((cvs.rd + cvs.st) > RR && cvs.tx < (cvs.st + cvs.rd - RR)) {
			cvs.qvad[cvs.cnt] = cvs.qmax*0.5*(1 - Math.cos(2*Math.PI*(cvs.tx + RR - cvs.rd)/cvs.st));
		}
		else if(cvs.tx > cvs.rd && cvs.tx < (cvs.rd + cvs.st)) {
			cvs.qvad[cvs.cnt] = cvs.qmax*0.5*(1 - Math.cos(2*Math.PI*(cvs.tx - cvs.rd)/cvs.st));
		}
	}
	else if (CF_button_on == true){
		cvs.qvad[cvs.cnt] = (-.1*(cvs.pao0 - cvs.plv0) + 8.8 + (RPnext-8500)/1000*2.5)*1000/60;
	}
	
	if (vad_start == false) {
		if (RDnext == 100) {
			cvs.rd = 0;
		}
		else {
			cvs.rd = RDnext*RR/100;
		}
		cvs.sv = SVnext;
		cvs.qmax = cvs.sv*2/cvs.st*1000;
	}
	
	//suction
	if (cvs.vlv0 < 30) {
		cvs.qvad[cvs.cnt] = 0;
	}
	
	cvs.qvad_prev = cvs.qvad[cvs.cnt];
	
    cvs.ta[cvs.cnt] = cvs.tx;
	cvs.plv[cvs.cnt] = (1-elv)*cvs.Alv*Math.exp(cvs.Blv*(cvs.vlv0-5)-1) + cvs.Elv*elv*cvs.vlv0;
	cvs.qao[cvs.cnt] = 0;
	if (cvs.plv[cvs.cnt] > cvs.pao0)
	{
		cvs.qao[cvs.cnt] = (cvs.plv[cvs.cnt] - cvs.pao0) *75 ;
	}
	cvs.plv0 = cvs.plv[cvs.cnt];
	
	cvs.par = cvs.par + cvs.dt*((cvs.pao0-cvs.par)*6.7 - (cvs.par-10)/(ALnext*60/1000))/1.5;
	cvs.pao[cvs.cnt] = cvs.pao0 + cvs.dt*(cvs.qao[cvs.cnt] + cvs.qvad[cvs.cnt] - (cvs.pao0-cvs.par)*6.7)/.65 ;
	cvs.pao0 = cvs.pao[cvs.cnt];
	
	cvs.pla = .45 * (Math.exp(.05*(cvs.vla0 - 5)) - 1)
	// mitral valve flow
	cvs.qmi[cvs.cnt] = 0;
	if (cvs.pla > cvs.plv[cvs.cnt])
	{
		cvs.qmi[cvs.cnt] = (cvs.pla - cvs.plv[cvs.cnt]) *75;
	}

	cvs.vla = ((PLnext-cvs.pla)*333 - cvs.qmi[cvs.cnt])*cvs.dt + cvs.vla0;
	cvs.vla0 = cvs.vla;
	
	cvs.vlv[cvs.cnt] = (cvs.qmi[cvs.cnt] - cvs.qao[cvs.cnt] - cvs.qvad[cvs.cnt])*cvs.dt + cvs.vlv0;
	cvs.vlv0 = cvs.vlv[cvs.cnt];


	sQAO += cvs.qao[cvs.cnt];	
	sPAO += cvs.pao0;
	sQVAD += cvs.qvad[cvs.cnt];
	if (cvs.pao0 < hPAOd){
		hPAOd = cvs.pao0
	}
	if (cvs.pao0 > hPAOs){
		hPAOs = cvs.pao0
	}
	if (cvs.vlv0 < hESV){
		hESV = cvs.vlv0
	}
	if (cvs.pao0 > hEDV){
		hEDV = cvs.vlv0
	}
	ctr += 1;

}



 function plot(t) {
 
context.strokeStyle = 'rgb(255,0,0)';
drawLine(xpos2, ypos2, cvs.ta, cvs.plv, t_scale, p_scale, true);
drawLine(xpos2, ypos2, cvs.ta2, cvs.plv, t_scale, p_scale, true);
context.strokeStyle = 'rgb(0,170,0)';
drawLine(xpos2, ypos2, cvs.ta, cvs.pao, t_scale, p_scale, true);
drawLine(xpos2, ypos2, cvs.ta2, cvs.pao, t_scale, p_scale, true);
context.strokeStyle = 'rgb(255,0,0)';
drawLine(xpos1, ypos1, cvs.ta, cvs.qao, t_scale, q_scale, true);
//context.strokeStyle = 'rgb(255,0,0)';
//drawLine(xpos1, ypos1, cvs.ta, cvs.qmi, t_scale, q_scale, true);
context.strokeStyle = 'rgb(0,0,255)';
drawLine(xpos1, ypos1, cvs.ta, cvs.qvad, t_scale, q_scale, true);
context.strokeStyle = 'rgb(0,0,255)';
drawLine(xpos4, ypos4, cvs.vlv, cvs.plv, v_pv_scale, p_pv_scale, false);

}

function drawLine(xp, yp, x, y, xs, ys, time_axes) {
	for (i = 1; i < length; i += 1) {    
		context.globalAlpha = i/length;
		var j = cvs.cnt + i;
		if (j > length-1) {
			j -= length;
		}
		var j0 = j-1;
		if (j == 0) {
			j0 = length-1;
		}
		if (x[j] > x[j0] || time_axes == false) {	
			context.beginPath();
			context.moveTo(xp+x[j0]*xs,yp-y[j0]*ys); 
			context.lineTo(xp+x[j]*xs,yp-y[j]*ys);   
			context.stroke();
		}
	}
}



function drawSlide(posx,posy,poss,h,min,max,res,dres,next_val,string,units){
	
	context.lineWidth = 6;
	context.fillStyle = 'rgb(200,200,200)'; 
	context.strokeStyle = 'rgb(100,100,100)';
	context.beginPath(); 
	context.lineCap = 'round';
	context.moveTo(posx,posy)
	context.lineTo(posx,posy-h)
	context.fill();
	context.stroke();
	context.lineWidth = 2;
	context.lineCap = 'butt';
	
	roundRect(context, posx-sw/2, posy-sh/2-poss, sw, sh, 2, true, true);

	context.textAlign = 'center';
	context.textBaseline = 'bottom';
	context.font = 'bold 12px sans-serif';
	context.fillStyle = 'rgb(0,0,0)'; 
	context.strokeStyle = 'rgb(0,0,0)';
	context.fillText(string, posx+tr+10, posy-th-20);

	context.textAlign = 'center';
	context.textBaseline = 'top';
	context.font = '11px sans-serif';
	context.fillStyle = 'rgb(110,100,100)'; 
	context.strokeStyle = 'rgb(100,100,100)';
	context.fillText(units, posx+tr+10, posy-th-23);

	context.fillStyle = 'rgb(150,150,150)'; 
	context.strokeStyle = 'rgb(150,150,150)';
	context.font = '11px sans-serif';
	context.textAlign = 'left';
	context.textBaseline = 'middle';
	for (i = min; i <= max; i += res) {
		var val = Math.round(next_val/res)*res;
		if (i == next_val) {
			context.textAlign = 'left';
			context.textBaseline = 'middle';
			context.font = 'bold 18px sans-serif';
			context.fillStyle = 'rgb(0,0,0)'; 
			context.strokeStyle = 'rgb(0,0,0)';
			context.fillText(i, posx+tr+10, posy-((i-min)/(max-min))*th);
			context.font = '11px sans-serif';
			context.fillStyle = 'rgb(150,150,150)'; 
			context.strokeStyle = 'rgb(150,150,150)';
			context.textAlign = 'left';
			context.textBaseline = 'middle';
		}
		else if (i%dres == 0) {
			context.fillText(i, posx+tr+10, posy-((i-min)/(max-min))*th);
		}
	}
	context.restore();


}

function drawXArrow(posx,posy,poss,h,min,max,res,next_val,string,units){
	
	context.lineWidth = 2;
	context.fillStyle = 'rgb(0,0,0)';
	context.strokeStyle = 'rgb(0,0,0)';
	context.beginPath(); 
	context.moveTo(posx,posy)
	context.lineTo(posx+poss,posy)
	context.lineTo(posx+poss-3,posy-3)
	context.lineTo(posx+poss-3,posy+3)
	context.lineTo(posx+poss,posy)
	context.fill();
	context.stroke();

	context.textAlign = 'left';
	context.textBaseline = 'middle';
	context.font = 'bold 12px sans-serif';
	context.fillStyle = 'rgb(0,0,0)'; 
	context.strokeStyle = 'rgb(0,0,0)';
	context.fillText(next_val, posx+poss+5, posy);

	context.restore();
}


function drawXSlide(posx,posy,poss,h,min,max,res,next_val,string,units){
	
	context.lineWidth = 2;
	context.fillStyle = 'rgb(0,0,0)';
	context.strokeStyle = 'rgb(0,0,0)';
	context.lineCap = 'round';
	context.beginPath(); 
	context.moveTo(posx,posy)
	context.lineTo(posx+h,posy)
	context.fill();
	context.stroke();

	context.textAlign = 'left';
	context.textBaseline = 'middle';
	context.font = 'bold 12px sans-serif';
	context.fillStyle = 'rgb(0,0,0)'; 
	context.strokeStyle = 'rgb(0,0,0)';
	context.fillText(next_val, posx+poss+5, posy);

	context.restore();


}




function drawButton(x,y,bw,bh,text,button_click,button_on) {
	context.lineWidth = 2;
	var my_gradient = context.createLinearGradient(x, y, x, y+bh);
	if (button_click == true) {
		var order = 0;
	}
	else {
		var order = 1;
	}
	if (button_on == true) {
		my_gradient.addColorStop(order, 'rgb(200,200,220)');
		my_gradient.addColorStop(1-order, 'rgb(200,255,200)');
	}
	else {
		my_gradient.addColorStop(order, 'rgb(230,230,230)');
		my_gradient.addColorStop(1-order, 'rgb(255,255,255)');
	}
	
	context.fillStyle = my_gradient;
	context.strokeStyle = 'rgb(50,50,50)';
	roundRect(context, x, y, bw, bh, 3, true, true);
	
	context.fillStyle = 'rgb(0,0,0)'; 
	context.strokeStyle = 'rgb(0,0,0)'; 
	context.font = '12px sans-serif';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(text,x+bw/2,y+bh/2);
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }  
  if (fill) {
    ctx.fill();
  } 
  
}


function drawBox (x,y,w,h) {
	context.moveTo(x, y);
    context.lineTo(x+w, y);
	context.lineTo(x+w, y-h);
	context.lineTo(x, y-h);
	context.lineTo(x, y);
}

function drawXTicks(x,y,w,min,max,res,l,mark,con,label) {
	context.font = '10px sans-serif';
	for (i = min; i <= max; i += res) {
		context.moveTo(x+i*w/(max-min), y);
		context.lineTo(x+i*w/(max-min), y-l);
		if (mark == true) {
			context.fillText(i/con, x + i*w/(max-min), y+3);
		}
	}
	context.font = 'bold 12px sans-serif';
	context.fillText(label, x + w/2, y+15);
}

function drawYTicks(x,y,h,min,max,res,l,mark,con,label) {
	context.font = '10px sans-serif';
	context.textAlign = 'right';
	context.textBaseline = 'middle';
	for (i = min; i <= max; i += res) {
		context.moveTo(x, y-i*h/(max-min));
		context.lineTo(x+l, y-i*h/(max-min));
		if (mark == true) {
			context.fillText(i/con, x-3, y-i*h/(max-min));
		}
	}
	context.textAlign = 'left';
	context.textBaseline = 'bottom';
	context.font = 'bold 12px sans-serif';
	context.fillText(label, x, y-h);
}


function overButton(x,y,bw,bh) {
	if (cvs.x > x && cvs.x < x+bw && cvs.y > y && cvs.y < y+bh) {
		return true;
	}
}

function reportValues(x,y,w,h) {

var t = ["CO","QAO","QVAD","MAP","SP","DP","EDV","ESV","SHE","PVA"];
var u = ["L/m","L/m","L/m","mmHg","mmHg","mmHg","ml","ml","-","ml mmHg"];
var v = [COm.toFixed(1),QAm.toFixed(1),QVm.toFixed(1),Math.round(PAOm),Math.round(PAOs),Math.round(PAOd),Math.round(EDV),Math.round(ESV),0,0];

var num = 10;
	
	context.textBaseline = 'middle';
	
	context.textAlign = 'left';
	context.font = '12px sans-serif';
	for (i=0;i<num;i+=1) {
		context.fillText(t[i], x, y+15*i);
	}
	
	context.fillStyle = 'rgb(100,100,100)';
	context.textAlign = 'left';
	context.font = '10px sans-serif';
	for (i=0;i<num;i+=1) {
			context.fillText(u[i], x+75, y+15*i);
	}
	
	context.fillStyle = 'rgb(0,0,0)';
	context.textAlign = 'right';
	context.font = '12px sans-serif';
	for (i=0;i<num;i+=1) {
		context.fillText(v[i], x+70, y+15*i);
	}

}

