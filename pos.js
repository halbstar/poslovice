//niz poslovica
var pos=["Um caruje, a snaga klade valja.","Nauči plačući, pa uživaj pevajući.","Zalud knjiga gde pameti nema.","Ko se s umnim sastaje, i sam uman postaje."];

//PRVI DEO:
//INICIJALIZACIJA IGRE

//pravimo funkciju koja uzima jedan string (iz niza) i pretvara poseban niz reci
function npos(str){
	return str.split(" ")
}

//trazimo poslovicu sa najvise reci, sto ce u perspektivi biti broj <select> kucjica
function duzina(pos){
	var n=0;
	//varijabla najveceg broja reci;
	var max=0;
	//za svaku poslovicu
	while (n<pos.length){
		//uspisi duzinu poslovice
		temp=npos(pos[n]).length;
		//ako je duzina veca od maximalne
		if (max<temp){
			//upisi maximalnu
			max=temp;
		}
		n++;
	}
	return(max)
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 * FUNKCIJA JE PREUZETA SA "SO" FORUMA
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//randomizovani niz brojeva od 1 do n (n=pos.length), da bi se igra ucinila zanimljivijom
function nizduz(pos){
	niz=[];
	for (n=0; n<pos.length;n++){
		niz.push(n)
	}
	return shuffleArray(niz)
}

//funkcija ispisa i popunjavanja select i option kucjica
function ispis(pos){
	//iterator broja poslovice
	i=0
	//iterator pozicije reci
	n=0
	//dok ne prodjes kroz sve poslovice
	while (i<duzina(pos)){
		//napravi select boxova u broju reci najduze poslovice (u ovom slucaju 8)
		document.write("<select id='opt"+i+"' name=\"opt\" onchange=\"toDiv()\" >");
		//velicina najvece poslovice dobijena iz funkcije nizduz
		ni=nizduz(pos);
		//u svakom selectu pravi optione u velicini broja poslovica (4)
		for (var n=0; n<pos.length; n++){
			document.write("<option value="+n+">");
			//ako ne postoji rec na trazenom indeksu vraca se prazan string
			((npos(pos[ni[n]])[i])!=undefined)?document.write(npos(pos[ni[n]])[i]):"";
			document.write("</option>");
		}
		document.write("</select>");
		i++;
	}
}
//funkcija ponovnog ucitavanja igre
function reloadPage()
  {
  location.reload();
  }


//DRUGI DEO:
//OBRADA UNOSA

//funkcija koja prikuplja trenutno stanje teksta u select kucjicama
// i funkcija koja reaguje na promenu texta u select
function toDiv(){
		//pravimo niz u koji cemo smestiti reci koje trenutno vidimo u select kucjicama
		var x=[];
		//iterator za reci
		var n=0;
		//objekat sel u koji skupljaMO niz iz select k.
		var sel=document.getElementsByTagName("select");
		//skupljaj u duzini sel
		while (n<sel.length){
			//ubacuj u x iz sek[n][i].text
			x.push(sel[n][sel[n].selectedIndex].text);
			n++;}
		//niz u string
		xP=x.toString();
		//cistimo string od gomile zareza
		xP=xP.replace(/,/g, " ")
		//upisujemo sve u spremni div-ret
		document.getElementById("ret").innerHTML="<h3>"+xP+"</h3>";
		ver();
	}

//TRECI DEO:
//VERIFIKACIJA

//broj pogodjenih poslovica
ipos=0
function ver(){
	//skupljamo sve sto se nalazi u ret divu, sto se pokazalo kao problem ukoliko menjam sadrzaj ili zelim dodatni tekst
	ret=document.getElementById("ret").firstChild.innerHTML.replace(/\s/g, '')
	//iterator za broj poslovice 1,2,3,4
	i=0;
	//default poruka koje se ispisuje sve do pogadjanja neke od poslovica
	poruka=("<h4>još uvek niste pogodili...</h4><br>Ostalo vam je još "+(pos.length-ipos)+" za rešavanje!")
	//loop za proveru poslovice
	while (i<pos.length){
		//skidamo sve zareze i whitspaces
		iP=pos[i].replace(/,/g, " ").replace(/\s/g, '');
		//ako napokon pogodimo poslovicu, 
		if (ret==iP){
			//dodajemo jedan na ipos,
			ipos++
			//ispisujemo poruku TACNO, i broj nepogodjenih poslovica
			poruka="<h2>TAČNO!</h2><br>Ostalo vam je još "+(pos.length-ipos)+" za rešavanje!";
			//startujemo funkciju noviDiv, koja u novom divu prokazuje pogodjenu poslovicu
			noviDiv(pos[i]);
		}
		i++;
	}
	//prikazujemo default ili promenenju poruku
	document.getElementById("ext").innerHTML=(poruka)
}

//prikaz poslovice u novom divu, objekat tac ce biti preuzet u funkciji ver() i bice pos[i]
function noviDiv(tac){
	//samo za prvu pogodjenu poslovicu kreiramo div sa naslovom
	if(ipos==1){
		var naslov = document.createElement("div");
		document.body.appendChild(naslov);
		naslov.style.width="30%";
		naslov.style.backgroundColor="#c00";
		naslov.style.color="#fff";
		naslov.innerHTML="<h3>Do sada pogođene poslovice</h3>";
		
	}

//div za prikaz poslovice
var ndiv = document.createElement("div");
document.body.appendChild(ndiv);
ndiv.innerHTML=tac;
}
