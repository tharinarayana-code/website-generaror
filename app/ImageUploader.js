import FileValidator from "./FileValidator.js";

export default class ImageUploader {

    constructor(component, prefix) {

        this.button = component.$(`#${prefix}-image-button`);
        this.input = component.$(`#${prefix}-image-input`);
        this.preview = component.$(`#${prefix}-preview`);
        this.label = component.$(`#${prefix}-image-name`);

        this.file = null;
        this.listeners = [];

        this.registerEvents();

    }

    onChange(callback) {

        this.listeners.push(callback);

    }

    emitChange() {

        this.listeners.forEach(listener => listener());

    }

    registerEvents() {

        this.button.addEventListener("click", () => {

            this.input.click();

        });

        this.input.addEventListener("change", () => {

            const file = this.input.files[0];

            if (!file) {

                return;

            }

            const result = FileValidator.validateImage(file);

            if (!result.valid) {

                this.input.value = "";
                FileValidator.showModal(result.message);
                return;

            }

            this.loadFile(file);

        });

    }

    loadFile(file) {

        this.file = file;

        this.label.textContent =
            file.name;

        this.preview.src =
            URL.createObjectURL(file);

        this.preview.hidden = false;

        this.emitChange();

    }

    clear() {

        this.file = null;

        this.input.value = "";

        this.label.textContent =
            "No image selected";

        this.preview.hidden = true;

        this.preview.src = "";

        this.emitChange();

    }

    hasImage() {

        return !!this.file;

    }

    getImage() {

        return this.file ?? null;

    }

}