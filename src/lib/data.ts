export const personalInfo = {
  name: "Panagiotis Lymperopoulos",
  location: "Boston, US",
  email: "panliberopoulos@gmail.com",
  github: "https://github.com/panlybero",
  linkedin: "https://www.linkedin.com/in/panagiotis-lymperopoulos-34912b191/",
  profilePicture: "/profile.png",
  heroDescription:
    "**PhD Candidate** in Computer Science at Tufts University studying **Deep Learning**,  **Neurosymbolic AI** and **Generative models**. Passionate about learning, creating and reasoning - and making machines do the same.",
};

export const workExperience = [
  {
    company: "Skyfall",
    location: "New York City, US (Remote)",
    position: "Research Intern",
    period: "June 2025 - August 2025",
    achievements: [
      "- Developed World Models for LLM-based planning agents by integrating foundation models' implicit world knowledge with external and domain-specific data.",
      "- Combined RAG, LLM-as-judge and probabilistic inference on graphical models to automatically design and optimize sparse world models for planning with MCTS.",
    ],
  },
  {
    company: "Agora Labs",
    location: "Rome, Italy (Remote)",
    position: "LLM Engineer",
    period: "June 2024 - May 2025",
    achievements: [
      "- Led team of developers in development and deployment of customer-facing text-to-SQL and automated data preprocessing application.",
      "- Designed and implemented information extraction pipeline for medical data, integrating traditional NLP workflows (NER, entity-linking) with LLMs.",
      "- Focused on ensuring data privacy and security by deploying and fine-tuning local, open-source LLMs.",
    ],
  },
  {
    company: "Optechain",
    location: "Athens, Greece",
    position: "Data Science Intern",
    period: "June 2021 - August 2021",
    achievements: [
      "- Implemented ML pipeline for Data Cleaning, Training and Deployment of time-series prediction and computer-vision models on AzureML",
      "- Developed infrastructure on the entire stack for querying deployed models, submitting results to database and serving them to end-users.",
    ],
  },
];

export const education = [
  {
    institution: "Tufts University",
    location: "Medford, MA",
    degree: "PhD Candidate in Computer Science, MS in Data Science",
    period: "August 2019 - June 2026",
  },
  {
    institution: "University of California, Los Angeles (UCLA)",
    location: "Los Angeles, CA",
    degree: "Bachelor of Science in Computational and Systems Biology",
    period: "September 2015 - June 2019",
  },
];
export const skills = {
  programmingLanguages: [
    "Python",
    "PyTorch",
    "TensorFlow",
  ],
  frontendDevelopment: [
  ],
  backendDevelopment: [],
  databaseAndStorage: [],
  cloudAndDevOps: ["AzureML"],
  toolsAndServices: [
    "Reinforcement Learning",
    "Deep Learning",
    "Probabilistic Modeling",
    "Graph Neural Networks",
    "RAG",
    "LLMs",
    "LLM Agents",
    "Agile Development",
  ],
};

export const projects = [
  {
    title: "Act-to-Ground: Neurosymbolic Grounding for Planners",
    link: "",
    description: [
      "- Developed Act-to-Ground (A2G), a framework for training neural grounding models for symbolic planners using weak supervision from environment interaction or demonstrations.",
      "- Proposed a novel MCMC sampler and a score-matching objective to improve the stability and performance of neurosymbolic grounding models.",
      "- Presented the framework and its successful evaluation in planning domains at the 19th Conference on Neurosymbolic Learning and Reasoning (NeSy 2025).",
    ],
  },
  {
    title: "Uncertainty Quantification for Tool-Using LLMs",
    link: "",
    description: [
      "- Developed a novel method for quantifying the uncertainty of Large Language Model (LLM) question-answering systems that use external tools such as RAG or querying ML models.",
      "- Presented results at the 24th International Conference on Autonomous Agents and Multiagent Systems (AAMAS 2025).",
    ],
  },
  {
    title: "Open-world Agent Modeling",
    link: "",
    description: [
      "- Developed a novel method for online modeling of agent behavior from observations, that accounts for unobservable agent-internal states, crucial in HCI, HRI applications.",
      "- Presented a paper describing the method and its results at the 24th International Conference on Autonomous Agents and Multiagent Systems (AAMAS 2024).",
    ],
  },
  {
    title: "Accelerating Infeasibility Analysis with Deep Learning",
    link: "",
    description: [
      "- Created a graph neural network-based algorithm for accelerating infeasibility analysis of boolean constraint satisfaction problems.",
      "- Achieved more than two orders of magnitude improvement on MUS enumeration for hard problems and presented findings at AISTATS 2024.",
    ],
  },
];


