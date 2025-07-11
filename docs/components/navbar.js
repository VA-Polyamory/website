class Navbar extends HTMLElement {
  constructor() {
    super();
  }
  
  async connectedCallback() {
    // Set base HTML immediately
    this.innerHTML = `
      <nav class="navbar navbar-expand-md bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/index.html"><i class="bi bi-suit-heart h3"> VA Polyamory</i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto" id="navbar-items"></ul>
          </div>
        </div>
      </nav>
    `;

    try {
      const res = await fetch("data/pages.json");
      const pages = await res.json();

      const navList = this.querySelector("#navbar-items");
      const currentPath = location.pathname.split("/").pop() || "index.html";
      const currentId = pages.find(p => p.source.endsWith(currentPath))?.id;

      const topLevelPages = pages
        .filter(p => !p.hidden && !p.parent)
        .sort((a, b) => a.index - b.index);

      for (const page of topLevelPages) {
        const children = pages
          .filter(p => p.parent === page.id && !p.hidden)
          .sort((a, b) => a.index - b.index);

        if (children.length > 0) {
          // Dropdown
          const dropdown = document.createElement("li");
          dropdown.className = "nav-item dropdown";
          dropdown.innerHTML = `
            <a class="nav-link dropdown-toggle ${page.id === currentId ? "active" : ""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${page.title}
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="${page.source}">${page.title}</a></li>
              ${children
                .map(
                  child => `
                <li>
                  <a class="dropdown-item ${child.id === currentId ? "active" : ""}" href="${child.source}">
                    ${child.title}
                  </a>
                </li>
              `
                )
                .join("")}
            </ul>
          `;
          navList.appendChild(dropdown);
        } else {
          // Regular nav item
          const item = document.createElement("li");
          item.className = "nav-item";
          item.innerHTML = `
            <a class="nav-link ${page.id === currentId ? "active" : ""}" href="${page.source}">
              ${page.title}
            </a>
          `;
          navList.appendChild(item);
        }
      }
    } catch (err) {
      console.error("Failed to load navbar from pages.json", err);
    }
  }
}
customElements.define("navbar-component", Navbar);
