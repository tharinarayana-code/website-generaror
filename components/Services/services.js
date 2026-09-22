import Component from "../../app/Component.js";
import FileValidator from "../../app/FileValidator.js";

const MAX_SERVICES = 10;
const MAX_SERVICE_DESCRIPTION = 1200;
const MIN_SERVICE_DESCRIPTION = 120;

export default class Services extends Component {

    constructor(element) {
        super(element);
    }

    init() {
        console.log("Services initialized");

        this.list = this.$("#services-list");
        this.addButton = this.$("#add-service");
        this.heading = this.$("#services-heading");

        this.registerEvents();

        this.validationService.register(
            "services",
            () => this.validate()
        );

        this.addService();
    }

    registerEvents() {
        this.heading.addEventListener("input", () => {
            this.validationService.validate("services");
        });

        this.addButton.addEventListener("click", () => {
            if (this.list.children.length >= MAX_SERVICES) {
                FileValidator.showModal(
                    `You can add up to ${MAX_SERVICES} services.`,
                    "Service limit reached"
                );
                return;
            }

            this.addService();
        });
    }

    renumber() {
        [...this.list.children].forEach((service, index) => {
            service.querySelector(".service-title").textContent =
                `Service ${index + 1}`;
        });
    }

    addService() {
        const service = document.createElement("div");
        service.className = "service-item card border p-3";

        service.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="service-title mb-0">
                    Service ${this.list.children.length + 1}
                </h5>
                <button type="button" class="btn btn-outline-danger btn-sm remove-service">
                    Remove
                </button>
            </div>

            <div class="mb-3">
                <label class="form-label">
                    <i class="bi bi-image me-2"></i>
                    Service Image (Image representing this service)
                    <span class="text-danger">*</span>
                </label>
                <input type="file" class="form-control service-image" accept="image/jpeg,image/png,image/webp">
                <div class="form-text">Allowed: JPG, JPEG, PNG or WebP • Max 5 MB.</div>
                <div class="service-image-preview-container mt-3 d-none">
                    <img class="service-image-preview" alt="Service image preview">
                </div>
            </div>

            <div class="mb-3">
                <label class="form-label">
                    <i class="bi bi-tag me-2"></i>
                    Service Name (Name of the service)
                    <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control service-name" maxlength="80" placeholder="[Example: Custom Birthday Cakes]">
                <div class="form-text">Max 80 characters.</div>
            </div>

            <div class="mb-3">
                <label class="form-label">
                    <i class="bi bi-text-paragraph me-2"></i>
                    Brief Description (Short text shown on the home page)
                    <span class="text-danger">*</span>
                </label>
                <textarea class="form-control service-brief" rows="2" maxlength="200" placeholder="[Example: Custom cakes made for birthdays, weddings and special events.]"></textarea>
                <div class="form-text">Max 200 characters.</div>
            </div>

            <div>
                <label class="form-label">
                    <i class="bi bi-file-text me-2"></i>
                    Detailed Description (Extra details for its own page)
                    <span class="text-muted">Optional</span>
                </label>
                <textarea class="form-control service-description" rows="5" maxlength="${MAX_SERVICE_DESCRIPTION}" placeholder="[Example: Choose your cake size, flavour, filling and design. We prepare each cake to order and can accommodate custom themes and dietary requests.]" ></textarea>
                <div class="form-text service-description-help">
                    Optional. If you want a separate service page and <strong>Learn More</strong> button, write at least ${MIN_SERVICE_DESCRIPTION} characters (about 2–3 lines). Max ${MAX_SERVICE_DESCRIPTION} characters.
                </div>
                <div class="service-page-status small mt-2" aria-live="polite"></div>
            </div>
        `;

        const removeButton = service.querySelector(".remove-service");
        const imageInput = service.querySelector(".service-image");
        const imagePreviewContainer = service.querySelector(".service-image-preview-container");
        const imagePreview = service.querySelector(".service-image-preview");
        const nameInput = service.querySelector(".service-name");
        const briefInput = service.querySelector(".service-brief");
        const descriptionInput = service.querySelector(".service-description");
        const pageStatus = service.querySelector(".service-page-status");

        removeButton.addEventListener("click", () => {
            if (this.list.children.length === 1) {
                return;
            }

            service.remove();
            this.renumber();
            this.validationService.validate("services");
        });

        imageInput.addEventListener("change", () => {
            const file = imageInput.files[0];

            if (!file) {
                imagePreviewContainer.classList.add("d-none");
                imagePreview.removeAttribute("src");
                this.validationService.validate("services");
                return;
            }

            const result = FileValidator.validateImage(file);

            if (!result.valid) {
                imageInput.value = "";
                imagePreviewContainer.classList.add("d-none");
                imagePreview.removeAttribute("src");
                FileValidator.showModal(result.message);
                this.validationService.validate("services");
                return;
            }

            imagePreview.src = URL.createObjectURL(file);
            imagePreviewContainer.classList.remove("d-none");
            this.validationService.validate("services");
        });

        nameInput.addEventListener("input", () => {
            this.validationService.validate("services");
        });

        briefInput.addEventListener("input", () => {
            this.validationService.validate("services");
        });

        descriptionInput.addEventListener("input", () => {
            this.updateServicePageStatus(descriptionInput, pageStatus);
            this.validationService.validate("services");
        });

        this.list.appendChild(service);
        this.updateServicePageStatus(descriptionInput, pageStatus);
    }

    updateServicePageStatus(descriptionInput, pageStatus) {
        const length = descriptionInput.value.trim().length;

        if (length >= MIN_SERVICE_DESCRIPTION) {
            pageStatus.innerHTML = `<span class="text-success"><i class="bi bi-check-circle me-1"></i>Separate service page and Learn More button will be created.</span>`;
            return;
        }

        if (length > 0) {
            pageStatus.innerHTML = `<span class="text-muted">${MIN_SERVICE_DESCRIPTION - length} more characters needed for a separate page.</span>`;
            return;
        }

        pageStatus.textContent = "No separate service page will be created for this service.";
    }

    validate() {
        if (this.heading.value.trim() === "" || this.list.children.length === 0) {
            return false;
        }

        return [...this.list.children].every(service => {
            const image = service.querySelector(".service-image").files[0];
            const name = service.querySelector(".service-name").value.trim();
            const brief = service.querySelector(".service-brief").value.trim();

            return Boolean(image && name && brief);
        });
    }

    getHeading() {
        return this.heading.value.trim();
    }

    getData() {
        return [...this.list.children].map(service => {
            const description =
                service.querySelector(".service-description").value.trim();

            return {
                name: service.querySelector(".service-name").value.trim(),
                brief: service.querySelector(".service-brief").value.trim(),
                description,
                hasDetailedPage: description.length >= MIN_SERVICE_DESCRIPTION,
                image: service.querySelector(".service-image").files[0] || null
            };
        });
    }

}
