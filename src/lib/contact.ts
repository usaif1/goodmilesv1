import { Linking } from 'react-native';

import { SUPPORT_NUMBER } from '@/data';

/**
 * Leaving the app for WhatsApp or the dialler. Each reports whether it
 * got anywhere, so the caller can fall back to a toast where nothing is
 * installed to handle it - an emulator, usually.
 */
async function open(url: string): Promise<boolean> {
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}

export const openWhatsApp = (message?: string) =>
  open(
    `https://wa.me/${SUPPORT_NUMBER}${
      message ? `?text=${encodeURIComponent(message)}` : ''
    }`,
  );

export const call = (number: string = SUPPORT_NUMBER) => open(`tel:+${number}`);

export const share = (text: string) =>
  open(`https://wa.me/?text=${encodeURIComponent(text)}`);
