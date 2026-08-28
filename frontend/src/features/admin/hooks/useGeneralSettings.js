import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form'; // Added useWatch to listen for changes
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsService } from '../services/settingsService';
import { generalSettingsSchema, DEFAULT_GENERAL_SETTINGS } from '../constants/settingsConfig';

export const useGeneralSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const formMethods = useForm({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: DEFAULT_GENERAL_SETTINGS
  });

  const { reset, control } = formMethods;

  // Real-time listener that watches the selected theme field in the form
  const selectedTheme = useWatch({ control, name: 'defaultTheme' });

  // Update Bootstrap 5 data attribute dynamically in real-time as the form value shifts
  useEffect(() => {
    if (selectedTheme) {
      document.documentElement.setAttribute('data-bs-theme', selectedTheme);
    }
  }, [selectedTheme]);

  useEffect(() => {
    let isMounted = true;
    
    async function loadSettings() {
      try {
        setLoading(true);
        const data = await settingsService.getGeneralSettings();
        if (isMounted) {
          if (data) {
            reset(data);
          } else {
            reset(DEFAULT_GENERAL_SETTINGS);
          }
        }
      } catch (err) {
        if (isMounted) setError('Failed to retrieve configuration profiles.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadSettings();
    return () => { isMounted = false; };
  }, [reset]);

  const onFormSubmit = async (data) => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage('');
      
      await settingsService.updateGeneralSettings(data);
      setSuccessMessage('General system settings updated successfully.');
      reset(data);
    } catch (err) {
      setError('Failed to securely preserve settings updates.');
    } finally {
      setSaving(false);
    }
  };

  return {
    formMethods,
    loading,
    saving,
    error,
    successMessage,
    onSubmit: formMethods.handleSubmit(onFormSubmit),
    clearMessages: () => {
      setError(null);
      setSuccessMessage('');
    }
  };
};
