import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// Function to get initials from name
const getInitials = (name: string): string => {
  if (!name) return '?';
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Component props
interface CandidateAvatarProps {
  candidate: {
    name?: string;
    nickname?: string;
    did?: string;
    code?: string;
  };
  className?: string;
}

// Images for each candidate - using image paths with correct file extensions
const CANDIDATE_IMAGES: Record<string, string> = {
  // Using DID as the key for reliable mapping
  'ifXWYjb3Y5vnehs6UDBjwKjfm5YpeWaPUY': '/images/candidates/4hm3d.jpg', // Bitcoin B sculpture
  'iiSNfpdmXmr4zsLD8iKdq38sfSuqccXGU1': '/images/candidates/strawberry.jpeg', // Strawberry logo with triangle
  'ioz23ma44KbHjDuYAuLbK1Pu2sJfth8vrx': '/images/candidates/igor.jpg', // Pixelated person
  'iiF9hYDibTg9V2iQEHhrqCtxeUnt1irmBh': '/images/candidates/tyro.jpg', // Elastos purple logo
  'iWHbp1TeN7p9pUWKRotkkyC3Cm2cnmrpXS': '/images/candidates/gelaxy.png', // Purple 'e' logo
  'ibpfVpaFxEk2d3S8EjR21RFEFrCU9mggGb': '/images/candidates/jimmy.jpg', // Elephant with hat
  'if2F3BWJYjWMFBc9gp8TMqbiKCBiWaLzUX': '/images/candidates/chen2rong2.jpg', // chen2rong2
  'iYTzTqVc77HH4ca3LTGCZvPt1kP7uobmKQ': '/images/candidates/ihl.jpg', // ihl
  'icaVPz8nY7Y7LKjpJxmzWxCG5F3CEV6hnt': '/images/candidates/rebecca-zhu.jpg', // Rebecca Zhu
  'inpCykPj1JMroJfjFvDAGnEGUCGGG3ptwQ': '/images/candidates/elacity.jpg', // Sash | Elacity 🐘
  'ifD9rGRZiZbvLymMbzW8pZe7nwx8AHePcX': '/images/candidates/z.jpg', // Z
  'iYL4FL5XEN2KSHXDQ21gKPXYXY25n5sMho': '/images/candidates/nbw-team.jpg', // NBW Team
  'iV3RrXcQEmAqg1HyhDW8BgcaW2WUwmuQLC': '/images/candidates/everlastingos.jpg' // EverlastingOS
};

// Nickname to DID mapping to help with lookups
const NICKNAME_TO_DID: Record<string, string> = {
  '4HM3D': 'ifXWYjb3Y5vnehs6UDBjwKjfm5YpeWaPUY',
  'Strawberry Republic': 'iiSNfpdmXmr4zsLD8iKdq38sfSuqccXGU1',
  'Igor (Iggispopis)': 'ioz23ma44KbHjDuYAuLbK1Pu2sJfth8vrx',
  'Tyro again': 'iiF9hYDibTg9V2iQEHhrqCtxeUnt1irmBh',
  'gelaxy': 'iWHbp1TeN7p9pUWKRotkkyC3Cm2cnmrpXS',
  'Jimmy': 'ibpfVpaFxEk2d3S8EjR21RFEFrCU9mggGb',
  'chen2rong2': 'if2F3BWJYjWMFBc9gp8TMqbiKCBiWaLzUX',
  'ihl': 'iYTzTqVc77HH4ca3LTGCZvPt1kP7uobmKQ',
  'Rebecca Zhu': 'icaVPz8nY7Y7LKjpJxmzWxCG5F3CEV6hnt',
  'Sash | Elacity 🐘': 'inpCykPj1JMroJfjFvDAGnEGUCGGG3ptwQ',
  'Z': 'ifD9rGRZiZbvLymMbzW8pZe7nwx8AHePcX',
  'NBW Team': 'iYL4FL5XEN2KSHXDQ21gKPXYXY25n5sMho',
  'EverlastingOS': 'iV3RrXcQEmAqg1HyhDW8BgcaW2WUwmuQLC'
};

export default function CandidateAvatar({ candidate, className = "" }: CandidateAvatarProps) {
  // Try to find image by DID first
  let imageUrl: string | undefined;
  
  if (candidate.did && CANDIDATE_IMAGES[candidate.did]) {
    imageUrl = CANDIDATE_IMAGES[candidate.did];
  } 
  // If no image by DID, try by nickname
  else if (candidate.nickname && NICKNAME_TO_DID[candidate.nickname]) {
    const did = NICKNAME_TO_DID[candidate.nickname];
    imageUrl = CANDIDATE_IMAGES[did];
  }
  // If no image by name, try by name
  else if (candidate.name && NICKNAME_TO_DID[candidate.name]) {
    const did = NICKNAME_TO_DID[candidate.name];
    imageUrl = CANDIDATE_IMAGES[did];
  }

  // Get initials for fallback
  const displayName = candidate.name || candidate.nickname || '';
  const initials = getInitials(displayName);
  
  // Apply colors based on did to ensure consistency
  const getColorClass = (did?: string) => {
    if (!did) return 'bg-[#1DB793]/10 text-[#1DB793]';
    
    const colorMap: Record<string, string> = {
      'ifXWYjb3Y5vnehs6UDBjwKjfm5YpeWaPUY': 'bg-[#EC5546]/10 text-[#EC5546]',
      'iiSNfpdmXmr4zsLD8iKdq38sfSuqccXGU1': 'bg-[#E83E8C]/10 text-[#E83E8C]',
      'ioz23ma44KbHjDuYAuLbK1Pu2sJfth8vrx': 'bg-[#5572EC]/10 text-[#5572EC]',
      'iiF9hYDibTg9V2iQEHhrqCtxeUnt1irmBh': 'bg-[#4CAF50]/10 text-[#4CAF50]',
      'iWHbp1TeN7p9pUWKRotkkyC3Cm2cnmrpXS': 'bg-[#9C27B0]/10 text-[#9C27B0]',
      'ibpfVpaFxEk2d3S8EjR21RFEFrCU9mggGb': 'bg-[#FF9800]/10 text-[#FF9800]',
      'if2F3BWJYjWMFBc9gp8TMqbiKCBiWaLzUX': 'bg-[#00BCD4]/10 text-[#00BCD4]',
      'iYTzTqVc77HH4ca3LTGCZvPt1kP7uobmKQ': 'bg-[#FF5722]/10 text-[#FF5722]',
      'icaVPz8nY7Y7LKjpJxmzWxCG5F3CEV6hnt': 'bg-[#673AB7]/10 text-[#673AB7]',
      'inpCykPj1JMroJfjFvDAGnEGUCGGG3ptwQ': 'bg-[#009688]/10 text-[#009688]',
      'ifD9rGRZiZbvLymMbzW8pZe7nwx8AHePcX': 'bg-[#795548]/10 text-[#795548]',
      'iYL4FL5XEN2KSHXDQ21gKPXYXY25n5sMho': 'bg-[#607D8B]/10 text-[#607D8B]'
    };
    
    return colorMap[did] || 'bg-[#1DB793]/10 text-[#1DB793]';
  };

  return (
    <Avatar className={`${className} border-2 border-[#1DB793]/30 rounded-full overflow-hidden`}>
      {imageUrl ? (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} 
        />
      ) : (
        <AvatarFallback className={getColorClass(candidate.did)}>
          {initials}
        </AvatarFallback>
      )}
    </Avatar>
  );
} 