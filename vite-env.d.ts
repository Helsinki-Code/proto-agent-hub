/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 * 
 * This file tells TypeScript about all the environment variables
 * that Vite makes available through import.meta.env
 * 
 * Remember: Only variables prefixed with VITE_ are available in the browser!
 */

interface ImportMetaEnv {
  // App Configuration
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly VITE_API_URL: string

  // Company Information
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_COMPANY_PHONE: string
  readonly VITE_COMPANY_ADDRESS: string

  // EmailJS Configuration (your existing setup)
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_EMAILJS_ACK_TEMPLATE_ID: string
  readonly VITE_EMAILJS_USER_ID: string
  readonly VITE_EMAILJS_ACCESS_TOKEN: string

  // Supabase Configuration
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_SERVICE_ROLE_KEY: string

  // CloudFlare Analytics (optional - for when you set them up)
  readonly VITE_CLOUDFLARE_ZONE_ID?: string
  readonly VITE_CLOUDFLARE_ACCOUNT_ID?: string
  readonly VITE_CLOUDFLARE_API_TOKEN?: string
  readonly VITE_CLOUDFLARE_EMAIL?: string
  readonly VITE_CLOUDFLARE_API_KEY?: string

  // Admin Configuration
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_ADMIN_USERNAME: string
  readonly VITE_ADMIN_PASSWORD: string
  readonly VITE_ADMIN_PORTAL_URL?: string

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_REAL_TIME?: string
  readonly VITE_ENABLE_NOTIFICATIONS?: string
  readonly VITE_DEBUG_MODE?: string
  readonly VITE_SECURE_MODE?: string

  // SEO & Social Media
  readonly VITE_SITE_TITLE?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_SITE_KEYWORDS?: string
  readonly VITE_SOCIAL_IMAGE?: string
  readonly VITE_TWITTER_HANDLE?: string

  // Build Configuration
  readonly VITE_BUILD_TARGET?: string
  readonly VITE_BUILD_OUTPUT_DIR?: string
  readonly VITE_BUILD_ASSETS_DIR?: string
  readonly VITE_BUILD_PUBLIC_PATH?: string

  // Standard Vite environment variables
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  readonly SSR: boolean

  // Node environment (this one's special - it's always available)
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * Additional type declarations for better development experience
 */

// Make sure React types are available
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.ico' {
  const src: string
  export default src
}

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

// Global type augmentations for better DX
declare global {
  interface Window {
    // Add any global window properties you might use
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

// This ensures the file is treated as a module
export {}