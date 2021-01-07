// initializing template
const templateTodoInput = document.createElement("template");
// inner html for html
templateTodoInput.innerHTML = `
<style>
.todo-input{
        height: 40px;
        border: 1px solid #e4e4e4;
        background: #e4e4e4;
        padding: 0 1.2rem;
}
h1{
    font-size: 1.4rem;
    text-align: center;
}
.submit-button{
  height: 40px;
    padding: 0 1.4rem;
    background: #3b6fc1;
    color: #eee;
    font-size: 1rem;
    text-transform: capitalize;
    border: 1px solid #3b6fc1;
    outline: none;
}
</style>
  <form class="todo-form">
  <h1>ToDo App</h1>
  <input type="text" class="todo-input" placeholder="Enter your todo list" />
  <button class="submit-button" >submit </button>
  </form>
`;

class TodoInput extends HTMLElement {
  constructor() {
    super(); // initialize first super
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoInput.content.cloneNode(true));
  }

  connectedCallback() {
    this.form = this.shadowRoot.querySelector(".todo-form");
    this.input = this.shadowRoot.querySelector(".todo-input");
    this.button = this.shadowRoot.querySelector(".submit-button");
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!this.input.value) return;
      this.dispatchEvent(
        new CustomEvent("onSubmit", { detail: this.input.value })
      );
      console.log(this.input.value);
      this.input.value = "";
    });
  }
}

window.customElements.define("todo-input", TodoInput);
