export const copyToClipBoard = async (text: string) :Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        navigator.clipboard.writeText(text).then(() => resolve()).catch((error) => reject(error))
    })
    
    // try {
    //     await navigator.clipboard.writeText(text);
    // } catch (error) {
    //     throw new Error('Failed to copy text to clipboard');
    // }
  };
  
  export const shareLink = async (url: string, title: string): Promise<void> => {
    try {
        if (navigator.share) {
            await navigator.share({url, title});
            console.log('Link shared successfully!');
        } else {
            throw new Error('Web Share API not supported');
        }
    } catch (error) {
        console.error('Failed to share link:', error);
        try {
           await copyToClipBoard(url);
           console.log('Link copied to clipboard'); 
        } catch (copyError) {
            console.error('Failed to copy link to clipboard:', copyError);
        }
        
    }
  }