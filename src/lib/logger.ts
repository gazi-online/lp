/**
 * Simple Logger for Production Monitoring
 * In a real-world scenario, this would integrate with Sentry or LogRocket.
 */
export const logger = {
  error: (message: string, error?: any) => {
    console.error(`[GaziOnline Error]: ${message}`, error);
    // TODO: Send to external monitoring service
  },
  info: (message: string) => {
    console.log(`[GaziOnline Info]: ${message}`);
  },
  trackEvent: (eventName: string, metadata?: any) => {
    console.log(`[GaziOnline Event]: ${eventName}`, metadata);
  }
};
