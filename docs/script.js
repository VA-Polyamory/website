// This is where custom js will go

let pageMetadata = [];

document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content");

  // Wait until <navbar-component> is ready and innerHTML is populated
  customElements.whenDefined('navbar-component').then(() => {
    const navList = document.querySelector("navbar-component #navbar-items");

    if (!navList) {
      console.error("Navbar list not found in navbar-component");
      return;
    }

    // Load pages.json once
    fetch("data/pages.json")
      .then(res => res.json())
      .then(data => {
        pageMetadata = data;
        //build the navbar
        buildNavbar(data, navList);
        //load the first page contents
        loadPageFromHash();
        //when hash changes, load page contents again
        window.addEventListener("hashchange", loadPageFromHash);
      })
      .catch(err => {
        console.error("Error loading pages.json:", err);
      });
  });

  function buildNavbar(pages, navList) {
    //filter out hidden pages, sort by index
    const visiblePages = pages.filter(p => !p.hidden).sort((a, b) => a.index - b.index);

    //group pages by parent, or root if no parent, for nested dropdowns
    const navTree = {};
    visiblePages.forEach(page => {
      const parent = page.parent || "root";
      if (!navTree[parent]) navTree[parent] = [];
      navTree[parent].push(page);
    });

    (navTree["root"] || []).forEach(parentPage => {
      const children = navTree[parentPage.title] || [];

      // If there are no children pages, populate nav link as normal
      if (children.length === 0) {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `<a class="nav-link" href="#${parentPage.source.replace(".html", "")}">${parentPage.title}</a>`;
        navList.appendChild(li);
      } else {
        const dropdown = document.createElement("li");
        dropdown.className = "nav-item dropdown";
        // if there are children, populate as dropdown menu
        dropdown.innerHTML = `
          <a class="nav-link dropdown-toggle" href="#" id="${parentPage.title}-dropdown" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">
            ${parentPage.title}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="${parentPage.title}-dropdown">
            <li><a class="dropdown-item" href="#${parentPage.source.replace(".html", "")}">${parentPage.title}</a></li>
            ${children.map(child => `<li><a class="dropdown-item" href="#${child.source.replace(".html", "")}">${child.title}</a></li>`).join("")}
          </ul>
        `;
        navList.appendChild(dropdown);
      }
    });
  }

  function loadPageFromHash() {
    //get hash, remove # from hash
    const hash = location.hash.slice(1) || "home";
    //find the page object using source
    const pageObj = pageMetadata.find(p => p.source === `${hash}.html`);
    //find file of the page object
    const pageFile = pageObj ? `${pageObj.source}` : "404.html";

    fetch(pageFile)
      .then(res => {
        //ensure the file exists
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then(html => {
        //load body html
        contentContainer.innerHTML = html;
        //update metadata in header
        updateHeadMetadata(pageObj, hash);
        //highlight active link in navbar
        highlightActiveLink(hash);
        //scroll to top of page
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(() => {
        //Display a 404 Page not found error
        contentContainer.innerHTML = "<h1>404 - Page Not Found</h1>";
        document.title = "404 - Not Found";
        setMeta("description", "This page does not exist.");
        setMeta("keywords", "");
      });
  }

  function updateHeadMetadata(pageObj, fallbackId) {
    if (!pageObj) {
      //if the pageObj is invalid, use fallback ID
      document.title = `${fallbackId} | VA Polyamory`;
      //return early, since obviously no description or keywords will exist
      return;
    }
    //set document title to the page object title, or if that is null or undefined, use fallback title
    document.title = pageObj.title || `${fallbackId} | VA Polyamory`;
    //set description metadata
    setMeta("description", pageObj.description || "");
    //set keywords metadata
    setMeta("keywords", pageObj.keywords || "");
  }

  function setMeta(name, content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

  function highlightActiveLink(pageId) {
    document.querySelectorAll("a.nav-link, .dropdown-item").forEach(link => {
      //strips the # from the href to allow comparison to page ID
      const target = link.getAttribute("href")?.replace(/^#/, "");
      //removes active class if target is the same as the page ID, and vice versa
      link.classList.toggle("active", target === pageId);
    });
  }
});
