# Technical Architecture Report

## ngnphamgiahuy-devfolio Codebase Analysis

**Generated:** 2025-01-27  
**Codebase:** Next.js 15 Portfolio/Devfolio Application  
**Analyst:** Senior Software Architect

---

## 1. High-Level Overview

### What This System Does

A **modern portfolio/developer showcase website** built with Next.js 15, featuring:

-   Dynamic content management via Sanity CMS
-   Portfolio sections (projects, skills, services, testimonials, pricing, blog)
-   Blog system with comments
-   Data export functionality
-   Responsive design with animations
-   Theme switching (light/dark)
-   SEO optimization

### Main Components / Modules

1. **Presentation Layer** (`/app`, `/components`)

    - Next.js App Router pages
    - React components (features, layouts, UI)
    - Dynamic section rendering system

2. **Data Layer** (`/lib`)

    - Sanity CMS integration
    - Data queries (GROQ)
    - Export functionality
    - Metadata generation

3. **Business Logic** (`/utils`)

    - Data normalization
    - Section configuration
    - Helper functions (date, image, social, DOM)

4. **Configuration** (`/config`)

    - Animation configs
    - Component configs
    - Feature-specific settings

5. **Type System** (`/types`)
    - Comprehensive TypeScript definitions
    - Feature-specific types
    - CMS schema types

### Architecture Style

**Layered Architecture with Feature-Based Organization**

-   **Presentation**: React components organized by feature
-   **Data Access**: Centralized in `/lib` with Sanity client
-   **Business Logic**: Utility functions in `/utils`
-   **Configuration**: Centralized config files
-   **Type Safety**: Comprehensive TypeScript coverage

**Patterns Used:**

-   Component Composition
-   Render Props / Dynamic Rendering (SectionRenderer)
-   Custom Hooks for stateful logic
-   Provider Pattern (Theme, Export Progress, Hero Animation)
-   Factory Pattern (Section component mapping)

### Main Technologies Used

-   **Framework**: Next.js 15.5.2 (App Router)
-   **UI**: React 19.1.0, Tailwind CSS 4
-   **CMS**: Sanity 4.6.1
-   **Animations**: Framer Motion 12.23.12
-   **Forms**: React Hook Form 7.62.0, Zod 4.1.4
-   **Styling**: CSS Modules, Styled Components 6.1.19
-   **Type Safety**: TypeScript 5

---

## 2. Folder Responsibilities

### `/src/app` → **Next.js App Router Pages & API Routes**

-   **Purpose**: Route definitions, page components, API endpoints
-   **Contains**:
    -   Page components (`page.tsx`)
    -   Layout components (`layout.tsx`)
    -   API routes (`/api/export`, `/api/revalidate`)
-   **Issues**:
    -   ✅ Clean separation
    -   ⚠️ Some pages could benefit from shared data fetching patterns
-   **Improvement Ideas**: Extract common data fetching logic to shared hooks/services

### `/src/components` → **React Component Library**

-   **Purpose**: Reusable UI components organized by concern
-   **Structure**:
    -   `/features` - Feature-specific components (Blog, Contact, Project, etc.)
    -   `/layouts` - Page structure components (Header, Footer, Sidebar, Wrapper)
    -   `/ui` - Generic UI components (Buttons, Forms, Carousel, Accordion)
    -   `/portable-text` - Rich text rendering components
    -   `/providers` - Context providers
    -   `/section` - Section rendering logic
-   **Issues**:
    -   ✅ Good feature-based organization
    -   ⚠️ Some components mix presentation and business logic
    -   ⚠️ `SectionRenderer.tsx` has hardcoded component imports (could use dynamic imports)
-   **Improvement Ideas**:
    -   Extract business logic from components to hooks/services
    -   Consider lazy loading for section components

### `/src/lib` → **Core Library / Data Access Layer**

-   **Purpose**: External integrations, data fetching, core utilities
-   **Contains**:
    -   Sanity client setup (`sanity.ts`)
    -   GROQ queries (`queries.ts`)
    -   Export functionality (`export.ts`)
    -   Metadata generation (`metadata.ts`)
    -   Sanity schemas (`/sanity/schemas`)
-   **Issues**:
    -   ✅ Clear separation of concerns
    -   ✅ Well-organized
    -   ⚠️ `export.ts` has image URL resolution logic that could be extracted
-   **Improvement Ideas**: Extract image processing to a dedicated service

### `/src/utils` → **Utility Functions**

-   **Purpose**: Pure functions, helpers, data transformations
-   **Structure**:
    -   `/sections` - Section data normalization
    -   `/date` - Date formatting
    -   `/image` - Image processing
    -   `/social` - Social media helpers
    -   `/dom` - DOM utilities
    -   `/blog` - Blog-specific helpers
    -   `/ui` - UI-related utilities
-   **Issues**:
    -   ✅ Good categorization
    -   ⚠️ Some utilities are feature-specific (should be in feature folders?)
    -   ⚠️ `section.data-helpers.ts` is large (617 lines) - could be split
-   **Improvement Ideas**:
    -   Split large utility files
    -   Move feature-specific utils to feature folders

### `/src/types` → **TypeScript Type Definitions**

-   **Purpose**: Type safety across the application
-   **Structure**:
    -   `/features` - Feature-specific types
    -   `/sections` - Section-related types
    -   `/ui` - UI component types
    -   `/lib` - Library types
-   **Issues**:
    -   ✅ Comprehensive type coverage
    -   ✅ Well-organized
    -   ⚠️ Some types might be duplicated between features and sections
-   **Improvement Ideas**: Audit for type duplication, create shared base types

### `/src/config` → **Configuration Files**

-   **Purpose**: Static configuration for features and components
-   **Contains**: Animation configs, carousel configs, form configs, etc.
-   **Issues**:
    -   ✅ Centralized configuration
    -   ✅ Easy to modify
-   **Improvement Ideas**: Consider environment-based configs for different environments

### `/src/data` → **Mock/Fallback Data**

-   **Purpose**: Fallback data when CMS is unavailable
-   **Issues**:
    -   ✅ Serves as fallback
    -   ⚠️ Large file (682 lines) - could be split by feature
-   **Improvement Ideas**: Split into feature-specific mock data files

### `/src/hooks` → **Custom React Hooks**

-   **Purpose**: Reusable stateful logic
-   **Issues**:
    -   ✅ Good separation
    -   ⚠️ Some hooks are feature-specific (should be in feature folders?)
-   **Improvement Ideas**: Move feature-specific hooks to feature folders

### `/src/schemas` → **Form Validation Schemas**

-   **Purpose**: Zod schemas for form validation
-   **Issues**:
    -   ✅ Clear purpose
    -   ⚠️ Could be co-located with forms that use them
-   **Improvement Ideas**: Consider moving schemas next to their forms

### `/src/styles` → **CSS Styles**

-   **Purpose**: Global and component-specific styles
-   **Issues**:
    -   ✅ Organized by component
    -   ⚠️ Mix of CSS and Tailwind - could be more consistent
-   **Improvement Ideas**: Standardize on Tailwind or CSS Modules

---

## 3. Important Files Breakdown

### **Critical Files**

#### `src/app/page.tsx` (96 lines)

-   **What it does**: Main home page that orchestrates data fetching and section rendering
-   **Why important**: Entry point for the application
-   **Pattern**: Server Component with data fetching
-   **Issues**:
    -   ✅ Clean and focused
    -   ⚠️ Could extract data fetching to a custom hook/service
-   **Size**: Appropriate

#### `src/components/section/SectionRenderer.tsx` (115 lines)

-   **What it does**: Dynamic section rendering with component mapping
-   **Why important**: Core rendering logic for all sections
-   **Pattern**: Factory/Registry Pattern
-   **Issues**:
    -   ⚠️ Hardcoded component imports (lines 14-24) - not scalable
    -   ⚠️ Uses `any` types in component mapping
    -   ⚠️ Could benefit from lazy loading
-   **Size**: Appropriate, but could be improved

#### `src/lib/sanity.ts` (37 lines)

-   **What it does**: Sanity CMS client setup and fetch wrapper
-   **Why important**: Central data access point
-   **Pattern**: Singleton/Factory
-   **Issues**:
    -   ✅ Clean and focused
    -   ⚠️ Environment variables could be validated
-   **Size**: Perfect

#### `src/lib/queries.ts` (239 lines)

-   **What it does**: GROQ queries for Sanity CMS
-   **Why important**: All data queries are defined here
-   **Pattern**: Query Repository
-   **Issues**:
    -   ✅ Centralized queries
    -   ⚠️ Large file - could be split by feature
    -   ⚠️ String interpolation in `blogPostBySlugQuery` (line 203) - potential injection risk
-   **Size**: Getting large, consider splitting

#### `src/lib/export.ts` (182 lines)

-   **What it does**: Portfolio data export functionality
-   **Why important**: Enables data export feature
-   **Pattern**: Service Pattern
-   **Issues**:
    -   ⚠️ Image URL resolution logic mixed with export logic (lines 25-79)
    -   ⚠️ Could extract image processing to separate service
-   **Size**: Appropriate, but could be split

#### `src/utils/sections/section.data-helpers.ts` (618 lines)

-   **What it does**: Data normalization and section configuration utilities
-   **Why important**: Ensures consistent data structure across sections
-   **Pattern**: Utility/Helper Pattern
-   **Issues**:
    -   ⚠️ **TOO LARGE** - This is a "God file"
    -   ⚠️ Mixes multiple concerns (normalization, configuration, data retrieval)
    -   ⚠️ Many similar functions (normalizeServicesData, normalizeSkillsData, etc.) - could use generics
-   **Size**: **Needs refactoring** - should be split into multiple files

#### `src/data/data.ts` (682 lines)

-   **What it does**: Mock/fallback data
-   **Why important**: Provides fallback when CMS is unavailable
-   **Pattern**: Data Repository
-   **Issues**:
    -   ⚠️ **TOO LARGE** - Should be split by feature
    -   ⚠️ Hard to maintain
-   **Size**: **Needs refactoring**

#### `src/components/layouts/PageChrome.tsx` (83 lines)

-   **What it does**: Shared page layout wrapper
-   **Why important**: Consistent layout across pages
-   **Pattern**: Layout Component
-   **Issues**:
    -   ✅ Clean and focused
-   **Size**: Perfect

#### `src/app/api/export/route.ts` (338 lines)

-   **What it does**: API endpoint for data export
-   **Why important**: Enables programmatic data access
-   **Pattern**: API Route Handler
-   **Issues**:
    -   ✅ Well-structured with error handling
    -   ⚠️ Could extract validation logic
-   **Size**: Appropriate

---

## 4. Dependency Mapping

### Current Dependency Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                     │
│  /app (Pages) → /components (UI) → /components/features     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                      │
│  /utils (Helpers) → /hooks (State) → /config (Settings)      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                        Data Access Layer                       │
│  /lib/sanity.ts → /lib/queries.ts → /lib/export.ts           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      External Services                         │
│  Sanity CMS API → Image CDN → Social Media APIs              │
└─────────────────────────────────────────────────────────────┘
```

### Dependency Issues

#### ✅ **Good Dependencies**

-   Pages → Components (one-way)
-   Components → Utils (one-way)
-   Utils → Lib (one-way)
-   Clear separation of concerns

#### ⚠️ **Potential Issues**

1. **Circular Dependencies**:

    - None detected, but watch for:
        - Components importing from `/utils` that import from `/components`
        - Types importing from features that import types

2. **Tight Coupling**:

    - `SectionRenderer.tsx` directly imports all feature components (hardcoded)
    - `section.data-helpers.ts` knows about all section types
    - Components directly import from `/lib` (could use a service layer)

3. **Bad Dependency Directions**:
    - ✅ Generally good - data flows down
    - ⚠️ Some utils might be too aware of component structure

### Dependency Recommendations

1. **Introduce Service Layer**:

    ```
    Components → Services → Lib → External APIs
    ```

    - Services would encapsulate business logic
    - Components wouldn't directly call `/lib`

2. **Lazy Load Section Components**:

    - Use dynamic imports in `SectionRenderer`
    - Reduces initial bundle size

3. **Extract Image Processing**:
    - Create `/services/image.service.ts`
    - Used by both export and components

---

## 5. Code Quality Score (1-10)

### Modularity: **7/10**

-   ✅ Good feature-based organization
-   ✅ Clear separation between layers
-   ⚠️ Some large files (section.data-helpers.ts, data.ts)
-   ⚠️ Some utilities are feature-specific but in global utils
-   **Improvement**: Split large files, move feature-specific code to features

### Readability: **8/10**

-   ✅ Good file organization
-   ✅ Consistent naming conventions
-   ✅ Good use of TypeScript
-   ✅ Comments and documentation in key files
-   ⚠️ Some files are too long
-   **Improvement**: Break down large files, add more inline documentation

### Separation of Concerns: **7/10**

-   ✅ Clear layer separation
-   ✅ Components focus on presentation
-   ⚠️ Some components mix business logic (data normalization)
-   ⚠️ Utils know too much about component structure
-   **Improvement**: Extract business logic to services/hooks

### Maintainability: **7/10**

-   ✅ TypeScript provides type safety
-   ✅ Consistent patterns
-   ⚠️ Large files are hard to maintain
-   ⚠️ Hardcoded component mappings
-   ⚠️ Some duplication in normalization functions
-   **Improvement**: Refactor large files, use more generics

### Scalability: **6/10**

-   ✅ Feature-based structure scales well
-   ⚠️ Hardcoded section component mapping doesn't scale
-   ⚠️ Large utility files become bottlenecks
-   ⚠️ No clear service layer for business logic
-   **Improvement**: Dynamic component loading, service layer, split utilities

### Overall Score: **7/10** (Good, with room for improvement)

---

## 6. Major Problems

### 🔴 **Critical Issues**

#### 1. **God File: `section.data-helpers.ts` (618 lines)**

-   **Problem**: Single file handling all section data normalization
-   **Impact**: Hard to maintain, test, and extend
-   **Location**: `src/utils/sections/section.data-helpers.ts`
-   **Solution**: Split into:
    -   `normalization.ts` - Generic normalization functions
    -   `section-config.ts` - Section configuration logic
    -   `section-data.ts` - Section-specific data retrieval

#### 2. **God File: `data.ts` (682 lines)**

-   **Problem**: All mock data in one file
-   **Impact**: Hard to maintain, large file
-   **Location**: `src/data/data.ts`
-   **Solution**: Split by feature:
    -   `data/profile.ts`
    -   `data/projects.ts`
    -   `data/blog.ts`
    -   etc.

#### 3. **Hardcoded Component Imports in SectionRenderer**

-   **Problem**: All section components imported statically (lines 14-24)
-   **Impact**:
    -   Large initial bundle
    -   Not scalable (must modify file to add sections)
    -   No code splitting
-   **Location**: `src/components/section/SectionRenderer.tsx`
-   **Solution**: Use dynamic imports with lazy loading

#### 4. **String Interpolation in SQL-like Query**

-   **Problem**: `blogPostBySlugQuery` uses string interpolation (line 203)
-   **Impact**: Potential injection risk (though Sanity may sanitize)
-   **Location**: `src/lib/queries.ts:202-224`
-   **Solution**: Use parameterized queries

### 🟡 **Moderate Issues**

#### 5. **Mixed Responsibilities in Components**

-   **Problem**: Some components handle data normalization
-   **Impact**: Components are harder to test and reuse
-   **Examples**:
    -   Components calling `normalize*` functions directly
-   **Solution**: Move normalization to services/hooks

#### 6. **Duplicate Normalization Logic**

-   **Problem**: Many similar functions (normalizeServicesData, normalizeSkillsData, etc.)
-   **Impact**: Code duplication, harder to maintain
-   **Location**: `src/utils/sections/section.data-helpers.ts`
-   **Solution**: Use generic functions with type parameters

#### 7. **Feature-Specific Code in Global Utils**

-   **Problem**: Utils like `blogPost.helpers.ts` are feature-specific
-   **Impact**: Utils folder becomes cluttered
-   **Solution**: Move to feature folders (`/components/features/blog/utils/`)

#### 8. **Tight Coupling to Section Structure**

-   **Problem**: `getSectionData` switch statement knows all sections
-   **Impact**: Must modify central file to add sections
-   **Location**: `src/utils/sections/section.data-helpers.ts:517-617`
-   **Solution**: Use a registry pattern or configuration-driven approach

### 🟢 **Minor Issues**

#### 9. **Inconsistent Styling Approach**

-   **Problem**: Mix of Tailwind, CSS Modules, and Styled Components
-   **Impact**: Harder to maintain consistent styling
-   **Solution**: Standardize on one approach (preferably Tailwind)

#### 10. **Large Query File**

-   **Problem**: `queries.ts` is 239 lines with all queries
-   **Impact**: Harder to find specific queries
-   **Solution**: Split by feature or resource type

#### 11. **Missing Service Layer**

-   **Problem**: Components directly call `/lib` functions
-   **Impact**: Harder to test, mock, and change implementations
-   **Solution**: Introduce service layer between components and lib

#### 12. **Type Safety Gaps**

-   **Problem**: Some `any` types in SectionRenderer and other places
-   **Impact**: Reduced type safety
-   **Solution**: Add proper types, use generics

---

## 7. Refactor Suggestions (Actionable)

### **Top 5 Most Important Improvements**

### 1. **Split `section.data-helpers.ts` into Multiple Files**

**Files to Change:**

-   `src/utils/sections/section.data-helpers.ts` → Split into:
    -   `src/utils/sections/normalization.ts` (generic normalization)
    -   `src/utils/sections/config.ts` (section configuration)
    -   `src/utils/sections/data.ts` (section data retrieval)

**Before:**

```typescript
// One 618-line file with everything
export const normalizeServicesData = (...) => {...}
export const normalizeSkillsData = (...) => {...}
export const getSectionData = (...) => {...}
export const normalizeSectionConfigData = (...) => {...}
```

**After:**

```typescript
// normalization.ts - Generic functions
export const normalizeArrayData = <T>(...) => {...}
export const normalizeProfileData = (...) => {...}

// config.ts - Configuration
export const normalizeSectionConfigData = (...) => {...}
export const getVerticalRulePosition = (...) => {...}

// data.ts - Section-specific data
export const getSectionData = (...) => {...}
```

**Impact**: High - Improves maintainability significantly

---

### 2. **Implement Dynamic Component Loading in SectionRenderer**

**Files to Change:**

-   `src/components/section/SectionRenderer.tsx`

**Before:**

```typescript
import Hero from "@/components/features/landing/Hero";
import Certificates from "@/components/features/certificate/Certificates";
// ... 10 more static imports

const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
    hero: Hero,
    certificates: Certificates,
    // ...
};
```

**After:**

```typescript
const SECTION_COMPONENTS: Record<
    string,
    () => Promise<{ default: React.ComponentType<any> }>
> = {
    hero: () => import("@/components/features/landing/Hero"),
    certificates: () =>
        import("@/components/features/certificate/Certificates"),
    // ...
};

export const renderSection = async (sectionConfig, options) => {
    const ComponentLoader = SECTION_COMPONENTS[sectionId];
    if (!ComponentLoader) return null;

    const { default: SectionComponent } = await ComponentLoader();
    // ... render
};
```

**Impact**: High - Reduces bundle size, improves scalability

---

### 3. **Split Mock Data File by Feature**

**Files to Change:**

-   `src/data/data.ts` → Split into:
    -   `src/data/profile.ts`
    -   `src/data/projects.ts`
    -   `src/data/blog.ts`
    -   `src/data/services.ts`
    -   etc.

**Before:**

```typescript
// data.ts - 682 lines
export const data: MockDataType = {
    profile: {...},
    projects: [...],
    blogs: [...],
    // ... everything
};
```

**After:**

```typescript
// data/index.ts
export * from "./profile";
export * from "./projects";
export * from "./blog";
// ...

// data/profile.ts
export const profileData = {...};

// data/projects.ts
export const projectsData = [...];
```

**Impact**: Medium - Improves maintainability

---

### 4. **Extract Image Processing to Service**

**Files to Change:**

-   Create: `src/services/image.service.ts`
-   Modify: `src/lib/export.ts` (remove image logic)
-   Modify: Components that process images

**Before:**

```typescript
// export.ts - has image processing logic
const resolveImageUrls = (data: any): any => {
    // 55 lines of image processing
};
```

**After:**

```typescript
// services/image.service.ts
export class ImageService {
    static resolveImageUrls(data: any): any {
        // Image processing logic
    }
    static urlFor(source: SanityImageSource) {
        // Image URL building
    }
}

// export.ts
import { ImageService } from "@/services/image.service";
const resolved = ImageService.resolveImageUrls(data);
```

**Impact**: Medium - Better separation of concerns

---

### 5. **Use Parameterized Queries**

**Files to Change:**

-   `src/lib/queries.ts`

**Before:**

```typescript
export const blogPostBySlugQuery = (slug: string) => `
    *[_type == "blogPost" && slug.current == "${slug}"][0] {
        // ...
    }
`;
```

**After:**

```typescript
export const blogPostBySlugQuery = `
    *[_type == "blogPost" && slug.current == $slug][0] {
        // ...
    }
`;

// Usage in sanityFetch:
sanityFetch({
    query: blogPostBySlugQuery,
    params: { slug: "my-slug" },
});
```

**Impact**: Medium - Security and best practices

---

## 8. Ideal Future Structure

### Proposed Structure

```
/src
├── app/                          # Next.js App Router
│   ├── api/                     # API routes
│   ├── blog/                    # Blog routes
│   ├── export/                  # Export page
│   └── page.tsx                 # Home page
│
├── components/                   # React Components
│   ├── features/                # Feature components
│   │   ├── blog/
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   ├── hooks/           # Feature-specific hooks
│   │   │   └── utils/           # Feature-specific utils
│   │   ├── contact/
│   │   ├── project/
│   │   └── ...
│   ├── layouts/                 # Layout components
│   ├── ui/                      # Generic UI components
│   ├── portable-text/           # Rich text components
│   ├── providers/               # Context providers
│   └── section/                 # Section rendering
│
├── lib/                          # Core Library
│   ├── sanity/                  # Sanity integration
│   │   ├── client.ts            # Sanity client
│   │   ├── queries/             # Split queries by feature
│   │   │   ├── profile.queries.ts
│   │   │   ├── blog.queries.ts
│   │   │   └── index.ts
│   │   └── schemas/              # Sanity schemas
│   ├── export.ts                # Export service
│   └── metadata.ts              # Metadata generation
│
├── services/                     # NEW: Business Logic Layer
│   ├── image.service.ts         # Image processing
│   ├── section.service.ts       # Section data logic
│   └── export.service.ts        # Export business logic
│
├── utils/                        # Pure Utility Functions
│   ├── date/                    # Date utilities
│   ├── dom/                     # DOM utilities
│   ├── social/                  # Social media utilities
│   └── validation/              # Validation utilities
│
├── hooks/                        # Shared Custom Hooks
│   └── useCopyToClipboard.ts
│
├── config/                       # Configuration
│   ├── animation.config.ts
│   ├── carousel.config.ts
│   └── ...
│
├── types/                        # TypeScript Types
│   ├── features/                # Feature types
│   ├── sections/                # Section types
│   ├── ui/                      # UI types
│   └── lib/                     # Library types
│
├── data/                         # Mock/Fallback Data
│   ├── profile.ts               # Split by feature
│   ├── projects.ts
│   ├── blog.ts
│   └── index.ts                 # Re-export all
│
└── schemas/                      # Form Validation Schemas
    ├── contactForm.schema.ts
    └── blogCommentForm.schema.ts
```

### Migration Map

| Current Location                         | New Location                                                                                                    | Reason                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `utils/sections/section.data-helpers.ts` | Split into:<br>`services/section.service.ts`<br>`utils/sections/normalization.ts`<br>`utils/sections/config.ts` | Separate concerns      |
| `lib/export.ts` (image logic)            | `services/image.service.ts`                                                                                     | Extract service        |
| `lib/queries.ts`                         | `lib/sanity/queries/*.queries.ts`                                                                               | Split by feature       |
| `data/data.ts`                           | `data/*.ts` (split by feature)                                                                                  | Better organization    |
| `utils/blog/blogPost.helpers.ts`         | `components/features/blog/utils/`                                                                               | Co-locate with feature |
| `hooks/useBlogCommentForm.ts`            | `components/features/blogItem/hooks/`                                                                           | Already correct        |
| Feature-specific hooks                   | Keep in feature folders                                                                                         | Already correct        |

### Key Improvements

1. **Service Layer**: Introduces `/services` for business logic
2. **Split Large Files**: Breaks down god files
3. **Feature Co-location**: Utils and hooks live with features
4. **Better Query Organization**: Queries split by feature
5. **Clearer Separation**: Services → Lib → External APIs

---

## Summary

### Strengths

-   ✅ Good feature-based organization
-   ✅ Strong TypeScript usage
-   ✅ Clear layer separation
-   ✅ Modern tech stack (Next.js 15, React 19)
-   ✅ Good documentation in key files

### Weaknesses

-   ⚠️ Some large files (god files)
-   ⚠️ Hardcoded component mappings
-   ⚠️ Mixed responsibilities in some components
-   ⚠️ Missing service layer
-   ⚠️ Some code duplication

### Priority Actions

1. **High**: Split `section.data-helpers.ts`
2. **High**: Implement dynamic component loading
3. **Medium**: Split mock data file
4. **Medium**: Extract image service
5. **Medium**: Use parameterized queries

### Overall Assessment

**Score: 7/10** - Good foundation with clear improvement opportunities. The codebase is well-structured but would benefit from refactoring large files and introducing a service layer for better separation of concerns.

---

**Report End**

