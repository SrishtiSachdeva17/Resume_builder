const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: call OpenAI chat completion
const callAI = async (systemPrompt, userPrompt) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });
  return response.choices[0].message.content.trim();
};

// @route  POST /api/ai/summary
// @desc   Generate professional summary based on user data
// @access Private
exports.generateSummary = async (req, res) => {
  const { name, title, skills, experience, education } = req.body;
  try {
    const result = await callAI(
      'You are a professional resume writer. Write concise, impactful professional summaries in 3-4 sentences. Focus on value delivered, not duties.',
      `Generate a professional summary for:
Name: ${name}
Target Role: ${title}
Skills: ${skills?.join(', ')}
Experience: ${experience}
Education: ${education}
Write only the summary paragraph, no labels.`
    );
    res.json({ summary: result });
  } catch (err) {
    console.error('AI summary error:', err.message);
    res.status(500).json({ error: 'Failed to generate summary. Check your OpenAI API key.' });
  }
};

// @route  POST /api/ai/improve-description
// @desc   Improve job description with strong action verbs and metrics
// @access Private
exports.improveDescription = async (req, res) => {
  const { description, position, company } = req.body;
  try {
    const result = await callAI(
      'You are an expert resume writer. Rewrite job descriptions using strong action verbs, quantifiable achievements, and industry keywords. Use bullet points (•). Keep it concise.',
      `Improve this job description for ${position} at ${company}:
"${description}"
Return only the improved bullet points.`
    );
    res.json({ improved: result });
  } catch (err) {
    console.error('AI improve error:', err.message);
    res.status(500).json({ error: 'Failed to improve description.' });
  }
};

// @route  POST /api/ai/suggest-skills
// @desc   Suggest relevant skills based on job role
// @access Private
exports.suggestSkills = async (req, res) => {
  const { role, existingSkills } = req.body;
  try {
    const result = await callAI(
      'You are a career coach and tech recruiter. Suggest relevant technical and soft skills. Return a JSON array of strings only — no explanation, no markdown.',
      `Suggest 10 relevant skills for a ${role}.
Existing skills to avoid repeating: ${existingSkills?.join(', ')}.
Return ONLY a JSON array like: ["skill1", "skill2", ...]`
    );

    // Safely parse JSON response
    const cleaned = result.replace(/```json|```/g, '').trim();
    const skills = JSON.parse(cleaned);
    res.json({ skills });
  } catch (err) {
    console.error('AI skills error:', err.message);
    res.status(500).json({ error: 'Failed to suggest skills.' });
  }
};
