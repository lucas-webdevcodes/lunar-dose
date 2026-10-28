(function(root){
const P=29.530588861,R=Math.PI/180,JD0=2451550.1;
function fullMoon(n){const k=n+0.5;let j=2451550.09766+P*k;
const M=(2.5534+29.1053567*k)*R,Mp=(201.5643+385.81693528*k)*R,F=(160.7108+390.67050284*k)*R;
j+=-0.40614*Math.sin(Mp)+0.17302*Math.sin(M)+0.01614*Math.sin(2*Mp)+0.01043*Math.sin(2*F);
return new Date((j-2440587.5)*864e5)}
const day=d=>d.toLocaleDateString('en-CA',{timeZone:'America/Maceio'});
const jd=d=>d/864e5+2440587.5;
function nextFulls(from,count){const out=[];for(let n=Math.floor((jd(from)-JD0)/P)-1;out.length<count;n++){const d=fullMoon(n);if(day(d)>=day(from))out.push(d)}return out}
function isFullMoonDay(d){return day(nextFulls(d,1)[0])===day(d)}
function phase(d){const x=(jd(d)-JD0)/P;return x-Math.floor(x)}
const api={fullMoon,day,nextFulls,isFullMoonDay,phase};
if(typeof module!=='undefined')module.exports=api;else root.Moon=api;
})(this);
