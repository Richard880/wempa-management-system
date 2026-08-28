import { z } from 'zod';

export const generalSettingsSchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  acronym: z.string().min(2, 'Acronym must be at least 2 characters').toUpperCase(),
  supportEmail: z.string().email('Please enter a valid support email address'),
  contactPhone: z.string().min(6, 'Please enter a valid contact phone number'),
  fiscalYearStart: z.string().min(1, 'Fiscal year start month is required'),
  timezone: z.string().min(1, 'System timezone is required'),
  currency: z.string().min(1, 'Default currency is required'),
  maintenanceMode: z.boolean().default(false),
  defaultTheme: z.enum(['light', 'dark']).default('light') // Added theme validation rule
});

export const DEFAULT_GENERAL_SETTINGS = {
  organizationName: 'Western Maritime Employers & Professionals Association',
  acronym: 'WEMPA',
  supportEmail: 'support@wempa.org',
  contactPhone: '+1 (555) 019-2834',
  fiscalYearStart: 'January',
  timezone: 'UTC',
  currency: 'USD',
  maintenanceMode: false,
  defaultTheme: 'light' // Default theme setting
};
