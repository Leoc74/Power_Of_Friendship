//JS file for Dynamic Document Enhancement

/* 
REQUIREMENTS

- **DOM Access**: Your JavaScript code must interact with the Document Object Model (DOM)
  using methods such as **`document.getElementById()`**. This interaction is fundamental for
  targeting and manipulating specific elements within your document.

- **Dynamic DOM Updates**: The script must be capable of dynamically updating the DOM, either
  by creating new elements (e.g., using **`document.createElement()`**) or modifying existing
  elements through their **`.innerHTML`** property. This capability allows your document to reflect
  changes in real-time, based on user interaction or other events.
  
- **Event-Driven Trigger**: The dynamic feature must be activated by an event, which is achieved by
  attaching an event listener to an element using its **`.addEventListener()`** method. This approach
  ensures that your dynamic aspect responds to user actions, such as clicks, mouseovers, or keyboard input,
  enhancing the interactivity of your proposal document.
*/

const ksinfo = document.getElementById('ksinfo');
const ksinfobutton = document.getElementById('ksinfo-button');
const lcinfo = document.getElementById('lcinfo');
const lcinfobutton = document.getElementById('lcinfo-button');
const aginfo = document.getElementById('aginfo');
const aginfobutton = document.getElementById('aginfo-button');
const ecinfo = document.getElementById('ecinfo');
const ecinfobutton = document.getElementById('ecinfo-button');

ksinfobutton.addEventListener("click", ()=>{
  const ksbio = document.getElementById('ksbio');
  if(ksbio === null){
    const span = document.createElement('span');
    span.style.fontWeight = "bold";
    const div = document.createElement("div");
    div.setAttribute("id", "ksbio");
    const bolded = document.createElement('strong');
    bolded.innerHTML = "Role: Documentation Lead";
    div.appendChild(bolded);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode("Kevin, a junior CS and Math major from North Reading, Massachusetts, ensures clear and concise functions and code, maintains brief but informative commenting, and most importantly, allows for easy understanding and readability for both technical and non-technical audiences."));
    ksinfo.appendChild(div);
    ksinfo.appendChild(span);
    ksinfobutton.textContent = "Minimize";
  }else{
    ksinfo.removeChild(ksbio);
    ksinfobutton.textContent = "Expand";
  }
});

lcinfobutton.addEventListener("click", ()=>{
  const lcbio = document.getElementById('lcbio');
  if(lcbio === null){
    const span = document.createElement('span');
    span.style.fontWeight = "bold";
    const div = document.createElement("div");
    div.setAttribute("id", "lcbio");
    const bolded = document.createElement('strong');
    bolded.innerHTML = "Role: Project Manager";
    div.appendChild(bolded);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode("Leo, a sophomore CS and Math major from New Jersey, excels project management and the accountability of all team members, including himself. He nevertheless has expert knowledge of all related code, and believes in leading by example. With a clear understanding of the desired goal and the ability to visualize the product, Leo is a pivotal team member."));
    lcinfo.appendChild(div);
    lcinfo.appendChild(span);
    lcinfobutton.textContent = "Minimize";
  }else{
    lcinfo.removeChild(lcbio);
    lcinfobutton.textContent = "Expand";
  }
});

ecinfobutton.addEventListener("click", ()=>{
  const ecbio = document.getElementById('ecbio');
  if(ecbio === null){
    const span = document.createElement('span');
    span.style.fontWeight = "bold";
    const div = document.createElement("div");
    div.setAttribute("id", "ecbio");
    const bolded = document.createElement('strong');
    bolded.innerHTML = "Role: Back-End Developer";
    div.appendChild(bolded);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode("Evan, a sophomore CS and Math major from New Jersey, builds designs and implements robust server-side applications. He is committed to writing clean, readable code and communicating with front-end developers. His proficiency in multiple programming languages and understanding of crucial frameworks guarantees zero errors with the application."));
    ecinfo.appendChild(div);
    ecinfo.appendChild(span);
    ecinfobutton.textContent = "Minimize";
  }else{
    ecinfo.removeChild(ecbio);
    ecinfobutton.textContent = "Expand";
  }
});

aginfobutton.addEventListener("click", ()=>{
  const agbio = document.getElementById('agbio');
  if(agbio === null){
    const span = document.createElement('span');
    span.style.fontWeight = "bold";
    const div = document.createElement("div");
    div.setAttribute("id", "agbio");
    const bolded = document.createElement('strong');
    bolded.innerHTML = "Role: Front-End Developer";
    div.appendChild(bolded);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createTextNode("Amira Garba is a senior from Peabody, MA, majoring in Informatics and minoring in Computer Science. As a front-end developer, she is passionate about crafting user friendly websites that seamlessly blend aesthetics with functionality. With expertise in HTML, CSS, and JavaScript, Amira transforms design concepts into intuitive interfaces optimized for diverse devices. Collaborative and detail oriented, she thrives on pushing the boundaries of web development while prioritizing user satisfaction and engagement."));
    aginfo.appendChild(div);
    aginfo.appendChild(span);
    aginfobutton.textContent = "Minimize";
  }else{
    aginfo.removeChild(agbio);
    aginfobutton.textContent = "Expand";
  }
});


