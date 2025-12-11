/* Static frontend (demo-only) for PROTOTYPE WEBSITE OF BLOD */
const donors = [
  {id:1,name:"Rohit Sharma",blood:"A+",pincode:"474001",lastDonatedDays:50,verified:1,phone:"+91-9000000001",img:"img/avatar1.svg"},
  {id:2,name:"Anjali Verma",blood:"O-",pincode:"474002",lastDonatedDays:90,verified:1,phone:"+91-9000000002",img:"img/avatar2.svg"},
  {id:3,name:"Vikas Rao",blood:"B+",pincode:"474003",lastDonatedDays:120,verified:0,phone:"+91-9000000003",img:"img/avatar3.svg"},
  {id:4,name:"Priya Singh",blood:"A+",pincode:"474001",lastDonatedDays:30,verified:1,phone:"+91-9000000004",img:"img/avatar4.svg"},
  {id:5,name:"Deepak Joshi",blood:"AB+",pincode:"474001",lastDonatedDays:75,verified:1,phone:"+91-9000000005",img:"img/avatar5.svg"}
];

const hospitals = [
  {id:1,name:"City General Hospital",pincode:"474001",phone:"+91-9000100001",img:"img/hospital1.svg"},
  {id:2,name:"St. Marys Medical Centre",pincode:"474002",phone:"+91-9000100002",img:"img/hospital2.svg"},
  {id:3,name:"Greenview Hospital",pincode:"474003",phone:"+91-9000100003",img:"img/hospital3.svg"}
];

// DOM refs
const listEl = document.getElementById('list');
const noResults = document.getElementById('noResults');
const searchBtn = document.getElementById('searchBtn');
const bloodSelect = document.getElementById('bloodGroup');
const pincodeInput = document.getElementById('pincode');
const sectionTitle = document.getElementById('sectionTitle');
const mainContent = document.getElementById('mainContent');

// hookup nav buttons
document.getElementById('homeBtn').addEventListener('click', showHome);
document.getElementById('donorsBtn').addEventListener('click', showDonors);
document.getElementById('hospitalsBtn').addEventListener('click', showHospitals);
document.getElementById('requestBtn').addEventListener('click', openRequestModalDirect);
document.getElementById('settingsBtn').addEventListener('click', ()=> alert('Settings will be available in full version.'));

// render helpers
function renderDonorCard(d){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div style="display:flex;gap:12px;align-items:center">
      <img src="${d.img}" width="64" height="64" style="border-radius:12px;object-fit:cover">
      <div style="flex:1">
        <h4>${d.name} <span class="badge">${d.blood}</span></h4>
        <div class="small">Pincode: ${d.pincode} • Last donated: ${d.lastDonatedDays} days ago</div>
        <div class="small">Phone: ${d.phone}</div>
      </div>
    </div>
    <p style="margin-top:8px"><button class="reqBtn" data-id="${d.id}">Request Now</button></p>
  `;
  return div;
}

function renderHospitalCard(h){
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <div style="display:flex;gap:12px;align-items:center">
      <img src="${h.img}" width="64" height="64" style="border-radius:8px;object-fit:cover">
      <div style="flex:1">
        <h4>${h.name}</h4>
        <div class="small">Pincode: ${h.pincode}</div>
        <div class="small">Phone: ${h.phone}</div>
      </div>
    </div>
    <p style="margin-top:8px"><button class="callHospital" data-id="${h.id}">Call Hospital</button></p>
  `;
  return div;
}

// show functions
function showHome(){
  sectionTitle.innerText = 'Available donors';
  mainContent.scrollIntoView({behavior:'smooth'});
  showDonors();
}

function showDonors(){
  sectionTitle.innerText = 'Available donors';
  const blood = bloodSelect.value;
  const pin = pincodeInput.value.trim();
  const results = donors.filter(d=> (blood? d.blood===blood:true) && (pin? d.pincode===pin:true) && d.verified);
  listEl.innerHTML = '';
  if(results.length===0){ noResults.style.display='block'; document.getElementById('statDonors').innerText = 0; }
  else { noResults.style.display='none'; results.forEach(r=> listEl.appendChild(renderDonorCard(r))); document.getElementById('statDonors').innerText = results.length; }
  document.querySelectorAll('.reqBtn').forEach(btn=> btn.addEventListener('click', openRequestModal));
}

function showHospitals(){
  sectionTitle.innerText = 'Hospitals & Blood Banks';
  listEl.innerHTML = '';
  hospitals.forEach(h=> listEl.appendChild(renderHospitalCard(h)));
  document.querySelectorAll('.callHospital').forEach(btn=> btn.addEventListener('click', e=>{ const id=e.target.dataset.id; const hosp = hospitals.find(x=>x.id==id); alert('Call ' + hosp.phone); }));
}

// modal + request handling
function openRequestModal(e){
  const id = e && e.target ? e.target.dataset.id : null;
  const donor = donors.find(x=>x.id==id) || {blood:'',name:''};
  document.getElementById('reqBlood').value = donor.blood ? donor.blood + ' — donor: ' + donor.name : '';
  document.getElementById('modal').style.display = 'flex';
}

function openRequestModalDirect(){
  document.getElementById('reqBlood').value = '';
  document.getElementById('modal').style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', ()=>{ document.getElementById('modal').style.display='none'; });

document.getElementById('requestForm').addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const name = document.getElementById('reqName').value.trim();
  const phone = document.getElementById('reqPhone').value.trim();
  const pincode = document.getElementById('reqPincode').value.trim();
  const blood = document.getElementById('reqBlood').value || (document.getElementById('bloodGroup').value || '');
  const agree = document.getElementById('agree').checked;
  if(!name || !phone || !pincode || !agree){ alert('Please fill all fields and confirm emergency.'); return; }
  const eta = Math.floor(Math.random()*60)+20;
  document.getElementById('requestResult').style.display='block';
  document.getElementById('requestResult').innerHTML = `<div class="info">Request simulated. ETA: <strong>${eta} minutes</strong>. We will contact ${phone} shortly.</div>`;
  const cur = parseInt(document.getElementById('statReq').innerText || '0') || 0; document.getElementById('statReq').innerText = cur + 1;
});

// wire search button and initial load
document.getElementById('searchBtn').addEventListener('click', showDonors);
showHome();
