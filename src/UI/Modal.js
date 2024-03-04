export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplatEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {
      const modalContent = document.importNode(
        this.modalTemplateEl.content,
        true
      );
        this.modalElement = modalContent.querySelector(".modal");
        this.backdropElement = modalContent.querySelector(".backdrop");
        const contentElement = document.importNode(
          this.contentTemplatEl.content,
          true
        );

       this.modalElement.appendChild(contentElement);
        document.body.insertAdjacentElement("afterbegin", this.modalElement);
        document.body.insertAdjacentElement("afterbegin", this.backdropElement);

    } else {
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      this.modalElement = null;
        this.backdropElement = null;
    }
  }
}
