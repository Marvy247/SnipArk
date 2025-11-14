# Reactivate Project Modification for Reactive Grant

## Plan Overview
Modify the Reactivate dApp to use shadcn/ui for proper styling and create custom components for a polished look suitable for grant submission.

## Tasks

### 1. Install shadcn/ui
- [ ] Navigate to app directory
- [ ] Initialize shadcn/ui with proper configuration
- [ ] Install required dependencies (button, card, modal, etc.)
- [ ] Update tailwind.config.js for shadcn/ui compatibility
- [ ] Update globals.css with shadcn/ui styles

### 2. Replace Existing UI Components
- [ ] Replace Button.tsx with shadcn/ui Button
- [ ] Replace Modal.tsx with shadcn/ui Dialog/Modal
- [ ] Create Card components using shadcn/ui Card
- [ ] Update ConnectWalletButton.tsx
- [ ] Update WalletConnectedButton.tsx

### 3. Create Custom Styled Components
- [ ] Create custom ModuleCard using shadcn/ui Card
- [ ] Create custom StepCard using shadcn/ui Card
- [ ] Create custom TestimonialCard using shadcn/ui Card
- [ ] Create custom UseCaseCard using shadcn/ui Card
- [ ] Keep WalletHubAnimation as is (it's an animation component)

### 4. Update Page Components
- [ ] Update HeroSection.tsx to use new components
- [ ] Update HowItWorksSection.tsx
- [ ] Update IncentiveSection.tsx
- [ ] Update UseCasesSection.tsx
- [ ] Update TestimonialsSection.tsx
- [ ] Update create-account/page.tsx
- [ ] Update dashboard/page.tsx

### 5. Handle Missing Contracts
- [ ] Check if missing contracts can be recovered from git history
- [ ] If not, recreate essential contracts if needed
- [ ] Update .gitignore appropriately

### 6. Testing and Finalization
- [ ] Test all UI components work properly
- [ ] Ensure responsive design
- [ ] Check dark mode compatibility
- [ ] Run the app and verify functionality
