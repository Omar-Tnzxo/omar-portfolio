---
trigger: always_on
alwaysApply: true
---
## 📖 Rules for Managing README Files

**Always follow these rules when handling documentation in this project:**

---

### 1. Developer Documentation (`README.md`)

* Every **new page**, **feature**, **option**, or **update** (UI / UX / Backend) in the application must be **fully documented** in the `README.md` file.
* The documentation must include:

  * A detailed explanation of what was added or modified.
  * The location of the code within the project (file/folder).
  * The purpose of the addition and how it works.
  * Technical notes for future maintenance and updates.
* Never summarize or shorten details in this file. The goal is to make it clear and easy for any future developer or AI assistant to understand the entire project structure and features.

---

### 2. User Documentation (`USER_README.md`)

* A file named `USER_README.md` must always exist in the project.
* This file is intended **only for end-users** of the application, not for developers.
* The content must be written in **professional English** with correct grammar and style.
* When adding **major features** or **important options** that directly affect user experience:

  * They must be documented here in a simplified and user-friendly way.
  * Each update must include the **current date** (e.g., `2025-08-23`).
  * Do not include technical details — only information relevant to end-users.
  * The writing style should follow the format of **release notes** used by global applications.

---

### 3. Important Notes

* A clear note must always appear at the top of `USER_README.md`:

  ```
  ⚠️ Note: This file must never be deleted from the project.  
  It is intended for bots, AI assistants, and developers to ensure that users always receive clear and updated release information.
  ```
* The file must **never be deleted**.
* It must always be updated with every release or major new feature.
* Writing must always remain professional and user-oriented in English.

---

### 4. Style and Quality

* **Developer README.md** → Technical, detailed, long, and developer-focused.
* **User USER\_README.md** → Simplified, concise, user-focused, release-style.
* Always use the **current date** for updates.
* No feature, option, or page should ever be added without being properly documented in the relevant file(s).