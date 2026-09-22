const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

const ALLOWED_IMAGE_LABEL = "JPG, JPEG, PNG or WebP";

export default class FileValidator {

    static validateImage(file) {

        if (!file) {
            return { valid: false, message: "No file selected." };
        }

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            return {
                valid: false,
                message: `Unsupported image type. Please choose ${ALLOWED_IMAGE_LABEL}.`
            };
        }

        if (file.size > MAX_IMAGE_SIZE) {
            return {
                valid: false,
                message: `Image size exceeds the 5 MB limit. Please choose a smaller image.`
            };
        }

        return { valid: true };

    }

    static showModal(message, title = "File not accepted") {

        const existing = document.getElementById("file-validation-modal");
        existing?.remove();

        const modal = document.createElement("div");
        modal.id = "file-validation-modal";
        modal.className = "file-validation-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.innerHTML = `
            <div class="file-validation-backdrop"></div>
            <div class="file-validation-dialog">
                <button type="button" class="file-validation-close" aria-label="Close">&times;</button>
                <div class="file-validation-icon">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                </div>
                <h5>${title}</h5>
                <p>${message}</p>
                <button type="button" class="btn btn-primary file-validation-ok">OK</button>
            </div>
        `;

        const close = () => modal.remove();

        modal.querySelector(".file-validation-close").addEventListener("click", close);
        modal.querySelector(".file-validation-backdrop").addEventListener("click", close);
        modal.querySelector(".file-validation-ok").addEventListener("click", close);

        document.body.appendChild(modal);
        modal.querySelector(".file-validation-ok").focus();

    }

}

export { MAX_IMAGE_SIZE, ALLOWED_IMAGE_TYPES, ALLOWED_IMAGE_LABEL };
