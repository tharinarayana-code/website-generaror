# NOTES

## Project

**Website Generator Web**

The Web Edition is the primary browser-based version of Website Generator.

## Locked Architecture

The architecture remains frozen for this version:

- App
- Router
- Pages
- Components
- Services

Components are migrated/adapted from the Electron version rather than unnecessarily rewritten.

No architecture changes should be introduced during this version. New architectural ideas belong to a future version.

## Locked Development Rules

- Reuse before rewrite.
- Browser-native APIs only.
- One responsibility per class.
- Pages contain metadata only.
- Components are self-contained.
- Services contain business logic only.
- Every milestone ends with a working application.
- Documentation is updated after meaningful progress.
- Git commits are made after stable milestones/features.

## Development Workflow

1. Design
2. Implementation
3. Testing
4. Commit
5. Documentation

---

## Current Application Flow

Home
→ Website Details
→ Preview / Generate Website
→ Success

Preview and Generate Website are separate flows:

- **Preview** renders the current form data without requiring validation or deployment.
- **Generate Website** validates the form, generates the complete website, deploys it, and then opens the Success page.

---

## Component Status

The following components are implemented and working under the locked architecture:

- Home
- Business Information
- Hero
- About
- Highlight
- Services
- Contact
- Generate Bar
- Preview
- Success

All components use the shared Component base class and are loaded through ComponentLoader.

---

## Services

The Services component was expanded to support complete service entries.

Each service contains:

- Service Image — required
- Service Name — required
- Brief Description — required
- Detailed Description — required

The Services component:

- Supports multiple services.
- Shows an immediate preview of the selected service image.
- Validates every service entry.
- Returns the service image as a browser `File` object.
- Preserves separate brief and detailed descriptions for the home page and individual service pages.

Generated service pages are created under:

```text
services/
├── service-0.html
├── service-1.html
└── ...
```

Service images are stored under:

```text
assets/images/services/
├── service-0.*
├── service-1.*
└── ...
```

Service page links use the Handlebars `@index` value so the links match the generated page names.

---

## Validation

Validation is handled centrally through `ValidationService`.

Required sections currently include:

- Business Information
- Hero
- About
- Services
- Contact

Every service must contain:

- an image
- a name
- a brief description
- a detailed description

The earlier About validation issue related to image-selection order was resolved.

---

## Preview

Preview is independent from website generation.

The Preview flow:

1. Collects the currently entered website data.
2. Converts selected local image `File` objects into temporary object URLs.
3. Renders the current data through the actual Handlebars website template and partials.
4. Opens the result in a new browser tab.
5. Does not require all fields to be valid.
6. Does not permanently save or deploy the website.

Temporary preview URLs are created for:

- Hero image
- About image
- Service images

This ensures uploaded service images are visible in Preview without turning them into permanent generated asset paths.

---

## Website Generation

Generate Website performs the actual generation and deployment process.

Current flow:

1. Collect website data.
2. Validate the required sections.
3. Prepare output paths for uploaded images.
4. Render the main Handlebars template.
5. Generate individual service pages.
6. Create the complete website asset structure.
7. Copy uploaded images into the generated website.
8. Send the generated website files to the deployment backend.
9. Deploy the website to GitHub.
10. Navigate to the Success page with the published URL.

A generated website contains a structure similar to:

```text
Business Name/
├── index.html
├── services/
│   ├── service-0.html
│   ├── service-1.html
│   └── ...
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── fonts/
    ├── icons/
    └── images/
        ├── hero.*
        ├── about.*
        └── services/
            ├── service-0.*
            └── service-1.*
```

---

## Success Page

After successful deployment, the Success page provides:

- The live website URL.
- Open Website.
- Save Website Locally.
- Create another website.
- Navigation back to Home.

GitHub Pages may take some time to publish a newly deployed website. A temporary 404 can therefore occur immediately after deployment.

The Success page provides guidance for this situation.

---

## Local Download / Export

Saving locally is separate from deployment.

On browsers supporting the File System Access API, the user can choose a parent directory and save the generated website there.

On browsers without `window.showDirectoryPicker()`, the application falls back to generating and downloading a ZIP file.

This provides a usable export path for mobile and unsupported browsers.

---

## GitHub Hosting Architecture

The current production architecture is:

```text
Web Edition
    ↓ HTTPS
Render Deployment Server
    ↓
GitHub App
    ↓
WGwebsites repository
    ↓
GitHub Pages
    ↓
Generated Website
```

The Web Edition is publicly hosted through GitHub Pages:

`https://hasan-be27.github.io/WebsiteGenerator-Web/`

The deployment backend is hosted on Render:

`https://websitegenerator-deployment-server.onrender.com`

Generated websites are stored in the `WGwebsites` repository and published through GitHub Pages.

The Web Edition can therefore be used without running a local deployment server.

---

## Deployment Server

The deployment server is a separate Node.js/Express application.

It:

- Authenticates with GitHub using the configured GitHub App.
- Uploads generated website files.
- Creates the required website folder.
- Returns the website-specific GitHub Pages URL.
- Validates deployment paths.
- Prevents path traversal.
- Limits request body size.
- Limits file count and file sizes.
- Limits total deployment size.
- Applies deployment rate limiting.
- Restricts CORS.
- Keeps GitHub credentials server-side.
- Restricts development/admin endpoints.

The GitHub App private key is not included in the Web Edition.

---

## Unique Website Names

Generated websites must never silently overwrite an existing website.

If a folder already exists, the deployment server creates a numbered name:

```text
abc-bakery/
abc-bakery-2/
abc-bakery-3/
```

The Success page receives the actual URL for the unique generated folder.

---

## Production Status

Production deployment has been completed.

Current production pieces:

- Public Web Edition on GitHub Pages.
- Production deployment backend on Render.
- GitHub App based deployment.
- `WGwebsites` repository for generated websites.
- GitHub Pages hosting for generated websites.
- Production CORS configuration.
- Duplicate website-name handling.
- Deployment loading state.
- Success-page deployment messaging.
- Favicon.
- Mobile/unsupported-browser ZIP fallback.

---

## UI Updates

Recent UI work includes:

- Improved spacing between Preview and Generate Website buttons.
- Improved readability of dark-on-dark deployment/update text.
- Updated Home page tagline to:
  **Generate and Host static websites in minutes.**
- Updated Services UI to support service images, brief descriptions, and detailed descriptions.

---

## Current Project State

The application is in the final testing/polish stage rather than the initial implementation stage.

The major architecture and production deployment work is complete.

Current work should focus on:

- End-to-end testing.
- Reliability testing.
- Mobile layout review.
- Deployment failure handling.
- Large-image testing.
- GitHub Pages propagation behavior.
- ZIP export verification.
- Final UI/error-message polish.
- Final documentation and repository release.

New architectural ideas remain deferred to a future version.


---

## 2026-09-22 — Beginner-Friendly Form Update

The website-details form was updated to make first-time use clearer without adding long explanations.

### Current form rules

- Text fields display their maximum character limits.
- Image fields accept JPG/JPEG, PNG, and WebP only.
- Maximum image size is 5 MB per uploaded image.
- Invalid image selections are immediately cleared and reported through a responsive modal.
- Form labels include short explanations in brackets.
- Form placeholders use bracketed examples.
- Services require an image, service name, and brief description.
- Detailed service descriptions are optional.
- A detailed description must contain at least 120 characters to create a separate service page and Learn More button.
- Up to 10 services can be added.
- Preview opens in a new tab with a Preview Only notice directing the user back to the generator for final generation.


### 2026-09-22 Form Polish

- Services now has an editable section heading with a default of `Our Services`.
- Character-limit/helper text is intentionally compact.
- Hero Title and About Section Heading no longer show their extra heading icons.
- Image uploads remain limited to 5 MB per image and JPG/JPEG, PNG, or WebP.
