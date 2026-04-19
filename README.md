# M&M Fence Quote App

A mobile quoting app built for **M&M Fence & Deck** — a fencing and decking business — to create, manage, and export professional customer quotes in the field.

Built with React Native and Expo.

---

## Overview

Field reps use this app to build detailed quotes on-site, attach reference photos, sketch a layout drawing, and share a polished PDF with the customer — all from their phone or tablet.

---

## Features

- **Quote Management** — Create, edit, duplicate, and delete quotes with full customer and project details
- **Fence & Gate Segments** — Dynamically add multiple fence and gate line items per quote (material, style, height, length, price)
- **Layout Drawing Board** — Freehand canvas powered by Skia with multi-color support, stroke control, eraser, grid overlay, and undo/redo
- **Reference Photos** — Attach job-site photos via camera or photo library
- **PDF Export** — Generate and share a branded PDF quote with company logo, itemized tables, and payment details
- **Search & Sort** — Find and organize saved quotes by name, date, or other fields
- **Offline-First** — All data stored locally on-device with no internet required

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.74 + Expo 51 |
| Language | TypeScript |
| Navigation | React Navigation (native stack) |
| State Management | Zustand |
| Local Storage | AsyncStorage |
| Drawing Canvas | Shopify React Native Skia |
| PDF Generation | expo-print + expo-sharing |
| Camera / Photos | expo-image-picker, expo-media-library |
| Animations | React Native Reanimated |

---

## App Structure

```
app/
├── screens/
│   ├── HomeScreen.tsx        # Quote list with search and sort
│   ├── QuoteFormScreen.tsx   # Full quote builder form
│   └── DrawingScreen.tsx     # Interactive layout drawing canvas
├── components/               # Reusable UI components
├── store/                    # Zustand stores (quotes, drawing)
├── pdf/                      # HTML-to-PDF quote template
├── utils/                    # Theme, formatting, responsive helpers
└── types/                    # TypeScript type definitions
```

---

## Platform

Targets **iOS** and **Android**. Responsive layout adapts between phone and tablet, with two-column form layout in tablet landscape mode.

---

## About

Built by [Oliver Niga](https://github.com/oliverniga) for M&M Fence & Deck.
