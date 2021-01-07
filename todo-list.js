const templateTodoList = document.createElement("template");

templateTodoList.innerHTML = `
<style>
  ul{
    list-style-type:none;
    margin:1.4rem 0;
    padding:0;
  }
  li{
    display:flex;

  }
</style>
  <section>
  <todo-input></todo-input>
  <ul class="todo-parent"></ul>
  </section>

`;

class TodoList extends HTMLElement {
  constructor() {
    super();
    // initializing todo-list
    this.todolist = [
      {
        text: "my first todolist",
        checked: false,
      },
      {
        text: "my second one",
        checked: false,
      },
    ];

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(templateTodoList.content.cloneNode(true));
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector("todo-input");
    this.listContainer = this.shadowRoot.querySelector(".todo-parent");
    this.input.addEventListener("onSubmit", this.addItem.bind(this));
    this._renderItem();
  }
  addItem(e) {
    this.todolist.push({ text: e.detail, checked: false });
    this._renderItem();
  }
  removeItem(e) {
    this.todolist.splice(e.detail, 1);
    this._renderItem();
  }
  toggleItem(e) {
    const item = this.todolist[e.detail];
    this.todolist[e.detail] = Object.assign({}, item, {
      checked: !item.checked,
    });
    this._renderItem();
  }

  _renderItem() {
    if (!this.listContainer) return;
    this.listContainer.innerHTML = "";
    this.todolist.forEach((item, index) => {
      let todoitem = document.createElement("todo-item");
      todoitem.setAttribute("text", item.text);
      todoitem.checked = item.checked;
      todoitem.index = index;
      todoitem.addEventListener("onRemove", this.removeItem.bind(this));
      todoitem.addEventListener("onToggle", this.toggleItem.bind(this));
      this.listContainer.appendChild(todoitem);
    });
  }
}

window.customElements.define("todo-app", TodoList);
