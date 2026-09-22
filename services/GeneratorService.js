export default class GeneratorService {

    constructor(componentLoader, storageService, templateService, zipService, githubService) {

        this.componentLoader =
            componentLoader;

        this.storageService =
            storageService;

        this.templateService =
            templateService;

        this.zipService =
            zipService;

        this.githubService =
            githubService;

        this.lastGenerated = null;

    }

    async preview() {

        const data =
            this.collectData();

        const previewData =
            this.preparePreviewData(data);

        return await this.templateService.render(
            previewData
        );

    }

    async generate() {

        const data =
            this.collectData();

        const outputData =
            this.prepareOutputData(data);

        const html =
            await this.templateService.render(
                outputData
            );

        const servicePages =
            await this.generateServicePages(
                data,
                outputData
            );

        const files =
            await this.zipService.getWebsiteFiles(
                html,
                data,
                servicePages
            );

        const folderName =
            this.zipService.sanitizeName(
                data.business?.name?.trim() || "website"
            );

        this.lastGenerated = {
            html,
            data
        };

        const deployment =
            await this.githubService.deploy({
                folderName,
                files
            });

        return deployment;

    }

    async saveLocal() {

        if (!this.lastGenerated) {

            throw new Error(
                "No generated website is available to save."
            );

        }

        const outputData =
            this.prepareOutputData(
                this.lastGenerated.data
            );

        const servicePages =
            await this.generateServicePages(
                this.lastGenerated.data,
                outputData
            );

        return await this.zipService.saveWebsite(
            this.lastGenerated.html,
            this.lastGenerated.data,
            servicePages
        );

    }

    collectData() {

        const data = {};

        const componentMap = {

            business: "BusinessInformation",
            hero: "Hero",
            about: "About",
            highlight: "Highlight",
            services: "Services",
            contact: "Contact"

        };

        for (
            const [key, componentName]
            of Object.entries(componentMap)
        ) {

            const component =
                this.componentLoader
                    .getComponent(componentName);

            if (!component) {

                console.warn(
                    `Component "${componentName}" is not loaded.`
                );

                continue;

            }

            if (
                typeof component.getData !==
                "function"
            ) {

                console.warn(
                    `Component "${componentName}" does not provide getData().`
                );

                continue;

            }

            data[key] =
                component.getData();

            if (componentName === "Services" && typeof component.getHeading === "function") {
                data.servicesHeading = component.getHeading();
            }

        }

        this.storageService.save(data);

        return data;

    }

    preparePreviewData(data) {

        const previewData =
            structuredClone(data);

        if (
            data.hero?.image instanceof File
        ) {

            previewData.hero.image =
                URL.createObjectURL(
                    data.hero.image
                );

        }

        if (
            data.about?.image instanceof File
        ) {

            previewData.about.image =
                URL.createObjectURL(
                    data.about.image
                );

        }

        if (Array.isArray(data.services)) {

            previewData.services =
                data.services.map(service => {

                    const previewService = {
                        ...service
                    };

                    if (service.image instanceof File) {

                        previewService.image =
                            URL.createObjectURL(
                                service.image
                            );

                    }

                    return previewService;

                });

        }

        return previewData;

    }

    prepareOutputData(data) {

        const outputData =
            structuredClone(data);

        if (
            data.hero?.image instanceof File
        ) {

            outputData.hero.image =
                "assets/images/hero" +
                this.getExtension(
                    data.hero.image.name
                );

        }

        if (
            data.about?.image instanceof File
        ) {

            outputData.about.image =
                "assets/images/about" +
                this.getExtension(
                    data.about.image.name
                );

        }

        if (Array.isArray(data.services)) {

            outputData.services =
                data.services.map((service, index) => {

                    const outputService = {
                        ...service
                    };

                    if (service.image instanceof File) {

                        outputService.image =
                            "assets/images/services/service-" +
                            index +
                            this.getExtension(
                                service.image.name
                            );

                    }

                    return outputService;

                });

        }

        return outputData;

    }
    async generateServicePages(data, outputData) {

        const pages = [];

        for (
            let index = 0;
            index < outputData.services.length;
            index++
        ) {

            const service =
                outputData.services[index];

            if (!service.hasDetailedPage) {
                continue;
            }

            const html =
                await this.templateService.renderService({

                    business: outputData.business,

                    service: {
                        ...service,

                        image:
                            "../" +
                            service.image
                    }

                });

            pages.push({

                path:
                    `services/service-${index}.html`,

                content:
                    html,

                encoding:
                    "utf8"

            });

        }

        return pages;

    }

    getExtension(filename) {

        const index =
            filename.lastIndexOf(".");

        if (index === -1) {

            return "";

        }

        return filename.substring(index);

    }

}
