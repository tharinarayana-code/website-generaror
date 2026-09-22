# TODO

## Current Priority — Final Testing and Release

### End-to-End Testing

- [ ] Test deployment with normal realistic website data.
- [ ] Test deployment with unusual/special characters in business names.
- [ ] Test duplicate website names repeatedly.
- [ ] Test very large uploaded images.
- [ ] Test deployment failure handling.
- [ ] Test Render cold-start delay behavior.
- [ ] Test GitHub Pages publishing delay and Success page messaging.
- [ ] Test the complete production flow again after the latest changes.

### Services

- [x] Add service image input.
- [x] Add service image preview.
- [x] Add service name.
- [x] Add brief description.
- [x] Add detailed description.
- [x] Validate all required service fields.
- [x] Generate individual service pages.
- [x] Copy service images into generated assets.
- [x] Fix service template filename mismatch.
- [x] Show service images in Preview.
- [x] Fix service-page links to use `@index`.

### Preview

- [x] Preview button.
- [x] Preview without requiring Generate Website.
- [x] Preview without requiring validation.
- [x] Collect current form data.
- [x] Render through the actual template.
- [x] Handle Hero image temporarily.
- [x] Handle About image temporarily.
- [x] Handle Service images temporarily.
- [x] Open preview in a new browser tab.
- [x] Verify template JavaScript and favicon assets.

### Website Generation

- [x] Collect website data.
- [x] Render Handlebars template.
- [x] Load all template partials.
- [x] Generate `index.html`.
- [x] Generate individual service pages.
- [x] Generate/copy asset structure.
- [x] Copy Hero image.
- [x] Copy About image.
- [x] Copy Service images.
- [x] Finalize Success screen.
- [x] Deploy generated websites automatically.

### Download / Export

- [x] Local website generation.
- [x] Complete asset copying.
- [x] Image copying.
- [x] ZIP download fallback for unsupported browsers.
- [x] Separate local saving from deployment.
- [ ] Test ZIP download with Hero image.
- [ ] Test ZIP download with About image.
- [ ] Test ZIP download with both Hero and About images.
- [ ] Test ZIP download with Service images.
- [ ] Test ZIP download without optional images.
- [ ] Test ZIP extraction and verify the generated website works locally.

### GitHub / Production

- [x] Authenticate deployment backend with GitHub App.
- [x] Connect deployment backend to `WGwebsites`.
- [x] Upload generated websites to the repository.
- [x] Configure GitHub Pages.
- [x] Generate website-specific Pages URLs.
- [x] Deploy generated websites automatically.
- [x] Display deployed website URL.
- [x] Add duplicate website-name handling.
- [x] Add deployment loading state.
- [x] Configure production CORS.
- [x] Deploy backend to Render.
- [x] Connect the Web Edition to the production deployment server.
- [x] Keep GitHub credentials server-side.
- [ ] Perform final production security/abuse testing.

### Mobile

- [x] Add ZIP fallback for browsers without File System Access API.
- [ ] Review mobile filesystem/output behavior.
- [ ] Test Preview on a physical mobile device.
- [ ] Review mobile layout across all pages.

### Beginner-Friendly Form

- [x] Add explicit text-field limits.
- [x] Add explicit image type and size limits.
- [x] Add responsive invalid-file modal.
- [x] Add short purpose explanations beside field names.
- [x] Add example placeholders.
- [x] Make detailed service descriptions optional.
- [x] Add minimum detailed-description length for service pages.
- [x] Hide service-page buttons when no qualifying detailed description exists.
- [x] Add Preview Only notice for new-tab previews.

### Production Polish

- [ ] Review Success page messaging and deployment status presentation.
- [ ] Review deployment loading state.
- [ ] Review favicon appearance in browser tabs.
- [ ] Review error messages for non-technical users.
- [ ] Review public Web Edition before final release.

---

## Documentation / Release

- [x] Update `NOTES.md`.
- [x] Update `CHANGELOG.md`.
- [x] Update `TODO.md`.
- [ ] Commit the latest Services/Preview fixes.
- [ ] Push the Website Generator Web Edition source to the target GitHub repository.
- [ ] Verify the pushed repository contains the latest source and documentation.
- [ ] Perform one final production-flow test after the repository push.

---

## Future / Version 2

- [ ] Improve deployment progress/status feedback.
- [ ] Improve detection of GitHub Pages publishing completion.
- [ ] Consider custom domains for generated websites.
- [ ] Consider additional website templates.
- [ ] Consider additional hosting providers.
- [ ] Consider CI/CD for the private deployment server.
- [ ] Consider always-on paid hosting when real usage requires it.
- [ ] New architecture ideas remain deferred to a future version.

---

## Completed Major Milestones

- [x] Locked Web Edition architecture.
- [x] Migrated/adapted UI components.
- [x] Implemented website details form.
- [x] Implemented validation.
- [x] Implemented preview.
- [x] Implemented local website generation.
- [x] Implemented website download/export.
- [x] Implemented GitHub App deployment.
- [x] Implemented automatic GitHub hosting.
- [x] Created `WGwebsites` repository for generated websites.
- [x] Created separate deployment server repository.
- [x] Deployed deployment server to Render.
- [x] Published Web Edition through GitHub Pages.
- [x] Connected Web Edition to production deployment server.
- [x] Configured production CORS.
- [x] Added duplicate website-name handling.
- [x] Added deployment loading state.
- [x] Added Success page deployment messaging.
- [x] Added favicon.
- [x] Added mobile/unsupported-browser ZIP fallback.
- [x] Expanded Services with images and two levels of descriptions.
- [x] Fixed Service template loading.
- [x] Fixed Service images in Preview.

