// Map of candidate identifiers to their image paths
// Key is either the candidate's nickname, DID, or code (in order of preference)

interface CandidateImageMap {
  [key: string]: string;
}

// Main mapping of candidates to their image paths
export const candidateImages: CandidateImageMap = {
  // By nickname
  "Igor (Iggispopis)": "/images/candidates/igor.jpg",
  "Strawberry Republic": "/images/candidates/strawberry.jpeg",
  "Tyro again": "/images/candidates/tyro.jpg",
  "gelaxy": "/images/candidates/gelaxy.png",
  "Jimmy": "/images/candidates/jimmy.jpg",
  "4HM3D": "/images/candidates/4hm3d.jpg",
  "chen2rong2": "/images/candidates/chen2rong2.jpg",
  "ihl": "/images/candidates/ihl.jpg",
  "Rebecca Zhu": "/images/candidates/rebecca-zhu.jpg",
  "Sash | Elacity 🐘": "/images/candidates/elacity.jpg",
  "Z": "/images/candidates/z.jpg",
  "NBW Team": "/images/candidates/nbw-team.jpg",
  
  // Fallbacks by DID
  "iiSNfpdmXmr4zsLD8iKdq38sfSuqccXGU1": "/images/candidates/strawberry.jpeg", // Strawberry Republic
  "ioz23ma44KbHjDuYAuLbK1Pu2sJfth8vrx": "/images/candidates/igor.jpg", // Igor
  "iiF9hYDibTg9V2iQEHhrqCtxeUnt1irmBh": "/images/candidates/tyro.jpg", // Tyro
  "iWHbp1TeN7p9pUWKRotkkyC3Cm2cnmrpXS": "/images/candidates/gelaxy.png", // gelaxy
  "ibpfVpaFxEk2d3S8EjR21RFEFrCU9mggGb": "/images/candidates/jimmy.jpg", // Jimmy
  "ifXWYjb3Y5vnehs6UDBjwKjfm5YpeWaPUY": "/images/candidates/4hm3d.jpg", // 4HM3D
  "if2F3BWJYjWMFBc9gp8TMqbiKCBiWaLzUX": "/images/candidates/chen2rong2.jpg", // chen2rong2
  "iYTzTqVc77HH4ca3LTGCZvPt1kP7uobmKQ": "/images/candidates/ihl.jpg", // ihl
  "icaVPz8nY7Y7LKjpJxmzWxCG5F3CEV6hnt": "/images/candidates/rebecca-zhu.jpg", // Rebecca Zhu
  "inpCykPj1JMroJfjFvDAGnEGUCGGG3ptwQ": "/images/candidates/elacity.jpg", // Sash | Elacity 🐘
  "ifD9rGRZiZbvLymMbzW8pZe7nwx8AHePcX": "/images/candidates/z.jpg", // Z
  "iYL4FL5XEN2KSHXDQ21gKPXYXY25n5sMho": "/images/candidates/nbw-team.jpg" // NBW Team
};

/**
 * Get the candidate image URL for a given candidate
 * @param candidate The candidate object with name, nickname, did, and code properties
 * @returns The URL of the candidate's image or undefined if not found
 */
export function getCandidateImageUrl(candidate: { 
  name?: string; 
  nickname?: string; 
  did?: string; 
  code?: string;
}): string | undefined {
  // Try to find the image by nickname or name first
  if (candidate.nickname && candidateImages[candidate.nickname]) {
    return candidateImages[candidate.nickname];
  }
  
  if (candidate.name && candidateImages[candidate.name]) {
    return candidateImages[candidate.name];
  }
  
  // Try by DID
  if (candidate.did && candidateImages[candidate.did]) {
    return candidateImages[candidate.did];
  }
  
  // Try by code as last resort
  if (candidate.code && candidateImages[candidate.code]) {
    return candidateImages[candidate.code];
  }
  
  // Return undefined if no match found
  return undefined;
} 