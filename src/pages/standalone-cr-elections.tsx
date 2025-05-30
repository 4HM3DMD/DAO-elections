import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CandidateAvatar from '@/components/CandidateAvatar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BGPattern } from '@/components/ui/bg-pattern';
import { getCandidateImageUrl } from '@/utils/candidateImages';
import { fetchCRCandidates, CRCandidate } from '@/utils/elastosApi';
import { AlertCircle } from 'lucide-react';

interface Candidate {
  code: string;
  name: string;
  location: string;
  votes: number;
  did: string;
  nickname?: string;
}

// Map of country codes to country names
const COUNTRIES: { [key: number]: string } = {
  1: 'North America',
  86: 'China',
  44: 'United Kingdom',
  61: 'Australia',
  49: 'Germany',
  81: 'Japan',
  33: 'France',
  7: 'Russia',
  65: 'Singapore',
  91: 'India',
  82: 'South Korea',
  55: 'Brazil',
  351: 'Portugal',
  31: 'Netherlands',
  41: 'Switzerland',
  34: 'Spain',
  39: 'Italy',
  420: 'Czech Republic',
  48: 'Poland',
  380: 'Ukraine',
  46: 'Sweden',
  47: 'Norway',
  45: 'Denmark',
  358: 'Finland',
  36: 'Hungary',
  30: 'Greece',
  27: 'South Africa',
  52: 'Mexico',
  64: 'New Zealand',
  852: 'Hong Kong',
  886: 'Taiwan',
  84: 'Vietnam',
  62: 'Indonesia',
  60: 'Malaysia',
  66: 'Thailand',
  63: 'Philippines',
  54: 'Argentina',
  56: 'Chile',
  57: 'Colombia',
  58: 'Venezuela',
  20: 'Egypt',
  212: 'Morocco',
  234: 'Nigeria',
  254: 'Kenya',
  503: 'El Salvador',
  972: 'Israel',
  421: 'Slovakia',
  370: 'Lithuania',
  371: 'Latvia',
  372: 'Estonia',
  373: 'Moldova',
  374: 'Armenia',
  375: 'Belarus',
  376: 'Andorra',
  377: 'Monaco',
  378: 'San Marino',
  379: 'Vatican City',
  381: 'Serbia',
  382: 'Montenegro',
  383: 'Kosovo',
  385: 'Croatia',
  386: 'Slovenia',
  387: 'Bosnia and Herzegovina',
  389: 'North Macedonia',
  679: 'Fiji',
  951: 'Myanmar',
  962: 'Jordan',
  964: 'Iraq',
  965: 'Kuwait',
  967: 'Yemen',
  968: 'Oman',
  970: 'Palestine',
  973: 'Bahrain',
  974: 'Qatar',
  975: 'Bhutan',
  976: 'Mongolia',
  977: 'Nepal',
  992: 'Tajikistan',
  993: 'Turkmenistan',
  994: 'Azerbaijan',
  995: 'Georgia',
  996: 'Kyrgyzstan',
  998: 'Uzbekistan',
  971: 'United Arab Emirates',
};

// Function to get country name from location code
const getCountryName = (locationCode: number): string => {
  return COUNTRIES[locationCode] || `Location ${locationCode}`;
};

// Timer component (now receives props)
interface ElectionTimerProps {
  timeLeft: { hours: number; minutes: number };
  isVoting: boolean;
  error: string | null;
  termInfo: any; // Consider a more specific type if possible
  loading: boolean;
}

function ElectionTimer({ timeLeft, isVoting, error, termInfo, loading }: ElectionTimerProps) {
  if (loading) {
    return (
      <div className="w-32 md:w-36 p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="text-sm text-[#94A3B8]">Loading...</div>
        <div className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">Election Status</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-32 md:w-36 p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="text-sm text-red-500">Error</div>
        <div className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1 text-center">Timer Unavailable</div>
      </div>
    );
  }

  if (!isVoting) {
    return (
      <div className="w-32 md:w-36 p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <div className="text-sm text-[#94A3B8]">
          {termInfo?.status || 'Not in voting period'}
        </div>
        <div className="text-xs text-[#94A3B8] uppercase tracking-wider mt-1">
          {termInfo?.currentTerm ? `Term ${termInfo.currentTerm}` : 'Election Status'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-32 md:w-36 p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="text-2xl font-bold text-white whitespace-nowrap">
        {timeLeft.hours}h {timeLeft.minutes}m
      </div>
      <div className="text-sm text-[#94A3B8] uppercase tracking-wider mt-1">
        {termInfo?.currentTerm ? `Term ${termInfo.currentTerm}` : 'Time Remaining'}
      </div>
    </div>
  );
}

// Utility function (moved from Timer component)
const calculateTimeFromBlocks = (blocks: number) => {
  // Each block takes approximately 2 minutes
  const totalMinutes = blocks * 2;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  return { hours, minutes };
};

// API utility functions (moved from Timer component)
const fetchTermInfo = async () => {
  try {
    console.log('Fetching term info from Cyber Republic API...');
    const response = await fetch('https://api.cyberrepublic.org/api/council/term');
    if (!response.ok) {
      throw new Error(`Failed to fetch term information: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Term info received:', data);
    return data;
  } catch (err) {
    console.error('Error fetching term info:', err);
    return null;
  }
};

const getCRRelatedStage = async () => {
  try {
    console.log('Fetching CR stage from JSON-RPC...');
    const response = await fetch('https://api.elastos.io/ela', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getcrrelatedstage",
        params: {},
        id: 1
      })
    });
    const data = await response.json();
    console.log('CR stage data received:', data);
    return data;
  } catch (err) {
    console.error('Error fetching CR stage:', err);
    return null;
  }
};

const getCurrentHeight = async () => {
  try {
    console.log('Fetching current height from JSON-RPC...');
    const response = await fetch('https://api.elastos.io/ela', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getcurrentheight",
        params: {},
        id: 1
      })
    });
    const data = await response.json();
    console.log('Current height received:', data);
    return data.result;
  } catch (err) {
    console.error('Error fetching current height:', err);
    return null;
  }
};

export default function StandaloneCRElections() {
  const [candidates, setCandidates] = useState<CRCandidate[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [errorCandidates, setErrorCandidates] = useState<string | null>(null);

  // State lifted from ElectionTimer
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });
  const [isVoting, setIsVoting] = useState(false);
  const [errorTimer, setErrorTimer] = useState<string | null>(null);
  const [termInfo, setTermInfo] = useState<any>(null);
  const [loadingTimer, setLoadingTimer] = useState(true);

  // State for block heights
  const [currentBlockHeight, setCurrentBlockHeight] = useState<number | null>(null);
  const [endBlockHeight, setEndBlockHeight] = useState<number | null>(null);

  // Combined data loading effect
  useEffect(() => {
    const loadData = async () => {
      // Load Candidates
      try {
        console.log('Fetching CR candidates data...');
        setLoadingCandidates(true);
        const data = await fetchCRCandidates();
        console.log('CR candidates data received:', data);
        const sortedCandidates = [...data].sort((a, b) => b.votes - a.votes);
        setCandidates(sortedCandidates);
        setErrorCandidates(null);
      } catch (err: any) {
        console.error('Error fetching candidates:', err);
        setErrorCandidates(err?.message || 'Failed to load candidates.');
      } finally {
        setLoadingCandidates(false);
      }

      // Load Election Stage and Height
      try {
        setLoadingTimer(true);
        const termData = await fetchTermInfo();
        if (!termData) {
          console.error('No term data received');
          setErrorTimer('Failed to fetch election status');
          return;
        }
        setTermInfo(termData);

        const stageData = await getCRRelatedStage();
        if (!stageData || !stageData.result) {
          console.error('No stage data received:', stageData);
          setErrorTimer('Failed to fetch election status');
          return;
        }
        setIsVoting(stageData.result.invoting);
        setEndBlockHeight(stageData.result.votingendheight);

        const currentHeight = await getCurrentHeight();
        if (!currentHeight) {
          console.error('No current height received');
          setErrorTimer('Failed to fetch blockchain height');
          return;
        }
        setCurrentBlockHeight(currentHeight);

        if (stageData.result.invoting && stageData.result.votingendheight && currentHeight) {
          const remainingBlocks = stageData.result.votingendheight - currentHeight;
          console.log('Remaining blocks:', remainingBlocks);
          const time = calculateTimeFromBlocks(remainingBlocks);
          setTimeLeft(time);
        } else {
          setTimeLeft({ hours: 0, minutes: 0 });
        }
        setErrorTimer(null);
      } catch (err) {
        console.error('Error fetching election data:', err);
        setErrorTimer('Failed to update election data');
      } finally {
        setLoadingTimer(false);
      }
    };

    loadData(); // Initial load
    const interval = setInterval(loadData, 120000); // Refresh every 2 minutes (120000 ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to format votes with commas and abbreviations
  const formatVotes = (votes: number) => {
    if (votes >= 1000000) {
      return (votes / 1000000).toFixed(1) + 'M';
    } else if (votes >= 1000) {
      return (votes / 1000).toFixed(1) + 'K';
    } else {
      return votes.toLocaleString();
    }
  };

  // Function to determine if a candidate is winning (top 12)
  const isWinning = (index: number) => index < 12;

  // Animation variants
  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  const overallError = errorCandidates || errorTimer;
  const overallLoading = loadingCandidates || loadingTimer;

  if (overallError) {
    return (
      <div className="container mx-auto p-6 pt-24 md:pt-28">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{overallError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E17] py-4 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto bg-[#111827] rounded-xl border border-[#1DB793]/20 shadow-2xl overflow-hidden relative"
        >
          <BGPattern variant="grid" mask="fade-edges" className="opacity-20" />
          
          <div className="relative z-10 p-3 md:p-6">
            {/* Header Section */}
            <div className="mb-6 border-b border-[#2D3549] pb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    <span className="text-[#1DB793]">Elastos DAO</span> <span className="text-white">Candidates</span>
                  </h1>
                  <p className="text-white/60 mt-1 text-sm md:text-base">
                    Council Representative candidates participating in the Elastos ecosystem governance.
                  </p>
                </div>
                <ElectionTimer 
                  timeLeft={timeLeft}
                  isVoting={isVoting}
                  error={errorTimer}
                  termInfo={termInfo}
                  loading={loadingTimer}
                />
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm">
                <div className="text-xl md:text-2xl font-bold text-white">{candidates.length || '—'}</div>
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider">Total Candidates</div>
              </div>
              
              <div className="p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm">
                <div className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">
                  {overallLoading ? '—' : formatVotes(candidates.reduce((sum, c) => sum + c.votes, 0))}
                </div>
                <div className="text-xs text-[#94A3B8] uppercase tracking-wider">Total Votes</div>
              </div>

              {isVoting && currentBlockHeight !== null && endBlockHeight !== null && (
                <div className="p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549] backdrop-blur-sm">
                   <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Current Block / End Block</div>
                  <div className="text-sm text-white whitespace-nowrap">
                    {currentBlockHeight} / {endBlockHeight}
                  </div>
                </div>
              )}
            </div>

            {/* Election Status */}
            <div className="mb-6 p-3 rounded-lg bg-[#1D2332]/80 border border-[#2D3549]">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#94A3B8]">Election Status</div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#1DB793]"></div>
                    <span className="text-sm text-[#94A3B8]">Top 12 Winning</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-sm text-[#94A3B8]">Losing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Candidate List */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={container}
              className="space-y-2"
            >
              {overallLoading ? (
                // Loading skeletons
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton 
                    key={index} 
                    className="h-16 rounded-lg bg-[#1D2332]/80"
                  />
                ))
              ) : candidates.length === 0 ? (
                <div className="text-center py-8 text-white/60">
                  No candidates found.
                </div>
              ) : (
                // Candidate cards in list format
                candidates.map((candidate, index) => (
                  <motion.div key={candidate.code} variants={item}>
                    <Card className={`bg-[#1D2332] border ${isWinning(index) ? 'border-[#1DB793]/30' : 'border-red-500/30'} shadow-sm hover:shadow-md hover:border-[#1DB793]/30 transition-all duration-300 rounded-lg overflow-hidden relative`}>
                      <BGPattern variant="grid" className="opacity-15" />
                      <CardContent className="p-0 relative z-10">
                        <div className={`h-1 w-full ${isWinning(index) ? 'bg-gradient-to-r from-[#1DB793] to-[#22C080]' : 'bg-gradient-to-r from-red-500 to-red-400'}`}></div>
                        <div className="flex items-center p-3">
                          <div className="w-8 text-center">
                            <span className={`text-sm font-bold ${isWinning(index) ? 'text-[#1DB793]' : 'text-red-500'}`}>
                              #{index + 1}
                            </span>
                          </div>
                          <CandidateAvatar candidate={candidate} className="h-10 w-10 rounded-lg flex-shrink-0" />
                          
                          <div className="ml-3 flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-white font-medium text-sm md:text-base truncate">
                                  {candidate.name || candidate.nickname || candidate.cid?.substring(0, 10) || candidate.code?.substring(0, 10)}
                                </h3>
                                <p className="text-xs text-[#94A3B8] truncate">
                                  {getCountryName(candidate.location)}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="bg-[#0A0E17]/50 py-1 px-3 rounded-full border border-[#1DB793]/10">
                                  <span className="text-[#1DB793] font-bold text-sm">
                                    {formatVotes(candidate.votes)}
                                  </span>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${isWinning(index) ? 'bg-[#1DB793]/10 text-[#1DB793]' : 'bg-red-500/10 text-red-500'}`}>
                                  {isWinning(index) ? 'Winning' : 'Losing'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 