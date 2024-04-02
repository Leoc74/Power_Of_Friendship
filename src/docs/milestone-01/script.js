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

ksinfobutton.addEventListener("click", ()=>{
  const x = document.getElementById('x');
  if(x === null){
    const div = document.createElement("div");
    div.setAttribute("id", "x");
    div.appendChild(document.createTextNode("hello"));
    ksinfo.appendChild(div);
    ksinfobutton.textContent = "Minimize";
  }else{
    ksinfo.removeChild(x);
    ksinfobutton.textContent = "Expand";
  }
  
});
