class Footer extends HTMLElement {
    constructor() {
        super();
    }
  
    connectedCallback() {
        this.innerHTML = `
            <footer id="footer-section" class="bg-dark border-bottom border-body text-white text-center mt-0 p-2 d-flex align-items-center justify-content-center mb-0">
            <div class="footercontent">

                <div>
                    <h6><a href="https://forms.gle/nw4Rwkx6wgH5XD537">Link to Feedback Form</a></h6>
                </div>

                <div>
                    <div class="ccdata small">
                        <div>
                            <a href="#pagewidth">Virginia Polyamory</a> &copy;
                            <br/>
                            <span class="copy">
                                    Site designed by 
                                <a target="_blank" href="https://www.linkedin.com/in/rileyfanus/">Riley Fanus</a>
                                and <a target="_blank" href="https://github.com/castle-samj">Sam Castle</a>.
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h6>Connect with Us!</h6>
                    <h6>
                        <div id="footer_social" class="row align-items-center">
                            <div class="col-4 justify-content-center">
                                <a class="card link-card small p-1" href="https://www.facebook.com/VAPolyamory/" target="_blank"><i class="bi bi-facebook fs-3"></i> Facebook</i>
                                </a>
                            </div>
                            <div class="col-4 justify-content-center">
                                <a class="card link-card small p-1" href="https://www.instagram.com/vapolyamory/" target="_blank"><i class="bi bi-instagram fs-3"></i> Instagram</i>
                                </a>
                            </div>
                            <div class="col-4 justify-content-center">
                                <a class="card link-card small p-1" href="https://x.com/VApolyamory" target="_blank"><i class="bi bi-twitter-x fs-3"></i> Twitter/X</i>
                                </a>
                            </div>
                        </div>
                    </h6>
                </div>

            </div>
        </footer>

        `;
    }
}

customElements.define('footer-component', Footer);