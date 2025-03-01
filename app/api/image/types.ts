// types.ts
export interface GeneratedImage {
    base64: string;
    mimeType: string;
  }
  
  export interface ComfyUIOutputImage {
    filename: string;
  }
  
  export interface ComfyUIOutput {
    images: ComfyUIOutputImage[];
  }
  
  export interface ComfyUIResponse {
    [prompt_id: string]: {
      outputs: {
        [node_id: string]: ComfyUIOutput;
      };
    };
  }