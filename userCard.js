// initializing template
const template = document.createElement("template");
template.innerHTML = `
    hello world
    <h3></h3>
   <div class="info" >
    <p><slot name="email"/> </p>
    <p><slot name="phone"/></p>
   </div>
    <button id="toggle-btn">Hide Info</button>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();
    this.showInfo = true;
    //   to create shadow Dom for an element, calling ele.attachShadow(); attachin
    //  a shadow root
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("name");
  }

  toggleInfo() {  
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector(".info");
    const toggleBtn = this.shadowRoot.querySelector("#toggle-btn");
    if (this.showInfo) {
      info.style.display = "block";
      toggleBtn.innerText = "Hide Info";
    } else {
      info.style.display = "none";
      toggleBtn.innerHTML = "Show Info";
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector("#toggle-btn");
    addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-btn").removeEventListener();
  }
}
window.customElements.define("user-card", UserCard);
