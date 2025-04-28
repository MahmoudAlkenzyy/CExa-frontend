export function floatTo16BitPCM(input: Float32Array): Int16Array {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output;
  }
  
  export function encodeWAV(
    samples: Float32Array,
    sampleRate: number,
    numChannels: number
  ): Blob {
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
    const view = new DataView(buffer);
  
    function writeString(offset: number, str: string) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    }
  
    // RIFF header
    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples.length * bytesPerSample, true);
    writeString(8, "WAVE");
  
    // fmt chunk
    writeString(12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size for PCM
    view.setUint16(20, 1, true); // AudioFormat PCM = 1
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bytesPerSample * 8, true);
  
    // data chunk
    writeString(36, "data");
    view.setUint32(40, samples.length * bytesPerSample, true);
  
    // Write PCM samples
    const pcm = floatTo16BitPCM(samples);
    let offset = 44;
    for (let i = 0; i < pcm.length; i++, offset += 2) {
      view.setInt16(offset, pcm[i], true);
    }
  
    return new Blob([view], { type: "audio/wav" });
  }  