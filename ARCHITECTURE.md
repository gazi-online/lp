# 🏛 Technical Architecture - Gazi Online

## 🗺️ System Flow

```mermaid
graph TD
    User((User))
    Home[Home Page / Hero]
    Bento[Service Bento Grid]
    Modal[PAN Application Modal]
    Track[Status Tracking Page]
    
    User --> Home
    Home -->|Click CTA| Modal
    Home -->|Scroll| Bento
    Home -->|Navigation| Track
    
    Bento -->|Click Service| Modal
    Modal -->|Submit| Success[Success Message]
    Track -->|Input ID| Status[Status Timeline]
```

## 🎨 Design Tokens

| Token | Value | Hex |
|-------|-------|-----|
| Navy 900 | Deep Authority | #0A1045 |
| Emerald 500 | Action/Success | #00E676 |
| Glass White | Frosted Surface | rgba(255, 255, 255, 0.85) |

## 🏗️ Folder Structure

- `src/app`: Routes and Page layouts (Next.js 14).
- `src/components`: Reusable UI components (Hero, Bento Grid, Workflow).
- `src/lib`: Utilities (Logger).
- `public`: Static assets (Logos, OG Images).
