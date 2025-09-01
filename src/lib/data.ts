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
    "Langchain",
    "Autogen"
  ],
  frontendDevelopment: [
  ],
  backendDevelopment: [],
  databaseAndStorage: [],
  cloudAndDevOps: ["AzureML"],
  toolsAndServices: [
    "Deep Learning",
    "Probabilistic Modeling",
    "Reinforcement Learning",
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

export const publications = [
  {
    title: "Tools in the Loop: Quantifying Uncertainty of LLM Question Answering Systems That Use Tools",
    link: "https://arxiv.org/pdf/2405.16113.pdf",
    description: "Large Language Models (LLMs) often use external tools to improve their accuracy, but this creates new challenges in assessing their reliability. We introduce a framework to systematically measure the uncertainty that arises from both the LLM and the tools it uses. Our proposed method provides a more trustworthy confidence score for the final answer, enhancing the safety and reliability of tool-augmented LLM systems.",
    category: "Machine learning and NLP",
    date: "2025",
    image: "/publications/default.svg"
  },
  {
    title: "Oh, Now I See What You Want: Learning Agent Models with Internal States from Observations",
    link: "https://dl.acm.org/doi/pdf/10.5555/3639553.3639649",
    description: "Understanding the intent of other agents is key to collaboration but is difficult when their internal goals are hidden. In this research, we propose a method to learn a complete model of another agent, including its unobservable internal states, by only watching its actions. Our neurosymbolic approach infers the agent's decision-making logic, enabling better prediction of its behavior and more effective cooperation.",
    category: "Neurosymbolic AI",
    date: "2024",
    image: "/publications/default.svg"
  },
  {
    title: "A neurosymbolic cognitive architecture framework for handling novelties in open worlds",
    link: "https://arxiv.org/pdf/2301.02334.pdf",
    description: "To operate reliably in the real world, AI agents must manage unexpected events that contradict their knowledge. In this paper, we present a cognitive architecture that integrates symbolic reasoning with neural learning to explicitly manage such 'open-world' novelties. This framework allows an agent to successfully detect, explain, and adapt its behavior when faced with unforeseen circumstances.",
    category: "Neurosymbolic AI",
    date: "2024",
    image: "/publications/default.svg"
  },
  {
    title: "NovelGym: A Flexible Ecosystem for Hybrid Planning and Learning Agents Designed for Open Worlds",
    link: "https://arxiv.org/pdf/2401.03546.pdf",
    description: "The development of AI agents that can handle unexpected events is limited by a lack of suitable testing environments. In this paper, we introduce NovelGym, an open-source platform designed for building and evaluating agents that combine symbolic planning and machine learning. The ecosystem provides a suite of tools for systematically injecting novelties to test an agent's ability to adapt to new situations.",
    category: "Neurosymbolic AI",
    date: "2024",
    image: "/publications/default.svg"
  },
  {
    title: "Graph Pruning for Enumeration of Minimal Unsatisfiable Subsets",
    link: "https://proceedings.mlr.press/v238/lymperopoulos24a/lymperopoulos24a.pdf",
    description: "Identifying all Minimal Unsatisfiable Subsets (MUSes) is a core problem in formal verification and AI, but existing methods are often too slow. In this work, we present a novel graph-based algorithm that significantly speeds up the process of finding all MUSes. By intelligently pruning the search space, our method efficiently solves complex logical problems and outperforms previous state-of-the-art approaches.",
    category: "Machine learning and NLP",
    date: "2024",
    image: "/publications/default.svg"
  },
  {
    title: "Exploiting Variable Correlation with Masked Modeling for Anomaly Detection in Time Series",
    link: "https://arxiv.org/pdf/2211.08221.pdf",
    description: "Pinpointing anomalies in complex multivariate time series data is a significant challenge for system monitoring. In this paper, we introduce a novel detection method inspired by masked language models like BERT. By learning the intricate correlations between different data streams, our model can accurately identify deviations from normal behavior and attribute the anomaly to the specific sensors responsible.",
    category: "Machine learning and NLP",
    date: "2022",
    image: "/publications/default.svg"
  },
  {
    title: "NovelCraft: A Dataset for Novelty Detection and Discovery in Open Worlds",
    link: "https://arxiv.org/pdf/2206.11736.pdf",
    description: "Research into AI agents that can handle the unexpected is hampered by a lack of good benchmarks. In this paper, we introduce NovelCraft, a large-scale dataset built in the Minecraft environment for studying novelty detection. It provides a controlled setting where a wide variety of novel events can be introduced, enabling rigorous and reproducible evaluation of an agent's ability to adapt.",
    category: "Neurosymbolic AI",
    date: "2022",
    image: "/publications/default.svg"
  },
  {
    title: "Deep-learning-based image restoration of depth-resolved, label-free, two-photon images for the quantitative morphological and functional characterization of human cervical tissues",
    link: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11647/116470Z/Deep-learning-based-image-restoration-of-depth-resolved-label/10.1117/12.2577626.full",
    description: "Obtaining clear images of deep biological tissue is challenging and often limits diagnostic accuracy. In this research, we develop a deep learning model to restore the quality of degraded two-photon microscopy images of human cervical tissue. Our proposed method significantly enhances image clarity, which in turn allows for more precise and reliable quantitative analysis for clinical assessment.",
    category: "ML for Science",
    date: "2021",
    image: "/publications/default.svg"
  },
  {
    title: "Integrating Planning, Execution and Monitoring in the presence of Open World Novelties: Case Study of an Open World Monopoly Solver",
    link: "https://arxiv.org/pdf/2107.04303.pdf",
    description: "Creating AI agents that can function in dynamic 'open worlds' where rules can change unexpectedly is a major challenge. In this paper, we present a cognitive architecture that tightly integrates planning with execution monitoring to detect and react to novelties. We demonstrate the system's effectiveness with an AI that can play Monopoly and successfully adapt its strategy when the rules are unpredictably altered mid-game.",
    category: "Neurosymbolic AI",
    date: "2021",
    image: "/publications/default.svg"
  },
  {
    title: "Forecasting COVID-19 Counts At A Single Hospital: A Hierarchical Bayesian Approach",
    link: "https://arxiv.org/pdf/2104.09327.pdf",
    description: "Hospitals require accurate, localized forecasts of COVID-19 cases to manage resources, but creating such predictions is difficult. In this work, we address this problem by developing a hierarchical Bayesian model tailored for single-hospital forecasting. Our model effectively predicts patient admissions, ICU counts, and other key metrics while also providing crucial uncertainty estimates to inform decision-making.",
    category: "ML for Science",
    date: "2021",
    image: "/publications/default.svg"
  },
  {
    title: "Branching principles of animal and plant networks identified by combining extensive data, machine learning and modelling",
    link: "https://royalsocietypublishing.org/doi/pdf/10.1098/rsif.2020.0624",
    description: "Biological transport networks, from leaf veins to blood vessels, are essential for life, but a unified theory explaining their branching patterns has been elusive. In this study, we analyze a massive dataset of branching structures from across the tree of life using machine learning. We identify the key statistical features that govern these patterns and develop a generative model that can replicate the diverse network designs found in nature.",
    category: "ML for Science",
    date: "2021",
    image: "/publications/default.svg"
  },
  {
    title: "Concept wikification for covid-19",
    link: "https://aclanthology.org/2020.nlpcovid19-2.22.pdf",
    description: "The explosion of COVID-19 research has made it hard for scientists to keep up with and synthesize information. To address this information overload, we developed a system to automatically link key terms in scientific articles to a unified knowledge base. This 'wikification' process, which uses a hybrid of dictionary and BERT-based methods, helps standardize terminology and improves the discovery of relevant documents.",
    category: "Machine learning and NLP",
    date: "2020",
    image: "/publications/default.svg"
  },


];


