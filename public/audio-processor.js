// public/audio-processor.js
class AudioProcessor extends AudioWorkletProcessor {
    constructor(options) {
      super();
      this.chunkSize = options.processorOptions.chunkSize || 256;
      this.buffer = new Int16Array(this.chunkSize);
      this.bufferIndex = 0;
    }
  
    process(inputs) {
      const input = inputs[0];
      if (input && input.length > 0) {
        const samples = input[0];
  
        for (let i = 0; i < samples.length; i++) {
          // Convert float32 to 16-bit PCM (matches paInt16)
          const sample = Math.max(-1, Math.min(1, samples[i]));
          this.buffer[this.bufferIndex++] =
            sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  
          if (this.bufferIndex === this.chunkSize) {
            // Convert to byte array (little-endian)
            const byteArray = new Uint8Array(this.buffer.buffer);
            this.port.postMessage(byteArray);
            this.bufferIndex = 0;
          }
        }
      }
      return true;
    }
  }
  
  registerProcessor("audio-processor", AudioProcessor);