class MobileMenu {
  constructor() {
    this.selectors = {
      nav: ".nav-menu",
      hamburger: ".hamburger",
      close: ".close-menu",
      overlay: ".nav-overlay",
    }

    this.state = {
      isOpen: false,
    }

    this.init()
  }

  init() {
    this.cacheElements()
    if (this.elements.nav && this.elements.hamburger) {
      this.addEventListeners()
      this.setupAccessibility()
    } else {
      console.error("Elementos do menu não encontrados")
    }
  }

  cacheElements() {
    this.elements = {
      nav: document.querySelector(this.selectors.nav),
      hamburger: document.querySelector(this.selectors.hamburger),
      close: document.querySelector(this.selectors.close),
      overlay: document.querySelector(this.selectors.overlay),
    }
  }

  addEventListeners() {
    this.elements.hamburger?.addEventListener("click", () =>
      this.toggleMenu(true)
    )
    this.elements.close?.addEventListener("click", () => this.toggleMenu(false))
    this.elements.overlay?.addEventListener("click", () =>
      this.toggleMenu(false)
    )

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.state.isOpen) this.toggleMenu(false)
    })
  }

  toggleMenu(shouldOpen) {
    this.state.isOpen = shouldOpen

    // Debug: verifique se os elementos estão sendo encontrados
    console.log("Elementos:", this.elements)

    if (this.elements.nav) {
      this.elements.nav.classList.toggle("active", shouldOpen)
    }

    if (this.elements.overlay) {
      this.elements.overlay.style.display = shouldOpen ? "block" : "none"
    }

    if (this.elements.hamburger) {
      this.elements.hamburger.setAttribute("aria-expanded", shouldOpen)
    }

    document.body.style.overflow = shouldOpen ? "hidden" : ""
    document.body.classList.toggle("menu-open", shouldOpen)
  }

  setupAccessibility() {
    if (this.elements.hamburger) {
      this.elements.hamburger.setAttribute("aria-haspopup", "true")
      this.elements.hamburger.setAttribute("aria-expanded", "false")
      this.elements.hamburger.setAttribute("aria-controls", "mobile-nav")
    }

    if (this.elements.nav) {
      this.elements.nav.id = "mobile-nav"
    }
  }
}

// Inicialização com fallback
function initMenu() {
  try {
    new MobileMenu()
  } catch (error) {
    console.error("Erro ao inicializar menu:", error)
  }
}

if (document.readyState !== "loading") {
  initMenu()
} else {
  document.addEventListener("DOMContentLoaded", initMenu)
}
