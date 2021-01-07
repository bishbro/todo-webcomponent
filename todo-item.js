const templateTodoItem = document.createElement("template");

templateTodoItem.innerHTML = `
<style>
li{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
p{
  font-size:1.2rem;
}
.completed{
  background:#f1f1f1;
}
</style>
  <li class="item">
  <p class="text"></p>
  <input type="checkbox" class="check">
  <button class="remove-btn">x</button>
  </li>
`;

class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._checked = false;
    this._text = "";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true));
  }

  connectedCallback() {
    this.item = this.shadowRoot.querySelector(".item");
    this.checkbox = this.shadowRoot.querySelector("input");
    this.text = this.shadowRoot.querySelector(".text");
    this.removebtn = this.shadowRoot.querySelector(".remove-btn");
    this.removebtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("onRemove", { detail: this.index }));
    });
    this.checkbox.addEventListener("click", (e) => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent("onToggle", { detail: this.index }));
    });
    this._renderList();
  }
  static get observedAttributes() {
    return ["text"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this._text = newValue;
  }
  set index(value) {
    this._index = value;
  }
  get index() {
    return this._index;
  }
  set checked(value) {
    this._checked = Boolean(value);
  }
  get checked() {
    return this.hasAttribute("checked");
  }
  _renderList() {
    if (!this.item) return;
    this.text.textContent = this._text;
    if (this._checked) {
      this.item.classList.add("completed");
      this.checkbox.setAttribute("checked", "");
    } else {
      this.item.classList.remove("completed");
      this.checkbox.removeAttribute("checked");
    }
  }
}

window.customElements.define("todo-item", TodoItem);
