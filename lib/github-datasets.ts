export interface GitHubDataset {
  id: string
  name: string
  repository: string
  description: string
  dataType: "cgm" | "clinical" | "social" | "research" | "mixed"
  format: string[]
  size: string
  lastUpdated: string
  stars: number
  language: string
  topics: string[]
  rawDataUrl?: string
  apiEndpoint?: string
}

export const GITHUB_DIABETES_DATASETS: GitHubDataset[] = [
  {
    id: "bg-control",
    name: "Blood Glucose Control",
    repository: "RobotPsychologist/bg_control",
    description: "Improving short-term prandial blood glucose outcomes for people with type 1 diabetes",
    dataType: "cgm",
    format: ["CSV", "JSON"],
    size: "2.3GB",
    lastUpdated: "2024-12-15",
    stars: 20,
    language: "Jupyter Notebook",
    topics: ["diabetes", "timeseries-forecasting", "changepoint-detection"],
    rawDataUrl: "https://raw.githubusercontent.com/RobotPsychologist/bg_control/main/data/",
    apiEndpoint: "/api/datasets/bg-control",
  },
  {
    id: "idmvis",
    name: "Interactive Diabetes Monitoring Visualization",
    repository: "VisDunneRight/IDMVis",
    description: "Open source interactive visualization tool for showing type 1 diabetes patient data",
    dataType: "clinical",
    format: ["JSON", "CSV"],
    size: "450MB",
    lastUpdated: "2019-08-13",
    stars: 8,
    language: "JavaScript",
    topics: ["visualization", "patient-data", "diabetes"],
    rawDataUrl: "https://raw.githubusercontent.com/VisDunneRight/IDMVis/master/data/",
    apiEndpoint: "/api/datasets/idmvis",
  },
  {
    id: "cgm-prediction-lstm",
    name: "CGM Prediction LSTM",
    repository: "JakubDylag/CGM_Prediction_LSTM",
    description: "Machine Learning based Prediction of Glucose Levels on Type 1 Diabetes Patients with CGM Data",
    dataType: "cgm",
    format: ["CSV", "NPY"],
    size: "1.8GB",
    lastUpdated: "2023-02-28",
    stars: 10,
    language: "Jupyter Notebook",
    topics: ["machine-learning", "lstm", "glucose-prediction"],
    rawDataUrl: "https://raw.githubusercontent.com/JakubDylag/CGM_Prediction_LSTM/main/data/",
    apiEndpoint: "/api/datasets/cgm-lstm",
  },
  {
    id: "glucobench",
    name: "GlucoBench",
    repository: "IrinaStatsLab/GlucoBench",
    description: "Curated List of Continuous Glucose Monitoring Datasets with Prediction Benchmarks",
    dataType: "mixed",
    format: ["CSV", "HDF5", "JSON"],
    size: "5.2GB",
    lastUpdated: "2024-08-20",
    stars: 22,
    language: "Jupyter Notebook",
    topics: ["deep-learning", "time-series", "cgm", "glucose-monitoring", "uncertainty-quantification"],
    rawDataUrl: "https://raw.githubusercontent.com/IrinaStatsLab/GlucoBench/main/datasets/",
    apiEndpoint: "/api/datasets/glucobench",
  },
  {
    id: "iglu",
    name: "IGLU - Interpreting GLUcose",
    repository: "irinagain/iglu",
    description: "R package for Interpreting GLUcose data from CGMs (Continuous Glucose Monitors)",
    dataType: "cgm",
    format: ["CSV", "RData"],
    size: "320MB",
    lastUpdated: "2024-07-12",
    stars: 27,
    language: "R",
    topics: ["r-package", "glucose-analysis", "cgm"],
    rawDataUrl: "https://raw.githubusercontent.com/irinagain/iglu/master/data/",
    apiEndpoint: "/api/datasets/iglu",
  },
  {
    id: "marjorie",
    name: "Marjorie Pattern Visualization",
    repository: "jku-vds-lab/marjorie",
    description: "Web-based approach to visualize and explore patterns in type 1 diabetes data",
    dataType: "clinical",
    format: ["JSON", "CSV"],
    size: "680MB",
    lastUpdated: "2024-01-26",
    stars: 3,
    language: "Python",
    topics: ["visualization", "data-analysis", "diabetes", "pattern-recognition"],
    rawDataUrl: "https://raw.githubusercontent.com/jku-vds-lab/marjorie/main/data/",
    apiEndpoint: "/api/datasets/marjorie",
  },
]

export const CLINICAL_DATASETS = [
  {
    id: "type1-aleppo-2017",
    name: "Type 1 Aleppo (2017)",
    description: "Dexcom G4 CGM data, 5-min intervals, 6-month follow-up in 225 adults with T1D",
    variables: ["glucose_mgdl", "timestamp", "demographics", "insulin_regimen"],
    format: "CSV + metadata",
    source: "Awesome-CGM list",
    size: "1.2GB",
    participants: 225,
    duration: "6 months",
    samplingRate: "5 minutes",
  },
  {
    id: "anderson-2016",
    name: "Anderson (2016)",
    description: "Closed-loop artificial pancreas trial; CGM traces, insulin delivery logs, meal/exercise annotations",
    variables: ["glucose_mgdl", "insulin_units", "meal_carbs_g", "exercise_type", "timestamp"],
    format: "CSV",
    source: "Awesome-CGM list",
    size: "890MB",
    participants: 156,
    duration: "3 months",
    samplingRate: "1 minute",
  },
  {
    id: "loop-observational",
    name: "Loop Observational Study",
    description: "DIY Loop users; CGM, insulin dosing, carb entries, device metadata",
    variables: ["glucose_mgdl", "insulin_units", "carb_entries", "device_metadata", "timestamp"],
    format: "CSV + protocol",
    source: "Jaeb Center",
    size: "2.1GB",
    participants: 1045,
    duration: "12 months",
    samplingRate: "5 minutes",
  },
]
