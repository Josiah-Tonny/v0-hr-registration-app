# UI/UX Design System & Component Guide

A comprehensive guide to the design system, component usage, and styling conventions used throughout the NGK HR application.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Component Patterns](#component-patterns)
6. [Interactions & Animations](#interactions--animations)
7. [Best Practices](#best-practices)

---

## Design Philosophy

The NGK HR system is designed with a **professional, polished aesthetic** that avoids common AI-generated design patterns. Instead, it emphasizes:

- **Subtle refinement**: Soft shadows, transparent layers, gentle animations
- **Meaningful hierarchy**: Clear visual distinction between primary, secondary, tertiary elements
- **Intentional spacing**: Generous whitespace that creates breathing room
- **Professional typography**: Carefully weighted fonts with proper line heights
- **User feedback**: Clear, non-intrusive responses to user actions
- **Human-crafted details**: Thoughtful micro-interactions and transitions

### Key Design Principles

1. **Less is More**: Avoid visual clutter; use whitespace effectively
2. **Consistency**: Maintain consistent patterns across all pages
3. **Accessibility**: Ensure sufficient contrast and clear focus states
4. **Performance**: Optimize animations to 60fps
5. **Responsive**: Mobile-first design that scales elegantly

---

## Color System

### Dark Theme Palette

The application uses a carefully curated dark theme inspired by professional enterprise software.

```css
/* Backgrounds */
--background: 220 20% 8%;      /* Deep slate #0f172a */
--card: 220 20% 13%;           /* Card background #1a2332 */
--secondary: 220 18% 20%;      /* Secondary bg #273347 */

/* Text */
--foreground: 220 8% 98%;      /* Primary text #faf9f7 */
--muted-foreground: 220 8% 72%;/* Secondary text #a8b2c4 */

/* Interactive */
--accent: 220 90% 56%;         /* Primary blue #3b82f6 */
--accent-secondary: 264 90% 60%;/* Purple accent #a78bfa */
--destructive: 0 84.2% 60.2%; /* Red for danger #ef4444 */

/* Borders */
--border: 220 18% 18%;         /* Border color */
--input: 220 18% 18%;          /* Input background */
```

### Usage Guidelines

**Primary Actions**: Use `--accent` (blue)
```html
<Button className="bg-accent hover:bg-accent/90 text-white">
  Primary Action
</Button>
```

**Secondary Actions**: Use `variant="outline"`
```html
<Button variant="outline" className="border-border/50">
  Secondary Action
</Button>
```

**Destructive Actions**: Use `variant="destructive"`
```html
<Button variant="destructive">
  Delete
</Button>
```

**Text**: Use semantic classes
```html
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
```

---

## Typography

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Why Inter?**
- Highly legible at all sizes
- Professional appearance
- Excellent letter spacing
- Works well on all devices

### Type Scale

```
Display:  3xl (30px) - font-700 - Main page titles
Headline: 2xl (24px) - font-700 - Section headers
Title:    lg (18px)  - font-600 - Card titles
Body:     base (16px) - font-400 - Regular text
Label:    sm (14px)  - font-500 - Form labels
Hint:     xs (12px)  - font-400 - Helper text
```

### Line Heights

```
Headings: 1.2 (tight)      - Dense, powerful
Body:     1.6 (relaxed)    - Easy to read
Labels:   1.4 (moderate)   - Clear distinction
```

### Weight Usage

- **700 (Bold)**: Headings, strong emphasis
- **600 (Semibold)**: Subheadings, active states
- **500 (Medium)**: Labels, buttons, emphasis
- **400 (Regular)**: Body text, descriptions

### Typography Examples

```jsx
// Page Title
<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

// Section Title
<h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>

// Body Text
<p className="text-base text-foreground leading-relaxed">
  Description and context information here.
</p>

// Secondary Text
<p className="text-sm text-muted-foreground">
  Additional information or hints.
</p>
```

---

## Spacing & Layout

### Spacing Scale

Based on multiples of 4px (Tailwind's default):

```
xs: 0.5rem (8px)    - Tight spacing
sm: 1rem   (16px)   - Default spacing
md: 1.5rem (24px)   - Moderate spacing
lg: 2rem   (32px)   - Generous spacing
xl: 3rem   (48px)   - Extra spacing
```

### Container Padding

```
Page: px-8 py-8      - 32px padding
Card: p-6            - 24px padding
Section: p-4 or p-6  - 16-24px padding
```

### Gap Usage

```
Tight items:    gap-2 (8px)
Default items:  gap-3 (12px) or gap-4 (16px)
Sections:       gap-6 (24px) or gap-8 (32px)
```

### Layout Patterns

**Flex Container**:
```jsx
<div className="flex items-center justify-between gap-4">
  {/* Content */}
</div>
```

**Grid Container**:
```jsx
<div className="grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1">
  {/* Items */}
</div>
```

**Stack Vertically**:
```jsx
<div className="space-y-4">
  {/* Items */}
</div>
```

---

## Component Patterns

### Card Component

```jsx
<Card className="p-6 bg-card/60 border border-border/40 rounded-xl hover:bg-card/80 hover:border-border/60 transition-all duration-250">
  <h2 className="text-lg font-semibold text-foreground mb-4">
    Card Title
  </h2>
  {/* Content */}
</Card>
```

**Styling Notes**:
- Use `bg-card/60` for subtle transparency
- Border opacity `border-border/40` for subtle definition
- Hover state lifts card slightly with `duration-250`
- Rounded corners at `rounded-xl` (12px)

### Button Patterns

**Primary Button**:
```jsx
<Button className="bg-gradient-to-r from-accent via-accent to-[hsl(var(--accent-secondary))] hover:from-accent/90 hover:via-accent/90 hover:to-[hsl(var(--accent-secondary))/90] text-white rounded-lg">
  Primary Action
</Button>
```

**Secondary Button**:
```jsx
<Button variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
  Secondary Action
</Button>
```

**Ghost Button**:
```jsx
<Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg">
  Tertiary Action
</Button>
```

### Input Patterns

**Standard Input**:
```jsx
<Input 
  type="text"
  placeholder="Enter text..." 
  className="h-10 bg-secondary/40 border border-border/40 rounded-lg focus:border-accent/60 focus:bg-secondary/50 focus:ring-0 transition-all duration-200"
/>
```

**Input with Icon**:
```jsx
<div className="relative group">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
  <Input 
    className="pl-10 ..."
  />
</div>
```

### Badge/Pill Patterns

**Status Pill**:
```jsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-500">
  <div className="w-2 h-2 rounded-full bg-emerald-400" />
  Active
</div>
```

### List Item Patterns

**Table Row Hover**:
```jsx
<tr className="border-b border-border/30 hover:bg-secondary/30 transition-colors duration-150">
  {/* Cells */}
</tr>
```

**List Item**:
```jsx
<div className="flex items-center justify-between p-4 border border-border/30 bg-secondary/20 hover:bg-secondary/40 rounded-lg transition-colors duration-200">
  {/* Content */}
</div>
```

---

## Interactions & Animations

### Transition Durations

```css
/* Standard transitions */
duration-150  /* Quick feedback (150ms) */
duration-200  /* Default interaction (200ms) */
duration-250  /* Card hover (250ms) */
duration-300  /* Page transitions (300ms) */
```

### Easing Functions

Default easing (ease-out) is used for most interactions, providing natural deceleration.

### Hover States

All interactive elements should have clear hover states:

```jsx
/* Button Hover */
className="hover:bg-secondary/50 transition-colors duration-200"

/* Card Hover */
className="hover:border-border/60 hover:bg-card/80 transition-all duration-250"

/* Icon Hover */
className="hover:text-foreground transition-colors"
```

### Focus States

Ensure keyboard navigation is visible:

```jsx
className="focus:outline-none focus:ring-2 focus:ring-accent/50"
```

### Loading States

Show clear loading feedback:

```jsx
<Button disabled className="opacity-50 cursor-not-allowed">
  <Loader className="animate-spin mr-2" />
  Loading...
</Button>
```

---

## Best Practices

### 1. Color Contrast

Always ensure WCAG AA contrast ratios:
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: Clearly distinguishable

**Test**: Use tools like WebAIM Contrast Checker

### 2. Spacing

- Use the spacing scale consistently
- Avoid arbitrary pixel values (no `p-[17px]`)
- Create breathing room with whitespace
- Group related items with consistent gaps

### 3. Typography

- Maximum line length: 70-80 characters
- Always use `text-balance` or `text-pretty` for headings
- Maintain proper line heights for readability
- Limit fonts to 2 max (we use Inter)

### 4. Icons

- Use Lucide React consistently
- Standard sizes: 16px (sm), 20px (md), 24px (lg)
- Match icon weight to text weight
- Add accessible labels: `aria-label` or adjacent text

### 5. Form Design

- Labels above inputs (not placeholder text)
- Clear error messages in red
- Success feedback in green
- Disabled states with `opacity-50`
- Focus visible on all inputs

### 6. Mobile Responsiveness

- Design mobile-first
- Test on: 320px (phone), 768px (tablet), 1024px+ (desktop)
- Use responsive prefixes: `sm:`, `md:`, `lg:`
- Ensure touch targets are 48px minimum

### 7. Accessibility

- Use semantic HTML (`button`, `input`, `label`)
- Add `aria-label` to icon-only buttons
- Ensure color isn't sole indicator
- Maintain focus order that matches visual layout
- Test with keyboard navigation only

### 8. Performance

- Minimize layout shifts (use fixed sizes)
- Lazy load images below fold
- Optimize animations to 60fps
- Avoid large shadows on many elements

---

## Common Pitfalls to Avoid

❌ **Don't**: Use arbitrary pixel values
```jsx
// Bad
className="p-[17px] gap-[13px]"

// Good
className="p-4 gap-3"
```

❌ **Don't**: Mix styles with no clear hierarchy
```jsx
// Bad - No clear visual distinction
<h1 className="text-base">Title</h1>

// Good - Clear hierarchy
<h1 className="text-3xl font-bold">Title</h1>
```

❌ **Don't**: Overuse gradients
```jsx
// Bad - Every element has gradient
className="bg-gradient-to-r from-accent to-secondary"

// Good - Gradients for emphasis only
className="bg-accent"
```

❌ **Don't**: Skip hover states
```jsx
// Bad - No feedback
<Button>Click me</Button>

// Good - Clear feedback
<Button className="hover:bg-secondary/50 transition-colors">
  Click me
</Button>
```

❌ **Don't**: Forget accessibility
```jsx
// Bad - Icon only, no label
<Button><Bell /></Button>

// Good - Clear intent
<Button title="Notifications" aria-label="Open notifications">
  <Bell className="w-4 h-4" />
</Button>
```

---

## Component Implementation Checklist

When creating new components, ensure:

- [ ] Proper TypeScript typing
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Keyboard navigation support
- [ ] WCAG AA contrast compliance
- [ ] Clear hover/focus states
- [ ] Proper spacing and alignment
- [ ] Semantic HTML structure
- [ ] Documented usage examples
- [ ] Accessibility attributes
- [ ] Error boundary handling

---

## Resources

- **Design Tokens**: `app/globals.css` - Contains all CSS custom properties
- **Component Library**: `components/` - All reusable components
- **Constants**: `lib/constants.ts` - System-wide configurations
- **Tailwind Config**: `tailwind.config.ts` - Tailwind customization

---

**Last Updated**: February 2025  
**Maintained By**: Design System Team  
**Status**: Active Documentation
