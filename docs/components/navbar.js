class Navbar extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-md bg-dark border-bottom border-body sticky-top" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#top"><i class="bi bi-suit-heart h3"> VA Polyamory</i></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto" id="navbar-items">
                        
                    </ul>
                </div>
            </div>
        </nav>

        `;
    }
}

customElements.define('navbar-component', Navbar);