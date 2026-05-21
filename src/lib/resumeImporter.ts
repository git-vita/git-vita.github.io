/**
 * Resume PDF Importer
 * - Extracts text from PDF files using pdfjs-dist
 * - Parses using WebLLM (client-side, no API key needed)
 * - Returns partial portfolio config object
 */

import { webLLMService } from './webllm';

export interface ExtractedResumeData {
  name?: string;
  title?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  location?: string;
  about?: string;
  skills?: { category: string; items: string[] }[];
  experience?: {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights?: string[];
  }[];
  education?: {
    institution: string;
    degree: string;
    period: string;
  }[];
  certifications?: {
    title: string;
    issuer: string;
    date: string;
  }[];
}

/**
 * Extract text from PDF file using pdfjs-dist
 * Worker is loaded from CDN to avoid bundling the 1MB worker file
 */
export async function extractTextFromPdf(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');

  // Set worker from CDN
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

/**
 * Parse resume text using WebLLM (client-side, no API key needed)
 * Uses streaming to parse and extract structured data
 */
/**
 * Attempt to fix incomplete JSON by closing unclosed structures
 */
function fixIncompleteJson(jsonString: string): string {
  let fixed = jsonString;

  // Count braces to find imbalance
  let openBraces = 0;
  let closeBraces = 0;
  let openBrackets = 0;
  let closeBrackets = 0;

  for (const char of fixed) {
    if (char === '{') openBraces++;
    else if (char === '}') closeBraces++;
    else if (char === '[') openBrackets++;
    else if (char === ']') closeBrackets++;
  }

  // Close unclosed arrays
  while (closeBrackets < openBrackets) {
    fixed += ']';
    closeBrackets++;
  }

  // Close unclosed objects
  while (closeBraces < openBraces) {
    fixed += '}';
    closeBraces++;
  }

  return fixed;
}

export async function parseResumeWithWebLLM(
  text: string
): Promise<ExtractedResumeData> {
  if (!text.trim()) {
    throw new Error('Resume text is empty');
  }

  // Initialize WebLLM if needed
  const status = webLLMService.getStatus();
  if (status.status !== 'ready') {
    await webLLMService.initialize();
  }

  // Limit resume text to avoid token limits (Llama-3.2-1B is small)
  const resumeText = text.substring(0, 2000);

  const systemPrompt = `You are a JSON-only resume parser. Output ONLY valid JSON.

Extract resume data. Respond with ONLY this JSON structure, no markdown, no extra text:
{"name":"","title":"","tagline":"","email":"","phone":"","location":"","about":"","skills":[],"experience":[],"education":[],"certifications":[]}

Fill in found values as strings. For arrays, use objects with string values.
For "skills" array: [{"category":"Languages","items":["JavaScript"]}]
For "experience" array: [{"company":"Google","role":"Engineer","period":"2020-2023","description":"Work","highlights":["Achievement"]}]
For "education" array: [{"institution":"MIT","degree":"BS","period":"2020"}]
For "certifications" array: [{"title":"AWS","issuer":"Amazon","date":"2023"}]

Omit fields with no data. Return ONLY the JSON object.`;

  try {
    let jsonResponse = '';

    const messageStream = webLLMService.chat(
      [
        {
          role: 'user',
          content: `${systemPrompt}\n\nResume:\n${resumeText}`,
        },
      ],
      ''
    );

    for await (const chunk of messageStream) {
      jsonResponse += chunk;
    }

    if (!jsonResponse.trim()) {
      throw new Error('WebLLM returned empty response');
    }

    // Extract JSON from response
    let jsonString = jsonResponse.trim();

    // Remove markdown code blocks
    if (jsonString.includes('```')) {
      const parts = jsonString.split('```');
      jsonString = parts.length >= 2 ? parts[1] : jsonString;
      jsonString = jsonString.replace(/^json\n?/, '');
    }

    // Find JSON boundaries
    const firstBrace = jsonString.indexOf('{');
    const lastBrace = jsonString.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
      throw new Error(
        'No valid JSON found in response. Try a simpler resume format.'
      );
    }

    jsonString = jsonString.substring(firstBrace, lastBrace + 1).trim();

    // Fix incomplete JSON
    jsonString = fixIncompleteJson(jsonString);

    // Parse with error recovery
    let parsed: ExtractedResumeData;
    try {
      parsed = JSON.parse(jsonString) as ExtractedResumeData;
    } catch (e) {
      console.error('JSON parse failed:', {
        error: e instanceof Error ? e.message : String(e),
        responseLength: jsonString.length,
        sample: jsonString.substring(0, 200),
      });
      throw new Error(
        'Failed to parse resume data. This might be due to the resume format. Try a simpler PDF.'
      );
    }

    // Validate and clean the parsed data
    return {
      name: typeof parsed.name === 'string' ? parsed.name.trim() : undefined,
      title: typeof parsed.title === 'string' ? parsed.title.trim() : undefined,
      tagline:
        typeof parsed.tagline === 'string' ? parsed.tagline.trim() : undefined,
      email: typeof parsed.email === 'string' ? parsed.email.trim() : undefined,
      phone: typeof parsed.phone === 'string' ? parsed.phone.trim() : undefined,
      location:
        typeof parsed.location === 'string'
          ? parsed.location.trim()
          : undefined,
      about: typeof parsed.about === 'string' ? parsed.about.trim() : undefined,
      skills: Array.isArray(parsed.skills)
        ? parsed.skills
            .filter(
              (s) =>
                s &&
                typeof s === 'object' &&
                s.category &&
                Array.isArray(s.items) &&
                s.items.length > 0
            )
            .map((s) => ({
              category: String(s.category).trim(),
              items: (s.items as any[])
                .map((item) => String(item).trim())
                .filter(Boolean),
            }))
        : undefined,
      experience: Array.isArray(parsed.experience)
        ? parsed.experience
            .filter(
              (e) =>
                e &&
                typeof e === 'object' &&
                (e.company || e.role)
            )
            .map((e) => ({
              company: String(e.company || '').trim(),
              role: String(e.role || '').trim(),
              period: String(e.period || '').trim(),
              description: String(e.description || '').trim(),
              highlights: Array.isArray(e.highlights)
                ? (e.highlights as any[])
                    .map((h) => String(h).trim())
                    .filter(Boolean)
                : undefined,
            }))
        : undefined,
      education: Array.isArray(parsed.education)
        ? parsed.education
            .filter(
              (e) =>
                e &&
                typeof e === 'object' &&
                (e.institution || e.degree)
            )
            .map((e) => ({
              institution: String(e.institution || '').trim(),
              degree: String(e.degree || '').trim(),
              period: String(e.period || '').trim(),
            }))
        : undefined,
      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
            .filter(
              (c) =>
                c &&
                typeof c === 'object' &&
                (c.title || c.issuer)
            )
            .map((c) => ({
              title: String(c.title || '').trim(),
              issuer: String(c.issuer || '').trim(),
              date: String(c.date || '').trim(),
            }))
        : undefined,
    };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Resume parsing failed: ${errorMsg}`);
  }
}
