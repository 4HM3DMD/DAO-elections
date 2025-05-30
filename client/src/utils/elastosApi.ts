import axios from 'axios';

// Use our server proxy to avoid CORS issues
const ELA_API_PROXY_URL = '/api/proxy/elastos';

export interface CRCandidate {
  code: string;
  cid: string;
  did: string;
  nickname: string;
  name?: string; // Alias for nickname for backward compatibility
  url: string;
  location: number;
  state: string;
  votes: number; // Changed to number since we convert it
  registerheight: number;
  cancelheight: number;
  index: number;
}

interface ElastosAPIResponse {
  jsonrpc: string;
  result: {
    crcandidatesinfo: Array<Omit<CRCandidate, 'votes' | 'name'> & { votes: string }>;
    totalvotes: string;
    totalcounts: number;
  };
  id: number;
  error: any;
}

export const fetchCRCandidates = async (): Promise<CRCandidate[]> => {
  try {
    console.log('Fetching CR candidates from proxy...');
    
    const response = await axios.post<ElastosAPIResponse>(ELA_API_PROXY_URL, {
      jsonrpc: '2.0',
      method: 'listcrcandidates',
      params: {
        state: "all"
      },
      id: Date.now()
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.error) {
      console.error('API error:', response.data.error);
      throw new Error(response.data.error.message || 'Error fetching CR candidates');
    }

    // Check if response has the expected structure
    if (!response.data.result?.crcandidatesinfo) {
      console.error('Unexpected API response:', response.data);
      throw new Error('Invalid API response structure');
    }

    // Map nicknames to name property for backward compatibility
    const candidates = response.data.result.crcandidatesinfo.map(candidate => ({
      ...candidate,
      name: candidate.nickname,
      // Convert votes to number for easier handling
      votes: parseFloat(candidate.votes)
    }));

    console.log('Processed candidates:', candidates);
    return candidates;
  } catch (error: any) {
    console.error('Error fetching CR candidates:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
}; 