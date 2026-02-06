/**
 * Constructs the public share URL for the deployed canister.
 * Uses the VITE_CANISTER_ID environment variable if available.
 */
export function getShareLink(): string | null {
  // Check for canister ID from environment
  const canisterId = import.meta.env.VITE_CANISTER_ID;
  
  if (!canisterId) {
    return null;
  }
  
  // Construct the icp0.io URL
  return `https://${canisterId}.icp0.io`;
}

/**
 * Copies the share link to clipboard
 */
export async function copyShareLink(): Promise<boolean> {
  const link = getShareLink();
  
  if (!link) {
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
