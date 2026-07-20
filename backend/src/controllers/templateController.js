// Mock templates data directly hosted via backend
const templates = [
  { 
    id: 't1',
    title: 'Executive Minimal', 
    category: 'Leadership', 
    score: 'ATS-safe', 
    sections: 'Summary, Impact, Board Metrics',
    downloadUrl: 'http://localhost:5000/storage/templates/executive-minimal.md'
  },
  { 
    id: 't2',
    title: 'Technical Product', 
    category: 'Product', 
    score: 'Keyword-rich', 
    sections: 'Skills, Launches, Experiments',
    downloadUrl: 'http://localhost:5000/storage/templates/technical-product.md'
  },
  { 
    id: 't3',
    title: 'Early Career', 
    category: 'Starter', 
    score: 'Clean', 
    sections: 'Education, Projects, Internship',
    downloadUrl: 'http://localhost:5000/storage/templates/early-career.md'
  },
  { 
    id: 't4',
    title: 'Data Storyteller', 
    category: 'Analytics', 
    score: 'Structured', 
    sections: 'Tools, Dashboards, Business Wins',
    downloadUrl: 'http://localhost:5000/storage/templates/data-storyteller.md'
  }
];

export const getAllTemplates = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error) {
    next(error);
  }
};
