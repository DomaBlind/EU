const adatSzoveg = `
Ausztria;1995.01.01
Belgium;1958.01.01
Bulgária;2007.01.01
Ciprus;2004.05.01
Csehország;2004.05.01
Dánia;1973.01.01
Egyesült Királyság;1973.01.01
Észtország;2004.05.01
Finnország;1995.01.01
Franciaország;1958.01.01
Görögország;1981.01.01
Hollandia;1958.01.01
Horvátország;2013.07.01
Írország;1973.01.01
Lengyelország;2004.05.01
Lettország;2004.05.01
Litvánia;2004.05.01
Luxemburg;1958.01.01
Magyarország;2004.05.01
Málta;2004.05.01
Németország;1958.01.01
Olaszország;1958.01.01
Portugália;1986.01.01
Románia;2007.01.01
Spanyolország;1986.01.01
Svédország;1995.01.01
Szlovákia;2004.05.01
Szlovénia;2004.05.01
`.trim();

const sorok = adatSzoveg.split("\n").map(s => {
  const [orszag, datum] = s.split(";");
  return { orszag, datum };
});

// 1.
function megjelenitTagokSzama() {
  const eredmenyDiv = document.getElementById("eredmeny");
  const p = document.createElement("p");
  p.innerHTML = `Az EU-nak ${sorok.length} tagja van.`;
  eredmenyDiv.appendChild(p);
}

// 2.
function csatlakozasEvre(ev) {
  return sorok.filter(s => s.datum.startsWith(ev)).length;
}

function megjelenitCsatlakozasEvre(ev) {
  const db = csatlakozasEvre(ev);
  const p = document.createElement("p");
  p.innerHTML = `${ev}-ben ${db} ország csatlakozott.`;
  document.getElementById("eredmeny").appendChild(p);
}

// 3.
function csatlakozottE(orszagNev) {
  return sorok.some(s => s.orszag.toLowerCase() === orszagNev.toLowerCase());
}

function megjelenitCsatlakozottE(orszag) {
  const valasz = csatlakozottE(orszag) ? "Igen" : "Nem";
  const p = document.createElement("p");
  p.innerHTML = `${orszag} csatlakozott az EU-hoz? ${valasz}`;
  document.getElementById("eredmeny").appendChild(p);
}

// 4.
function voltEHoban(honapSzam) {
  return sorok.some(s => {
    const honap = s.datum.split(".")[1];
    return honap === honapSzam.toString().padStart(2, "0");
  });
}

function megjelenitVoltEHoban(honap) {
  const valasz = voltEHoban(honap) ? "Igen" : "Nem";
  const p = document.createElement("p");
  p.innerHTML = `Volt-e csatlakozás ${honap}. hónapban? ${valasz}`;
  document.getElementById("eredmeny").appendChild(p);
}

// 5.
function utolsoCsatlakozo() {
  const rendezett = [...sorok].sort((a, b) => new Date(b.datum) - new Date(a.datum));
  return rendezett[0].orszag;
}

function megjelenitUtolsoCsatlakozo() {
  const orszag = utolsoCsatlakozo();
  const p = document.createElement("p");
  p.innerHTML = `Az utoljára csatlakozott ország: ${orszag}`;
  document.getElementById("eredmeny").appendChild(p);
}

// 6.
function evStatisztika() {
  const stat = {};
  sorok.forEach(s => {
    const ev = s.datum.split(".")[0];
    stat[ev] = (stat[ev] || 0) + 1;
  });
  return stat;
}

function megjelenitEvStatisztika() {
  const stat = evStatisztika();
  let html = "<table border='1'><tr><th>Év</th><th>Országok száma</th></tr>";
  for (const ev in stat) {
    html += `<tr><td>${ev}</td><td>${stat[ev]}</td></tr>`;
  }
  html += "</table>";
  
  const p = document.createElement("div");
  p.innerHTML = html;
  document.getElementById("eredmeny").appendChild(p);
}
