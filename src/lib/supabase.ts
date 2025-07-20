import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database Types
export interface AdminUser {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  role: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  category_id?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  published_at?: string;
  views_count: number;
  reading_time?: number;
  created_at: string;
  updated_at: string;
  category?: BlogCategory;
  author?: AdminUser;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  posts_count: number;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'ebook' | 'whitepaper' | 'guide' | 'template' | 'case_study';
  file_url?: string;
  file_size?: number;
  file_type?: string;
  thumbnail_url?: string;
  category?: string;
  tags?: string[];
  download_count: number;
  is_featured: boolean;
  is_public: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
  author?: AdminUser;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  full_description?: string;
  features?: any;
  pricing?: any;
  icon?: string;
  category?: string;
  is_featured: boolean;
  is_active: boolean;
  order_index: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export interface UseCase {
  id: string;
  title: string;
  slug: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: any;
  metrics?: any;
  client_name?: string;
  client_logo?: string;
  featured_image?: string;
  tags?: string[];
  is_featured: boolean;
  is_published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_name: string;
  page_slug: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  seo_keywords?: string[];
  is_published: boolean;
  last_modified_by: string;
  created_at: string;
  updated_at: string;
  last_modified_user?: AdminUser;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  assigned_to?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
  assigned_user?: AdminUser;
}

// Authentication helpers
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Database helpers
export const getBlogPosts = async (filters?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) => {
  let query = supabase
    .from('blog_posts')
    .select(`
      *,
      category:blog_categories(*),
      author:admin_users(username, email)
    `)
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  
  if (filters?.category) {
    query = query.eq('category_id', filters.category);
  }
  
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  return await query;
};

export const getResources = async (filters?: {
  type?: string;
  category?: string;
  is_featured?: boolean;
  limit?: number;
}) => {
  let query = supabase
    .from('resources')
    .select(`
      *,
      author:admin_users(username, email)
    `)
    .order('created_at', { ascending: false });

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }
  
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  return await query;
};

export const getServices = async (filters?: {
  is_active?: boolean;
  is_featured?: boolean;
  category?: string;
}) => {
  let query = supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });

  if (filters?.is_active !== undefined) {
    query = query.eq('is_active', filters.is_active);
  }
  
  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  return await query;
};

export const getUseCases = async (filters?: {
  is_published?: boolean;
  is_featured?: boolean;
  industry?: string;
}) => {
  let query = supabase
    .from('use_cases')
    .select('*')
    .order('order_index', { ascending: true });

  if (filters?.is_published !== undefined) {
    query = query.eq('is_published', filters.is_published);
  }
  
  if (filters?.is_featured !== undefined) {
    query = query.eq('is_featured', filters.is_featured);
  }
  
  if (filters?.industry) {
    query = query.eq('industry', filters.industry);
  }

  return await query;
};

// Real-time subscriptions
export const subscribeToTable = (table: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`${table}_changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: table,
      },
      callback
    )
    .subscribe();
};

// Analytics tracking
export const trackPageView = async (pagePath: string, additionalData?: any) => {
  const { error } = await supabase
    .from('analytics_data')
    .insert({
      page_path: pagePath,
      event_type: 'page_view',
      event_data: additionalData,
      session_id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    });
    
  if (error) {
    console.error('Error tracking page view:', error);
  }
};

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
  source?: string;
}) => {
  return await supabase
    .from('contact_submissions')
    .insert({
      ...formData,
      status: 'new',
      created_at: new Date().toISOString(),
    });
};

export default supabase;