interface EssentialsConnector {
  getCredentials: (params: { claims: string[] }) => Promise<any>;
  generatePresentation: (params: { claims: string[], challenge: string }) => Promise<any>;
}

interface ElastosNamespace {
  essentials: {
    connector: EssentialsConnector;
  };
}

// Extend Window interface to include Elastos
declare global {
  interface Window {
    elastos?: ElastosNamespace;
  }
}

// Get Essentials connector from window
export const getConnector = (): EssentialsConnector | null => {
  if (typeof window !== 'undefined' && window.elastos && window.elastos.essentials) {
    return window.elastos.essentials.connector;
  }
  return null;
};

// Check if Essentials wallet is available
export const isEssentialsAvailable = (): boolean => {
  return getConnector() !== null;
};

// Request DID credentials from Essentials wallet
export const requestCredentials = async (claims: string[]): Promise<any> => {
  const connector = getConnector();
  if (!connector) {
    throw new Error('Elastos Essentials is not available');
  }
  return await connector.getCredentials({ claims });
};

// Generate a presentation with the given challenge
export const generatePresentation = async (claims: string[], challenge: string): Promise<any> => {
  const connector = getConnector();
  if (!connector) {
    throw new Error('Elastos Essentials is not available');
  }
  return await connector.generatePresentation({ claims, challenge });
}; 