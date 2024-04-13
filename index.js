import fs from 'fs/promises';

try {
  // Read the SRT file
  const filename = process.argv[2];
  const data = await fs.readFile(filename, 'utf8');

  // Split the SRT content into an array of lines
  const lines = data.split('\n');

  // Initialize an empty array to store the transcript lines
  const transcriptLines = [];

  // Iterate over each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip the subtitle numbers and timecodes
    if (!/^\d+$/.test(line) && !/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/.test(line)) {
      // Add the subtitle text to the transcript array
      transcriptLines.push(line);
    }
  }

  // Join the transcript lines into a single string
  const transcript = transcriptLines.join(' ').replace(/\s+/g, ' ');

  process.stdout.write(transcript);
} catch (err) {
  console.error('Error:', err);
}