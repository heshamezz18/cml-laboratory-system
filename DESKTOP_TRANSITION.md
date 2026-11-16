# CML Windows and LAN target

Confirmed product direction: installed Windows application for the laboratory team. The hosted Site is a temporary interface preview, not the final deployment.

## Shared architecture
- Installed desktop client on each workstation, reusing the bilingual React interface.
- A single laboratory server owns the database, uploaded documents and report versions. Clients must never open a shared SQLite file over SMB.
- Replace cloud D1/R2 adapters with a local database service and controlled file storage. Preserve record IDs and export/import mappings during migration.
- Replace ChatGPT headers with local individual accounts, hashed passwords, server-side sessions and role checks. Do not trust client-supplied role or identity headers on LAN.
- No cloud URL embedded in a desktop wrapper. Installation must work against the configured internal server.
- The server needs to be running whenever workstations access shared records. WAN Internet is not required for core local operation, but LAN/server availability is required.
- External laboratories cannot access an isolated LAN deployment. Any external portal is a separately authorized future gateway, not automatic exposure of the internal server.

## Release gates
1. Confirm Windows versions, number of workstations, server PC, network and barcode printer/label size.
2. Implement local authentication and persistent storage adapters with authorization tests.
3. Produce and test Windows installer, startup configuration, updates and uninstall preservation.
4. Verify simultaneous edits, backups, full restore, report versioning, barcode scanning and printer output.
5. Migrate approved data, compare counts and identifiers, train users and approve cutover.

## Current status
The bilingual branded interface is implemented. Windows installer, local-server deployment, local accounts and backup/restore are not implemented by this update. The existing cloud database is not migrated or deleted.

## Brand source
LinkedIn: https://www.linkedin.com/company/colors-medical-laboratories
Linked company website: https://colors-labs.com/
Original logo downloaded unchanged from https://colors-labs.com/wp-content/uploads/2022/01/Colors-Logo-Final-2-1-01-1-2.png
The blue accent is an interface choice sampled visually from the original logo, not a claim of an official brand specification. Original image is 90 x 122; obtain a vector master for high-resolution installer and print artwork.
