# AILA - Requirements

## 1. Functional Requirements
### 1.1 Marketing & Info
- **Hero Section:** High-impact display with AILA 3D model introduction.
- **Features Section:** Detailed breakdown of AILA's capabilities (RAG, physical interaction, modularity).
- **About Section:** Information on AILA's physical hardware and AI integration.

### 1.2 Interactive Demo
- **Input Field:** User enters their business requirements/vertical.
- **GPT-4o Integration:** System generates a personalized "AILA configuration" based on the input.
- **Preview:** A visual/textual summary of how AILA would act for that specific user.

### 1.3 Lead Capture
- **Contact Form:** Securely collect user information (Email, Business Name).
- **Request a Demo:** CTA that triggers a backend storage action and notification.

### 1.4 3D Experience
- **Scroll Sync:** AILA robot model must move/rotate/scale in sync with the page scroll position.
- **Interactive Layers:** AILA should appear behind or on top of specific UI elements as defined in the design spec.

## 2. Non-Functional Requirements
- **Performance:** 3D model must be optimized to prevent scroll lag.
- **Visual Fidelity:** Strictly adhere to the `DESIGN.md` tokens and 'frosted glass' effects.
- **Security:** API keys for GPT-4o must never be exposed on the client.
- **Responsiveness:** Dashboard layout must work across desktop and tablet (Mobile-first optimization for the 2D elements).

## 3. Technical Constraints
- **React 19:** Use the latest React features.
- **Tailwind v4:** Leverage the new CSS-first engine.
- **Architecture:** Modular component-based structure.
