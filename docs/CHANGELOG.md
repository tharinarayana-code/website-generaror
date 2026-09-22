# CHANGELOG

## M1 - Foundation

### Added

- Project folder structure.
- Application bootstrap.
- App class.
- Router.
- ComponentLoader.
- Page metadata system.
- Home page metadata.
- Website Details page metadata.
- Preview page metadata.
- Success page metadata.
- Dynamic HTML loading.
- Automatic CSS loading.
- Dynamic JavaScript module loading.
- Shared Component base class.
- Bootstrap integration.
- Global application stylesheet.

### Improved

- Router now receives ComponentLoader via dependency injection.
- ComponentLoader automatically discovers component assets using naming conventions.
- Components are isolated to their own root DOM element.
- CSS is cached and loaded only once.
- JavaScript modules are cached after first import.

### Architecture

Framework foundation completed.

Application now follows the locked architecture.


## Version 0.2.0

### Added

- Completed migration of all UI components
- Home component
- Business Information component
- Hero component
- About component
- Highlight component
- Services component
- Contact component
- Generate Bar component

### Added

- Component lifecycle

constructor()

↓

init()

↓

registerEvents()

↓

validate()

↓

getData()

### Changed

- Migrated components to ES Modules
- Removed Electron global classes
- Removed window.* registrations
- Removed ImageUploader dependency
- Removed Validation dependency
- Removed Generator dependency
- Added browser-native preparation for image upload
- Components now initialize through ComponentLoader

### Improved

- Consistent component structure
- Consistent root elements
- Cleaner separation between UI and business logic
- Better preparation for future services

### Architecture

No architectural changes.

Project continues under the locked architecture established before implementation.


## 2026-08-09

### Added

- Added working website preview functionality.
- Preview now opens in a new browser tab.
- Preview renders using the actual Handlebars website template.
- Added dynamic loading of Handlebars partials.
- Added temporary image handling for previews.
- Added local website generation through the browser filesystem API.
- Added generation of the complete website asset structure.
- Added copying of uploaded Hero and About images into generated website assets.
- Restored/verified template JavaScript and favicon assets.
- Added integration between GeneratorService, StorageService, and TemplateService.

### Changed

- Preview no longer depends on a previously generated website.
- Preview is available regardless of form validation state.
- Generate Website remains validation-controlled.
- Image handling was separated between temporary preview URLs and permanent generated image files.

### Fixed

- Fixed `[object File]` appearing as image sources.
- Fixed generated websites referencing temporary `blob:` image URLs.
- Fixed missing template JavaScript asset in generated/preview websites.
- Fixed missing favicon asset.
- Fixed template partial rendering.
- Fixed About validation behavior when image and description are entered in different orders.

### Verified

A generated website was tested and confirmed to contain:

- `index.html`
- `assets/css/style.css`
- `assets/js/script.js`
- Hero image
- About image

The generated website renders correctly outside the generator.

## 2026-08-10

### Added

- Added the Success component and Success page flow.
- Generation now navigates to the Success page after the website is saved successfully.
- Success page displays the generated website folder name.
- Added actions to create another website or return to Home.


## 2026-08-11

### Added

- Added GitHub App based deployment backend integration.
- Added automatic connection to the `Hasan-be27/WGwebsites` repository.
- Added GitHub Pages configuration through the deployment backend.
- Added website-specific GitHub Pages URL generation.
- Added GitHub deployment service integration to the Web Edition generation flow.
- Updated the Success page to display the live website URL and Open Website action.

### Verified

- GitHub App authentication works through the installation.
- Test website files can be written to `WGwebsites`.
- GitHub Pages serves website subfolders.

## 2026-08-11 — GitHub Deployment Flow

### Changed

- Generate Website now publishes the website directly instead of opening the local destination-folder picker first.
- Added a generation/deployment loader that blocks interaction while publishing is in progress.
- Moved local website saving to the Success page as an optional action.
- Added a GitHub Pages deployment warning explaining that a new website may briefly show 404 while Pages finishes deploying.

### Added

- Added `Save Website Locally` action to the Success page.
- Local saving now uses the same generated website that was just published.
- Cancelling the local folder picker no longer affects website generation or deployment.


## [Unreleased]

### Added
- Automatic GitHub deployment of generated websites.
- GitHub App based authentication for repository deployment.
- GitHub Pages hosting integration.
- Automatic generation of website-specific live URLs.
- Deployment loading/blocking state on the Website Details page.
- Save Website Locally action on the Success page.
- GitHub Pages propagation/temporary 404 guidance on the Success page.
- Automatic unique website folder naming using `-2`, `-3`, etc. when a folder already exists.
- Deployment backend validation, request limits, file limits, path validation, CORS restrictions, and rate limiting.
- Separate deployment-server architecture for GitHub operations.

### Changed
- Generate Website now deploys directly to GitHub instead of opening the local folder picker.
- Local folder selection was moved to the Success Page under Save Website Locally.
- Success Page now displays the actual hosted website URL.
- Home page tagline changed to "Generate and Host static websites in minutes."
- Preview and Generate Website button spacing improved.
- Dark-on-dark text in recent deployment/update UI changed to light text for readability.

### Security
- GitHub App credentials remain server-side.
- GitHub private key is not included in the Web Edition.
- Deployment repository and owner are controlled by the deployment server rather than client input.
- Deployment paths and folder names are validated.
- Deployment request/file/size limits were added.
- Development/admin deployment endpoints are restricted to local use.


## Unreleased

### Added

- Added Web Edition favicon using the existing `assets/icons/logo.ico`.
- Added mobile/unsupported-browser ZIP download fallback.
- Added client-side ZIP generation using JSZip.
- Added automatic fallback from folder selection to ZIP download when `window.showDirectoryPicker()` is unavailable.

### Changed

- `ZipService.saveWebsite()` now uses ZIP download instead of failing when folder selection is unavailable.
- Website files prepared by `getWebsiteFiles()` are now reusable for ZIP downloads as well as deployment.
- Web Edition deployment now communicates with the production Render deployment server instead of the local deployment server.

### Production

- Web Edition is publicly available through GitHub Pages.
- Deployment backend is hosted on Render.
- Production CORS allows the public Web Edition and local development origins.
- Generated websites are deployed to the `WGwebsites` repository and hosted through GitHub Pages.

### Fixed

- Corrected production CORS origin configuration by using the origin without the `/WebsiteGenerator-Web` path.
- Corrected the production deployment endpoint configuration so `/github/deploy` is appended only once.

---

## Previous Milestone

### GitHub Deployment

- Added automatic GitHub deployment.
- Added GitHub App integration.
- Added production deployment backend.
- Added automatic generated website hosting through GitHub Pages.
- Added duplicate website name handling.
- Added deployment loading state.
- Added deployment status handling on the Success page.
- Added guidance for temporary GitHub Pages 404 delays.
- Added download/export functionality to the Success page.

## 2026-08-16

### Changed

- Expanded the Services component to support a service image, service name, brief description, and detailed description.
- Made all four service fields mandatory for validation.
- Added immediate image preview for uploaded service images.
- Added generation of individual service pages for each service.
- Added service image copying to `assets/images/services/` in generated websites.
- Added service-specific image paths for generated service detail pages.
- Added service-page links from the home page using the generated service index.

### Fixed

- Fixed the service template path mismatch that caused:
  `Unable to load service template: templates/default/service.hbs`
- The service template now resolves to `templates/default/services.hbs`.
- Fixed Preview so uploaded service images are converted to temporary browser object URLs, allowing them to appear in preview.
- Fixed service-page links to use Handlebars `@index`.

### Verified

- Services can contain images and both brief and detailed descriptions.
- Service images appear in Preview.
- Service detail pages can render their corresponding service image.
- The existing production deployment flow remains unchanged.


## 2026-09-22 — Beginner-Friendly Details Form

### Added

- Added explicit character limits to all website-details text inputs and textareas.
- Added explicit image type and 5 MB size limits for Hero, About, and Service images.
- Added responsive file-validation modal messages for unsupported or oversized images; rejected files are cleared and not retained.
- Added short purpose explanations beside form-field names.
- Added bracketed examples to form placeholders.
- Made Service Detailed Description optional.
- Added a 120-character minimum for creating a separate service detail page.
- Service detail pages and their Learn More buttons are now created only when the detailed description reaches the minimum length.
- Added a maximum of 10 services.
- Added a responsive Preview Only notice to previews opened in a new tab.

### Changed

- Service validation now requires only the service image, name, and brief description.
- Service detail-page generation skips services without a qualifying detailed description.
- Home-page service cards hide Learn More when no service detail page is available.


## 2026-09-22 — Form Polish

### Changed

- Reduced the size of character-limit/helper text so it no longer competes visually with field names.
- Removed the heading icons from the Hero Title and About Section Heading fields.
- Added a customizable Services section heading, matching the About section's editable heading behavior.
- The generated website now uses the custom Services heading in the Services section.
